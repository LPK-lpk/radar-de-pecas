// Service worker do Radar Peças: o "casco" do app funciona offline.
// Dados externos (FIPE, Tecfil, API de placa) NUNCA são guardados: sempre vão à rede.
// Páginas e scripts: REDE PRIMEIRO (sempre a versão mais nova); o cache só entra se estiver offline.
const VERSAO = "radar-v5";
const CASCO = ["./", "index.html", "data.js", "tabela.js", "amortecedores.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/icon.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSAO)
    .then(c => Promise.all(CASCO.map(u => fetch(u, { cache: "reload" }).then(r => r.ok && c.put(u, r)).catch(() => {}))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin || url.pathname.startsWith("/api/")) return; // rede direta
  const codigo = req.mode === "navigate" || /\.(html|js|webmanifest)$/.test(url.pathname) || url.pathname.endsWith("/");
  e.respondWith(caches.open(VERSAO).then(async c => {
    if (codigo) {
      try { const r = await fetch(req, { cache: "no-cache" }); if (r.ok) c.put(req, r.clone()); return r; }
      catch { return (await c.match(req, { ignoreSearch: true })) || (await c.match("index.html")) || Response.error(); }
    }
    const cached = await c.match(req, { ignoreSearch: true });
    return cached || fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; });
  }));
});
