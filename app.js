const APP_VERSION = "2.3.1";
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

const DEFAULT_PERSONNEL_TABS = ["islem", "ayar"];
const ADMIN_ONLY_TABS = ["personel", "hareket"];
const GRANTABLE_TABS = ["urun", "liste", "koli", "odeme"];
const TAB_LABELS = {
  urun:"tabProduct",
  islem:"tabOperation",
  liste:"tabStockList",
  koli:"tabBoxes",
  odeme:"tabPayments",
  ayar:"tabSettings"
};

const I18N = {
  tr:{
    appTitle:"📦 Koli Depo", appSubtitle:"Çerçeve & Multimedya stok sistemi",
    adminLogin:"Admin Girişi", adminLogout:"Admin Çıkışı", personnel:"Personel", admin:"Admin",
    tabProduct:"Ürün Ekle", tabOperation:"Stok Giriş / Çıkış", tabStockList:"Stok Listesi", tabBoxes:"Koli Yönetimi", tabPayments:"Ödemeler", tabPersonnel:"Personeller", tabMovements:"Hareketler", tabSettings:"Ayarlar",
    operationTitle:"Stok Giriş / Çıkış", operationHint:"Ürünü bul, giriş veya çıkış seç ve adedi gir. Çerçevelerde soketli/soketsiz stok ayrı güncellenir.",
    quickBarcode:"⚡ Barkodla Hızlı Çıkış", quickBarcodeHint:"Barkodu okutunca ürün doğrudan çıkış ekranında açılır.", barcodePlaceholder:"Barkodu okut veya numarayı yaz", findProduct:"Ürünü Bul", scanCamera:"📷 Kamera ile Tara",
    searchProduct:"Ürün Ara", searchPlaceholder:"Ürün, araç, koli no veya raf ara...", productType:"Ürün Tipi", all:"Tümü", frame:"Çerçeve", multimedia:"Multimedya",
    personnelProfile:"Personel Profili", registeredPersonnel:"Bu cihazda kayıtlı personel:", changePersonnel:"Personeli Değiştir",
    languageTitle:"Dil / اللغة", languageHint:"Uygulama dilini seç. Seçim bu cihazda kayıtlı kalır.", themeColors:"Tema Renkleri", themeHint:"Seçtiğin tema bu cihazda kayıtlı kalır.", update:"Güncelle",
    themeMidnight:"Turuncu Gece", themeOcean:"Okyanus", themeForest:"Orman", themeViolet:"Mor Gece", themeGraphite:"Grafit", themeLight:"Aydınlık", themeDarkWarm:"Koyu ve sıcak", themeBlue:"Mavi tonlar", themeGreen:"Yeşil tonlar", themePurple:"Mor ve pembe", themeGray:"Sade gri", themeOpen:"Açık tema",
    stockType:"Stok Türü", withSocket:"Soketli", withoutSocket:"Soketsiz", quantity:"Adet", operationNote:"İşlem Notu (isteğe bağlı)", operationNotePlaceholder:"Örn: Montaj için alındı", saveOperation:"İşlemi Kaydet", cancel:"Vazgeç",
    personnelLogin:"👋 Personel Girişi", personnelLoginHint:"Adını ve kişisel PIN’ini gir. İlk kayıtta bu PIN hesabına tanımlanır; sonraki girişlerde aynı PIN kullanılır.", fullName:"Ad Soyad", namePlaceholder:"Örn: Ahmet Yılmaz", personnelPin:"Personel PIN", pinPlaceholder:"En az 4 hane", continueAsPersonnel:"Personel Olarak Devam Et",
    showBarcode:"Barkodu Kameraya Göster", holdBarcode:"Barkodu çerçevenin ortasında tut.", cameraPreparing:"Kamera hazırlanıyor...", holdStill:"Barkodu çerçevenin ortasında sabit tut.",
    box:"Koli", shelf:"Raf", total:"Toplam", stock:"Stok", currentStock:"Mevcut stok", stockIn:"+ Stok Girişi", stockOut:"− Stok Çıkışı", edit:"Düzenle",
    stockInTitle:"Stok Girişi", stockOutTitle:"Stok Çıkışı", saveStockIn:"Stok Girişini Kaydet", saveStockOut:"Stok Çıkışını Kaydet",
    noProduct:"Bu aramaya uygun ürün bulunamadı.", noRecord:"Kayıt bulunamadı.", loginWelcome:"Hoş geldin {name}. İşlemler artık adına kaydedilecek.",
    enterName:"Personel adını en az 2 karakter gir.", noPermission:"Bu sekme için yetkin bulunmuyor.", invalidAmount:"Adet kısmına 1 veya daha büyük tam sayı gir.",
    savedIn:"{amount} adet giriş {name} adına kaydedildi.", savedOut:"{amount} adet çıkış {name} adına kaydedildi.", insufficient:"Yeterli stok yok. Mevcut stok: {stock}",
    barcodeRequired:"Barkodu okut veya numarayı yaz.", barcodeNotFound:"Bu barkodla kayıtlı ürün bulunamadı.", cameraUnsupported:"Bu cihaz kamera ile barkod taramayı desteklemiyor. Barkod numarasını yazabilirsin.", cameraDenied:"Kamera açılamadı. Kamera iznini kontrol et veya barkod numarasını elle gir.",
    themeSaved:"Tema kaydedildi.", languageSaved:"Dil kaydedildi."
  },
  ar:{
    appTitle:"📦 مستودع الصناديق", appSubtitle:"نظام مخزون الإطارات وشاشات الوسائط",
    adminLogin:"دخول المدير", adminLogout:"خروج المدير", personnel:"موظف", admin:"مدير",
    tabProduct:"إضافة منتج", tabOperation:"إدخال / إخراج المخزون", tabStockList:"قائمة المخزون", tabBoxes:"إدارة الصناديق", tabPayments:"المدفوعات", tabPersonnel:"الموظفون", tabMovements:"الحركات", tabSettings:"الإعدادات",
    operationTitle:"إدخال / إخراج المخزون", operationHint:"ابحث عن المنتج، اختر إدخالاً أو إخراجاً، ثم أدخل الكمية. مخزون الإطار مع المقبس وبدونه يُحدّث بشكل منفصل.",
    quickBarcode:"⚡ إخراج سريع بالباركود", quickBarcodeHint:"عند مسح الباركود تفتح شاشة إخراج المنتج مباشرة.", barcodePlaceholder:"امسح الباركود أو اكتب الرقم", findProduct:"البحث عن المنتج", scanCamera:"📷 المسح بالكاميرا",
    searchProduct:"البحث عن منتج", searchPlaceholder:"ابحث بالمنتج أو السيارة أو الصندوق أو الرف...", productType:"نوع المنتج", all:"الكل", frame:"إطار", multimedia:"شاشة وسائط",
    personnelProfile:"ملف الموظف", registeredPersonnel:"الموظف المسجل على هذا الجهاز:", changePersonnel:"تغيير الموظف",
    languageTitle:"اللغة / Dil", languageHint:"اختر لغة التطبيق. سيبقى الاختيار محفوظاً على هذا الجهاز.", themeColors:"ألوان الواجهة", themeHint:"اللون الذي تختاره سيبقى محفوظاً على هذا الجهاز.", update:"تحديث",
    themeMidnight:"ليلي برتقالي", themeOcean:"المحيط", themeForest:"الغابة", themeViolet:"ليلي بنفسجي", themeGraphite:"رمادي داكن", themeLight:"فاتح", themeDarkWarm:"داكن ودافئ", themeBlue:"درجات الأزرق", themeGreen:"درجات الأخضر", themePurple:"بنفسجي ووردي", themeGray:"رمادي بسيط", themeOpen:"واجهة فاتحة",
    stockType:"نوع المخزون", withSocket:"مع مقبس", withoutSocket:"بدون مقبس", quantity:"الكمية", operationNote:"ملاحظة العملية (اختياري)", operationNotePlaceholder:"مثال: أُخذ للتركيب", saveOperation:"حفظ العملية", cancel:"إلغاء",
    personnelLogin:"👋 دخول الموظف", personnelLoginHint:"أدخل اسمك ورقمك السري الشخصي. في التسجيل الأول يُربط الرقم بحسابك، ثم تستخدمه في كل دخول.", fullName:"الاسم الكامل", namePlaceholder:"مثال: أحمد محمد", personnelPin:"رقم الموظف السري", pinPlaceholder:"4 أرقام على الأقل", continueAsPersonnel:"المتابعة كموظف",
    showBarcode:"وجّه الباركود نحو الكاميرا", holdBarcode:"ضع الباركود في منتصف الإطار.", cameraPreparing:"جارٍ تشغيل الكاميرا...", holdStill:"ثبّت الباركود في منتصف الإطار.",
    box:"الصندوق", shelf:"الرف", total:"المجموع", stock:"المخزون", currentStock:"المخزون الحالي", stockIn:"+ إدخال مخزون", stockOut:"− إخراج مخزون", edit:"تعديل",
    stockInTitle:"إدخال مخزون", stockOutTitle:"إخراج مخزون", saveStockIn:"حفظ إدخال المخزون", saveStockOut:"حفظ إخراج المخزون",
    noProduct:"لم يتم العثور على منتج مطابق.", noRecord:"لا توجد سجلات.", loginWelcome:"أهلاً {name}. ستُسجل العمليات باسمك.",
    enterName:"أدخل اسم الموظف بحرفين على الأقل.", noPermission:"ليس لديك صلاحية لفتح هذا القسم.", invalidAmount:"أدخل كمية صحيحة تساوي 1 أو أكثر.",
    savedIn:"تم تسجيل إدخال {amount} قطعة باسم {name}.", savedOut:"تم تسجيل إخراج {amount} قطعة باسم {name}.", insufficient:"الكمية غير كافية. المخزون الحالي: {stock}",
    barcodeRequired:"امسح الباركود أو اكتب رقمه.", barcodeNotFound:"لا يوجد منتج مسجل بهذا الباركود.", cameraUnsupported:"هذا الجهاز لا يدعم مسح الباركود بالكاميرا. يمكنك كتابة رقم الباركود.", cameraDenied:"تعذر فتح الكاميرا. تحقق من الإذن أو اكتب رقم الباركود يدوياً.",
    themeSaved:"تم حفظ اللون.", languageSaved:"تم حفظ اللغة."
  }
};

let supabaseClient = null;
let allItems = [];
let selectedImageFile = null;
let selectedPreviewUrl = null;
let selectedEditImageFile = null;
let selectedEditPreviewUrl = null;
let editImageRemoved = false;
let toastTimer = null;
let currentPersonnelName = "";
let currentPersonnelPin = "";
let currentDeviceId = "";
let adminUnlocked = false;
let adminPinSession = "";
let currentAllowedTabs = new Set(DEFAULT_PERSONNEL_TABS);
let personnelAdminRows = [];
let personnelRegistrationOpen = true;
let currentLanguage = localStorage.getItem("koli_language") === "ar" ? "ar" : "tr";
let movementRows = [];
let scannerStream = null;
let scannerFrameId = null;
let scannerBusy = false;
let scannerDetector = null;
let imageModalHistoryActive = false;

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

function t(key, variables = {}){
  let value = I18N[currentLanguage]?.[key] ?? I18N.tr[key] ?? key;
  Object.entries(variables).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, String(replacement));
  });
  return value;
}

function setLanguage(language, persist = true){
  currentLanguage = language === "ar" ? "ar" : "tr";
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  if(persist) localStorage.setItem("koli_language", currentLanguage);

  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-language-choice]").forEach(button => {
    const active = button.dataset.languageChoice === currentLanguage;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  updateProfileUi();
  if(allItems.length){
    renderList(allItems);
    renderOperationList();
    renderBoxes();
  }
  if(personnelAdminRows.length) renderPersonnelAdmin();
  if(movementRows.length) renderMovementReport();
}

function cleanBarcode(value){
  return String(value ?? "").trim().replace(/\s+/g, "");
}

function createDeviceId(){
  if(window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `device-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function updateProfileUi(){
  const name = currentPersonnelName || t("personnel");
  $("profileName").textContent = name;
  $("profileRole").textContent = adminUnlocked ? t("admin") : t("personnel");
  $("settingsPersonnelName").textContent = name;
  $("adminChangePinArea").classList.toggle("hidden", !adminUnlocked);
  $("btnAdminEntry").classList.toggle("adminActive", adminUnlocked);
  $("btnAdminEntry").querySelector("b").textContent = adminUnlocked ? t("adminLogout") : t("adminLogin");
  applyTabPermissions();
}

function canUseTab(tabName){
  if(adminUnlocked) return true;
  if(ADMIN_ONLY_TABS.includes(tabName)) return false;
  return currentAllowedTabs.has(tabName);
}

function applyTabPermissions(){
  document.querySelectorAll(".tab[data-tab]").forEach(button => {
    button.classList.toggle("hidden", !canUseTab(button.dataset.tab));
  });
  $("heroSection").classList.toggle("hidden", !canUseTab("liste"));

  const activeButton = document.querySelector(".tab.active");
  if(activeButton && !canUseTab(activeButton.dataset.tab)){
    switchTab("islem");
  }
}

function openPersonnelModal(canCancel = true){
  $("personnelNameInput").value = currentPersonnelName;
  $("personnelPinInput").value = "";
  $("btnCancelPersonnel").classList.toggle("hidden", !canCancel || !currentPersonnelName);
  $("personnelModal").classList.remove("hidden");
  setTimeout(() => $("personnelNameInput").focus(), 50);
}

function closePersonnelModal(){
  if(!currentPersonnelName) return;
  $("personnelModal").classList.add("hidden");
}

async function savePersonnelProfile(){
  const name = $("personnelNameInput").value.trim().replace(/\s+/g, " ");
  const pin = $("personnelPinInput").value.trim();
  if(name.length < 2){
    toast(t("enterName"));
    return;
  }
  if(pin.length < 4){
    toast(t("pinPlaceholder"));
    return;
  }
  const button = $("btnSavePersonnel");
  setButtonLoading(button, true, "Giriş yapılıyor...");
  try{
    const loggedIn = await syncPersonnelProfile(name, pin);
    if(!loggedIn) return;
    currentPersonnelName = name;
    currentPersonnelPin = pin;
    localStorage.setItem("koli_personnel_name", name);
    $("personnelModal").classList.add("hidden");
    updateProfileUi();
    switchTab("islem");
    toast(t("loginWelcome", { name }));
  }finally{
    setButtonLoading(button, false);
  }
}

function initPersonnelProfile(){
  currentPersonnelName = (localStorage.getItem("koli_personnel_name") || "").trim();
  currentDeviceId = localStorage.getItem("koli_device_id") || createDeviceId();
  localStorage.setItem("koli_device_id", currentDeviceId);
  updateProfileUi();
  openPersonnelModal(false);
}

async function syncPersonnelProfile(name = currentPersonnelName, pin = currentPersonnelPin){
  currentAllowedTabs = new Set(DEFAULT_PERSONNEL_TABS);
  if(!supabaseClient || !name || !pin || !currentDeviceId){
    updateProfileUi();
    return false;
  }

  try{
    const { data, error } = await supabaseClient.rpc("login_depo_personnel", {
      p_personnel_name:name,
      p_personnel_pin:pin,
      p_device_id:currentDeviceId
    });
    if(error) throw new Error(error.message);
    const profile = Array.isArray(data) ? data[0] : data;
    const allowed = Array.isArray(profile?.allowed_tabs) ? profile.allowed_tabs : DEFAULT_PERSONNEL_TABS;
    currentAllowedTabs = new Set([...DEFAULT_PERSONNEL_TABS, ...allowed.filter(tab => GRANTABLE_TABS.includes(tab))]);
    updateProfileUi();
    return true;
  }catch(error){
    updateProfileUi();
    toast("Personel girişi yapılamadı: " + error.message);
    return false;
  }
}

async function ensurePersonnelActive(){
  if(!currentPersonnelName || !currentPersonnelPin){
    openPersonnelModal(false);
    throw new Error("Personel adı ve PIN ile giriş yapmalısın.");
  }
  const { data, error } = await supabaseClient.rpc("verify_depo_personnel", {
    p_personnel_name:currentPersonnelName,
    p_personnel_pin:currentPersonnelPin
  });
  if(error || data !== true){
    currentPersonnelPin = "";
    openPersonnelModal(false);
    throw new Error("Personel hesabı pasif, PIN yanlış veya oturum geçersiz.");
  }
  return true;
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
    item.barcode,
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

async function initSupabase(){
  if(SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase){
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    if(currentPersonnelName) await syncPersonnelProfile();
    await loadAll();
  }
}

function clearForm(){
  ["productName","boxNo","barcode","shelfLocation","quantity","socketQuantity","noSocketQuantity","vehicleBrand","vehicleModel","vehicleYear","screenInchFrame","mediaBrand","ram","storage","screenInchMedia","note"].forEach(id => {
    if($(id)) $(id).value = id === "quantity" ? 1 : "";
  });
  clearSelectedImage();
}

function stockBadges(item){
  if(item.product_type === "cerceve"){
    return `<span class="badge">${t("withSocket")}: ${Number(item.socket_quantity || 0)}</span><span class="badge">${t("withoutSocket")}: ${Number(item.no_socket_quantity || 0)}</span><span class="badge">${t("total")}: ${itemTotal(item)}</span>`;
  }
  return `<span class="badge">${t("stock")}: ${itemTotal(item)}</span>`;
}

function itemHtml(item){
  const id = escapeHtml(item.id);
  const name = escapeHtml(item.product_name || "İsimsiz Ürün");
  const typeLabel = item.product_type === "cerceve" ? t("frame") : t("multimedia");
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
        ${item.barcode ? `<span class="badge">Barkod: ${escapeHtml(item.barcode)}</span>` : ""}
        <span class="badge">${t("box")}: ${escapeHtml(item.box_no || "-")}</span>
        <span class="badge">${t("shelf")}: ${escapeHtml(item.shelf_location || "-")}</span>
        ${stockBadges(item)}
      </div>
      ${item.note ? `<p style="margin-top:8px">${escapeHtml(item.note)}</p>` : ""}
      <div class="stockActions">
        <button type="button" class="stockIn" data-action="stock-in" data-id="${id}">${t("stockIn")}</button>
        <button type="button" class="stockOut" data-action="stock-out" data-id="${id}">${t("stockOut")}</button>
        ${canUseTab("urun") ? `<button type="button" data-action="edit" data-id="${id}">${t("edit")}</button>` : ""}
      </div>
    </div>`;
}

function operationItemHtml(item){
  const id = escapeHtml(item.id);
  const name = escapeHtml(item.product_name || "İsimsiz Ürün");
  const image = item.image_url ? `<img class="operationThumb" src="${escapeHtml(item.image_url)}" alt="${name}" loading="lazy" tabindex="0" role="button" data-action="view-image" data-image-url="${escapeHtml(item.image_url)}" />` : "";
  return `
    <div class="item">
      ${image}
      <div class="itemHead">
        <div><h3>${name}</h3><p class="muted">${escapeHtml(itemExtra(item))}</p></div>
        <b>${itemTotal(item)} adet</b>
      </div>
      <div style="margin-top:8px">
        ${item.barcode ? `<span class="badge">Barkod: ${escapeHtml(item.barcode)}</span>` : ""}
        <span class="badge">${t("box")}: ${escapeHtml(item.box_no || "-")}</span>
        <span class="badge">${t("shelf")}: ${escapeHtml(item.shelf_location || "-")}</span>
        ${stockBadges(item)}
      </div>
      <div class="stockActions">
        <button type="button" class="stockIn" data-action="stock-in" data-id="${id}">${t("stockIn")}</button>
        <button type="button" class="stockOut" data-action="stock-out" data-id="${id}">${t("stockOut")}</button>
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
}

function renderStats(){
  $("statTotal").textContent = allItems.reduce((total, item) => total + itemTotal(item), 0);
  $("statBoxes").textContent = new Set(allItems.map(item => item.box_no).filter(Boolean)).size;
  $("statFrame").textContent = allItems.filter(item => item.product_type === "cerceve").reduce((total, item) => total + itemTotal(item), 0);
  $("statMedia").textContent = allItems.filter(item => item.product_type === "multimedya").reduce((total, item) => total + itemTotal(item), 0);
}

function renderList(list){
  $("stockList").innerHTML = list.length ? list.map(itemHtml).join("") : `<p class="muted">${t("noRecord")}</p>`;
}

function renderOperationList(){
  const query = normalize($("operationSearch").value.trim());
  const type = $("operationTypeFilter").value;
  const filtered = allItems.filter(item => {
    const typeMatches = type === "tum" || item.product_type === type;
    const queryMatches = !query || itemSearchText(item).includes(query);
    return typeMatches && queryMatches;
  });

  $("operationList").innerHTML = filtered.length ? filtered.map(operationItemHtml).join("") : `<p class="muted">${t("noProduct")}</p>`;
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
  if(!canUseTab("urun")){
    toast("Ürün ekleme yetkin bulunmuyor.");
    return;
  }
  if(!supabaseClient){
    toast("Önce Supabase ayarlarını gir knk.");
    return;
  }
  if(!currentPersonnelName){
    openPersonnelModal(false);
    return;
  }
  try{ await ensurePersonnelActive(); }catch(error){ toast(error.message); return; }

  const type = $("productType").value;
  const initialSocketQuantity = type === "cerceve" ? Number($("socketQuantity").value || 0) : 0;
  const initialNoSocketQuantity = type === "cerceve" ? Number($("noSocketQuantity").value || 0) : 0;
  const initialQuantity = type === "multimedya" ? Number($("quantity").value || 0) : 0;
  if([initialSocketQuantity, initialNoSocketQuantity, initialQuantity].some(value => !Number.isInteger(value) || value < 0)){
    toast("Stok adetleri 0 veya daha büyük tam sayı olmalı.");
    return;
  }
  const row = {
    product_type:type,
    product_name:$("productName").value.trim(),
    barcode:cleanBarcode($("barcode").value) || null,
    box_no:$("boxNo").value.trim().toLocaleUpperCase("tr-TR"),
    shelf_location:$("shelfLocation").value.trim(),
    quantity:0,
    socket_quantity:0,
    no_socket_quantity:0,
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
    const { data:createdItem, error } = await supabaseClient.from("depo_items").insert(row).select("*").single();
    if(error) throw new Error("Kaydedilemedi: " + error.message);
    if(initialSocketQuantity > 0) await applyStockMovement(createdItem, 1, initialSocketQuantity, "socket_quantity", "Yeni ürün ilk stok kaydı");
    if(initialNoSocketQuantity > 0) await applyStockMovement(createdItem, 1, initialNoSocketQuantity, "no_socket_quantity", "Yeni ürün ilk stok kaydı");
    if(initialQuantity > 0) await applyStockMovement(createdItem, 1, initialQuantity, "quantity", "Yeni ürün ilk stok kaydı");
    toast("Ürün ve ilk stok hareketi kaydedildi.");
    clearForm();
    await loadAll();
  }catch(error){
    toast(error.message);
  }finally{
    setButtonLoading(saveButton, false);
  }
}

async function savePayment(){
  try{ await ensurePersonnelActive(); }catch(error){ toast(error.message); return; }
  if(!canUseTab("odeme")){
    toast("Ödemeler sekmesi için yetkin bulunmuyor.");
    return;
  }
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
  if(!supabaseClient || !canUseTab("odeme")) return;
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
  if(!canUseTab(tabName)){
    toast("Bu sekme için yetkin bulunmuyor.");
    return;
  }
  document.querySelectorAll(".tab").forEach(button => button.classList.toggle("active", button.dataset.tab === tabName));
  document.querySelectorAll(".panel").forEach(panel => panel.classList.toggle("active", panel.id === `tab-${tabName}`));
  if(tabName === "odeme") loadPayments();
  if(tabName === "personel") loadPersonnelAdmin();
}

function doSearch(){
  if(!canUseTab("liste")){
    toast("Stok Listesi sekmesi için yetkin bulunmuyor.");
    return;
  }
  const query = normalize($("searchInput").value.trim());
  const list = query ? allItems.filter(item => itemSearchText(item).includes(query)) : allItems;
  switchTab("liste");
  renderList(list);
}

function openEditModal(id){
  if(!canUseTab("urun")){
    toast("Ürün düzenleme yetkin bulunmuyor.");
    return;
  }
  const item = findItem(id);
  if(!item) return;

  clearEditImageState();
  $("editId").value = item.id;
  $("editProductName").value = item.product_name || "";
  $("editBoxNo").value = item.box_no || "";
  $("editShelfLocation").value = item.shelf_location || "";
  $("editBarcode").value = item.barcode || "";
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

async function applyStockMovement(item, direction, amount, variant, note = ""){
  if(!currentPersonnelName || !currentPersonnelPin) throw new Error("Önce personel adı ve PIN ile giriş yap.");
  const { data, error } = await supabaseClient.rpc("apply_depo_stock_movement", {
    p_item_id:String(item.id),
    p_direction:direction,
    p_amount:amount,
    p_variant:variant,
    p_personnel_name:currentPersonnelName,
    p_personnel_pin:currentPersonnelPin,
    p_device_id:currentDeviceId,
    p_note:note || null
  });
  if(error) throw new Error("Stok hareketi kaydedilemedi: " + error.message);
  return data;
}

async function saveEdit(){
  if(!canUseTab("urun")) return;
  try{ await ensurePersonnelActive(); }catch(error){ toast(error.message); return; }
  const id = $("editId").value;
  const item = findItem(id);
  if(!item) return;

  const updates = {
    product_name:$("editProductName").value.trim(),
    barcode:cleanBarcode($("editBarcode").value) || null,
    box_no:$("editBoxNo").value.trim().toLocaleUpperCase("tr-TR"),
    shelf_location:$("editShelfLocation").value.trim(),
    note:$("editNote").value.trim()
  };

  if(!updates.product_name || !updates.box_no){
    toast("Ürün adı ve koli no boş bırakılamaz.");
    return;
  }

  const stockChanges = [];
  if(item.product_type === "cerceve"){
    const socketQuantity = Number($("editSocketQuantity").value || 0);
    const noSocketQuantity = Number($("editNoSocketQuantity").value || 0);
    if(socketQuantity < 0 || noSocketQuantity < 0){
      toast("Stok miktarı eksi olamaz.");
      return;
    }
    const socketDiff = socketQuantity - Number(item.socket_quantity || 0);
    const noSocketDiff = noSocketQuantity - Number(item.no_socket_quantity || 0);
    if(socketDiff) stockChanges.push({ direction:Math.sign(socketDiff), amount:Math.abs(socketDiff), variant:"socket_quantity" });
    if(noSocketDiff) stockChanges.push({ direction:Math.sign(noSocketDiff), amount:Math.abs(noSocketDiff), variant:"no_socket_quantity" });
  }else{
    const quantity = Number($("editQuantity").value || 0);
    if(quantity < 0){
      toast("Stok miktarı eksi olamaz.");
      return;
    }
    const quantityDiff = quantity - Number(item.quantity || 0);
    if(quantityDiff) stockChanges.push({ direction:Math.sign(quantityDiff), amount:Math.abs(quantityDiff), variant:"quantity" });
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
    for(const change of stockChanges){
      await applyStockMovement(item, change.direction, change.amount, change.variant, "Ürün düzenleme ekranından stok düzeltmesi");
    }
    closeEditModal();
    toast(stockChanges.length ? "Ürün güncellendi; stok farkı hareketlere işlendi." : "Ürün ve resim bilgileri güncellendi.");
    await loadAll();
  }catch(error){
    toast(error.message);
  }finally{
    setButtonLoading(saveButton, false);
  }
}

async function deleteItem(){
  try{ await ensurePersonnelActive(); }catch(error){ toast(error.message); return; }
  if(!canUseTab("urun")) return;
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
    return `<span class="badge">${t("withSocket")}: ${Number(item.socket_quantity || 0)}</span><span class="badge">${t("withoutSocket")}: ${Number(item.no_socket_quantity || 0)}</span><span class="badge">${t("total")}: ${itemTotal(item)}</span>`;
  }
  return `<span class="badge">${t("currentStock")}: ${itemTotal(item)}</span>`;
}

function openOperationModal(id, direction){
  if(!currentPersonnelName){
    openPersonnelModal(false);
    return;
  }
  const item = findItem(id);
  if(!item) return;

  const isStockIn = direction > 0;
  $("operationItemId").value = item.id;
  $("operationDirection").value = isStockIn ? "1" : "-1";
  $("operationTitle").textContent = isStockIn ? t("stockInTitle") : t("stockOutTitle");
  $("operationProductInfo").textContent = `${item.product_name || "-"} • ${t("box")}: ${item.box_no || "-"} • ${t("shelf")}: ${item.shelf_location || "-"}`;
  $("operationCurrentStock").innerHTML = operationStockHtml(item);
  $("operationFrameTypeWrap").classList.toggle("hidden", item.product_type !== "cerceve");
  $("operationFrameType").value = "socket_quantity";
  $("operationAmount").value = 1;
  $("operationNote").value = "";

  const confirmButton = $("btnConfirmOperation");
  confirmButton.textContent = isStockIn ? t("saveStockIn") : t("saveStockOut");
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
    toast(t("invalidAmount"));
    return;
  }

  let variant = "quantity";
  if(item.product_type === "cerceve"){
    variant = $("operationFrameType").value;
    const current = Number(item[variant] || 0);
    const next = current + (direction * amount);
    if(next < 0){
      toast(t("insufficient", { stock:current }));
      return;
    }
  }else{
    const current = Number(item.quantity || 0);
    const next = current + (direction * amount);
    if(next < 0){
      toast(t("insufficient", { stock:current }));
      return;
    }
  }

  const confirmButton = $("btnConfirmOperation");
  setButtonLoading(confirmButton, true, "İşleniyor...");
  try{
    await applyStockMovement(item, direction, amount, variant, $("operationNote").value.trim());
    closeOperationModal();
    toast(direction > 0 ? t("savedIn", { amount, name:currentPersonnelName }) : t("savedOut", { amount, name:currentPersonnelName }));
    await loadAll();
  }catch(error){
    toast(error.message);
  }finally{
    setButtonLoading(confirmButton, false);
  }
}

function findBarcodeProduct(rawCode){
  const code = cleanBarcode(rawCode);
  if(!code){
    toast(t("barcodeRequired"));
    return;
  }
  const matches = allItems.filter(item => cleanBarcode(item.barcode) === code);
  if(!matches.length){
    toast(t("barcodeNotFound"));
    return;
  }
  if(matches.length > 1){
    toast("Bu barkod birden fazla üründe kayıtlı. Ürün barkodlarını düzeltmek gerekiyor.");
    return;
  }
  $("barcodeSearch").value = code;
  switchTab("islem");
  openOperationModal(matches[0].id, -1);
}

async function scanBarcodeFrame(){
  if(!scannerStream || !scannerDetector) return;
  const video = $("scannerVideo");
  if(video.readyState >= 2 && !scannerBusy){
    scannerBusy = true;
    try{
      const codes = await scannerDetector.detect(video);
      if(codes.length){
        const value = codes[0].rawValue;
        closeBarcodeScanner();
        findBarcodeProduct(value);
        return;
      }
    }catch(error){
      $("scannerStatus").textContent = t("holdStill");
    }finally{
      scannerBusy = false;
    }
  }
  scannerFrameId = requestAnimationFrame(scanBarcodeFrame);
}

async function openBarcodeScanner(){
  if(!("BarcodeDetector" in window)){
    toast(t("cameraUnsupported"));
    $("barcodeSearch").focus();
    return;
  }
  if(!navigator.mediaDevices?.getUserMedia){
    toast("Kamera erişimi bulunamadı. Siteyi HTTPS üzerinden açtığından emin ol.");
    return;
  }

  $("scannerModal").classList.remove("hidden");
  $("scannerStatus").textContent = t("cameraPreparing");
  try{
    scannerDetector = new BarcodeDetector();
    scannerStream = await navigator.mediaDevices.getUserMedia({
      video:{ facingMode:{ ideal:"environment" }, width:{ ideal:1280 }, height:{ ideal:720 } },
      audio:false
    });
    $("scannerVideo").srcObject = scannerStream;
    await $("scannerVideo").play();
    $("scannerStatus").textContent = t("holdStill");
    scanBarcodeFrame();
  }catch(error){
    closeBarcodeScanner();
    toast(t("cameraDenied"));
  }
}

function closeBarcodeScanner(){
  if(scannerFrameId) cancelAnimationFrame(scannerFrameId);
  scannerFrameId = null;
  scannerStream?.getTracks().forEach(track => track.stop());
  scannerStream = null;
  scannerDetector = null;
  scannerBusy = false;
  $("scannerVideo").srcObject = null;
  $("scannerModal").classList.add("hidden");
}

function toDatetimeLocal(date){
  const pad = value => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function setReportPeriod(mode){
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  if(mode === "week"){
    const mondayOffset = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - mondayOffset);
  }
  const end = new Date(start);
  end.setDate(end.getDate() + (mode === "week" ? 7 : 1));
  $("movementFrom").value = toDatetimeLocal(start);
  $("movementTo").value = toDatetimeLocal(end);
  $("btnToday").classList.toggle("primary", mode === "today");
  $("btnThisWeek").classList.toggle("primary", mode === "week");
  if(adminUnlocked) loadMovements();
}

function openAdminModal(){
  $("adminPin").value = "";
  $("adminModal").classList.remove("hidden");
  setTimeout(() => $("adminPin").focus(), 50);
}

function closeAdminModal(){
  $("adminModal").classList.add("hidden");
  $("adminPin").value = "";
}

async function adminLogin(){
  if(!supabaseClient){
    toast("Supabase bağlantısı bulunamadı.");
    return;
  }
  const pin = $("adminPin").value.trim();
  if(!pin){
    toast("Admin PIN’i gir.");
    return;
  }
  const button = $("btnAdminLogin");
  setButtonLoading(button, true, "Kontrol ediliyor...");
  try{
    const { data, error } = await supabaseClient.rpc("verify_depo_admin", { p_admin_pin:pin });
    if(error){
      if(/crypt\(text, text\).*does not exist/i.test(error.message)){
        throw new Error("Supabase şifre fonksiyonu eski. Güncel SUPABASE_KURULUM.sql dosyasını tekrar çalıştır.");
      }
      throw new Error(error.message);
    }
    if(data !== true){
      toast("Admin PIN’i yanlış.");
      return;
    }
    adminUnlocked = true;
    adminPinSession = pin;
    closeAdminModal();
    updateProfileUi();
    setReportPeriod("today");
    loadPersonnelAdmin();
    toast("Admin modu açıldı. Tüm sekmeler görünür durumda.");
  }catch(error){
    toast("Admin girişi açılamadı: " + error.message);
  }finally{
    setButtonLoading(button, false);
  }
}

function adminLogout(){
  adminUnlocked = false;
  adminPinSession = "";
  movementRows = [];
  updateProfileUi();
  toast("Admin modu kapatıldı.");
}

async function changeAdminPin(){
  const currentPin = $("currentAdminPin").value.trim();
  const newPin = $("newAdminPin").value.trim();
  if(newPin.length < 4){
    toast("Yeni PIN en az 4 haneli olmalı.");
    return;
  }
  const { data, error } = await supabaseClient.rpc("change_depo_admin_pin", {
    p_current_pin:currentPin,
    p_new_pin:newPin
  });
  if(error){
    toast("PIN değiştirilemedi: " + error.message);
    return;
  }
  if(data !== true){
    toast("Mevcut PIN yanlış.");
    return;
  }
  adminPinSession = newPin;
  $("currentAdminPin").value = "";
  $("newAdminPin").value = "";
  toast("Admin PIN’i değiştirildi.");
}

async function loadPersonnelAdmin(){
  if(!adminUnlocked || !adminPinSession) return;
  const button = $("btnLoadPersonnel");
  setButtonLoading(button, true, "Yükleniyor...");
  try{
    const { data, error } = await supabaseClient.rpc("get_depo_personnel_list", {
      p_admin_pin:adminPinSession
    });
    if(error) throw new Error(error.message);
    const { data:registrationOpen, error:registrationError } = await supabaseClient.rpc("get_depo_registration_status", {
      p_admin_pin:adminPinSession
    });
    if(registrationError) throw new Error(registrationError.message);
    personnelRegistrationOpen = registrationOpen === true;
    personnelAdminRows = data || [];
    renderRegistrationStatus();
    renderPersonnelAdmin();
  }catch(error){
    $("personnelAdminList").innerHTML = `<p class="muted">Personel listesi alınamadı. Güncel SUPABASE_KURULUM.sql dosyasını çalıştır.</p>`;
    toast("Personel listesi alınamadı: " + error.message);
  }finally{
    setButtonLoading(button, false);
  }
}

function renderRegistrationStatus(){
  $("registrationStatusText").textContent = personnelRegistrationOpen
    ? "Açık: Yeni isimler kendi PIN’ini belirleyerek kayıt olabilir."
    : "Kapalı: Yalnız mevcut ve aktif personeller giriş yapabilir.";
  $("btnToggleRegistration").textContent = personnelRegistrationOpen ? "Kayıtları Kapat" : "Kayıtları Aç";
  $("btnToggleRegistration").classList.toggle("danger", personnelRegistrationOpen);
}

async function togglePersonnelRegistration(){
  if(!adminUnlocked) return;
  const button = $("btnToggleRegistration");
  setButtonLoading(button, true, "Kaydediliyor...");
  try{
    const { data, error } = await supabaseClient.rpc("set_depo_registration_status", {
      p_admin_pin:adminPinSession,
      p_is_open:!personnelRegistrationOpen
    });
    if(error) throw new Error(error.message);
    if(data !== true) throw new Error("Ayar kaydedilemedi.");
    personnelRegistrationOpen = !personnelRegistrationOpen;
    renderRegistrationStatus();
    toast(personnelRegistrationOpen ? "Yeni personel kayıtları açıldı." : "Yeni personel kayıtları kapatıldı.");
  }catch(error){
    toast("Kayıt ayarı değiştirilemedi: " + error.message);
  }finally{
    setButtonLoading(button, false);
  }
}

function renderPersonnelAdmin(){
  $("personnelAdminList").innerHTML = personnelAdminRows.map(person => {
    const allowed = new Set(Array.isArray(person.allowed_tabs) ? person.allowed_tabs : DEFAULT_PERSONNEL_TABS);
    const lastSeen = person.last_seen_at ? formatMovementDate(person.last_seen_at) : "-";
    return `
      <div class="item permissionCard" data-personnel-card="${escapeHtml(person.id)}">
        <div class="itemHead">
          <div><h3>👤 ${escapeHtml(person.personnel_name)}</h3><p class="muted">Son giriş: ${escapeHtml(lastSeen)}</p></div>
          <span class="badge">${person.is_active === false ? "Pasif" : "Aktif"}</span>
        </div>
        <div class="fixedPermissions"><span class="badge permissionFixed">✓ ${t("tabOperation")}</span><span class="badge permissionFixed">✓ ${t("tabSettings")}</span></div>
        <div class="permissionGrid">
          ${GRANTABLE_TABS.map(tab => `
            <label class="permissionChoice">
              <input type="checkbox" data-tab-permission="${tab}" ${allowed.has(tab) ? "checked" : ""} />
              <span>${escapeHtml(t(TAB_LABELS[tab]))}</span>
            </label>`).join("")}
        </div>
        <button type="button" class="primary" data-action="save-personnel-tabs" data-id="${escapeHtml(person.id)}">Sekme İzinlerini Kaydet</button>
        <div class="personnelSecurityActions">
          <input type="password" inputmode="numeric" minlength="4" maxlength="12" data-personnel-new-pin placeholder="Yeni PIN (en az 4 hane)" />
          <button type="button" data-action="set-personnel-pin" data-id="${escapeHtml(person.id)}">PIN Belirle / Sıfırla</button>
          <button type="button" class="${person.is_active === false ? "primary" : "danger"}" data-action="toggle-personnel-active" data-id="${escapeHtml(person.id)}" data-active="${person.is_active !== false}">${person.is_active === false ? "Personeli Yeniden Aktifleştir" : "Personeli Sil / Pasife Al"}</button>
        </div>
      </div>`;
  }).join("") || `<p class="muted">Henüz personel kaydı yok. Personeller yeni sürümde adını girince burada görünecek.</p>`;
}

async function setPersonnelPin(personnelId){
  const card = document.querySelector(`[data-personnel-card="${personnelId}"]`);
  const newPin = card?.querySelector("[data-personnel-new-pin]")?.value.trim() || "";
  if(newPin.length < 4){ toast("Yeni personel PIN en az 4 haneli olmalı."); return; }
  try{
    const { data, error } = await supabaseClient.rpc("set_depo_personnel_pin", {
      p_admin_pin:adminPinSession, p_personnel_id:personnelId, p_new_pin:newPin
    });
    if(error) throw new Error(error.message);
    if(data !== true) throw new Error("Personel bulunamadı.");
    card.querySelector("[data-personnel-new-pin]").value = "";
    toast("Personel PIN’i ayarlandı.");
  }catch(error){ toast("PIN ayarlanamadı: " + error.message); }
}

async function togglePersonnelActive(personnelId, currentlyActive){
  const nextActive = !currentlyActive;
  if(!nextActive && !confirm("Bu personel pasife alınacak ve artık giriş/stok işlemi yapamayacak. Devam edilsin mi?")) return;
  try{
    const { data, error } = await supabaseClient.rpc("set_depo_personnel_active", {
      p_admin_pin:adminPinSession, p_personnel_id:personnelId, p_is_active:nextActive
    });
    if(error) throw new Error(error.message);
    if(data !== true) throw new Error("Personel bulunamadı.");
    toast(nextActive ? "Personel yeniden aktifleştirildi." : "Personel pasife alındı; giriş ve stok işlemleri engellendi.");
    await loadPersonnelAdmin();
  }catch(error){ toast("Personel durumu değiştirilemedi: " + error.message); }
}

async function savePersonnelTabs(personnelId){
  if(!adminUnlocked) return;
  const card = document.querySelector(`[data-personnel-card="${personnelId}"]`);
  if(!card) return;
  const extras = [...card.querySelectorAll("[data-tab-permission]:checked")].map(input => input.dataset.tabPermission);
  const button = card.querySelector('[data-action="save-personnel-tabs"]');
  setButtonLoading(button, true, "Kaydediliyor...");
  try{
    const { data, error } = await supabaseClient.rpc("set_depo_personnel_tabs", {
      p_admin_pin:adminPinSession,
      p_personnel_id:personnelId,
      p_allowed_tabs:[...DEFAULT_PERSONNEL_TABS, ...extras]
    });
    if(error) throw new Error(error.message);
    if(data !== true) throw new Error("Yetki kaydı bulunamadı.");
    toast("Sekme izinleri kaydedildi. Personel uygulamayı yeniden açtığında aktif olacak.");
    await loadPersonnelAdmin();
  }catch(error){
    toast("Sekme izinleri kaydedilemedi: " + error.message);
  }finally{
    setButtonLoading(button, false);
  }
}

function movementVariantLabel(value){
  if(value === "socket_quantity") return "Soketli";
  if(value === "no_socket_quantity") return "Soketsiz";
  return "Genel";
}

function movementTypeLabel(value){
  return value === "giris" ? "Giriş" : "Çıkış";
}

function formatMovementDate(value){
  return new Intl.DateTimeFormat(currentLanguage === "ar" ? "ar-SY" : "tr-TR", { dateStyle:"short", timeStyle:"short" }).format(new Date(value));
}

function filteredMovements(){
  const personnel = $("movementPersonnel").value;
  return personnel ? movementRows.filter(row => row.personnel_name === personnel) : movementRows;
}

function movementTable(headers, rows){
  if(!rows.length) return `<p class="muted emptyReport">Bu aralıkta kayıt yok.</p>`;
  return `<table><thead><tr>${headers.map(header => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table>`;
}

function renderMovementReport(){
  const selectedPersonnel = $("movementPersonnel").value;
  const personnelNames = [...new Set(movementRows.map(row => row.personnel_name).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr"));
  $("movementPersonnel").innerHTML = `<option value="">Tüm Personel</option>${personnelNames.map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("")}`;
  if(personnelNames.includes(selectedPersonnel)) $("movementPersonnel").value = selectedPersonnel;

  const rows = filteredMovements();
  const totalIn = rows.filter(row => row.movement_type === "giris").reduce((sum, row) => sum + Number(row.quantity || 0), 0);
  const totalOut = rows.filter(row => row.movement_type === "cikis").reduce((sum, row) => sum + Number(row.quantity || 0), 0);
  $("movementCount").textContent = rows.length;
  $("movementInTotal").textContent = totalIn;
  $("movementOutTotal").textContent = totalOut;
  $("movementPersonnelCount").textContent = new Set(rows.map(row => row.personnel_name)).size;

  const personnelMap = new Map();
  rows.forEach(row => {
    const key = row.personnel_name || "Bilinmeyen";
    const summary = personnelMap.get(key) || { name:key, count:0, giris:0, cikis:0 };
    summary.count += 1;
    summary[row.movement_type] += Number(row.quantity || 0);
    personnelMap.set(key, summary);
  });
  const personnelRows = [...personnelMap.values()]
    .sort((a, b) => b.cikis - a.cikis || a.name.localeCompare(b.name, "tr"))
    .map(summary => `<tr><td>${escapeHtml(summary.name)}</td><td>${summary.count}</td><td class="inText">${summary.giris}</td><td class="outText">${summary.cikis}</td><td>${summary.giris - summary.cikis}</td></tr>`);
  $("personnelSummary").innerHTML = movementTable(["Personel", "İşlem", "Giriş", "Çıkış", "Net"], personnelRows);

  const productMap = new Map();
  rows.forEach(row => {
    const key = `${row.personnel_name}\u0001${row.item_id}\u0001${row.stock_variant}`;
    const summary = productMap.get(key) || {
      personnel:row.personnel_name || "Bilinmeyen",
      product:row.product_name || "Silinmiş/İsimsiz Ürün",
      variant:movementVariantLabel(row.stock_variant),
      giris:0,
      cikis:0
    };
    summary[row.movement_type] += Number(row.quantity || 0);
    productMap.set(key, summary);
  });
  const productRows = [...productMap.values()]
    .sort((a, b) => b.cikis - a.cikis || a.personnel.localeCompare(b.personnel, "tr"))
    .map(summary => `<tr><td>${escapeHtml(summary.personnel)}</td><td>${escapeHtml(summary.product)}</td><td>${escapeHtml(summary.variant)}</td><td class="inText">${summary.giris}</td><td class="outText">${summary.cikis}</td></tr>`);
  $("productSummary").innerHTML = movementTable(["Personel", "Ürün", "Tür", "Giriş", "Çıkış"], productRows);

  const visibleRows = rows.slice(0, 300);
  $("movementList").innerHTML = visibleRows.map(row => `
    <div class="item movementItem">
      <div class="itemHead">
        <div><h3>${escapeHtml(row.product_name || "Silinmiş/İsimsiz Ürün")}</h3><p class="muted">${escapeHtml(row.personnel_name)} • ${formatMovementDate(row.created_at)}</p></div>
        <b class="${row.movement_type === "giris" ? "inText" : "outText"}">${row.movement_type === "giris" ? "+" : "−"}${Number(row.quantity || 0)}</b>
      </div>
      <div><span class="badge">${movementTypeLabel(row.movement_type)}</span><span class="badge">${movementVariantLabel(row.stock_variant)}</span>${row.barcode ? `<span class="badge">Barkod: ${escapeHtml(row.barcode)}</span>` : ""}<span class="badge">İşlem sonrası: ${Number(row.stock_after || 0)}</span></div>
      ${row.note ? `<p class="muted movementNote">${escapeHtml(row.note)}</p>` : ""}
    </div>`).join("") || `<p class="muted">Bu aralıkta hareket kaydı yok.</p>`;
  if(rows.length > visibleRows.length) $("movementList").insertAdjacentHTML("beforeend", `<p class="muted">İlk ${visibleRows.length} hareket gösteriliyor. Tamamı için CSV indir.</p>`);
}

async function loadMovements(){
  if(!adminUnlocked || !adminPinSession) return;
  const fromDate = new Date($("movementFrom").value);
  const toDate = new Date($("movementTo").value);
  if(Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime()) || fromDate >= toDate){
    toast("Geçerli bir başlangıç ve bitiş tarihi seç.");
    return;
  }
  const button = $("btnLoadMovements");
  setButtonLoading(button, true, "Rapor hazırlanıyor...");
  try{
    const { data, error } = await supabaseClient.rpc("get_depo_stock_movements", {
      p_admin_pin:adminPinSession,
      p_from:fromDate.toISOString(),
      p_to:toDate.toISOString(),
      p_personnel:null
    });
    if(error) throw new Error(error.message);
    movementRows = data || [];
    renderMovementReport();
  }catch(error){
    toast("Hareketler alınamadı: " + error.message);
  }finally{
    setButtonLoading(button, false);
  }
}

function exportMovementsCsv(){
  const rows = filteredMovements();
  if(!rows.length){
    toast("İndirilecek hareket kaydı yok.");
    return;
  }
  const csvCell = value => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const lines = [["Tarih", "Personel", "Ürün", "Barkod", "İşlem", "Stok Türü", "Adet", "Önceki Stok", "Sonraki Stok", "Not"]];
  rows.forEach(row => lines.push([
    formatMovementDate(row.created_at), row.personnel_name, row.product_name, row.barcode,
    movementTypeLabel(row.movement_type), movementVariantLabel(row.stock_variant), row.quantity,
    row.stock_before, row.stock_after, row.note
  ]));
  const blob = new Blob(["\ufeff" + lines.map(line => line.map(csvCell).join(";")).join("\r\n")], { type:"text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `personel-hareketleri-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function openImageModal(url){
  if(!url) return;
  $("modalImage").src = url;
  $("imageModal").classList.remove("hidden");
  if(!imageModalHistoryActive){
    history.pushState({ koliImageModal:true }, "");
    imageModalHistoryActive = true;
  }
}

function closeImageModal(){
  if(imageModalHistoryActive){
    history.back();
    return;
  }
  hideImageModal();
}

function hideImageModal(){
  $("imageModal").classList.add("hidden");
  $("modalImage").src = "";
  imageModalHistoryActive = false;
}

function handleDataAction(target){
  const actionElement = target.closest("[data-action]");
  if(!actionElement) return;
  const action = actionElement.dataset.action;
  if(action === "stock-in") openOperationModal(actionElement.dataset.id, 1);
  if(action === "stock-out") openOperationModal(actionElement.dataset.id, -1);
  if(action === "edit") openEditModal(actionElement.dataset.id);
  if(action === "view-image") openImageModal(actionElement.dataset.imageUrl);
  if(action === "save-personnel-tabs") savePersonnelTabs(actionElement.dataset.id);
  if(action === "set-personnel-pin") setPersonnelPin(actionElement.dataset.id);
  if(action === "toggle-personnel-active") togglePersonnelActive(actionElement.dataset.id, actionElement.dataset.active === "true");
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

  $("btnProfile").addEventListener("click", () => openPersonnelModal(true));
  $("btnChangePersonnel").addEventListener("click", () => openPersonnelModal(true));
  $("btnSavePersonnel").addEventListener("click", savePersonnelProfile);
  $("btnCancelPersonnel").addEventListener("click", closePersonnelModal);
  $("personnelNameInput").addEventListener("keydown", event => { if(event.key === "Enter") savePersonnelProfile(); });
  $("personnelPinInput").addEventListener("keydown", event => { if(event.key === "Enter") savePersonnelProfile(); });

  $("btnAdminEntry").addEventListener("click", () => adminUnlocked ? adminLogout() : openAdminModal());
  $("btnCloseAdminModal").addEventListener("click", closeAdminModal);
  $("btnCancelAdminLogin").addEventListener("click", closeAdminModal);
  $("adminModal").addEventListener("click", event => { if(event.target.id === "adminModal") closeAdminModal(); });

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
  $("btnBarcodeFind").addEventListener("click", () => findBarcodeProduct($("barcodeSearch").value));
  $("barcodeSearch").addEventListener("keydown", event => { if(event.key === "Enter") findBarcodeProduct(event.target.value); });
  $("btnBarcodeCamera").addEventListener("click", openBarcodeScanner);
  $("btnCloseScanner").addEventListener("click", closeBarcodeScanner);
  $("scannerModal").addEventListener("click", event => { if(event.target.id === "scannerModal") closeBarcodeScanner(); });
  $("btnBoxSearch").addEventListener("click", () => renderBoxes($("boxSearch").value.trim()));
  $("boxSearch").addEventListener("keydown", event => { if(event.key === "Enter") renderBoxes($("boxSearch").value.trim()); });
  $("btnPayment").addEventListener("click", savePayment);

  $("btnAdminLogin").addEventListener("click", adminLogin);
  $("adminPin").addEventListener("keydown", event => { if(event.key === "Enter") adminLogin(); });
  $("btnChangeAdminPin").addEventListener("click", changeAdminPin);
  $("btnLoadPersonnel").addEventListener("click", loadPersonnelAdmin);
  $("btnToggleRegistration").addEventListener("click", togglePersonnelRegistration);
  $("btnToday").addEventListener("click", () => setReportPeriod("today"));
  $("btnThisWeek").addEventListener("click", () => setReportPeriod("week"));
  $("btnLoadMovements").addEventListener("click", loadMovements);
  $("movementPersonnel").addEventListener("change", renderMovementReport);
  $("btnExportMovements").addEventListener("click", exportMovementsCsv);

  document.querySelectorAll("[data-theme-choice]").forEach(button => {
    button.addEventListener("click", () => {
      applyTheme(button.dataset.themeChoice);
      toast(t("themeSaved"));
    });
  });

  document.querySelectorAll("[data-language-choice]").forEach(button => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.languageChoice);
      toast(t("languageSaved"));
    });
  });

  document.addEventListener("click", event => handleDataAction(event.target));
  window.addEventListener("popstate", () => {
    if(imageModalHistoryActive) hideImageModal();
  });
  document.addEventListener("keydown", event => {
    if((event.key === "Enter" || event.key === " ") && event.target.matches('[data-action="view-image"]')){
      event.preventDefault();
      handleDataAction(event.target);
    }
    if(event.key === "Escape"){
      if(!$("scannerModal").classList.contains("hidden")) closeBarcodeScanner();
      else if(!$("adminModal").classList.contains("hidden")) closeAdminModal();
      else if(!$("operationModal").classList.contains("hidden")) closeOperationModal();
      else if(!$("editModal").classList.contains("hidden")) closeEditModal();
      else if(!$("imageModal").classList.contains("hidden")) closeImageModal();
      else if(!$("personnelModal").classList.contains("hidden")) closePersonnelModal();
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
setLanguage(currentLanguage, false);
initPersonnelProfile();
setupEvents();
setReportPeriod("today");
initSupabase();
checkUpdateButton();
