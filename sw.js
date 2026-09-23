const CACHE_NAME = "ekran-cerceve-v2.15.3";
const ASSETS = ["./","./index.html","./style.css?v=2.15.3","./api-client.js?v=2.15.3","./hub-sso.js?v=2.15.3","./app.js?v=2.15.3","./manifest.json"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith("ekran-cerceve-") && k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if(request.method !== "GET" || url.origin !== self.location.origin) return;

  // Önce ağı dene, sonra çevrimdışı önbelleğe düş. Açık ekran zorla yenilenmez;
  // yeni dosyalar bir sonraki açılışta yüklenir.
  event.respondWith((async () => {
    try {
      const response = await fetch(request, { cache:"no-cache" });
      if(response.ok && response.type === "basic") {
        try {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        } catch(error) {
          console.warn("Çevrimdışı önbellek güncellenemedi:", error);
        }
      }
      return response;
    } catch(error) {
      const cached = await caches.match(request);
      if(cached) return cached;
      if(request.mode === "navigate") {
        const offlinePage = await caches.match("./index.html");
        if(offlinePage) return offlinePage;
      }
      throw error;
    }
  })());
});
