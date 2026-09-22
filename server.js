"use strict";

require("dotenv").config();

const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const path = require("node:path");
const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { Pool } = require("pg");

const PORT = Number(process.env.PORT || 3002);
const HOST = process.env.HOST || "127.0.0.1";
const MEDIA_ROOT = path.resolve(process.env.MEDIA_ROOT || "/srv/garageistanbul/ekran1/media");
const PUBLIC_MEDIA_BASE = String(
  process.env.PUBLIC_MEDIA_BASE || "https://api.scheax.com.tr/ekran1/media"
).replace(/\/+$/, "");

const requiredEnvironment = ["DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD"];
for (const key of requiredEnvironment) {
  if (!process.env[key]) {
    throw new Error(`Eksik ortam değişkeni: ${key}`);
  }
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: Number(process.env.DB_POOL_MAX || 10),
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

const app = express();
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: false }));

const configuredOrigins = String(process.env.CORS_ORIGINS || "*")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || configuredOrigins.includes("*") || configuredOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Bu site kaynağına CORS izni verilmemiştir."));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "X-Personnel-Name",
    "X-Personnel-Pin",
    "X-Device-Id",
    "X-Admin-Pin",
    "X-Ekran-Session",
  ],
  maxAge: 86_400,
}));

app.use("/api", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1_200,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: { message: "Çok fazla istek gönderildi. Biraz sonra tekrar dene." } },
}));

app.use(express.json({ limit: "3mb" }));

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function decodeHeader(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  try {
    return decodeURIComponent(text);
  } catch (_error) {
    return text;
  }
}

// Şifreli oturumun içinde PIN yalnızca sunucunun anahtarıyla çözülebilir.
// PIN tarayıcının kalıcı depolamasına yazılmaz. PIN değişirse DB doğrulaması
// oturumu anında reddeder; oturum 30 gün içinde yenilenmezse sona erer.
const SESSION_SECRET = String(process.env.EKRAN_SESSION_SECRET || "");
const SESSION_KEY = SESSION_SECRET.length >= 32 && !SESSION_SECRET.startsWith("BURAYA_")
  ? crypto.createHash("sha256").update(SESSION_SECRET).digest()
  : null;
const SESSION_LIFETIME_MS = 30 * 24 * 60 * 60 * 1000;

function requireSessionKey() {
  if (!SESSION_KEY) throw httpError(503, "Kalıcı oturum henüz etkin değil.");
}

function issueSession(name, pin, deviceId) {
  requireSessionKey();
  const nonce = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", SESSION_KEY, nonce);
  const payload = JSON.stringify({ name, pin, deviceId, exp: Date.now() + SESSION_LIFETIME_MS });
  const encrypted = Buffer.concat([cipher.update(payload, "utf8"), cipher.final()]);
  return ["v1", nonce.toString("base64url"), encrypted.toString("base64url"), cipher.getAuthTag().toString("base64url")].join(".");
}

function readSession(req) {
  const token = String(req.get("X-Ekran-Session") || "");
  if (!token) return null;
  requireSessionKey();
  if (token.length > 2048) throw httpError(401, "Oturum geçersiz.");
  const parts = token.split(".");
  if (parts.length !== 4 || parts[0] !== "v1") throw httpError(401, "Oturum geçersiz.");
  try {
    const nonce = Buffer.from(parts[1], "base64url");
    const encrypted = Buffer.from(parts[2], "base64url");
    const tag = Buffer.from(parts[3], "base64url");
    if (nonce.length !== 12 || tag.length !== 16 || !encrypted.length) throw Error("format");
    const decipher = crypto.createDecipheriv("aes-256-gcm", SESSION_KEY, nonce);
    decipher.setAuthTag(tag);
    const data = JSON.parse(Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8"));
    if (!data.name || !data.pin || !data.deviceId || !Number.isSafeInteger(data.exp) || data.exp <= Date.now()) throw Error("expired");
    if (data.deviceId !== decodeHeader(req.get("X-Device-Id"))) throw Error("device");
    return data;
  } catch (_error) {
    throw httpError(401, "Oturum süresi doldu veya oturum geçersiz. Tekrar giriş yap.");
  }
}

function requestCredentials(req) {
  const session = readSession(req);
  if (session) return {
    personnelName: session.name,
    personnelPin: session.pin,
    deviceId: session.deviceId,
    adminPin: session.pin,
  };
  return {
    personnelName: decodeHeader(req.get("X-Personnel-Name")),
    personnelPin: String(req.get("X-Personnel-Pin") || "").trim(),
    deviceId: decodeHeader(req.get("X-Device-Id")),
    adminPin: String(req.get("X-Admin-Pin") || "").trim(),
  };
}

async function verifyAdminPin(pin, client = pool) {
  if (!pin) return false;
  const result = await client.query("SELECT public.verify_depo_admin($1::text) AS valid", [pin]);
  return result.rows[0]?.valid === true;
}

async function authorizeTab(req, tabName) {
  const credentials = requestCredentials(req);
  if (!credentials.personnelName || !credentials.personnelPin) {
    throw httpError(401, "Personel adı ve PIN gereklidir.");
  }

  const verification = await pool.query(
    "SELECT public.verify_depo_personnel($1::text, $2::text) AS valid",
    [credentials.personnelName, credentials.personnelPin]
  );
  if (verification.rows[0]?.valid !== true) {
    throw httpError(401, "Personel hesabı pasif, PIN yanlış veya oturum geçersiz.");
  }

  if (credentials.adminPin && await verifyAdminPin(credentials.adminPin)) {
    return credentials;
  }

  const permission = await pool.query(
    `SELECT allowed_tabs
       FROM public.depo_personnel
      WHERE personnel_key = lower(btrim($1::text))
      ORDER BY last_seen_at DESC
      LIMIT 1`,
    [credentials.personnelName]
  );
  const allowedTabs = permission.rows[0]?.allowed_tabs || [];
  if (!allowedTabs.includes(tabName)) {
    throw httpError(403, "Bu işlem için yetkin bulunmuyor.");
  }
  return credentials;
}

async function authorizeAdmin(req) {
  const credentials = requestCredentials(req);
  if (!credentials.adminPin || !await verifyAdminPin(credentials.adminPin)) {
    throw httpError(403, "Admin doğrulaması gerekli.");
  }
  return credentials;
}

function parsePositiveLimit(value, fallback, maximum) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) return fallback;
  return Math.min(parsed, maximum);
}

function normalizeImageUrl(value) {
  if (!value) return value;
  const text = String(value);
  const marker = "/storage/v1/object/public/depo-resimler/";
  const markerIndex = text.indexOf(marker);
  if (markerIndex < 0) return text;
  const relativePath = text.slice(markerIndex + marker.length).replace(/^\/+/, "");
  return `${PUBLIC_MEDIA_BASE}/depo-resimler/${relativePath}`;
}

function normalizeItem(row) {
  if (!row) return row;
  return {
    ...row,
    quantity: Number(row.quantity || 0),
    socket_quantity: Number(row.socket_quantity || 0),
    no_socket_quantity: Number(row.no_socket_quantity || 0),
    image_url: normalizeImageUrl(row.image_url),
  };
}

function validateUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

const itemInsertColumns = [
  "product_type",
  "product_name",
  "box_no",
  "shelf_location",
  "quantity",
  "vehicle_brand",
  "vehicle_model",
  "vehicle_year",
  "socket_included",
  "media_brand",
  "ram",
  "storage",
  "screen_inch",
  "note",
  "image_url",
  "socket_quantity",
  "no_socket_quantity",
  "barcode",
];

const itemUpdateColumns = itemInsertColumns.filter((column) => ![
  "quantity",
  "socket_quantity",
  "no_socket_quantity",
].includes(column));

function cleanItemPayload(payload, allowedColumns) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw httpError(400, "Geçerli bir ürün kaydı gönderilmedi.");
  }
  const cleaned = {};
  for (const column of allowedColumns) {
    if (Object.prototype.hasOwnProperty.call(payload, column)) cleaned[column] = payload[column];
  }
  return cleaned;
}

function validateRequiredItemFields(item) {
  for (const field of ["product_type", "product_name", "box_no"]) {
    if (!String(item[field] || "").trim()) throw httpError(400, `${field} alanı zorunludur.`);
  }
}

function validateStockValues(item, requireZero = false) {
  for (const field of ["quantity", "socket_quantity", "no_socket_quantity"]) {
    if (!Object.prototype.hasOwnProperty.call(item, field)) continue;
    const value = Number(item[field]);
    if (!Number.isInteger(value) || value < 0) throw httpError(400, `${field} geçersiz.`);
    if (requireZero && value !== 0) {
      throw httpError(400, "Yeni ürün stoğu hareket kaydıyla eklenmelidir.");
    }
    item[field] = value;
  }
}

async function insertItem(client, payload, requestedId = null) {
  const item = cleanItemPayload(payload, itemInsertColumns);
  validateRequiredItemFields(item);
  validateStockValues(item, requestedId === null);

  const columns = [...Object.keys(item)];
  const values = columns.map((column) => item[column]);
  if (requestedId !== null) {
    if (!validateUuid(requestedId)) throw httpError(400, "Ürün ID geçersiz.");
    columns.unshift("id");
    values.unshift(requestedId);
  }

  const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");
  const updateColumns = columns.filter((column) => column !== "id");
  const conflict = requestedId === null
    ? ""
    : ` ON CONFLICT (id) DO UPDATE SET ${updateColumns.map((column) => `${column} = EXCLUDED.${column}`).join(", ")}`;
  const query = `INSERT INTO public.depo_items (${columns.join(", ")}) VALUES (${placeholders})${conflict} RETURNING *`;
  const result = await client.query(query, values);
  return normalizeItem(result.rows[0]);
}

const RPC_DEFINITIONS = Object.freeze({
  apply_depo_stock_movement: {
    params: ["p_item_id", "p_direction", "p_amount", "p_variant", "p_personnel_name", "p_personnel_pin", "p_device_id", "p_note"],
    sql: "SELECT public.apply_depo_stock_movement($1::text,$2::integer,$3::integer,$4::text,$5::text,$6::text,$7::text,$8::text) AS result",
  },
  change_depo_admin_pin: {
    params: ["p_current_pin", "p_new_pin"],
    sql: "SELECT public.change_depo_admin_pin($1::text,$2::text) AS result",
  },
  get_depo_bulk_stock_permission: {
    params: ["p_personnel_name", "p_personnel_pin"],
    sql: "SELECT public.get_depo_bulk_stock_permission($1::text,$2::text) AS result",
  },
  get_depo_bulk_stock_permissions: {
    params: ["p_admin_pin"],
    sql: "SELECT * FROM public.get_depo_bulk_stock_permissions($1::text)",
    returnsRows: true,
  },
  get_depo_personnel_list: {
    params: ["p_admin_pin"],
    sql: "SELECT * FROM public.get_depo_personnel_list($1::text)",
    returnsRows: true,
  },
  get_depo_registration_status: {
    params: ["p_admin_pin"],
    sql: "SELECT public.get_depo_registration_status($1::text) AS result",
  },
  get_depo_stock_movements: {
    params: ["p_admin_pin", "p_from", "p_to", "p_personnel"],
    sql: "SELECT * FROM public.get_depo_stock_movements($1::text,$2::timestamptz,$3::timestamptz,$4::text)",
    returnsRows: true,
  },
  login_depo_personnel: {
    params: ["p_personnel_name", "p_personnel_pin", "p_device_id"],
    sql: "SELECT * FROM public.login_depo_personnel($1::text,$2::text,$3::text)",
    returnsRows: true,
  },
  set_depo_bulk_stock_permission: {
    params: ["p_admin_pin", "p_personnel_name", "p_allowed"],
    sql: "SELECT public.set_depo_bulk_stock_permission($1::text,$2::text,$3::boolean) AS result",
  },
  set_depo_personnel_active: {
    params: ["p_admin_pin", "p_personnel_id", "p_is_active"],
    sql: "SELECT public.set_depo_personnel_active($1::text,$2::uuid,$3::boolean) AS result",
  },
  set_depo_personnel_pin: {
    params: ["p_admin_pin", "p_personnel_id", "p_new_pin"],
    sql: "SELECT public.set_depo_personnel_pin($1::text,$2::uuid,$3::text) AS result",
  },
  set_depo_personnel_tabs: {
    params: ["p_admin_pin", "p_personnel_id", "p_allowed_tabs"],
    sql: "SELECT public.set_depo_personnel_tabs($1::text,$2::uuid,$3::text[]) AS result",
  },
  set_depo_registration_status: {
    params: ["p_admin_pin", "p_is_open"],
    sql: "SELECT public.set_depo_registration_status($1::text,$2::boolean) AS result",
  },
  verify_depo_admin: {
    params: ["p_admin_pin"],
    sql: "SELECT public.verify_depo_admin($1::text) AS result",
  },
  verify_depo_personnel: {
    params: ["p_personnel_name", "p_personnel_pin"],
    sql: "SELECT public.verify_depo_personnel($1::text,$2::text) AS result",
  },
});

app.get("/api/health", asyncRoute(async (_req, res) => {
  const result = await pool.query("SELECT current_database() AS database, now() AS database_time");
  res.json({
    status: "ok",
    service: "ekran1-api",
    database: result.rows[0].database,
    database_time: result.rows[0].database_time,
  });
}));

async function sessionProfile(name, pin) {
  const valid = await pool.query(
    "SELECT public.verify_depo_personnel($1::text,$2::text) AS valid", [name, pin]
  );
  if (valid.rows[0]?.valid !== true) throw httpError(401, "Personel hesabı pasif veya PIN değişmiş. Tekrar giriş yap.");
  const permission = await pool.query(
    `SELECT allowed_tabs FROM public.depo_personnel
      WHERE personnel_key = lower(btrim($1::text))
      ORDER BY last_seen_at DESC LIMIT 1`, [name]
  );
  return { allowed_tabs: permission.rows[0]?.allowed_tabs || [] };
}

app.post("/api/session", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: "draft-8",
  legacyHeaders: false,
}), asyncRoute(async (req, res) => {
  requireSessionKey();
  const name = String(req.body?.personnel_name || "").trim();
  const pin = String(req.body?.personnel_pin || "").trim();
  const deviceId = String(req.body?.device_id || "").trim();
  if (name.length < 2 || name.length > 120 || pin.length < 4 || pin.length > 128 || !deviceId || deviceId.length > 200) {
    throw httpError(400, "Personel, PIN ve cihaz kimliği geçersiz.");
  }
  const profile = await sessionProfile(name, pin);
  res.set("Cache-Control", "no-store").json({ data: {
    token: issueSession(name, pin, deviceId),
    name, profile, is_admin: await verifyAdminPin(pin)
  } });
}));

app.get("/api/session", asyncRoute(async (req, res) => {
  const session = readSession(req);
  if (!session) throw httpError(401, "Oturum bulunamadı.");
  const profile = await sessionProfile(session.name, session.pin);
  res.set("Cache-Control", "no-store").json({ data: {
    token: issueSession(session.name, session.pin, session.deviceId),
    name: session.name, profile, is_admin: await verifyAdminPin(session.pin)
  } });
}));

app.get("/api/items", asyncRoute(async (req, res) => {
  const offset = parsePositiveLimit(req.query.offset, 0, 1_000_000);
  const limit = parsePositiveLimit(req.query.limit, 1_000, 2_000);
  const result = await pool.query(
    "SELECT * FROM public.depo_items ORDER BY created_at DESC, id DESC OFFSET $1 LIMIT $2",
    [offset, limit]
  );
  res.json({ data: result.rows.map(normalizeItem) });
}));

app.post("/api/items", asyncRoute(async (req, res) => {
  await authorizeTab(req, "urun");
  const item = await insertItem(pool, req.body);
  res.status(201).json({ data: item });
}));

app.post("/api/items/upsert", asyncRoute(async (req, res) => {
  await authorizeAdmin(req);
  const rows = Array.isArray(req.body?.rows) ? req.body.rows : [];
  if (!rows.length || rows.length > 250) throw httpError(400, "Toplu güncelleme 1-250 kayıt içermelidir.");

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const saved = [];
    for (const row of rows) {
      saved.push(await insertItem(client, row, row.id));
    }
    await client.query("COMMIT");
    res.json({ data: saved });
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}));

app.patch("/api/items/:id", asyncRoute(async (req, res) => {
  await authorizeTab(req, "urun");
  if (!validateUuid(req.params.id)) throw httpError(400, "Ürün ID geçersiz.");
  const updates = cleanItemPayload(req.body, itemUpdateColumns);
  const columns = Object.keys(updates);
  if (!columns.length) throw httpError(400, "Güncellenecek ürün alanı bulunamadı.");
  if (Object.prototype.hasOwnProperty.call(updates, "product_name") && !String(updates.product_name || "").trim()) {
    throw httpError(400, "Ürün adı boş olamaz.");
  }
  if (Object.prototype.hasOwnProperty.call(updates, "box_no") && !String(updates.box_no || "").trim()) {
    throw httpError(400, "Koli no boş olamaz.");
  }

  const values = columns.map((column) => updates[column]);
  values.push(req.params.id);
  const assignments = columns.map((column, index) => `${column} = $${index + 1}`).join(", ");
  const result = await pool.query(
    `UPDATE public.depo_items SET ${assignments} WHERE id = $${values.length}::uuid RETURNING *`,
    values
  );
  if (!result.rowCount) throw httpError(404, "Ürün bulunamadı.");
  res.json({ data: normalizeItem(result.rows[0]) });
}));

app.delete("/api/items/:id", asyncRoute(async (req, res) => {
  await authorizeTab(req, "urun");
  if (!validateUuid(req.params.id)) throw httpError(400, "Ürün ID geçersiz.");
  const result = await pool.query(
    "DELETE FROM public.depo_items WHERE id = $1::uuid RETURNING id",
    [req.params.id]
  );
  if (!result.rowCount) throw httpError(404, "Ürün bulunamadı.");
  res.json({ data: result.rows[0] });
}));

app.get("/api/payments", asyncRoute(async (req, res) => {
  await authorizeTab(req, "odeme");
  const limit = parsePositiveLimit(req.query.limit, 30, 100);
  const result = await pool.query(
    "SELECT * FROM public.depo_payments ORDER BY created_at DESC, id DESC LIMIT $1",
    [limit]
  );
  res.json({ data: result.rows });
}));

app.post("/api/payments", asyncRoute(async (req, res) => {
  await authorizeTab(req, "odeme");
  const payerName = String(req.body?.payer_name || "").trim();
  const amount = Number(req.body?.amount);
  const paymentType = String(req.body?.payment_type || "").trim();
  const note = String(req.body?.note || "").trim() || null;
  if (!payerName || !Number.isFinite(amount) || amount <= 0) {
    throw httpError(400, "Firma/kişi ve pozitif tutar gereklidir.");
  }
  if (!new Set(["giris", "cikis"]).has(paymentType)) throw httpError(400, "Ödeme tipi geçersiz.");
  const result = await pool.query(
    `INSERT INTO public.depo_payments (payer_name, amount, payment_type, note)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [payerName, amount, paymentType, note]
  );
  res.status(201).json({ data: result.rows[0] });
}));

app.post(
  "/api/media/upload",
  express.raw({ type: ["image/webp", "image/jpeg"], limit: "12mb" }),
  asyncRoute(async (req, res) => {
    await authorizeTab(req, "urun");
    const relativePath = String(req.query.path || "").trim();
    if (!/^urunler\/[A-Za-z0-9._-]+\.(?:webp|jpe?g)$/i.test(relativePath)) {
      throw httpError(400, "Resim dosya yolu geçersiz.");
    }
    if (!Buffer.isBuffer(req.body) || req.body.length === 0) throw httpError(400, "Resim verisi boş.");

    const destination = path.resolve(MEDIA_ROOT, "depo-resimler", relativePath);
    const allowedRoot = path.resolve(MEDIA_ROOT, "depo-resimler");
    if (!destination.startsWith(`${allowedRoot}${path.sep}`)) throw httpError(400, "Güvensiz resim yolu.");

    await fs.mkdir(path.dirname(destination), { recursive: true });
    try {
      await fs.writeFile(destination, req.body, { flag: "wx", mode: 0o644 });
    } catch (error) {
      if (error.code === "EEXIST") throw httpError(409, "Aynı isimde resim zaten mevcut.");
      throw error;
    }
    const publicUrl = `${PUBLIC_MEDIA_BASE}/depo-resimler/${relativePath}`;
    res.status(201).json({ data: { path: relativePath, publicUrl } });
  })
);

app.post("/api/rpc/:name", asyncRoute(async (req, res) => {
  const definition = RPC_DEFINITIONS[req.params.name];
  if (!definition) throw httpError(404, "RPC fonksiyonu bulunamadı.");

  const session = readSession(req);
  if (session) await sessionProfile(session.name, session.pin);
  const params = { ...(req.body || {}) };
  if (session) {
    if (definition.params.includes("p_personnel_name")) params.p_personnel_name = session.name;
    if (definition.params.includes("p_personnel_pin")) params.p_personnel_pin = session.pin;
    if (definition.params.includes("p_device_id")) params.p_device_id = session.deviceId;
    if (definition.params.includes("p_admin_pin")) params.p_admin_pin = session.pin;
  }

  if (req.params.name === "apply_depo_stock_movement" && Number(params.p_amount) > 1) {
    const adminAllowed = await verifyAdminPin(params.p_personnel_pin);
    if (!adminAllowed) {
      const bulkPermission = await pool.query(
        "SELECT public.get_depo_bulk_stock_permission($1::text,$2::text) AS allowed",
        [params.p_personnel_name, params.p_personnel_pin]
      );
      if (bulkPermission.rows[0]?.allowed !== true) {
        throw httpError(403, "Bu personelde toplu stok giriş/çıkış yetkisi kapalıdır.");
      }
    }
  }

  const values = definition.params.map((parameter) => (
    Object.prototype.hasOwnProperty.call(params, parameter) ? params[parameter] : null
  ));
  const result = await pool.query(definition.sql, values);
  res.json({ data: definition.returnsRows ? result.rows : result.rows[0]?.result });
}));

app.use((_req, res) => {
  res.status(404).json({ error: { message: "Endpoint bulunamadı." } });
});

app.use((error, _req, res, _next) => {
  const status = Number(error.status) || (
    error.type === "entity.too.large" ? 413 :
    error.code === "23505" ? 409 :
    error.code === "P0001" || error.code === "22P02" || error.code === "23502" || error.code === "23514" ? 400 : 500
  );
  if (status >= 500) {
    console.error(`[${crypto.randomUUID()}]`, error);
  }
  res.status(status).json({
    error: {
      message: status >= 500 ? "Sunucu işlemi tamamlayamadı." : error.message,
    },
  });
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Ekran1 API running on http://${HOST}:${PORT}`);
});

async function shutdown(signal) {
  console.log(`${signal} alındı, Ekran1 API kapatılıyor.`);
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
