const APP_VERSION = "1.1.0";
const SUPABASE_URL = "https://djagwlauszawsodgccag.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqYWd3bGF1c3phd3NvZGdjY2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MTU5OTcsImV4cCI6MjA5OTA5MTk5N30.TR5A6svINoUesQ6rwnRi9MbAtdj2RSk2GbOWUV2WErA";

const THEMES = {
  midnight: "#111827",
  ocean: "#0f2740",
  forest: "#102c20",
  violet: "#2e1648",
  graphite: "#25282c",
  light: "#f8fafc"
};

let supabaseClient = null;
let allItems = [];
let selectedImageFile = null;
let selectedPreviewUrl = null;
let selectedEditImageFile = null;
let selectedEditPreviewUrl = null;
let editImageRemoved = false;
let toastTimer = null;

const $ = (id) => document.getElementById(id);

function escapeHtml(value){
  return String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[char]);
}

function normalize(value){
  return String(value ?? "").toLocaleLowerCase("tr-TR");
}

function findItem(id){
  return allItems.find(item => String(item.id) === String(id));
}

function itemTotal(item){
  if(item.product_type === "cerceve"){
    return Number(item.socket_quantity || 0) + Number(item.no_socket_quantity || 0);
  }
  return Number(item.quantity || 0);
}

function itemExtra(item){
  if(item.product_type === "cerceve"){
    return [item.vehicle_brand, item.vehicle_model, item.vehicle_year, item.screen_inch ? `${item.screen_inch}\"` : ""]
      .filter(Boolean)
      .join(" ");
  }
  return [item.media_brand, item.ram ? `RAM: ${item.ram}` : "", item.storage ? `Hafıza: ${item.storage}` : "", item.screen_inch ? `${item.screen_inch}\"` : ""]
    .filter(Boolean)
    .join(" • ");
}

function itemSearchText(item){
  return normalize([
    item.product_name,
    item.product_type,
    item.box_no,
    item.shelf_location,
    item.vehicle_brand,
    item.vehicle_model,
    item.vehicle_year,
    item.media_brand,
    item.ram,
    item.storage,
    item.screen_inch,
    item.note
  ].filter(Boolean).join(" "));
}

function toast(message){
  clearTimeout(toastTimer);
  $("toast").textContent = message;
  $("toast").classList.remove("hidden");
  toastTimer = setTimeout(() => $("toast").classList.add("hidden"), 3000);
}

function setButtonLoading(button, loading, loadingText = "Kaydediliyor..."){
  if(!button) return;
  if(loading){
    button.dataset.originalText = button.textContent;
    button.textContent = loadingText;
    button.disabled = true;
  }else{
    button.textContent = button.dataset.originalText || button.textContent;
    button.disabled = false;
  }
}

function applyTheme(themeName, persist = true){
  const theme = THEMES[themeName] ? themeName : "midnight";
  document.documentElement.dataset.theme = theme;
  if(persist) localStorage.setItem("koli_theme", theme);

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if(metaTheme) metaTheme.setAttribute("content", THEMES[theme]);

  document.querySelectorAll("[data-theme-choice]").forEach(button => {
    const active = button.dataset.themeChoice === theme;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function initSupabase(){
  const savedUrl = localStorage.getItem("koli_supabase_url") || "";
  const savedKey = localStorage.getItem("koli_supabase_key") || "";
  const url = savedUrl || SUPABASE_URL;
  const key = savedKey || SUPABASE_ANON_KEY;

  $("supabaseUrl").value = url;
  $("supabaseKey").value = key;

  if(url && key && window.supabase){
    supabaseClient = window.supabase.createClient(url, key);
    loadAll();
  }
}

function clearForm(){
  ["productName","boxNo","shelfLocation","quantity","socketQuantity","noSocketQuantity","vehicleBrand","vehicleModel","vehicleYear","screenInchFrame","mediaBrand","ram","storage","screenInchMedia","note"].forEach(id => {
    if($(id)) $(id).value = id === "quantity" ? 1 : "";
  });
  clearSelectedImage();
}

function stockBadges(item){
  if(item.product_type === "cerceve"){
    return `<span class="badge">Soketli: ${Number(item.socket_quantity || 0)}</span><span class="badge">Soketsiz: ${Number(item.no_socket_quantity || 0)}</span><span class="badge">Toplam: ${itemTotal(item)}</span>`;
  }
  return `<span class="badge">Stok: ${itemTotal(item)}</span>`;
}

function itemHtml(item){
  const id = escapeHtml(item.id);
  const name = escapeHtml(item.product_name || "İsimsiz Ürün");
  const typeLabel = item.product_type === "cerceve" ? "Çerçeve" : "Multimedya";
  const image = item.image_url ? `<img class="productImg" src="${escapeHtml(item.image_url)}" alt="${name}" loading="lazy" tabindex="0" role="button" data-action="view-image" data-image-url="${escapeHtml(item.image_url)}" />` : "";

  return `
    <div class="item">
      ${image}
      <div class="itemHead">
        <div><h3>${name}</h3><p class="muted">${escapeHtml(itemExtra(item))}</p></div>
        <b>${itemTotal(item)} adet</b>
      </div>
      <div style="margin-top:8px">
        <span class="badge">${typeLabel}</span>
        <span class="badge">Koli: ${escapeHtml(item.box_no || "-")}</span>
        <span class="badge">Raf: ${escapeHtml(item.shelf_location || "-")}</span>
        ${stockBadges(item)}
      </div>
      ${item.note ? `<p style="margin-top:8px">${escapeHtml(item.note)}</p>` : ""}
      <div class="stockActions">
        <button type="button" class="stockIn" data-action="stock-in" data-id="${id}">+ Stok Girişi</button>
        <button type="button" class="stockOut" data-action="stock-out" data-id="${id}">− Stok Çıkışı</button>
        <button type="button" data-action="edit" data-id="${id}">Düzenle</button>
      </div>
    </div>`;
}

function operationItemHtml(item){
  const id = escapeHtml(item.id);
  return `
    <div class="item">
      <div class="itemHead">
        <div><h3>${escapeHtml(item.product_name || "İsimsiz Ürün")}</h3><p class="muted">${escapeHtml(itemExtra(item))}</p></div>
        <b>${itemTotal(item)} adet</b>
      </div>
      <div style="margin-top:8px">
        <span class="badge">Koli: ${escapeHtml(item.box_no || "-")}</span>
        <span class="badge">Raf: ${escapeHtml(item.shelf_location || "-")}</span>
        ${stockBadges(item)}
      </div>
      <div class="stockActions">
        <button type="button" class="stockIn" data-action="stock-in" data-id="${id}">+ Stok Girişi</button>
        <button type="button" class="stockOut" data-action="stock-out" data-id="${id}">− Stok Çıkışı</button>
      </div>
    </div>`;
}

async function loadAll(){
  if(!supabaseClient) return;
  const { data, error } = await supabaseClient
    .from("depo_items")
    .select("*")
    .order("created_at", { ascending:false });

  if(error){
    toast("Stok çekilemedi: " + error.message);
    return;
  }

  allItems = data || [];
  renderList(allItems);
  renderOperationList();
  renderStats();
  renderBoxes();
  loadPayments();
}

function renderStats(){
  $("statTotal").textContent = allItems.reduce((total, item) => total + itemTotal(item), 0);
  $("statBoxes").textContent = new Set(allItems.map(item => item.box_no).filter(Boolean)).size;
  $("statFrame").textContent = allItems.filter(item => item.product_type === "cerceve").reduce((total, item) => total + itemTotal(item), 0);
  $("statMedia").textContent = allItems.filter(item => item.product_type === "multimedya").reduce((total, item) => total + itemTotal(item), 0);
}

function renderList(list){
  $("stockList").innerHTML = list.length ? list.map(itemHtml).join("") : `<p class="muted">Kayıt bulunamadı.</p>`;
}

function renderOperationList(){
  const query = normalize($("operationSearch").value.trim());
  const type = $("operationTypeFilter").value;
  const filtered = allItems.filter(item => {
    const typeMatches = type === "tum" || item.product_type === type;
    const queryMatches = !query || itemSearchText(item).includes(query);
    return typeMatches && queryMatches;
  });

  $("operationList").innerHTML = filtered.length ? filtered.map(operationItemHtml).join("") : `<p class="muted">Bu aramaya uygun ürün bulunamadı.</p>`;
}

function renderBoxes(filterBox = ""){
  const groups = {};
  allItems.forEach(item => {
    const box = item.box_no || "Kolisiz";
    if(filterBox && normalize(box) !== normalize(filterBox)) return;
    groups[box] ??= [];
    groups[box].push(item);
  });

  const html = Object.entries(groups).map(([box, items]) => `
    <div class="item">
      <div class="itemHead"><h3>📦 ${escapeHtml(box)}</h3><b>${items.reduce((total, item) => total + itemTotal(item), 0)} adet</b></div>
      <p class="muted">${items.map(item => escapeHtml(item.product_name)).filter(Boolean).join(", ")}</p>
      <div style="margin-top:8px">${items.map(item => `<span class="badge">${escapeHtml(item.product_name || "İsimsiz Ürün")} (${itemTotal(item)})</span>`).join("")}</div>
    </div>`).join("");

  $("boxList").innerHTML = html || `<p class="muted">Koli bulunamadı.</p>`;
}

function setSelectedImage(file){
  if(!file) return;
  selectedImageFile = file;
  if(selectedPreviewUrl) URL.revokeObjectURL(selectedPreviewUrl);
  selectedPreviewUrl = URL.createObjectURL(file);
  $("imagePreview").src = selectedPreviewUrl;
  $("imagePreviewWrap").classList.remove("hidden");
}

function clearSelectedImage(){
  selectedImageFile = null;
  if(selectedPreviewUrl){
    URL.revokeObjectURL(selectedPreviewUrl);
    selectedPreviewUrl = null;
  }
  $("imagePreview").src = "";
  $("imagePreviewWrap").classList.add("hidden");
  $("productImageCamera").value = "";
  $("productImageGallery").value = "";
}

function setEditSelectedImage(file){
  if(!file) return;
  selectedEditImageFile = file;
  editImageRemoved = false;
  if(selectedEditPreviewUrl) URL.revokeObjectURL(selectedEditPreviewUrl);
  selectedEditPreviewUrl = URL.createObjectURL(file);
  $("editImagePreview").src = selectedEditPreviewUrl;
  $("editImagePreviewWrap").classList.remove("hidden");
}

function clearEditImageState(){
  selectedEditImageFile = null;
  editImageRemoved = false;
  if(selectedEditPreviewUrl){
    URL.revokeObjectURL(selectedEditPreviewUrl);
    selectedEditPreviewUrl = null;
  }
  $("editImagePreview").src = "";
  $("editImagePreviewWrap").classList.add("hidden");
  $("editProductImageCamera").value = "";
  $("editProductImageGallery").value = "";
}

function removeEditImage(){
  selectedEditImageFile = null;
  editImageRemoved = true;
  if(selectedEditPreviewUrl){
    URL.revokeObjectURL(selectedEditPreviewUrl);
    selectedEditPreviewUrl = null;
  }
  $("editImagePreview").src = "";
  $("editImagePreviewWrap").classList.add("hidden");
  $("editProductImageCamera").value = "";
  $("editProductImageGallery").value = "";
  toast("Resim, değişiklikleri kaydettiğinde kaldırılacak.");
}

async function loadImageSource(file){
  if("createImageBitmap" in window){
    const bitmap = await createImageBitmap(file);
    return { source:bitmap, width:bitmap.width, height:bitmap.height, release:() => bitmap.close?.() };
  }

  const objectUrl = URL.createObjectURL(file);
  const image = new Image();
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = () => reject(new Error("Resim açılamadı."));
    image.src = objectUrl;
  });
  return { source:image, width:image.naturalWidth, height:image.naturalHeight, release:() => URL.revokeObjectURL(objectUrl) };
}

async function compressImage(file, maxSize = 1600, quality = 0.78){
  const decoded = await loadImageSource(file);
  let width = decoded.width;
  let height = decoded.height;

  if(width > height && width > maxSize){
    height = Math.round(height * (maxSize / width));
    width = maxSize;
  }else if(height >= width && height > maxSize){
    width = Math.round(width * (maxSize / height));
    height = maxSize;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(decoded.source, 0, 0, width, height);
  decoded.release();

  const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/webp", quality));
  if(!blob) return file;

  const extension = blob.type === "image/webp" ? "webp" : "jpg";
  return new File([blob], `urun-${Date.now()}.${extension}`, { type:blob.type || "image/jpeg" });
}

async function uploadProductImage(file){
  if(!file) return null;
  const compressedFile = await compressImage(file);
  const extension = compressedFile.name.split(".").pop() || "webp";
  const path = `urunler/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
  const { error:uploadError } = await supabaseClient.storage
    .from("depo-resimler")
    .upload(path, compressedFile, {
      cacheControl:"3600",
      upsert:false,
      contentType:compressedFile.type
    });

  if(uploadError) throw new Error("Resim yüklenemedi: " + uploadError.message);
  const { data } = supabaseClient.storage.from("depo-resimler").getPublicUrl(path);
  return data.publicUrl;
}

async function saveItem(){
  if(!supabaseClient){
    toast("Önce Supabase ayarlarını gir knk.");
    return;
  }

  const type = $("productType").value;
  const row = {
    product_type:type,
    product_name:$("productName").value.trim(),
    box_no:$("boxNo").value.trim().toLocaleUpperCase("tr-TR"),
    shelf_location:$("shelfLocation").value.trim(),
    quantity:type === "cerceve" ? Number($("socketQuantity").value || 0) + Number($("noSocketQuantity").value || 0) : Number($("quantity").value || 0),
    socket_quantity:type === "cerceve" ? Number($("socketQuantity").value || 0) : 0,
    no_socket_quantity:type === "cerceve" ? Number($("noSocketQuantity").value || 0) : 0,
    vehicle_brand:type === "cerceve" ? $("vehicleBrand").value.trim() : null,
    vehicle_model:type === "cerceve" ? $("vehicleModel").value.trim() : null,
    vehicle_year:type === "cerceve" ? $("vehicleYear").value.trim() : null,
    socket_included:type === "cerceve" ? $("socketIncluded").value : null,
    media_brand:type === "multimedya" ? $("mediaBrand").value.trim() : null,
    ram:type === "multimedya" ? $("ram").value.trim() : null,
    storage:type === "multimedya" ? $("storage").value.trim() : null,
    screen_inch:type === "cerceve" ? $("screenInchFrame").value.trim() : $("screenInchMedia").value.trim(),
    image_url:null,
    note:$("note").value.trim()
  };

  if(!row.product_name || !row.box_no){
    toast("Ürün adı ve koli no şart knk.");
    return;
  }

  const saveButton = $("btnSave");
  setButtonLoading(saveButton, true);
  try{
    row.image_url = await uploadProductImage(selectedImageFile);
    const { error } = await supabaseClient.from("depo_items").insert(row);
    if(error) throw new Error("Kaydedilemedi: " + error.message);
    toast("Stok kaydedildi.");
    clearForm();
    await loadAll();
  }catch(error){
    toast(error.message);
  }finally{
    setButtonLoading(saveButton, false);
  }
}

async function savePayment(){
  if(!supabaseClient){
    toast("Önce Supabase ayarlarını gir knk.");
    return;
  }
  const row = {
    payer_name:$("payerName").value.trim(),
    amount:Number($("paymentAmount").value || 0),
    payment_type:$("paymentType").value,
    note:$("paymentNote").value.trim()
  };
  if(!row.payer_name || !row.amount){
    toast("Firma/kişi ve tutar gir knk.");
    return;
  }
  const { error } = await supabaseClient.from("depo_payments").insert(row);
  if(error){
    toast("Ödeme kaydedilemedi: " + error.message);
    return;
  }
  $("payerName").value = "";
  $("paymentAmount").value = "";
  $("paymentNote").value = "";
  toast("Ödeme kaydedildi.");
  loadPayments();
}

async function loadPayments(){
  if(!supabaseClient) return;
  const { data, error } = await supabaseClient.from("depo_payments").select("*").order("created_at", { ascending:false }).limit(30);
  if(error) return;
  $("paymentList").innerHTML = (data || []).map(payment => `
    <div class="item">
      <div class="itemHead"><h3>${escapeHtml(payment.payer_name)}</h3><b>${Number(payment.amount).toLocaleString("tr-TR")} ₺</b></div>
      <span class="badge">${payment.payment_type === "giris" ? "Giriş" : "Çıkış"}</span>
      ${payment.note ? `<p class="muted">${escapeHtml(payment.note)}</p>` : ""}
    </div>`).join("") || `<p class="muted">Ödeme kaydı yok.</p>`;
}

function switchTab(tabName){
  document.querySelectorAll(".tab").forEach(button => button.classList.toggle("active", button.dataset.tab === tabName));
  document.querySelectorAll(".panel").forEach(panel => panel.classList.toggle("active", panel.id === `tab-${tabName}`));
}

function doSearch(){
  const query = normalize($("searchInput").value.trim());
  const list = query ? allItems.filter(item => itemSearchText(item).includes(query)) : allItems;
  switchTab("liste");
  renderList(list);
}

function openEditModal(id){
  const item = findItem(id);
  if(!item) return;

  clearEditImageState();
  $("editId").value = item.id;
  $("editProductName").value = item.product_name || "";
  $("editBoxNo").value = item.box_no || "";
  $("editShelfLocation").value = item.shelf_location || "";
  $("editNote").value = item.note || "";

  const isFrame = item.product_type === "cerceve";
  $("editFrameStock").classList.toggle("hidden", !isFrame);
  $("editGeneralStock").classList.toggle("hidden", isFrame);
  $("editSocketQuantity").value = Number(item.socket_quantity || 0);
  $("editNoSocketQuantity").value = Number(item.no_socket_quantity || 0);
  $("editQuantity").value = Number(item.quantity || 0);

  if(item.image_url){
    $("editImagePreview").src = item.image_url;
    $("editImagePreviewWrap").classList.remove("hidden");
  }
  $("editModal").classList.remove("hidden");
}

function closeEditModal(){
  $("editModal").classList.add("hidden");
  clearEditImageState();
}

async function saveEdit(){
  const id = $("editId").value;
  const item = findItem(id);
  if(!item) return;

  const updates = {
    product_name:$("editProductName").value.trim(),
    box_no:$("editBoxNo").value.trim().toLocaleUpperCase("tr-TR"),
    shelf_location:$("editShelfLocation").value.trim(),
    note:$("editNote").value.trim()
  };

  if(!updates.product_name || !updates.box_no){
    toast("Ürün adı ve koli no boş bırakılamaz.");
    return;
  }

  if(item.product_type === "cerceve"){
    const socketQuantity = Number($("editSocketQuantity").value || 0);
    const noSocketQuantity = Number($("editNoSocketQuantity").value || 0);
    if(socketQuantity < 0 || noSocketQuantity < 0){
      toast("Stok miktarı eksi olamaz.");
      return;
    }
    updates.socket_quantity = socketQuantity;
    updates.no_socket_quantity = noSocketQuantity;
    updates.quantity = socketQuantity + noSocketQuantity;
  }else{
    const quantity = Number($("editQuantity").value || 0);
    if(quantity < 0){
      toast("Stok miktarı eksi olamaz.");
      return;
    }
    updates.quantity = quantity;
  }

  const saveButton = $("btnSaveEdit");
  setButtonLoading(saveButton, true);
  try{
    if(selectedEditImageFile){
      updates.image_url = await uploadProductImage(selectedEditImageFile);
    }else if(editImageRemoved){
      updates.image_url = null;
    }

    const { error } = await supabaseClient.from("depo_items").update(updates).eq("id", item.id);
    if(error) throw new Error("Düzenleme kaydedilemedi: " + error.message);
    closeEditModal();
    toast("Ürün ve resim bilgileri güncellendi.");
    await loadAll();
  }catch(error){
    toast(error.message);
  }finally{
    setButtonLoading(saveButton, false);
  }
}

async function deleteItem(){
  const item = findItem($("editId").value);
  if(!item || !confirm(`"${item.product_name}" tamamen silinsin mi?`)) return;
  const { error } = await supabaseClient.from("depo_items").delete().eq("id", item.id);
  if(error){
    toast("Ürün silinemedi: " + error.message);
    return;
  }
  closeEditModal();
  toast("Ürün silindi.");
  loadAll();
}

function operationStockHtml(item){
  if(item.product_type === "cerceve"){
    return `<span class="badge">Soketli: ${Number(item.socket_quantity || 0)}</span><span class="badge">Soketsiz: ${Number(item.no_socket_quantity || 0)}</span><span class="badge">Toplam: ${itemTotal(item)}</span>`;
  }
  return `<span class="badge">Mevcut stok: ${itemTotal(item)}</span>`;
}

function openOperationModal(id, direction){
  const item = findItem(id);
  if(!item) return;

  const isStockIn = direction > 0;
  $("operationItemId").value = item.id;
  $("operationDirection").value = isStockIn ? "1" : "-1";
  $("operationTitle").textContent = isStockIn ? "Stok Girişi" : "Stok Çıkışı";
  $("operationProductInfo").textContent = `${item.product_name || "İsimsiz Ürün"} • Koli: ${item.box_no || "-"} • Raf: ${item.shelf_location || "-"}`;
  $("operationCurrentStock").innerHTML = operationStockHtml(item);
  $("operationFrameTypeWrap").classList.toggle("hidden", item.product_type !== "cerceve");
  $("operationFrameType").value = "socket_quantity";
  $("operationAmount").value = 1;

  const confirmButton = $("btnConfirmOperation");
  confirmButton.textContent = isStockIn ? "Stok Girişini Kaydet" : "Stok Çıkışını Kaydet";
  confirmButton.className = isStockIn ? "stockIn" : "stockOut";
  $("operationModal").classList.remove("hidden");
  setTimeout(() => $("operationAmount").focus(), 50);
}

function closeOperationModal(){
  $("operationModal").classList.add("hidden");
}

async function confirmStockOperation(){
  if(!supabaseClient){
    toast("Supabase bağlantısı bulunamadı.");
    return;
  }

  const item = findItem($("operationItemId").value);
  const direction = Number($("operationDirection").value);
  const amount = Number($("operationAmount").value);
  if(!item || ![1, -1].includes(direction)) return;
  if(!Number.isInteger(amount) || amount <= 0){
    toast("Adet kısmına 1 veya daha büyük tam sayı gir.");
    return;
  }

  const updates = {};
  if(item.product_type === "cerceve"){
    const field = $("operationFrameType").value;
    const current = Number(item[field] || 0);
    const next = current + (direction * amount);
    if(next < 0){
      toast(`Yeterli stok yok. Seçilen türde mevcut stok: ${current}`);
      return;
    }
    updates[field] = next;
    const otherField = field === "socket_quantity" ? "no_socket_quantity" : "socket_quantity";
    updates.quantity = next + Number(item[otherField] || 0);
  }else{
    const current = Number(item.quantity || 0);
    const next = current + (direction * amount);
    if(next < 0){
      toast(`Yeterli stok yok. Mevcut stok: ${current}`);
      return;
    }
    updates.quantity = next;
  }

  const confirmButton = $("btnConfirmOperation");
  setButtonLoading(confirmButton, true, "İşleniyor...");
  try{
    const { error } = await supabaseClient.from("depo_items").update(updates).eq("id", item.id);
    if(error) throw new Error("Stok güncellenemedi: " + error.message);
    closeOperationModal();
    toast(direction > 0 ? `${amount} adet stok girişi yapıldı.` : `${amount} adet stok çıkışı yapıldı.`);
    await loadAll();
  }catch(error){
    toast(error.message);
  }finally{
    setButtonLoading(confirmButton, false);
  }
}

function openImageModal(url){
  if(!url) return;
  $("modalImage").src = url;
  $("imageModal").classList.remove("hidden");
}

function closeImageModal(){
  $("imageModal").classList.add("hidden");
  $("modalImage").src = "";
}

function handleDataAction(target){
  const actionElement = target.closest("[data-action]");
  if(!actionElement) return;
  const action = actionElement.dataset.action;
  if(action === "stock-in") openOperationModal(actionElement.dataset.id, 1);
  if(action === "stock-out") openOperationModal(actionElement.dataset.id, -1);
  if(action === "edit") openEditModal(actionElement.dataset.id);
  if(action === "view-image") openImageModal(actionElement.dataset.imageUrl);
}

function setupEvents(){
  document.querySelectorAll(".tab").forEach(button => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });

  const syncTypeFields = () => {
    const isFrame = $("productType").value === "cerceve";
    $("frameFields").classList.toggle("hidden", !isFrame);
    $("mediaFields").classList.toggle("hidden", isFrame);
    $("frameStockWrap").classList.toggle("hidden", !isFrame);
    $("generalQuantityWrap").classList.toggle("hidden", isFrame);
  };
  $("productType").addEventListener("change", syncTypeFields);
  syncTypeFields();

  $("btnCamera").addEventListener("click", () => $("productImageCamera").click());
  $("btnGallery").addEventListener("click", () => $("productImageGallery").click());
  $("productImageCamera").addEventListener("change", event => setSelectedImage(event.target.files[0]));
  $("productImageGallery").addEventListener("change", event => setSelectedImage(event.target.files[0]));
  $("btnRemoveImage").addEventListener("click", clearSelectedImage);

  $("btnEditCamera").addEventListener("click", () => $("editProductImageCamera").click());
  $("btnEditGallery").addEventListener("click", () => $("editProductImageGallery").click());
  $("editProductImageCamera").addEventListener("change", event => setEditSelectedImage(event.target.files[0]));
  $("editProductImageGallery").addEventListener("change", event => setEditSelectedImage(event.target.files[0]));
  $("btnRemoveEditImage").addEventListener("click", removeEditImage);

  $("btnCloseImageModal").addEventListener("click", closeImageModal);
  $("imageModal").addEventListener("click", event => { if(event.target.id === "imageModal") closeImageModal(); });
  $("btnCloseEdit").addEventListener("click", closeEditModal);
  $("btnSaveEdit").addEventListener("click", saveEdit);
  $("btnDeleteItem").addEventListener("click", deleteItem);
  $("editModal").addEventListener("click", event => { if(event.target.id === "editModal") closeEditModal(); });

  $("btnCloseOperation").addEventListener("click", closeOperationModal);
  $("btnCancelOperation").addEventListener("click", closeOperationModal);
  $("btnConfirmOperation").addEventListener("click", confirmStockOperation);
  $("operationAmount").addEventListener("keydown", event => { if(event.key === "Enter") confirmStockOperation(); });
  $("operationModal").addEventListener("click", event => { if(event.target.id === "operationModal") closeOperationModal(); });

  $("btnSave").addEventListener("click", saveItem);
  $("btnClear").addEventListener("click", clearForm);
  $("btnSearch").addEventListener("click", doSearch);
  $("searchInput").addEventListener("keydown", event => { if(event.key === "Enter") doSearch(); });
  $("operationSearch").addEventListener("input", renderOperationList);
  $("operationTypeFilter").addEventListener("change", renderOperationList);
  $("btnBoxSearch").addEventListener("click", () => renderBoxes($("boxSearch").value.trim()));
  $("boxSearch").addEventListener("keydown", event => { if(event.key === "Enter") renderBoxes($("boxSearch").value.trim()); });
  $("btnPayment").addEventListener("click", savePayment);

  document.querySelectorAll("[data-theme-choice]").forEach(button => {
    button.addEventListener("click", () => {
      applyTheme(button.dataset.themeChoice);
      toast("Tema kaydedildi.");
    });
  });

  $("btnConfig").addEventListener("click", () => {
    localStorage.setItem("koli_supabase_url", $("supabaseUrl").value.trim());
    localStorage.setItem("koli_supabase_key", $("supabaseKey").value.trim());
    toast("Bağlantı ayarları kaydedildi.");
    initSupabase();
  });

  document.addEventListener("click", event => handleDataAction(event.target));
  document.addEventListener("keydown", event => {
    if((event.key === "Enter" || event.key === " ") && event.target.matches('[data-action="view-image"]')){
      event.preventDefault();
      handleDataAction(event.target);
    }
    if(event.key === "Escape"){
      if(!$("operationModal").classList.contains("hidden")) closeOperationModal();
      else if(!$("editModal").classList.contains("hidden")) closeEditModal();
      else if(!$("imageModal").classList.contains("hidden")) closeImageModal();
    }
  });

  $("updateBtn").addEventListener("click", async () => {
    if("caches" in window){
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
    }
    localStorage.setItem("last_seen_version", APP_VERSION);
    location.reload();
  });
}

function checkUpdateButton(){
  const seen = localStorage.getItem("last_seen_version");
  if(seen !== APP_VERSION) $("updateBtn").classList.remove("hidden");
}

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

applyTheme(localStorage.getItem("koli_theme") || "midnight", false);
setupEvents();
initSupabase();
checkUpdateButton();
