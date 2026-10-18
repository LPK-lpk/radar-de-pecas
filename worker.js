// Cloudflare Worker (opcional): ponte pública para usar o painel hospedado no GitHub Pages.
// Deploy:  npx wrangler deploy worker.js --name radar-tecfil --compatibility-date 2024-01-01
// Depois, no painel, preencha "Endereço da ponte" com a URL do worker.
import { buscarTecfil } from "./tecfil.mjs";

export default {
  async fetch(req) {
    const h = { "content-type": "application/json; charset=utf-8", "access-control-allow-origin": "*" };
    const q = new URL(req.url).searchParams.get("q") || "";
    if (q.length < 2) return new Response('{"erro":"q obrigatório"}', { status: 400, headers: h });
    try { return new Response(JSON.stringify(await buscarTecfil(q)), { headers: { ...h, "cache-control": "public, max-age=86400" } }); }
    catch (e) { return new Response(JSON.stringify({ erro: e.message }), { status: 502, headers: h }); }
  }
};
