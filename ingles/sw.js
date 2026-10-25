const C = "ingles-v1", ARQ = ["./", "index.html", "manifest.webmanifest", "icon.svg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(ARQ))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== C).map(n => caches.delete(n))))); self.clients.claim(); });
// rede primeiro (atualizações aparecem na hora); cache só se estiver offline
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request)));
});
