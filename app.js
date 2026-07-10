const APP_VERSION = "1.0.4";
const SUPABASE_URL = "https://djagwlauszawsodgccag.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqYWd3bGF1c3phd3NvZGdjY2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MTU5OTcsImV4cCI6MjA5OTA5MTk5N30.TR5A6svINoUesQ6rwnRi9MbAtdj2RSk2GbOWUV2WErA";

let supabaseClient = null;
let allItems = [];
let selectedImageFile = null;
let selectedPreviewUrl = null;

const $ = (id) => document.getElementById(id);

function toast(msg){
  $("toast").textContent = msg;
  $("toast").classList.remove("hidden");
  setTimeout(() => $("toast").classList.add("hidden"), 2600);
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

function itemHtml(item){
  const typeLabel = item.product_type === "cerceve" ? "Çerçeve" : "Multimedya";
  const socketQty = Number(item.socket_quantity || 0);
  const noSocketQty = Number(item.no_socket_quantity || 0);
  const totalQty = item.product_type === "cerceve" ? socketQty + noSocketQty : Number(item.quantity || 0);
  const extra = item.product_type === "cerceve" ? `${item.vehicle_brand || ""} ${item.vehicle_model || ""} ${item.vehicle_year || ""} • ${item.screen_inch || ""}"` : `${item.media_brand || ""} • RAM: ${item.ram || "-"} • Hafıza: ${item.storage || "-"} • ${item.screen_inch || ""}"`;
  const stockBadges = item.product_type === "cerceve" ? `<span class="badge">Soketli: ${socketQty}</span><span class="badge">Soketsiz: ${noSocketQty}</span><span class="badge">Toplam: ${totalQty}</span>` : `<span class="badge">Stok: ${totalQty}</span>`;
  return `<div class="item">${item.image_url ? `<img class="productImg" src="${item.image_url}" alt="${item.product_name || "Ürün resmi"}" loading="lazy" onclick="openImageModal('${item.image_url}')" />` : ""}<div class="itemHead"><div><h3>${item.product_name || "İsimsiz Ürün"}</h3><p class="muted">${extra}</p></div><b>${totalQty} adet</b></div><div style="margin-top:8px"><span class="badge">${typeLabel}</span><span class="badge">Koli: ${item.box_no || "-"}</span><span class="badge">Raf: ${item.shelf_location || "-"}</span>${stockBadges}</div>${item.note ? `<p style="margin-top:8px">${item.note}</p>` : ""}<div class="stockActions"><button type="button" onclick="adjustStock('${item.id}',1)">+ Stok Ekle</button><button type="button" onclick="adjustStock('${item.id}',-1)">− Stok Çıkar</button><button type="button" onclick="openEditModal('${item.id}')">Düzenle</button></div></div>`;
}

async function loadAll(){
  if(!supabaseClient) return;
  const { data, error } = await supabaseClient
    .from("depo_items")
    .select("*")
    .order("created_at", { ascending:false });

  if(error){ toast("Stok çekilemedi: " + error.message); return; }
  allItems = data || [];
  renderList(allItems);
  renderStats();
  renderBoxes();
  loadPayments();
}

function renderStats(){
  const itemTotal = item => item.product_type === "cerceve" ? Number(item.socket_quantity||0)+Number(item.no_socket_quantity||0) : Number(item.quantity||0);
  $("statTotal").textContent = allItems.reduce((a,b)=>a+itemTotal(b),0);
  $("statBoxes").textContent = new Set(allItems.map(x=>x.box_no).filter(Boolean)).size;
  $("statFrame").textContent = allItems.filter(x=>x.product_type==="cerceve").reduce((a,b)=>a+itemTotal(b),0);
  $("statMedia").textContent = allItems.filter(x=>x.product_type==="multimedya").reduce((a,b)=>a+itemTotal(b),0);
}

function renderList(list){
  $("stockList").innerHTML = list.length ? list.map(itemHtml).join("") : `<p class="muted">Kayıt bulunamadı.</p>`;
}

function renderBoxes(filterBox = ""){
  const groups = {};
  allItems.forEach(item => {
    const box = item.box_no || "Kolisiz";
    if(filterBox && box.toLowerCase() !== filterBox.toLowerCase()) return;
    groups[box] ??= [];
    groups[box].push(item);
  });

  const html = Object.entries(groups).map(([box, items]) => `
    <div class="item">
      <div class="itemHead">
        <h3>📦 ${box}</h3>
        <b>${items.reduce((a,b)=>a+Number(b.quantity||0),0)} adet</b>
      </div>
      <p class="muted">${items.map(i=>i.product_name).filter(Boolean).join(", ")}</p>
      <div style="margin-top:8px">${items.map(i=>`<span class="badge">${i.product_name} (${i.quantity})</span>`).join("")}</div>
    </div>
  `).join("");

  $("boxList").innerHTML = html || `<p class="muted">Koli bulunamadı.</p>`;
}



function setSelectedImage(file){
  if(!file) return;

  selectedImageFile = file;

  if(selectedPreviewUrl){
    URL.revokeObjectURL(selectedPreviewUrl);
  }

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

  if($("imagePreview")) $("imagePreview").src = "";
  if($("imagePreviewWrap")) $("imagePreviewWrap").classList.add("hidden");
  if($("productImageCamera")) $("productImageCamera").value = "";
  if($("productImageGallery")) $("productImageGallery").value = "";
}

async function compressImage(file, maxSize = 1600, quality = 0.78){
  const bitmap = await createImageBitmap(file);

  let width = bitmap.width;
  let height = bitmap.height;

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

  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, width, height);

  return await new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if(!blob){
        resolve(file);
        return;
      }

      const compressed = new File(
        [blob],
        `urun-${Date.now()}.webp`,
        { type: "image/webp" }
      );

      resolve(compressed);
    }, "image/webp", quality);
  });
}

async function uploadProductImage(){
  if(!selectedImageFile) return null;

  const compressedFile = await compressImage(selectedImageFile);
  const path = `urunler/${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;

  const { error: uploadError } = await supabaseClient.storage
    .from("depo-resimler")
    .upload(path, compressedFile, {
      cacheControl: "3600",
      upsert: false,
      contentType: "image/webp"
    });

  if(uploadError){
    throw new Error("Resim yüklenemedi: " + uploadError.message);
  }

  const { data } = supabaseClient.storage
    .from("depo-resimler")
    .getPublicUrl(path);

  return data.publicUrl;
}


async function saveItem(){
  if(!supabaseClient){ toast("Önce Supabase ayarlarını gir knk."); return; }
  const type = $("productType").value;

  let imageUrl = null;
  try{
    imageUrl = await uploadProductImage();
  }catch(err){
    toast(err.message);
    return;
  }

  const row = {
    product_type: type,
    product_name: $("productName").value.trim(),
    box_no: $("boxNo").value.trim().toUpperCase(),
    shelf_location: $("shelfLocation").value.trim(),
    quantity: type === "cerceve" ? Number($("socketQuantity").value||0)+Number($("noSocketQuantity").value||0) : Number($("quantity").value||0),
    socket_quantity: type === "cerceve" ? Number($("socketQuantity").value||0) : 0,
    no_socket_quantity: type === "cerceve" ? Number($("noSocketQuantity").value||0) : 0,
    vehicle_brand: type === "cerceve" ? $("vehicleBrand").value.trim() : null,
    vehicle_model: type === "cerceve" ? $("vehicleModel").value.trim() : null,
    vehicle_year: type === "cerceve" ? $("vehicleYear").value.trim() : null,
    socket_included: type === "cerceve" ? $("socketIncluded").value : null,
    media_brand: type === "multimedya" ? $("mediaBrand").value.trim() : null,
    ram: type === "multimedya" ? $("ram").value.trim() : null,
    storage: type === "multimedya" ? $("storage").value.trim() : null,
    screen_inch: type === "cerceve" ? $("screenInchFrame").value.trim() : $("screenInchMedia").value.trim(),
    image_url: imageUrl,
    note: $("note").value.trim()
  };

  if(!row.product_name || !row.box_no){ toast("Ürün adı ve koli no şart knk."); return; }

  const { error } = await supabaseClient.from("depo_items").insert(row);
  if(error){ toast("Kaydedilemedi: " + error.message); return; }
  toast("Stok kaydedildi.");
  clearForm();
  loadAll();
}

async function savePayment(){
  if(!supabaseClient){ toast("Önce Supabase ayarlarını gir knk."); return; }
  const row = {
    payer_name: $("payerName").value.trim(),
    amount: Number($("paymentAmount").value || 0),
    payment_type: $("paymentType").value,
    note: $("paymentNote").value.trim()
  };
  if(!row.payer_name || !row.amount){ toast("Firma/kişi ve tutar gir knk."); return; }
  const { error } = await supabaseClient.from("depo_payments").insert(row);
  if(error){ toast("Ödeme kaydedilemedi: " + error.message); return; }
  $("payerName").value = $("paymentAmount").value = $("paymentNote").value = "";
  toast("Ödeme kaydedildi.");
  loadPayments();
}

async function loadPayments(){
  if(!supabaseClient) return;
  const { data, error } = await supabaseClient.from("depo_payments").select("*").order("created_at",{ascending:false}).limit(30);
  if(error) return;
  $("paymentList").innerHTML = (data || []).map(p => `
    <div class="item">
      <div class="itemHead"><h3>${p.payer_name}</h3><b>${Number(p.amount).toLocaleString("tr-TR")} ₺</b></div>
      <span class="badge">${p.payment_type === "giris" ? "Giriş" : "Çıkış"}</span>
      ${p.note ? `<p class="muted">${p.note}</p>` : ""}
    </div>
  `).join("") || `<p class="muted">Ödeme kaydı yok.</p>`;
}

function doSearch(){
  const q = $("searchInput").value.trim().toLowerCase();
  if(!q){ renderList(allItems); return; }
  const list = allItems.filter(i => JSON.stringify(i).toLowerCase().includes(q));
  document.querySelector(`[data-tab="liste"]`).click();
  renderList(list);
}


async function adjustStock(id,direction){
  const item=allItems.find(x=>x.id===id); if(!item)return;
  const amount=Number(prompt(direction>0?"Kaç adet eklensin?":"Kaç adet çıkarılsın?")); if(!Number.isFinite(amount)||amount<=0)return;
  let updates={};
  if(item.product_type==="cerceve"){
    const t=prompt("Hangi stok?\n1 = Soketli\n2 = Soketsiz"); if(t!=="1"&&t!=="2")return;
    const field=t==="1"?"socket_quantity":"no_socket_quantity";
    const current=Number(item[field]||0); const next=direction>0?current+amount:Math.max(0,current-amount);
    updates[field]=next; updates.quantity=(field==="socket_quantity"?next+Number(item.no_socket_quantity||0):Number(item.socket_quantity||0)+next);
  }else{
    const current=Number(item.quantity||0); updates.quantity=direction>0?current+amount:Math.max(0,current-amount);
  }
  const {error}=await supabaseClient.from("depo_items").update(updates).eq("id",id); if(error){toast("Stok güncellenemedi: "+error.message);return;}
  toast(direction>0?"Stok eklendi.":"Stok çıkarıldı."); loadAll();
}
function openEditModal(id){
  const item=allItems.find(x=>x.id===id); if(!item)return;
  $("editId").value=item.id; $("editProductName").value=item.product_name||""; $("editBoxNo").value=item.box_no||""; $("editShelfLocation").value=item.shelf_location||""; $("editNote").value=item.note||"";
  const isFrame=item.product_type==="cerceve"; $("editFrameStock").classList.toggle("hidden",!isFrame); $("editGeneralStock").classList.toggle("hidden",isFrame);
  $("editSocketQuantity").value=Number(item.socket_quantity||0); $("editNoSocketQuantity").value=Number(item.no_socket_quantity||0); $("editQuantity").value=Number(item.quantity||0); $("editModal").classList.remove("hidden");
}
function closeEditModal(){ $("editModal").classList.add("hidden"); }
async function saveEdit(){
 const id=$("editId").value,item=allItems.find(x=>x.id===id); if(!item)return;
 const updates={product_name:$("editProductName").value.trim(),box_no:$("editBoxNo").value.trim().toUpperCase(),shelf_location:$("editShelfLocation").value.trim(),note:$("editNote").value.trim()};
 if(item.product_type==="cerceve"){const s=Number($("editSocketQuantity").value||0),n=Number($("editNoSocketQuantity").value||0);updates.socket_quantity=s;updates.no_socket_quantity=n;updates.quantity=s+n;}else updates.quantity=Number($("editQuantity").value||0);
 const {error}=await supabaseClient.from("depo_items").update(updates).eq("id",id); if(error){toast("Düzenleme kaydedilemedi: "+error.message);return;} closeEditModal();toast("Ürün güncellendi.");loadAll();
}
async function deleteItem(){const id=$("editId").value,item=allItems.find(x=>x.id===id);if(!item||!confirm(`"${item.product_name}" tamamen silinsin mi?`))return;const {error}=await supabaseClient.from("depo_items").delete().eq("id",id);if(error){toast("Ürün silinemedi: "+error.message);return;}closeEditModal();toast("Ürün silindi.");loadAll();}

function openImageModal(url){
  $("modalImage").src = url;
  $("imageModal").classList.remove("hidden");
}

function closeImageModal(){
  $("imageModal").classList.add("hidden");
  $("modalImage").src = "";
}

function setupEvents(){
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));
      document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));
      btn.classList.add("active");
      $("tab-" + btn.dataset.tab).classList.add("active");
    });
  });

  const syncTypeFields=()=>{const isFrame=$("productType").value==="cerceve";$("frameFields").classList.toggle("hidden",!isFrame);$("mediaFields").classList.toggle("hidden",isFrame);$("frameStockWrap").classList.toggle("hidden",!isFrame);$("generalQuantityWrap").classList.toggle("hidden",isFrame);};
  $("productType").addEventListener("change",syncTypeFields); syncTypeFields();

  $("btnCamera").addEventListener("click", () => $("productImageCamera").click());
  $("btnGallery").addEventListener("click", () => $("productImageGallery").click());

  $("productImageCamera").addEventListener("change", (e) => setSelectedImage(e.target.files[0]));
  $("productImageGallery").addEventListener("change", (e) => setSelectedImage(e.target.files[0]));
  $("btnRemoveImage").addEventListener("click", clearSelectedImage);

  $("btnCloseImageModal").addEventListener("click", closeImageModal);
  $("imageModal").addEventListener("click", (e) => { if(e.target.id === "imageModal") closeImageModal(); });
  $("btnCloseEdit").addEventListener("click",closeEditModal); $("btnSaveEdit").addEventListener("click",saveEdit); $("btnDeleteItem").addEventListener("click",deleteItem); $("editModal").addEventListener("click",e=>{if(e.target.id==="editModal")closeEditModal();});

  $("btnSave").addEventListener("click", saveItem);
  $("btnClear").addEventListener("click", clearForm);
  $("btnSearch").addEventListener("click", doSearch);
  $("searchInput").addEventListener("keydown", e => { if(e.key === "Enter") doSearch(); });
  $("btnBoxSearch").addEventListener("click", () => renderBoxes($("boxSearch").value.trim()));
  $("btnPayment").addEventListener("click", savePayment);

  $("btnConfig").addEventListener("click", () => {
    localStorage.setItem("koli_supabase_url", $("supabaseUrl").value.trim());
    localStorage.setItem("koli_supabase_key", $("supabaseKey").value.trim());
    toast("Ayarlar kaydedildi.");
    initSupabase();
  });

  $("updateBtn").addEventListener("click", async () => {
    if("caches" in window){
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }
    localStorage.setItem("last_seen_version", APP_VERSION);
    location.reload(true);
  });
}

function checkUpdateButton(){
  const seen = localStorage.getItem("last_seen_version");
  if(seen !== APP_VERSION) $("updateBtn").classList.remove("hidden");
}

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("sw.js").catch(()=>{});
}

setupEvents();
initSupabase();
checkUpdateButton();
