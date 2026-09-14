(function createEkranApiAdapter(global) {
  "use strict";

  function errorResult(message) {
    return { data: null, error: { message: String(message || "Bilinmeyen API hatası") } };
  }

  function encodeHeader(value) {
    return encodeURIComponent(String(value || ""));
  }

  function encodePath(path) {
    return String(path || "")
      .split("/")
      .map((part) => encodeURIComponent(part))
      .join("/");
  }

  class ApiQueryBuilder {
    constructor(client, table) {
      this.client = client;
      this.table = table;
      this.action = null;
      this.payload = null;
      this.filters = {};
      this.offsetValue = 0;
      this.limitValue = null;
      this.singleValue = false;
      this.executionPromise = null;
    }

    select() {
      if (!this.action) this.action = "select";
      return this;
    }

    insert(payload) {
      this.action = "insert";
      this.payload = payload;
      return this;
    }

    upsert(payload) {
      this.action = "upsert";
      this.payload = payload;
      return this;
    }

    update(payload) {
      this.action = "update";
      this.payload = payload;
      return this;
    }

    delete() {
      this.action = "delete";
      return this;
    }

    eq(column, value) {
      this.filters[column] = value;
      return this;
    }

    order() {
      return this;
    }

    range(from, to) {
      this.offsetValue = Math.max(0, Number(from) || 0);
      this.limitValue = Math.max(0, (Number(to) || 0) - this.offsetValue + 1);
      return this;
    }

    limit(value) {
      this.limitValue = Math.max(0, Number(value) || 0);
      return this;
    }

    single() {
      this.singleValue = true;
      return this;
    }

    then(onFulfilled, onRejected) {
      if (!this.executionPromise) this.executionPromise = this.execute();
      return this.executionPromise.then(onFulfilled, onRejected);
    }

    async execute() {
      try {
        let result;
        if (this.table === "depo_items") result = await this.executeItems();
        else if (this.table === "depo_payments") result = await this.executePayments();
        else return errorResult(`Desteklenmeyen tablo: ${this.table}`);

        if (this.singleValue && Array.isArray(result.data)) {
          result.data = result.data[0] || null;
        }
        return result;
      } catch (error) {
        return errorResult(error.message);
      }
    }

    async executeItems() {
      const id = this.filters.id;
      switch (this.action || "select") {
        case "select": {
          const params = new URLSearchParams({
            offset: String(this.offsetValue),
            limit: String(this.limitValue ?? 1000),
          });
          return this.client.request(`/items?${params.toString()}`);
        }
        case "insert":
          return this.client.request("/items", { method: "POST", body: this.payload });
        case "upsert":
          return this.client.request("/items/upsert", { method: "POST", body: { rows: this.payload } });
        case "update":
          if (!id) return errorResult("Güncellenecek ürün ID'si bulunamadı.");
          return this.client.request(`/items/${encodeURIComponent(id)}`, { method: "PATCH", body: this.payload });
        case "delete":
          if (!id) return errorResult("Silinecek ürün ID'si bulunamadı.");
          return this.client.request(`/items/${encodeURIComponent(id)}`, { method: "DELETE" });
        default:
          return errorResult("Desteklenmeyen ürün işlemi.");
      }
    }

    async executePayments() {
      switch (this.action || "select") {
        case "select": {
          const params = new URLSearchParams({ limit: String(this.limitValue ?? 30) });
          return this.client.request(`/payments?${params.toString()}`);
        }
        case "insert":
          return this.client.request("/payments", { method: "POST", body: this.payload });
        default:
          return errorResult("Desteklenmeyen ödeme işlemi.");
      }
    }
  }

  class EkranApiClient {
    constructor(options) {
      this.apiBase = String(options.apiBase || "").replace(/\/+$/, "");
      this.mediaBase = String(options.mediaBase || "").replace(/\/+$/, "");
      this.getCredentials = typeof options.getCredentials === "function"
        ? options.getCredentials
        : () => ({});

      this.storage = {
        from: (bucket) => ({
          upload: (path, file) => this.upload(bucket, path, file),
          getPublicUrl: (path) => ({
            data: { publicUrl: `${this.mediaBase}/${encodePath(bucket)}/${encodePath(path)}` },
          }),
        }),
      };
    }

    from(table) {
      return new ApiQueryBuilder(this, table);
    }

    credentialHeaders() {
      const credentials = this.getCredentials() || {};
      return {
        "X-Personnel-Name": encodeHeader(credentials.personnelName),
        "X-Personnel-Pin": String(credentials.personnelPin || ""),
        "X-Device-Id": encodeHeader(credentials.deviceId),
        "X-Admin-Pin": String(credentials.adminPin || ""),
      };
    }

    async request(endpoint, options = {}) {
      try {
        const response = await fetch(`${this.apiBase}${endpoint}`, {
          method: options.method || "GET",
          headers: {
            ...this.credentialHeaders(),
            ...(options.body === undefined ? {} : { "Content-Type": "application/json" }),
          },
          body: options.body === undefined ? undefined : JSON.stringify(options.body),
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) return errorResult(payload?.error?.message || `API hatası (${response.status})`);
        return { data: payload.data ?? null, error: null };
      } catch (error) {
        return errorResult(`API bağlantısı kurulamadı: ${error.message}`);
      }
    }

    async rpc(name, params = {}) {
      return this.request(`/rpc/${encodeURIComponent(name)}`, { method: "POST", body: params });
    }

    async upload(bucket, relativePath, file) {
      if (bucket !== "depo-resimler") return errorResult("Desteklenmeyen medya kovası.");
      try {
        const query = new URLSearchParams({ path: relativePath });
        const response = await fetch(`${this.apiBase}/media/upload?${query.toString()}`, {
          method: "POST",
          headers: {
            ...this.credentialHeaders(),
            "Content-Type": file.type || "image/jpeg",
          },
          body: file,
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) return errorResult(payload?.error?.message || `Resim yükleme hatası (${response.status})`);
        return { data: payload.data ?? null, error: null };
      } catch (error) {
        return errorResult(`Resim yüklenemedi: ${error.message}`);
      }
    }
  }

  global.createEkranApiClient = function createEkranApiClient(options) {
    return new EkranApiClient(options || {});
  };
})(window);

