const APP_VERSION = "2.14.0";
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

const FIXED_ADMIN_NAME = "SchEAx";
const DEFAULT_PERSONNEL_TABS = ["islem", "ayar"];
const ADMIN_ONLY_TABS = ["personel", "hareket"];
const GRANTABLE_TABS = ["urun", "liste", "koli", "odeme"];
const BULK_STOCK_PERMISSION = "toplu_stok";
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
    appTitle:"🖥️ Ekran & Çerçeve", appSubtitle:"Ekran & Çerçeve stok sistemi",
    adminLogin:"Admini Etkinleştir", adminLogout:"Sabit Admin", fixedAdmin:"Sabit Admin", personnel:"Personel", admin:"Admin",
    tabProduct:"Ürün Ekle", tabOperation:"Stok Giriş / Çıkış", tabStockList:"Stok Listesi", tabBoxes:"Koli Yönetimi", tabPayments:"Ödemeler", tabPersonnel:"Personeller", tabMovements:"Hareketler", tabSettings:"Ayarlar",
    operationTitle:"Stok Giriş / Çıkış", operationHint:"Ürünü bul veya barkodu kamerayla okut. Normal personel işlemleri 1 adettir; Toplu Stok Giriş / Çıkış yetkisi verilen personel adet seçebilir.",
    quickBarcode:"⚡ Barkodla Hızlı İşlem", quickBarcodeHint:"Telefon kamerasıyla okut; ürün penceresinden Giriş veya Çıkış seç. Toplu stok yetkisi olmayan personelde işlem 1 adettir; yetkili personel adet seçebilir.", barcodePlaceholder:"Barkodu okut veya numarayı yaz", findProduct:"Ürünü Bul", scanCamera:"📷 Kamera ile Tara",
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
    locationSelectTitle:"Koli / Raf Seç", locationSelectHint:"Bu barkod birden fazla konumda kayıtlı. İşlem yapacağın koli veya rafı seç.", locationCount:"{count} konum", selectLocationFirst:"Önce işlem yapılacak koli / rafı seç.", barcodeTotalStock:"Barkod Toplamı", selectedLocationStock:"Seçili Konum",
    themeSaved:"Tema kaydedildi.", languageSaved:"Dil kaydedildi."
  },
  ar:{
    appTitle:"🖥️ Ekran & Çerçeve", appSubtitle:"نظام مخزون الشاشات والإطارات",
    adminLogin:"تفعيل المدير", adminLogout:"مدير ثابت", fixedAdmin:"مدير ثابت", personnel:"موظف", admin:"مدير",
    tabProduct:"إضافة منتج", tabOperation:"إدخال / إخراج المخزون", tabStockList:"قائمة المخزون", tabBoxes:"إدارة الصناديق", tabPayments:"المدفوعات", tabPersonnel:"الموظفون", tabMovements:"الحركات", tabSettings:"الإعدادات",
    operationTitle:"إدخال / إخراج المخزون", operationHint:"ابحث عن المنتج أو امسح الباركود بالكاميرا. الموظف العادي يسجل قطعة واحدة؛ ومن لديه صلاحية الإدخال/الإخراج الجماعي يمكنه تحديد الكمية.",
    quickBarcode:"⚡ عملية سريعة بالباركود", quickBarcodeHint:"امسح بالكاميرا ثم اختر إدخال أو إخراج. بدون صلاحية المخزون الجماعي تكون العملية قطعة واحدة؛ ومع الصلاحية يمكن تحديد الكمية.", barcodePlaceholder:"امسح الباركود أو اكتب الرقم", findProduct:"البحث عن المنتج", scanCamera:"📷 المسح بالكاميرا",
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
    locationSelectTitle:"اختر الصندوق / الرف", locationSelectHint:"هذا الباركود موجود في أكثر من موقع. اختر الصندوق أو الرف الذي ستجري عليه العملية.", locationCount:"{count} مواقع", selectLocationFirst:"اختر الصندوق / الرف أولاً.", barcodeTotalStock:"إجمالي الباركود", selectedLocationStock:"الموقع المحدد",
    themeSaved:"تم حفظ اللون.", languageSaved:"تم حفظ اللغة."
  }
};

let supabaseClient = null;
let allItems = [];
let barcodeStockSummaryMap = new Map();
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
let scannerZxingReader = null;
let scannerZxingControls = null;
let scannerMode = "";
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

function isFixedAdminName(name = currentPersonnelName){
  return normalize(name).replace(/\s+/g, "") === normalize(FIXED_ADMIN_NAME).replace(/\s+/g, "");
}

function isFixedAdminPersonnel(){
  return Boolean(currentPersonnelName && isFixedAdminName(currentPersonnelName));
}

function refreshPermissionSensitiveUi(){
  if(!allItems.length) return;
  const query = normalize($("searchInput")?.value?.trim() || "");
  const list = query ? allItems.filter(item => itemSearchText(item).includes(query)) : allItems;
  renderList(list);
}

function updateProfileUi(){
  const name = currentPersonnelName || t("personnel");
  const fixedAdmin = isFixedAdminPersonnel();
  $("profileName").textContent = name;
  $("profileRole").textContent = adminUnlocked ? t("admin") : t("personnel");
  $("settingsPersonnelName").textContent = name;

  // SchEAx sabit admindir. Ayrı Admin Çıkışı yoktur; diğer personeller admin düğmesini hiç görmez.
  $("adminChangePinArea")?.classList.add("hidden");
  const adminButton = $("btnAdminEntry");
  if(adminButton){
    adminButton.classList.toggle("hidden", !fixedAdmin);
    adminButton.classList.toggle("adminActive", adminUnlocked);
    adminButton.classList.toggle("fixedAdminActive", adminUnlocked);
    adminButton.querySelector("span").textContent = adminUnlocked ? "👑" : "🔐";
    adminButton.querySelector("b").textContent = adminUnlocked ? t("fixedAdmin") : t("adminLogin");
  }

  applyTabPermissions();
  syncAdminStockUi();
  refreshPermissionSensitiveUi();
}


async function loadCurrentBulkStockPermission(name = currentPersonnelName, pin = currentPersonnelPin){
  if(!supabaseClient || !name || !pin || isFixedAdminName(name)) return isFixedAdminName(name);
  try{
    const { data, error } = await supabaseClient.rpc("get_depo_bulk_stock_permission", {
      p_personnel_name:name,
      p_personnel_pin:pin
    });
    if(error) throw new Error(error.message);
    return data === true;
  }catch(error){
    console.warn("Toplu stok yetkisi okunamadı:", error.message);
    return false;
  }
}

function canUseBulkStock(){
  return adminUnlocked || currentAllowedTabs.has(BULK_STOCK_PERMISSION);
}

function syncAdminStockUi(){
  const bulkStockAllowed = canUseBulkStock();
  $("operationAmountWrap")?.classList.toggle("hidden", !bulkStockAllowed);
  $("operationSingleUnitHint")?.classList.toggle("hidden", bulkStockAllowed);
  $("barcodeAdminAmountWrap")?.classList.toggle("hidden", !bulkStockAllowed);
  $("barcodePersonnelAmountHint")?.classList.toggle("hidden", bulkStockAllowed);
  if($("btnImportStockExcel")) $("btnImportStockExcel").classList.toggle("hidden", !adminUnlocked);

  // Ürün düzenleme ekranından stoğu elle değiştirmek ve Excel toplu yüklemek hâlâ yalnızca Sabit Admin içindir.
  const stockInputs = [$("editSocketQuantity"), $("editNoSocketQuantity"), $("editQuantity")].filter(Boolean);
  stockInputs.forEach(input => { input.disabled = !adminUnlocked; });
  $("editStockAdminNote")?.classList.toggle("hidden", adminUnlocked);
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
    // Personel değişirken önceki admin oturumunu taşıma.
    adminUnlocked = false;
    adminPinSession = "";
    const loggedIn = await syncPersonnelProfile(name, pin);
    if(!loggedIn) return;
    currentPersonnelName = name;
    currentPersonnelPin = pin;
    localStorage.setItem("koli_personnel_name", name);
    $("personnelModal").classList.add("hidden");
    await syncFixedAdminState(true);
    updateProfileUi();
    switchTab("islem");
    toast(adminUnlocked ? `${name} sabit admin olarak giriş yaptı.` : t("loginWelcome", { name }));
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
    currentAllowedTabs = new Set([
      ...DEFAULT_PERSONNEL_TABS,
      ...allowed.filter(tab => GRANTABLE_TABS.includes(tab))
    ]);
    const bulkAllowed = await loadCurrentBulkStockPermission(name, pin);
    if(bulkAllowed) currentAllowedTabs.add(BULK_STOCK_PERMISSION);
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

function rebuildBarcodeStockSummaryMap(){
  barcodeStockSummaryMap = new Map();
  allItems.forEach(item => {
    const code = cleanBarcode(item.barcode);
    if(!code) return;
    const current = barcodeStockSummaryMap.get(code) || { total:0, socket:0, noSocket:0, locations:0 };
    current.total += itemTotal(item);
    current.socket += Number(item.socket_quantity || 0);
    current.noSocket += Number(item.no_socket_quantity || 0);
    current.locations += 1;
    barcodeStockSummaryMap.set(code, current);
  });
}

function barcodeStockSummary(itemOrCode){
  const code = cleanBarcode(typeof itemOrCode === "string" ? itemOrCode : itemOrCode?.barcode);
  if(!code) return null;
  return barcodeStockSummaryMap.get(code) || null;
}

function barcodeTotalBadgeHtml(item){
  const summary = barcodeStockSummary(item);
  if(!summary || summary.locations <= 1) return "";
  return `<span class="badge barcodeTotalBadge">${t("barcodeTotalStock")}: ${summary.total}</span>`;
}

function barcodeAggregateStockHtml(itemOrCode){
  const summary = barcodeStockSummary(itemOrCode);
  if(!summary) return "";
  const code = cleanBarcode(typeof itemOrCode === "string" ? itemOrCode : itemOrCode?.barcode);
  const groupItems = allItems.filter(item => cleanBarcode(item.barcode) === code);
  const isFrameGroup = groupItems.length > 0 && groupItems.every(item => item.product_type === "cerceve");
  if(isFrameGroup){
    return `<span class="badge">${t("barcodeTotalStock")}: ${summary.total}</span><span class="badge">${t("withSocket")}: ${summary.socket}</span><span class="badge">${t("withoutSocket")}: ${summary.noSocket}</span><span class="badge">${t("locationCount", {count:summary.locations})}</span>`;
  }
  return `<span class="badge">${t("barcodeTotalStock")}: ${summary.total}</span><span class="badge">${t("locationCount", {count:summary.locations})}</span>`;
}

function itemExtra(item){
  if(item.product_type === "cerceve"){
    return [item.vehicle_brand, item.vehicle_model, item.vehicle_year, item.screen_inch ? `${item.screen_inch}\"` : ""]
      .filter(Boolean)
      .join(" ");
  }
  if(item.product_type === "multimedya"){
    return [item.media_brand, item.ram ? `RAM: ${item.ram}` : "", item.storage ? `Hafıza: ${item.storage}` : "", item.screen_inch ? `${item.screen_inch}\"` : ""]
      .filter(Boolean)
      .join(" • ");
  }
  return [
    item.vehicle_brand, item.vehicle_model, item.vehicle_year,
    item.media_brand, item.ram ? `RAM: ${item.ram}` : "",
    item.storage ? `Hafıza: ${item.storage}` : "",
    item.screen_inch ? `${item.screen_inch}\"` : ""
  ].filter(Boolean).join(" • ");
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
  const typeLabel = productTypeDisplayLabel(item.product_type);
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
        ${barcodeTotalBadgeHtml(item)}
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
        ${barcodeTotalBadgeHtml(item)}
      </div>
      <div class="stockActions">
        <button type="button" class="stockIn" data-action="stock-in" data-id="${id}">${t("stockIn")}</button>
        <button type="button" class="stockOut" data-action="stock-out" data-id="${id}">${t("stockOut")}</button>
      </div>
    </div>`;
}

function syncDynamicProductTypes(){
  const customTypes = [...new Set(
    allItems
      .map(item => String(item.product_type || "").trim())
      .filter(type => type && type !== "cerceve" && type !== "multimedya")
  )].sort((a, b) => productTypeDisplayLabel(a).localeCompare(productTypeDisplayLabel(b), "tr", {sensitivity:"base"}));

  const syncSelect = (select, includeAll = false) => {
    if(!select) return;
    const current = select.value;
    select.querySelectorAll('option[data-dynamic-product-type="true"]').forEach(option => option.remove());
    for(const type of customTypes){
      const option = document.createElement("option");
      option.value = type;
      option.textContent = productTypeDisplayLabel(type);
      option.dataset.dynamicProductType = "true";
      select.appendChild(option);
    }
    if([...select.options].some(option => option.value === current)) select.value = current;
    else if(includeAll) select.value = "tum";
  };

  // Excel'den oluşturulan yeni ürün tipleri hem filtrede hem de Ürün Ekle ekranında tekrar seçilebilir.
  syncSelect($("productType"));
  syncSelect($("operationTypeFilter"), true);
}

async function fetchAllItems(){
  if(!supabaseClient) return [];
  const pageSize = 1000;
  const rows = [];
  let from = 0;

  while(true){
    const { data, error } = await supabaseClient
      .from("depo_items")
      .select("*")
      .order("created_at", { ascending:false })
      .range(from, from + pageSize - 1);

    if(error) throw new Error(error.message);
    const page = data || [];
    rows.push(...page);
    if(page.length < pageSize) break;
    from += pageSize;
  }

  return rows;
}

async function loadAll(){
  if(!supabaseClient) return;
  try{
    allItems = await fetchAllItems();
  }catch(error){
    toast("Stok çekilemedi: " + error.message);
    return;
  }

  rebuildBarcodeStockSummaryMap();
  syncDynamicProductTypes();
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

const BARCODE_TOTAL_EXCEL_COLUMNS = [
  "Barkod",
  "Toplam Stok",
  "Konum Sayısı",
  "Ürün Tipi",
  "Ürün Adı",
  "Koli No",
  "Raf Konumu",
  "Soketli Stok",
  "Soketsiz Stok",
  "Araç Markası",
  "Araç Modeli",
  "Model Yılı",
  "Soket Durumu",
  "Multimedya Markası",
  "RAM",
  "Hafıza",
  "Ekran İnç",
  "Not",
  "Resim URL"
];

const STOCK_EXCEL_COLUMNS = [
  ["ID (DOKUNMA)", "id"],
  ["Barkod", "barcode"],
  ["Ürün Tipi", "product_type"],
  ["Ürün Adı", "product_name"],
  ["Koli No", "box_no"],
  ["Raf Konumu", "shelf_location"],
  ["Toplam Stok", "total_stock"],
  ["Soketli Stok", "socket_quantity"],
  ["Soketsiz Stok", "no_socket_quantity"],
  ["Araç Markası", "vehicle_brand"],
  ["Araç Modeli", "vehicle_model"],
  ["Model Yılı", "vehicle_year"],
  ["Soket Durumu", "socket_included"],
  ["Multimedya Markası", "media_brand"],
  ["RAM", "ram"],
  ["Hafıza", "storage"],
  ["Ekran İnç", "screen_inch"],
  ["Not", "note"],
  ["Resim URL", "image_url"]
];

function excelCellText(value){
  if(value === null || value === undefined) return "";
  return String(value);
}

function productTypeDisplayLabel(type){
  const value = String(type || "").trim();
  if(value === "cerceve") return t("frame");
  if(value === "multimedya") return t("multimedia");
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/(^|\s)([^\s])/g, (match, prefix, char) => prefix + char.toLocaleUpperCase("tr-TR"));
}

function productTypeExcelLabel(type){
  if(type === "cerceve") return "Çerçeve";
  if(type === "multimedya") return "Multimedya";
  return productTypeDisplayLabel(type);
}

function normalizeExcelHeader(value){
  return normalize(String(value || "").trim())
    .replace(/[()]/g, "")
    .replace(/\s+/g, " ");
}

function normalizeExcelProductType(value){
  const raw = String(value || "").trim().replace(/\s+/g, " ");
  const text = normalize(raw);
  if(["çerçeve", "cerceve", "frame"].includes(text)) return "cerceve";
  if(["multimedya", "multimedia", "ekran", "media"].includes(text)) return "multimedya";
  // Çerçeve / Multimedya dışındaki yeni tipleri de otomatik kabul et.
  // Örn: Hayalet Ekran -> "hayalet ekran" olarak saklanır ve sonraki listelerde seçenek olur.
  return text;
}

function normalizeExcelSocketIncluded(value){
  const text = normalize(String(value || "").trim());
  if(!text) return null;
  if(["var", "evet", "yes", "1"].includes(text)) return "var";
  if(["yok", "hayır", "hayir", "no", "0"].includes(text)) return "yok";
  return String(value).trim();
}

function excelNonNegativeInteger(value, fieldName, rowNumber){
  if(value === "" || value === null || value === undefined) return 0;
  const number = Number(value);
  if(!Number.isInteger(number) || number < 0){
    throw new Error(`${rowNumber}. satırdaki "${fieldName}" 0 veya daha büyük tam sayı olmalı.`);
  }
  return number;
}

function setExcelStatus(message){
  if($("excelStatus")) $("excelStatus").textContent = message || "";
}

async function exportStockExcel(){
  if(!canUseTab("liste")){
    toast("Stok Listesi sekmesi için yetkin bulunmuyor.");
    return;
  }
  if(!window.XLSX){
    toast("Excel modülü yüklenemedi. İnternet bağlantısını kontrol edip sayfayı yenile.");
    return;
  }
  if(!supabaseClient){
    toast("Supabase bağlantısı hazır değil.");
    return;
  }

  const button = $("btnExportStockExcel");
  setButtonLoading(button, true, "Hazırlanıyor...");
  setExcelStatus("Tüm stoklar hazırlanıyor...");
  try{
    const items = await fetchAllItems();
    const rows = items.map(item => ({
      "ID (DOKUNMA)": excelCellText(item.id),
      "Barkod": excelCellText(item.barcode),
      "Ürün Tipi": productTypeExcelLabel(item.product_type),
      "Ürün Adı": excelCellText(item.product_name),
      "Koli No": excelCellText(item.box_no),
      "Raf Konumu": excelCellText(item.shelf_location),
      "Toplam Stok": itemTotal(item),
      "Soketli Stok": item.product_type === "cerceve" ? Number(item.socket_quantity || 0) : "",
      "Soketsiz Stok": item.product_type === "cerceve" ? Number(item.no_socket_quantity || 0) : "",
      "Araç Markası": excelCellText(item.vehicle_brand),
      "Araç Modeli": excelCellText(item.vehicle_model),
      "Model Yılı": excelCellText(item.vehicle_year),
      "Soket Durumu": excelCellText(item.socket_included),
      "Multimedya Markası": excelCellText(item.media_brand),
      "RAM": excelCellText(item.ram),
      "Hafıza": excelCellText(item.storage),
      "Ekran İnç": excelCellText(item.screen_inch),
      "Not": excelCellText(item.note),
      "Resim URL": excelCellText(item.image_url)
    }));

    const sheet = XLSX.utils.json_to_sheet(rows, { header:STOCK_EXCEL_COLUMNS.map(([header]) => header) });
    sheet["!cols"] = [
      {wch:38},{wch:20},{wch:14},{wch:34},{wch:14},{wch:18},{wch:13},{wch:13},{wch:15},
      {wch:18},{wch:22},{wch:15},{wch:15},{wch:22},{wch:12},{wch:14},{wch:12},{wch:35},{wch:45}
    ];

    // ID ve Barkod sütunlarını metin tut. Özellikle başında 0 olan barkodların Excel'de bozulmasını önler.
    const range = XLSX.utils.decode_range(sheet["!ref"] || "A1:A1");
    for(let r = 1; r <= range.e.r; r++){
      for(const c of [0, 1]){
        const address = XLSX.utils.encode_cell({r, c});
        if(sheet[address]){
          sheet[address].t = "s";
          sheet[address].v = String(sheet[address].v ?? "");
          sheet[address].z = "@";
        }
      }
    }

    const infoRows = [
      ["Ekran & Çerçeve - Excel Kullanımı"],
      ["1", "ID (DOKUNMA) sütununu değiştirme veya silme. Mevcut kaydı bulmak için kullanılır."],
      ["2", "Toplu barkod vermek için yalnızca Barkod sütununu doldurman yeterli."],
      ["3", "Aynı ürün farklı koli/raflarda ise aynı barkodu birden fazla satırda kullanabilirsin. Barkod okutunca konum seçilir."],
      ["4", "Farklı ürünlere yanlışlıkla aynı barkodu vermemeye dikkat et; program aynı barkodun tüm konumlarını birlikte gösterecektir."],
      ["5", "Mevcut stok miktarlarını Excel'de değiştirirsen farklar stok hareketi olarak kaydedilir."],
      ["6", "Yeni ürün eklemek istersen ID'yi boş bırak; Ürün Tipi, Ürün Adı ve Koli No alanlarını doldur."],
      ["7", "Ürün Tipi serbesttir. Çerçeve ve Multimedya dışında Hayalet Ekran, Kamera vb. yeni bir tip yazarsan otomatik oluşturulur."]
    ];
    const infoSheet = XLSX.utils.aoa_to_sheet(infoRows);
    infoSheet["!cols"] = [{wch:10},{wch:100}];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "Stoklar");
    XLSX.utils.book_append_sheet(workbook, infoSheet, "Kullanım");
    const today = new Date().toISOString().slice(0,10);
    XLSX.writeFile(workbook, `Ekran-Cerceve-Stok-${today}.xlsx`);
    setExcelStatus(`${items.length.toLocaleString("tr-TR")} kayıt Excel'e aktarıldı.`);
    toast("Stok Excel dosyası indirildi. Barkod sütununu topluca düzenleyebilirsin.");
  }catch(error){
    setExcelStatus("");
    toast("Excel indirilemedi: " + error.message);
  }finally{
    setButtonLoading(button, false);
  }
}

async function exportBarcodeTotalExcel(){
  if(!canUseTab("liste")){
    toast("Stok Listesi sekmesi için yetkin bulunmuyor.");
    return;
  }
  if(!window.XLSX){
    toast("Excel modülü yüklenemedi. İnternet bağlantısını kontrol edip sayfayı yenile.");
    return;
  }
  if(!supabaseClient){
    toast("Supabase bağlantısı hazır değil.");
    return;
  }

  const button = $("btnExportBarcodeTotalExcel");
  setButtonLoading(button, true, "Hazırlanıyor...");
  setExcelStatus("Barkod toplamları hazırlanıyor...");
  try{
    const items = await fetchAllItems();
    const groups = new Map();

    for(const item of items){
      const barcode = cleanBarcode(item.barcode);
      if(!barcode) continue;
      let group = groups.get(barcode);
      if(!group){
        group = {
          representative:item,
          total:0,
          socket:0,
          noSocket:0,
          locations:0
        };
        groups.set(barcode, group);
      }
      group.total += itemTotal(item);
      group.socket += Number(item.socket_quantity || 0);
      group.noSocket += Number(item.no_socket_quantity || 0);
      group.locations += 1;
    }

    const rows = [...groups.entries()]
      .sort(([a], [b]) => a.localeCompare(b, "tr", {numeric:true, sensitivity:"base"}))
      .map(([barcode, group]) => {
        const item = group.representative;
        return {
          "Barkod": excelCellText(barcode),
          "Toplam Stok": group.total,
          "Konum Sayısı": group.locations,
          "Ürün Tipi": productTypeExcelLabel(item.product_type),
          "Ürün Adı": excelCellText(item.product_name),
          "Koli No": excelCellText(item.box_no),
          "Raf Konumu": excelCellText(item.shelf_location),
          "Soketli Stok": item.product_type === "cerceve" ? group.socket : "",
          "Soketsiz Stok": item.product_type === "cerceve" ? group.noSocket : "",
          "Araç Markası": excelCellText(item.vehicle_brand),
          "Araç Modeli": excelCellText(item.vehicle_model),
          "Model Yılı": excelCellText(item.vehicle_year),
          "Soket Durumu": excelCellText(item.socket_included),
          "Multimedya Markası": excelCellText(item.media_brand),
          "RAM": excelCellText(item.ram),
          "Hafıza": excelCellText(item.storage),
          "Ekran İnç": excelCellText(item.screen_inch),
          "Not": excelCellText(item.note),
          "Resim URL": excelCellText(item.image_url)
        };
      });

    if(!rows.length){
      throw new Error("Barkod atanmış ürün bulunamadı.");
    }

    const sheet = XLSX.utils.json_to_sheet(rows, { header:BARCODE_TOTAL_EXCEL_COLUMNS });
    sheet["!cols"] = [
      {wch:20},{wch:13},{wch:13},{wch:14},{wch:34},{wch:14},{wch:18},{wch:13},{wch:15},
      {wch:18},{wch:22},{wch:15},{wch:15},{wch:22},{wch:12},{wch:14},{wch:12},{wch:35},{wch:45}
    ];

    // Barkodu metin tut; GI000001 gibi değerler olduğu gibi kalsın.
    const range = XLSX.utils.decode_range(sheet["!ref"] || "A1:A1");
    for(let r = 1; r <= range.e.r; r++){
      const address = XLSX.utils.encode_cell({r, c:0});
      if(sheet[address]){
        sheet[address].t = "s";
        sheet[address].v = String(sheet[address].v ?? "");
        sheet[address].z = "@";
      }
    }

    const infoRows = [
      ["Ekran & Çerçeve - Toplam Stok Raporu"],
      ["1", "Bu dosyada her barkod yalnızca 1 satırdır."],
      ["2", "Toplam Stok, aynı barkoda bağlı tüm koli/raf kayıtlarının toplamıdır."],
      ["3", "Ürün bilgileri aynı barkod grubundaki ilk kayıttan alınır."],
      ["4", "Çerçevelerde Soketli Stok ve Soketsiz Stok da tüm konumlardan toplanır."],
      ["5", "Bu dosya rapor amaçlıdır; toplu güncelleme için normal Excel İndir dosyasını kullan."]
    ];
    const infoSheet = XLSX.utils.aoa_to_sheet(infoRows);
    infoSheet["!cols"] = [{wch:10},{wch:100}];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "Toplam Stok");
    XLSX.utils.book_append_sheet(workbook, infoSheet, "Bilgi");
    const today = new Date().toISOString().slice(0,10);
    XLSX.writeFile(workbook, `Ekran-Cerceve-Toplam-Stok-${today}.xlsx`);
    setExcelStatus(`${rows.length.toLocaleString("tr-TR")} barkod tekilleştirilerek toplam stok Excel'i indirildi.`);
    toast("Toplam stok Excel dosyası indirildi.");
  }catch(error){
    setExcelStatus("");
    toast("Toplam stok Excel'i indirilemedi: " + error.message);
  }finally{
    setButtonLoading(button, false);
  }
}

function excelHeaderIndexMap(headerRow){
  const map = new Map();
  headerRow.forEach((header, index) => map.set(normalizeExcelHeader(header), index));
  return map;
}

function excelColumnIndex(headerMap, headerName){
  return headerMap.get(normalizeExcelHeader(headerName));
}

function excelHasColumn(headerMap, headerName){
  return excelColumnIndex(headerMap, headerName) !== undefined;
}

function excelValue(row, headerMap, headerName){
  const index = excelColumnIndex(headerMap, headerName);
  return index === undefined ? undefined : row[index];
}

function buildImportedItem(row, rowNumber, headerMap, existingItem){
  const isExisting = Boolean(existingItem);
  const typeCell = excelValue(row, headerMap, "Ürün Tipi");
  const importedType = typeCell === undefined ? (existingItem?.product_type || "") : normalizeExcelProductType(typeCell);
  const productType = importedType || existingItem?.product_type || "";

  if(!productType) throw new Error(`${rowNumber}. satırda Ürün Tipi boş olamaz.`);
  if(isExisting && productType !== existingItem.product_type){
    throw new Error(`${rowNumber}. satırda mevcut ürünün Ürün Tipi Excel'den değiştirilemez.`);
  }

  const base = existingItem ? {...existingItem} : {
    product_type:productType,
    product_name:"",
    barcode:null,
    box_no:"",
    shelf_location:"",
    quantity:0,
    socket_quantity:0,
    no_socket_quantity:0,
    vehicle_brand:null,
    vehicle_model:null,
    vehicle_year:null,
    socket_included:null,
    media_brand:null,
    ram:null,
    storage:null,
    screen_inch:null,
    image_url:null,
    note:""
  };

  base.product_type = productType;
  const setText = (header, field, transform = value => String(value ?? "").trim()) => {
    if(excelHasColumn(headerMap, header)){
      const value = excelValue(row, headerMap, header);
      base[field] = transform(value);
    }
  };

  setText("Ürün Adı", "product_name");
  setText("Barkod", "barcode", value => cleanBarcode(value) || null);
  setText("Koli No", "box_no", value => String(value ?? "").trim().toLocaleUpperCase("tr-TR"));
  setText("Raf Konumu", "shelf_location");
  setText("Araç Markası", "vehicle_brand", value => String(value ?? "").trim() || null);
  setText("Araç Modeli", "vehicle_model", value => String(value ?? "").trim() || null);
  setText("Model Yılı", "vehicle_year", value => String(value ?? "").trim() || null);
  setText("Soket Durumu", "socket_included", normalizeExcelSocketIncluded);
  setText("Multimedya Markası", "media_brand", value => String(value ?? "").trim() || null);
  setText("RAM", "ram", value => String(value ?? "").trim() || null);
  setText("Hafıza", "storage", value => String(value ?? "").trim() || null);
  setText("Ekran İnç", "screen_inch", value => String(value ?? "").trim() || null);
  setText("Not", "note");
  setText("Resim URL", "image_url", value => String(value ?? "").trim() || null);

  if(!base.product_name) throw new Error(`${rowNumber}. satırda Ürün Adı boş olamaz.`);
  if(!base.box_no) throw new Error(`${rowNumber}. satırda Koli No boş olamaz.`);

  let desiredSocket = Number(existingItem?.socket_quantity || 0);
  let desiredNoSocket = Number(existingItem?.no_socket_quantity || 0);
  let desiredQuantity = Number(existingItem?.quantity || 0);

  if(productType === "cerceve"){
    if(excelHasColumn(headerMap, "Soketli Stok")) desiredSocket = excelNonNegativeInteger(excelValue(row, headerMap, "Soketli Stok"), "Soketli Stok", rowNumber);
    if(excelHasColumn(headerMap, "Soketsiz Stok")) desiredNoSocket = excelNonNegativeInteger(excelValue(row, headerMap, "Soketsiz Stok"), "Soketsiz Stok", rowNumber);
    desiredQuantity = 0;
  }else{
    if(excelHasColumn(headerMap, "Toplam Stok")) desiredQuantity = excelNonNegativeInteger(excelValue(row, headerMap, "Toplam Stok"), "Toplam Stok", rowNumber);
    desiredSocket = 0;
    desiredNoSocket = 0;
  }

  const metadata = {
    product_type:base.product_type,
    product_name:base.product_name,
    barcode:base.barcode || null,
    box_no:base.box_no,
    shelf_location:base.shelf_location || "",
    // Özel tiplerde ilgili özel alanlar korunur; serbest tiplerde Excel'de girilen bilgiler silinmez.
    vehicle_brand:base.product_type === "multimedya" ? null : (base.vehicle_brand || null),
    vehicle_model:base.product_type === "multimedya" ? null : (base.vehicle_model || null),
    vehicle_year:base.product_type === "multimedya" ? null : (base.vehicle_year || null),
    socket_included:base.product_type === "multimedya" ? null : (base.socket_included || null),
    media_brand:base.product_type === "cerceve" ? null : (base.media_brand || null),
    ram:base.product_type === "cerceve" ? null : (base.ram || null),
    storage:base.product_type === "cerceve" ? null : (base.storage || null),
    screen_inch:base.screen_inch || null,
    image_url:base.image_url || null,
    note:base.note || ""
  };

  return { metadata, desiredSocket, desiredNoSocket, desiredQuantity };
}

async function applyImportedStockDifference(item, imported){
  if(item.product_type === "cerceve"){
    const socketDiff = imported.desiredSocket - Number(item.socket_quantity || 0);
    const noSocketDiff = imported.desiredNoSocket - Number(item.no_socket_quantity || 0);
    if(socketDiff) await applyStockMovement(item, Math.sign(socketDiff), Math.abs(socketDiff), "socket_quantity", "Excel toplu stok güncellemesi");
    if(noSocketDiff) await applyStockMovement(item, Math.sign(noSocketDiff), Math.abs(noSocketDiff), "no_socket_quantity", "Excel toplu stok güncellemesi");
    return Number(Boolean(socketDiff)) + Number(Boolean(noSocketDiff));
  }

  const quantityDiff = imported.desiredQuantity - Number(item.quantity || 0);
  if(quantityDiff) await applyStockMovement(item, Math.sign(quantityDiff), Math.abs(quantityDiff), "quantity", "Excel toplu stok güncellemesi");
  return Number(Boolean(quantityDiff));
}

async function importStockExcel(file){
  if(!file) return;
  if(!adminUnlocked){
    toast("Excel yükleme ve toplu stok güncelleme yalnızca Admin modunda kullanılabilir.");
    $("stockExcelFile").value = "";
    return;
  }
  if(!canUseTab("urun")){
    toast("Excel yüklemek için Ürün Ekle / Düzenle yetkisi gerekiyor.");
    return;
  }
  if(!window.XLSX){
    toast("Excel modülü yüklenemedi. İnternet bağlantısını kontrol edip sayfayı yenile.");
    return;
  }
  if(!supabaseClient){
    toast("Supabase bağlantısı hazır değil.");
    return;
  }
  try{ await ensurePersonnelActive(); }catch(error){ toast(error.message); return; }

  const button = $("btnImportStockExcel");
  setButtonLoading(button, true, "Yükleniyor...");
  setExcelStatus("Excel okunuyor...");

  try{
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, {type:"array", cellDates:false});
    const sheet = workbook.Sheets["Stoklar"] || workbook.Sheets[workbook.SheetNames[0]];
    if(!sheet) throw new Error("Excel içinde okunabilir sayfa bulunamadı.");

    const matrix = XLSX.utils.sheet_to_json(sheet, {header:1, raw:false, defval:""});
    if(matrix.length < 2) throw new Error("Excel dosyasında güncellenecek kayıt yok.");
    const headerMap = excelHeaderIndexMap(matrix[0]);
    if(!excelHasColumn(headerMap, "ID (DOKUNMA)")) throw new Error('"ID (DOKUNMA)" sütunu bulunamadı. Programdan indirdiğin Excel dosyasını kullan.');

    setExcelStatus("Mevcut stoklar karşılaştırılıyor...");
    const currentItems = await fetchAllItems();
    const currentById = new Map(currentItems.map(item => [String(item.id), item]));
    const importRows = [];
    const errors = [];

    for(let index = 1; index < matrix.length; index++){
      const row = matrix[index];
      if(row.every(value => String(value ?? "").trim() === "")) continue;
      const rowNumber = index + 1;
      try{
        const id = String(excelValue(row, headerMap, "ID (DOKUNMA)") || "").trim();
        const existingItem = id ? currentById.get(id) : null;
        if(id && !existingItem) throw new Error(`${rowNumber}. satırdaki ID sistemde bulunamadı: ${id}`);
        const built = buildImportedItem(row, rowNumber, headerMap, existingItem);
        importRows.push({ rowNumber, id:id || null, existingItem, ...built });
      }catch(error){
        errors.push(error.message);
      }
    }

    if(errors.length){
      const sample = errors.slice(0, 12).join("\n• ");
      throw new Error(`Excel'de ${errors.length} hatalı satır var:\n• ${sample}${errors.length > 12 ? "\n• ..." : ""}`);
    }
    if(!importRows.length) throw new Error("İşlenecek dolu satır bulunamadı.");

    const updateRows = importRows.filter(entry => entry.id);
    const newRows = importRows.filter(entry => !entry.id);
    const stockChangeCount = updateRows.reduce((count, entry) => {
      const item = entry.existingItem;
      if(item.product_type === "cerceve"){
        return count + Number(entry.desiredSocket !== Number(item.socket_quantity || 0)) + Number(entry.desiredNoSocket !== Number(item.no_socket_quantity || 0));
      }
      return count + Number(entry.desiredQuantity !== Number(item.quantity || 0));
    }, 0);

    const confirmed = confirm(
      `${importRows.length.toLocaleString("tr-TR")} satır işlenecek.\n` +
      `• Güncellenecek: ${updateRows.length.toLocaleString("tr-TR")}\n` +
      `• Yeni ürün: ${newRows.length.toLocaleString("tr-TR")}\n` +
      `• Stok farkı işlemi: ${stockChangeCount.toLocaleString("tr-TR")}\n\n` +
      `Devam edilsin mi?`
    );
    if(!confirmed){
      setExcelStatus("Yükleme iptal edildi.");
      return;
    }

    let processed = 0;
    let stockMovements = 0;
    const batchSize = 250;

    // Mevcut ürünlerde barkod ve diğer ürün bilgilerini hızlı şekilde toplu güncelle.
    for(let start = 0; start < updateRows.length; start += batchSize){
      const batchEntries = updateRows.slice(start, start + batchSize);
      const payload = batchEntries.map(entry => ({
        id:entry.id,
        ...entry.metadata,
        quantity:Number(entry.existingItem.quantity || 0),
        socket_quantity:Number(entry.existingItem.socket_quantity || 0),
        no_socket_quantity:Number(entry.existingItem.no_socket_quantity || 0)
      }));
      const { error } = await supabaseClient.from("depo_items").upsert(payload, {onConflict:"id"});
      if(error) throw new Error("Toplu ürün güncellemesi başarısız: " + error.message);
      processed += batchEntries.length;
      setExcelStatus(`${processed.toLocaleString("tr-TR")} / ${importRows.length.toLocaleString("tr-TR")} satır işlendi...`);
    }

    // Stok miktarı değiştirilen mevcut ürünlerde farkı hareket kaydıyla uygula.
    for(const entry of updateRows){
      stockMovements += await applyImportedStockDifference(entry.existingItem, entry);
    }

    // ID'si boş satırlar yeni ürün olarak eklenir. İlk stokları hareket kaydıyla oluşturulur.
    for(const entry of newRows){
      const insertRow = {
        ...entry.metadata,
        quantity:0,
        socket_quantity:0,
        no_socket_quantity:0
      };
      const { data:createdItem, error } = await supabaseClient.from("depo_items").insert(insertRow).select("*").single();
      if(error) throw new Error(`${entry.rowNumber}. satır yeni ürün olarak eklenemedi: ${error.message}`);
      if(createdItem.product_type === "cerceve"){
        if(entry.desiredSocket > 0){ await applyStockMovement(createdItem, 1, entry.desiredSocket, "socket_quantity", "Excel ile yeni ürün ilk stok kaydı"); stockMovements++; }
        if(entry.desiredNoSocket > 0){ await applyStockMovement(createdItem, 1, entry.desiredNoSocket, "no_socket_quantity", "Excel ile yeni ürün ilk stok kaydı"); stockMovements++; }
      }else if(entry.desiredQuantity > 0){
        await applyStockMovement(createdItem, 1, entry.desiredQuantity, "quantity", "Excel ile yeni ürün ilk stok kaydı");
        stockMovements++;
      }
      processed++;
      setExcelStatus(`${processed.toLocaleString("tr-TR")} / ${importRows.length.toLocaleString("tr-TR")} satır işlendi...`);
    }

    await loadAll();
    setExcelStatus(`Tamamlandı: ${updateRows.length.toLocaleString("tr-TR")} güncelleme, ${newRows.length.toLocaleString("tr-TR")} yeni ürün, ${stockMovements.toLocaleString("tr-TR")} stok hareketi.`);
    toast(`Excel yüklendi. ${updateRows.length} kayıt güncellendi, ${newRows.length} yeni ürün eklendi.`);
  }catch(error){
    console.error(error);
    setExcelStatus("Yükleme başarısız.");
    alert(error.message);
    toast("Excel yüklenemedi. Hata ayrıntısını ekranda gösterdim.");
  }finally{
    $("stockExcelFile").value = "";
    setButtonLoading(button, false);
  }
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
  const initialQuantity = type !== "cerceve" ? Number($("quantity").value || 0) : 0;
  if([initialSocketQuantity, initialNoSocketQuantity, initialQuantity].some(value => !Number.isInteger(value) || value < 0)){
    toast("Stok adetleri 0 veya daha büyük tam sayı olmalı.");
    return;
  }
  if(!adminUnlocked && [initialSocketQuantity, initialNoSocketQuantity, initialQuantity].some(value => value > 1)){
    toast("Personel hesabında toplu stok girişi kapalı. Tek işlemde en fazla 1 adet girebilirsin; toplu işlem için Admin girişi yap.");
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
  const isMedia = item.product_type === "multimedya";
  $("editFrameStock").classList.toggle("hidden", !isFrame);
  $("editGeneralStock").classList.toggle("hidden", isFrame);
  $("editFrameDetails").classList.toggle("hidden", !isFrame);
  $("editMediaDetails").classList.toggle("hidden", !isMedia);
  $("editSocketQuantity").value = Number(item.socket_quantity || 0);
  $("editNoSocketQuantity").value = Number(item.no_socket_quantity || 0);
  $("editQuantity").value = Number(item.quantity || 0);

  // Ürün ekleme ekranındaki alt detayların tamamı düzenleme ekranında da değiştirilebilir.
  $("editVehicleBrand").value = item.vehicle_brand || "";
  $("editVehicleModel").value = item.vehicle_model || "";
  $("editVehicleYear").value = item.vehicle_year || "";
  $("editScreenInchFrame").value = isFrame ? (item.screen_inch || "") : "";
  $("editSocketIncluded").value = item.socket_included === "yok" ? "yok" : "var";
  $("editMediaBrand").value = item.media_brand || "";
  $("editRam").value = item.ram || "";
  $("editStorage").value = item.storage || "";
  $("editScreenInchMedia").value = isMedia ? (item.screen_inch || "") : "";
  syncAdminStockUi();

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
  if(!Number.isInteger(Number(amount)) || Number(amount) <= 0) throw new Error("Stok adedi 1 veya daha büyük tam sayı olmalı.");
  if(!canUseBulkStock() && Number(amount) !== 1){
    throw new Error("Bu personelde Toplu Stok Giriş / Çıkış yetkisi kapalıdır. Her işlem 1 adet olarak kaydedilir.");
  }
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

  // Ürün tipine özel alt bilgileri de Supabase'e kaydet.
  if(item.product_type === "cerceve"){
    updates.vehicle_brand = $("editVehicleBrand").value.trim() || null;
    updates.vehicle_model = $("editVehicleModel").value.trim() || null;
    updates.vehicle_year = $("editVehicleYear").value.trim() || null;
    updates.screen_inch = $("editScreenInchFrame").value.trim() || null;
    updates.socket_included = $("editSocketIncluded").value || null;
  }else if(item.product_type === "multimedya"){
    updates.media_brand = $("editMediaBrand").value.trim() || null;
    updates.ram = $("editRam").value.trim() || null;
    updates.storage = $("editStorage").value.trim() || null;
    updates.screen_inch = $("editScreenInchMedia").value.trim() || null;
  }

  if(!updates.product_name || !updates.box_no){
    toast("Ürün adı ve koli no boş bırakılamaz.");
    return;
  }

  const stockChanges = [];
  if(adminUnlocked){
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
  syncAdminStockUi();

  const confirmButton = $("btnConfirmOperation");
  confirmButton.textContent = isStockIn ? t("saveStockIn") : t("saveStockOut");
  confirmButton.className = isStockIn ? "stockIn" : "stockOut";
  $("operationModal").classList.remove("hidden");
  setTimeout(() => (canUseBulkStock() ? $("operationAmount") : confirmButton).focus(), 50);
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
  const amount = canUseBulkStock() ? Number($("operationAmount").value) : 1;
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

function barcodeLocationLabel(item){
  const box = item.box_no || "-";
  const shelf = item.shelf_location || "-";
  return `${t("box")}: ${box} • ${t("shelf")}: ${shelf}`;
}

function barcodeLocationStockSummary(item){
  if(item.product_type === "cerceve"){
    return `${t("withSocket")}: ${Number(item.socket_quantity || 0)} • ${t("withoutSocket")}: ${Number(item.no_socket_quantity || 0)} • ${t("total")}: ${itemTotal(item)}`;
  }
  return `${t("stock")}: ${itemTotal(item)}`;
}

function setBarcodeActionEnabled(enabled){
  $("btnBarcodeStockIn").disabled = !enabled;
  $("btnBarcodeStockOut").disabled = !enabled;
  $("barcodeActionFrameType").disabled = !enabled;
  $("barcodeActionAmount").disabled = !enabled;
}

function selectBarcodeLocation(id){
  const item = findItem(id);
  if(!item) return;

  $("barcodeActionItemId").value = item.id;
  $("barcodeActionProductName").textContent = item.product_name || "Ürün";
  $("barcodeActionMeta").textContent = `Barkod: ${item.barcode || "-"} • ${barcodeLocationLabel(item)}`;
  const summary = barcodeStockSummary(item);
  $("barcodeActionStock").innerHTML = `${operationStockHtml(item)}${summary?.locations > 1 ? `<span class="badge barcodeTotalBadge">${t("barcodeTotalStock")}: ${summary.total}</span>` : ""}`;
  $("barcodeActionFrameTypeWrap").classList.toggle("hidden", item.product_type !== "cerceve");
  $("barcodeActionFrameType").value = "socket_quantity";
  $("barcodeActionAmount").value = 1;
  setBarcodeActionEnabled(true);
  syncAdminStockUi();

  document.querySelectorAll("#barcodeLocationList [data-barcode-location-id]").forEach(button => {
    button.classList.toggle("active", String(button.dataset.barcodeLocationId) === String(item.id));
  });
}

function renderBarcodeLocations(matches){
  const list = $("barcodeLocationList");
  if(!list) return;
  list.innerHTML = matches.map(item => `
    <button type="button" class="barcodeLocationOption" data-barcode-location-id="${escapeHtml(item.id)}">
      <span class="barcodeLocationMain">${escapeHtml(barcodeLocationLabel(item))}</span>
      <span class="barcodeLocationProduct">${escapeHtml(item.product_name || "Ürün")}</span>
      <span class="barcodeLocationStock">${escapeHtml(barcodeLocationStockSummary(item))}</span>
    </button>
  `).join("");
}

function findBarcodeProduct(rawCode){
  const code = cleanBarcode(rawCode);
  if(!code){
    toast(t("barcodeRequired"));
    return;
  }
  const matches = allItems
    .filter(item => cleanBarcode(item.barcode) === code)
    .sort((a, b) => String(a.box_no || "").localeCompare(String(b.box_no || ""), "tr", {numeric:true}) || String(a.shelf_location || "").localeCompare(String(b.shelf_location || ""), "tr", {numeric:true}));
  if(!matches.length){
    toast(t("barcodeNotFound"));
    return;
  }
  $("barcodeSearch").value = code;
  switchTab("islem");
  openBarcodeActionModalForMatches(matches, code);
}

function openBarcodeActionModalForMatches(matches, code){
  if(!currentPersonnelName){
    openPersonnelModal(false);
    return;
  }
  if(!matches?.length) return;

  const multiple = matches.length > 1;
  $("barcodeActionItemId").value = "";
  $("barcodeActionAmount").value = 1;
  $("barcodeActionFrameType").value = "socket_quantity";
  $("barcodeLocationWrap").classList.toggle("hidden", !multiple);
  $("barcodeLocationHint").textContent = multiple ? t("locationSelectHint") : "";

  if(multiple){
    $("barcodeActionProductName").textContent = `${matches[0].product_name || "Ürün"} • ${t("locationCount", {count:matches.length})}`;
    $("barcodeActionMeta").textContent = `Barkod: ${code}`;
    $("barcodeActionStock").innerHTML = barcodeAggregateStockHtml(code);
    $("barcodeActionFrameTypeWrap").classList.add("hidden");
    renderBarcodeLocations(matches);
    setBarcodeActionEnabled(false);
  }else{
    $("barcodeLocationList").innerHTML = "";
    selectBarcodeLocation(matches[0].id);
  }

  syncAdminStockUi();
  $("barcodeActionModal").classList.remove("hidden");
  if(multiple){
    setTimeout(() => $("barcodeLocationList").querySelector("button")?.focus(), 50);
  }else{
    setTimeout(() => (canUseBulkStock() ? $("barcodeActionAmount") : $("btnBarcodeStockOut")).focus(), 50);
  }
}

function openBarcodeActionModal(id){
  const item = findItem(id);
  if(item) openBarcodeActionModalForMatches([item], cleanBarcode(item.barcode));
}

function closeBarcodeActionModal(){
  $("barcodeActionModal").classList.add("hidden");
  $("barcodeActionItemId").value = "";
  $("barcodeLocationList").innerHTML = "";
}

async function confirmBarcodeStockOperation(direction){
  if(!supabaseClient){
    toast("Supabase bağlantısı bulunamadı.");
    return;
  }
  try{ await ensurePersonnelActive(); }catch(error){ toast(error.message); return; }

  const item = findItem($("barcodeActionItemId").value);
  if(!item){
    toast(t("selectLocationFirst"));
    return;
  }
  if(![1, -1].includes(direction)) return;
  const amount = canUseBulkStock() ? Number($("barcodeActionAmount").value) : 1;
  if(!Number.isInteger(amount) || amount <= 0){
    toast(t("invalidAmount"));
    return;
  }

  let variant = "quantity";
  if(item.product_type === "cerceve") variant = $("barcodeActionFrameType").value;
  const current = Number(item[variant] || 0);
  if(direction < 0 && current < amount){
    toast(t("insufficient", { stock:current }));
    return;
  }

  const button = direction > 0 ? $("btnBarcodeStockIn") : $("btnBarcodeStockOut");
  setButtonLoading(button, true, "İşleniyor...");
  try{
    const locationNote = `${barcodeLocationLabel(item)} • Barkod ile hızlı stok işlemi`;
    await applyStockMovement(item, direction, amount, variant, locationNote);
    closeBarcodeActionModal();
    toast(direction > 0 ? t("savedIn", { amount, name:currentPersonnelName }) : t("savedOut", { amount, name:currentPersonnelName }));
    await loadAll();
  }catch(error){
    toast(error.message);
  }finally{
    setButtonLoading(button, false);
  }
}

function isIOSDevice(){
  const ua = navigator.userAgent || "";
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function isStandalonePWA(){
  return window.matchMedia?.("(display-mode: standalone)")?.matches || navigator.standalone === true;
}

function finishBarcodeScan(value){
  const barcode = String(value || "").trim();
  if(!barcode || scannerBusy) return;
  scannerBusy = true;
  closeBarcodeScanner();
  findBarcodeProduct(barcode);
}

async function scanBarcodeFrame(){
  if(!scannerStream || !scannerDetector) return;
  const video = $("scannerVideo");
  if(video.readyState >= 2 && !scannerBusy){
    try{
      const codes = await scannerDetector.detect(video);
      if(codes.length){
        finishBarcodeScan(codes[0].rawValue);
        return;
      }
    }catch(error){
      $("scannerStatus").textContent = t("holdStill");
    }
  }
  scannerFrameId = requestAnimationFrame(scanBarcodeFrame);
}

async function startNativeBarcodeScanner(){
  scannerMode = "native";
  scannerDetector = new BarcodeDetector();
  scannerStream = await navigator.mediaDevices.getUserMedia({
    video:{ facingMode:{ ideal:"environment" }, width:{ ideal:1280 }, height:{ ideal:720 } },
    audio:false
  });
  const video = $("scannerVideo");
  video.srcObject = scannerStream;
  await video.play();
  $("scannerStatus").textContent = t("holdStill");
  scanBarcodeFrame();
}

async function startZxingBarcodeScanner(){
  if(!window.ZXingBrowser?.BrowserMultiFormatReader){
    throw new Error("ZXing barkod okuyucu yüklenemedi.");
  }

  scannerMode = "zxing";
  scannerZxingReader = new ZXingBrowser.BrowserMultiFormatReader(undefined, {
    delayBetweenScanAttempts: 90,
    delayBetweenScanSuccess: 400
  });

  const video = $("scannerVideo");
  const constraints = {
    video:{
      facingMode:{ ideal:"environment" },
      width:{ ideal:1280 },
      height:{ ideal:720 }
    },
    audio:false
  };

  scannerZxingControls = await scannerZxingReader.decodeFromConstraints(constraints, video, (result, error, controls) => {
    if(result && !scannerBusy){
      const value = typeof result.getText === "function" ? result.getText() : result.text;
      try{ controls?.stop?.(); }catch(_error){}
      finishBarcodeScan(value);
    }
  });
  $("scannerStatus").textContent = t("holdStill");
}

async function openBarcodeScanner(){
  if(!navigator.mediaDevices?.getUserMedia){
    toast("Kamera erişimi bulunamadı. Siteyi HTTPS üzerinden açtığından emin ol.");
    return;
  }

  closeBarcodeScanner();
  scannerBusy = false;
  $("scannerModal").classList.remove("hidden");
  $("scannerStatus").textContent = t("cameraPreparing");
  const video = $("scannerVideo");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.muted = true;
  video.autoplay = true;

  try{
    // Safari/iOS tarafında BarcodeDetector (Shape Detection API) güvenilir değil.
    // iPhone/iPad'de ZXing JS kullan; destekleyen diğer tarayıcılarda native API daha hızlıdır.
    if(isIOSDevice() || !("BarcodeDetector" in window)){
      await startZxingBarcodeScanner();
    }else{
      try{
        await startNativeBarcodeScanner();
      }catch(nativeError){
        closeBarcodeScanner();
        scannerBusy = false;
        $("scannerModal").classList.remove("hidden");
        $("scannerStatus").textContent = t("cameraPreparing");
        await startZxingBarcodeScanner();
      }
    }
  }catch(error){
    console.error("Barkod kamera hatası:", error);
    const iosPwa = isIOSDevice() && isStandalonePWA();
    closeBarcodeScanner();
    if(iosPwa){
      toast("iPhone kamerası açılamadı. Kamera iznini kontrol et; olmazsa PWA’yı tamamen kapatıp yeniden aç ve tekrar dene.");
    }else{
      toast(t("cameraDenied"));
    }
  }
}

function closeBarcodeScanner(){
  if(scannerFrameId) cancelAnimationFrame(scannerFrameId);
  scannerFrameId = null;
  try{ scannerZxingControls?.stop?.(); }catch(_error){}
  scannerZxingControls = null;
  scannerZxingReader = null;
  scannerStream?.getTracks().forEach(track => track.stop());
  scannerStream = null;
  scannerDetector = null;
  scannerMode = "";
  scannerBusy = false;
  const video = $("scannerVideo");
  if(video){
    try{ video.pause(); }catch(_error){}
    video.srcObject = null;
  }
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

async function syncFixedAdminState(promptIfNeeded = false){
  adminUnlocked = false;
  adminPinSession = "";
  if(!supabaseClient || !isFixedAdminPersonnel() || !currentPersonnelPin) return false;

  try{
    const { data, error } = await supabaseClient.rpc("verify_depo_admin", { p_admin_pin:currentPersonnelPin });
    if(error) throw new Error(error.message);
    if(data === true){
      adminUnlocked = true;
      adminPinSession = currentPersonnelPin;
      updateProfileUi();
      setReportPeriod("today");
      return true;
    }
  }catch(error){
    console.warn("Sabit admin doğrulaması yapılamadı:", error);
  }

  updateProfileUi();
  if(promptIfNeeded){
    openAdminModal();
    toast("İlk eşleştirme: mevcut Admin PIN’ini bir kez gir. Sonrasında SchEAx personel PIN’i sabit admin olur.");
  }
  return false;
}

function openAdminModal(){
  if(!isFixedAdminPersonnel()){
    toast(`Admin yalnızca ${FIXED_ADMIN_NAME} hesabına sabitlenmiştir.`);
    return;
  }
  if(adminUnlocked){
    toast(`${FIXED_ADMIN_NAME} zaten Sabit Admin olarak açık.`);
    return;
  }
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
  if(!isFixedAdminPersonnel() || !currentPersonnelPin){
    toast(`Admin yalnızca ${FIXED_ADMIN_NAME} hesabına sabitlenmiştir.`);
    return;
  }
  const oldAdminPin = $("adminPin").value.trim();
  if(!oldAdminPin){
    toast("Mevcut Admin PIN’ini gir.");
    return;
  }
  const button = $("btnAdminLogin");
  setButtonLoading(button, true, "Eşleştiriliyor...");
  try{
    const { data, error } = await supabaseClient.rpc("verify_depo_admin", { p_admin_pin:oldAdminPin });
    if(error){
      if(/crypt\(text, text\).*does not exist/i.test(error.message)){
        throw new Error("Supabase şifre fonksiyonu eski. Güncel kurulum SQL’ini tekrar çalıştır.");
      }
      throw new Error(error.message);
    }
    if(data !== true){
      toast("Mevcut Admin PIN’i yanlış.");
      return;
    }

    // Bir kereye mahsus mevcut admin PIN'ini SchEAx personel PIN'iyle eşitleriz.
    if(oldAdminPin !== currentPersonnelPin){
      const { data:changed, error:changeError } = await supabaseClient.rpc("change_depo_admin_pin", {
        p_current_pin:oldAdminPin,
        p_new_pin:currentPersonnelPin
      });
      if(changeError) throw new Error(changeError.message);
      if(changed !== true) throw new Error("Admin PIN eşleştirmesi tamamlanamadı.");
    }

    const { data:verified, error:verifyError } = await supabaseClient.rpc("verify_depo_admin", { p_admin_pin:currentPersonnelPin });
    if(verifyError) throw new Error(verifyError.message);
    if(verified !== true) throw new Error("Sabit admin doğrulaması başarısız oldu.");

    adminUnlocked = true;
    adminPinSession = currentPersonnelPin;
    closeAdminModal();
    updateProfileUi();
    setReportPeriod("today");
    loadPersonnelAdmin();
    toast(`${FIXED_ADMIN_NAME} Sabit Admin olarak eşleştirildi. Bundan sonra ayrı Admin Girişi gerekmez.`);
  }catch(error){
    toast("Sabit admin eşleştirilemedi: " + error.message);
  }finally{
    setButtonLoading(button, false);
  }
}


function adminLogout(){
  if(isFixedAdminPersonnel()){
    toast(`${FIXED_ADMIN_NAME} sabit admindir. Admin modundan çıkış kapatıldı; personel değiştirirsen admin yetkisi kapanır.`);
    return;
  }
  adminUnlocked = false;
  adminPinSession = "";
  movementRows = [];
  updateProfileUi();
}


async function changeAdminPin(){
  toast(`Sabit Admin PIN’i, ${FIXED_ADMIN_NAME} personel PIN’i ile aynıdır. Ayrı Admin PIN değişikliği kapatıldı.`);
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

    let bulkPermissionMap = new Map();
    try{
      const { data:bulkRows, error:bulkError } = await supabaseClient.rpc("get_depo_bulk_stock_permissions", {
        p_admin_pin:adminPinSession
      });
      if(bulkError) throw new Error(bulkError.message);
      bulkPermissionMap = new Map((bulkRows || []).map(row => [normalize(row.personnel_name).trim(), row.allowed === true]));
    }catch(error){
      console.warn("Toplu stok yetki listesi okunamadı:", error.message);
    }

    personnelAdminRows = (data || []).map(person => ({
      ...person,
      bulk_stock_allowed:isFixedAdminName(person.personnel_name) || bulkPermissionMap.get(normalize(person.personnel_name).trim()) === true
    }));
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
    const fixedAdmin = isFixedAdminName(person.personnel_name);
    const allowed = new Set(Array.isArray(person.allowed_tabs) ? person.allowed_tabs : DEFAULT_PERSONNEL_TABS);
    const lastSeen = person.last_seen_at ? formatMovementDate(person.last_seen_at) : "-";
    return `
      <div class="item permissionCard" data-personnel-card="${escapeHtml(person.id)}">
        <div class="itemHead">
          <div><h3>${fixedAdmin ? "👑" : "👤"} ${escapeHtml(person.personnel_name)}</h3><p class="muted">Son giriş: ${escapeHtml(lastSeen)}</p></div>
          <span class="badge">${fixedAdmin ? "Sabit Admin" : (person.is_active === false ? "Pasif" : "Aktif")}</span>
        </div>
        <div class="fixedPermissions"><span class="badge permissionFixed">✓ ${t("tabOperation")}</span><span class="badge permissionFixed">✓ ${t("tabSettings")}</span>${fixedAdmin ? `<span class="badge permissionFixed">✓ Tüm Yetkiler</span>` : ""}</div>
        <div class="permissionGrid">
          ${GRANTABLE_TABS.map(tab => `
            <label class="permissionChoice">
              <input type="checkbox" data-tab-permission="${tab}" ${(fixedAdmin || allowed.has(tab)) ? "checked" : ""} ${fixedAdmin ? "disabled" : ""} />
              <span>${escapeHtml(t(TAB_LABELS[tab]))}</span>
            </label>`).join("")}
          <label class="permissionChoice bulkStockPermissionChoice">
            <input type="checkbox" data-special-permission="${BULK_STOCK_PERMISSION}" ${(fixedAdmin || person.bulk_stock_allowed === true) ? "checked" : ""} ${fixedAdmin ? "disabled" : ""} />
            <span>📦 Toplu Stok Giriş / Çıkış</span>
          </label>
        </div>
        ${fixedAdmin
          ? `<p class="muted">🔒 ${escapeHtml(FIXED_ADMIN_NAME)} sabit admindir; yetkileri, PIN’i ve aktifliği bu ekrandan değiştirilemez.</p>`
          : `<button type="button" class="primary" data-action="save-personnel-tabs" data-id="${escapeHtml(person.id)}">Yetkileri Kaydet</button>
            <div class="personnelSecurityActions">
              <input type="password" inputmode="numeric" minlength="4" maxlength="12" data-personnel-new-pin placeholder="Yeni PIN (en az 4 hane)" />
              <button type="button" data-action="set-personnel-pin" data-id="${escapeHtml(person.id)}">PIN Belirle / Sıfırla</button>
              <button type="button" class="${person.is_active === false ? "primary" : "danger"}" data-action="toggle-personnel-active" data-id="${escapeHtml(person.id)}" data-active="${person.is_active !== false}">${person.is_active === false ? "Personeli Yeniden Aktifleştir" : "Personeli Sil / Pasife Al"}</button>
            </div>`}
      </div>`;
  }).join("") || `<p class="muted">Henüz personel kaydı yok. Personeller adını girince burada görünecek.</p>`;
}


async function setPersonnelPin(personnelId){
  const target = personnelAdminRows.find(person => String(person.id) === String(personnelId));
  if(target && isFixedAdminName(target.personnel_name)){ toast(`${FIXED_ADMIN_NAME} sabit admin PIN’i bu ekrandan değiştirilemez.`); return; }
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
  const target = personnelAdminRows.find(person => String(person.id) === String(personnelId));
  if(target && isFixedAdminName(target.personnel_name)){ toast(`${FIXED_ADMIN_NAME} sabit admin hesabı pasife alınamaz.`); return; }
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
  const target = personnelAdminRows.find(person => String(person.id) === String(personnelId));
  if(target && isFixedAdminName(target.personnel_name)){ toast(`${FIXED_ADMIN_NAME} sabit admin olduğundan tüm yetkiler zaten açıktır.`); return; }
  const card = document.querySelector(`[data-personnel-card="${personnelId}"]`);
  if(!card || !target) return;
  const extras = [...card.querySelectorAll("[data-tab-permission]:checked")].map(input => input.dataset.tabPermission);
  const bulkAllowed = Boolean(card.querySelector(`[data-special-permission="${BULK_STOCK_PERMISSION}"]`)?.checked);
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

    const { data:bulkSaved, error:bulkError } = await supabaseClient.rpc("set_depo_bulk_stock_permission", {
      p_admin_pin:adminPinSession,
      p_personnel_name:target.personnel_name,
      p_allowed:bulkAllowed
    });
    if(bulkError){
      if(/Could not find the function|schema cache|does not exist/i.test(bulkError.message)){
        throw new Error("Toplu stok yetki SQL'i henüz kurulmamış. SUPABASE_TOPLU_STOK_YETKISI_v2.14.0.sql dosyasını Supabase SQL Editor'de bir kez çalıştır.");
      }
      throw new Error(bulkError.message);
    }
    if(bulkSaved !== true) throw new Error("Toplu stok yetkisi kaydedilemedi.");

    toast(`Personel yetkileri kaydedildi. Toplu stok: ${bulkAllowed ? "Açık" : "Kapalı"}. Personel tekrar giriş yaptığında aktif olacak.`);
    await loadPersonnelAdmin();
  }catch(error){
    toast("Personel yetkileri kaydedilemedi: " + error.message);
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
    const type = $("productType").value;
    const isFrame = type === "cerceve";
    const isMedia = type === "multimedya";
    $("frameFields").classList.toggle("hidden", !isFrame);
    $("mediaFields").classList.toggle("hidden", !isMedia);
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
  $("btnExportStockExcel").addEventListener("click", exportStockExcel);
  $("btnExportBarcodeTotalExcel").addEventListener("click", exportBarcodeTotalExcel);
  $("btnImportStockExcel").addEventListener("click", () => $("stockExcelFile").click());
  $("stockExcelFile").addEventListener("change", event => importStockExcel(event.target.files[0]));
  $("operationSearch").addEventListener("input", renderOperationList);
  $("operationTypeFilter").addEventListener("change", renderOperationList);
  $("btnBarcodeFind").addEventListener("click", () => findBarcodeProduct($("barcodeSearch").value));
  $("barcodeSearch").addEventListener("keydown", event => { if(event.key === "Enter") findBarcodeProduct(event.target.value); });
  $("btnBarcodeCamera").addEventListener("click", openBarcodeScanner);
  $("btnCloseScanner").addEventListener("click", closeBarcodeScanner);
  $("scannerModal").addEventListener("click", event => { if(event.target.id === "scannerModal") closeBarcodeScanner(); });
  $("btnCloseBarcodeAction").addEventListener("click", closeBarcodeActionModal);
  $("btnBarcodeStockIn").addEventListener("click", () => confirmBarcodeStockOperation(1));
  $("btnBarcodeStockOut").addEventListener("click", () => confirmBarcodeStockOperation(-1));
  $("barcodeActionModal").addEventListener("click", event => { if(event.target.id === "barcodeActionModal") closeBarcodeActionModal(); });
  $("barcodeLocationList").addEventListener("click", event => { const button = event.target.closest("[data-barcode-location-id]"); if(button) selectBarcodeLocation(button.dataset.barcodeLocationId); });
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
      else if(!$("barcodeActionModal").classList.contains("hidden")) closeBarcodeActionModal();
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
syncAdminStockUi();
setReportPeriod("today");
initSupabase();
checkUpdateButton();
