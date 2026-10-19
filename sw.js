// Service worker do Radar Peças: o "casco" do app funciona offline.
// Dados externos (FIPE, Tecfil, API de placa) NUNCA são guardados: sempre vão à rede.
const VERSAO = "radar-v3";
const CASCO = ["./", "index.html", "data.js", "tabela.js", "amortecedores.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/icon.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(CASCO)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin || url.pathname.startsWith("/api/")) return; // rede direta
  // stale-while-revalidate: abre rápido do cache e atualiza em segundo plano
  e.respondWith(caches.open(VERSAO).then(async c => {
    const cached = await c.match(req, { ignoreSearch: true });
    const rede = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => cached);
    return cached || rede;
  }));
});
