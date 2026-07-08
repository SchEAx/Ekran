const APP_VERSION = "1.0.0";

let supabaseClient = null;
let allItems = [];

const $ = (id) => document.getElementById(id);

function toast(msg){
  $("toast").textContent = msg;
  $("toast").classList.remove("hidden");
  setTimeout(() => $("toast").classList.add("hidden"), 2600);
}

function initSupabase(){
  const url = localStorage.getItem("koli_supabase_url") || "";
  const key = localStorage.getItem("koli_supabase_key") || "";
  $("supabaseUrl").value = url;
  $("supabaseKey").value = key;
  if(url && key && window.supabase){
    supabaseClient = window.supabase.createClient(url, key);
    loadAll();
  }
}

function clearForm(){
  ["productName","boxNo","shelfLocation","quantity","vehicleBrand","vehicleModel","vehicleYear","screenInchFrame","mediaBrand","ram","storage","screenInchMedia","note"].forEach(id => {
    if($(id)) $(id).value = id === "quantity" ? 1 : "";
  });
}

function itemHtml(item){
  const typeLabel = item.product_type === "cerceve" ? "Çerçeve" : "Multimedya";
  const extra = item.product_type === "cerceve"
    ? `${item.vehicle_brand || ""} ${item.vehicle_model || ""} ${item.vehicle_year || ""} • ${item.screen_inch || ""}" • Soket: ${item.socket_included || "-"}`
    : `${item.media_brand || ""} • RAM: ${item.ram || "-"} • Hafıza: ${item.storage || "-"} • ${item.screen_inch || ""}"`;

  return `<div class="item">
    <div class="itemHead">
      <div>
        <h3>${item.product_name || "İsimsiz Ürün"}</h3>
        <p class="muted">${extra}</p>
      </div>
      <b>${item.quantity || 0} adet</b>
    </div>
    <div style="margin-top:8px">
      <span class="badge">${typeLabel}</span>
      <span class="badge">Koli: ${item.box_no || "-"}</span>
      <span class="badge">Raf: ${item.shelf_location || "-"}</span>
    </div>
    ${item.note ? `<p style="margin-top:8px">${item.note}</p>` : ""}
  </div>`;
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
  $("statTotal").textContent = allItems.reduce((a,b)=>a + Number(b.quantity || 0),0);
  $("statBoxes").textContent = new Set(allItems.map(x=>x.box_no).filter(Boolean)).size;
  $("statFrame").textContent = allItems.filter(x=>x.product_type==="cerceve").reduce((a,b)=>a+Number(b.quantity||0),0);
  $("statMedia").textContent = allItems.filter(x=>x.product_type==="multimedya").reduce((a,b)=>a+Number(b.quantity||0),0);
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

async function saveItem(){
  if(!supabaseClient){ toast("Önce Supabase ayarlarını gir knk."); return; }
  const type = $("productType").value;

  const row = {
    product_type: type,
    product_name: $("productName").value.trim(),
    box_no: $("boxNo").value.trim().toUpperCase(),
    shelf_location: $("shelfLocation").value.trim(),
    quantity: Number($("quantity").value || 0),
    vehicle_brand: type === "cerceve" ? $("vehicleBrand").value.trim() : null,
    vehicle_model: type === "cerceve" ? $("vehicleModel").value.trim() : null,
    vehicle_year: type === "cerceve" ? $("vehicleYear").value.trim() : null,
    socket_included: type === "cerceve" ? $("socketIncluded").value : null,
    media_brand: type === "multimedya" ? $("mediaBrand").value.trim() : null,
    ram: type === "multimedya" ? $("ram").value.trim() : null,
    storage: type === "multimedya" ? $("storage").value.trim() : null,
    screen_inch: type === "cerceve" ? $("screenInchFrame").value.trim() : $("screenInchMedia").value.trim(),
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

function setupEvents(){
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));
      document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));
      btn.classList.add("active");
      $("tab-" + btn.dataset.tab).classList.add("active");
    });
  });

  $("productType").addEventListener("change", () => {
    const isFrame = $("productType").value === "cerceve";
    $("frameFields").classList.toggle("hidden", !isFrame);
    $("mediaFields").classList.toggle("hidden", isFrame);
  });

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
