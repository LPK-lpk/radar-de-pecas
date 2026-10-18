// Radar Peças — ponte Tecfil (arquivo único para colar no painel do Cloudflare Workers).
// Cloudflare → Workers & Pages → Create → Hello World → Deploy → Edit code → cole TUDO isto → Deploy.
// Consulta o catálogo público da Tecfil e devolve JSON.
// Usado pelo servidor local (server.mjs) e pelo Cloudflare Worker (worker.js).
const BASE = "https://catalogo.tecfil.com.br/search/";

const txt = s => s.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "").replace(/&gt;/g, "em diante").replace(/&lt;/g, "<").replace(/&amp;/g, "&").replace(/&quot;/g, '"')
  .replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

function parseTecfil(html) {
  // colunas (2ª linha do thead)
  const thead = (html.match(/<thead[\s\S]*?<\/thead>/) || [""])[0];
  const colunas = [...thead.matchAll(/ideia-rh-header-coluna[^>]*>([\s\S]*?)<\/th>/g)].map(m => txt(m[1]));
  const tbody = (html.match(/<tbody[\s\S]*?<\/tbody>/) || [""])[0];
  const resultados = [];
  let fabricante = "";
  for (const tr of tbody.split(/<tr\b/).slice(1)) {
    const fab = tr.match(/data-fabricante="([^"]*)"/);
    if (fab) { fabricante = fab[1]; continue; }
    const tds = tr.split(/<td\b/).slice(1);
    if (tds.length < 2) continue;
    const aplicacao = txt(tds[0].replace(/^[^>]*>/, ""));
    const filtros = {};
    tds.slice(1).forEach((td, i) => {
      const cods = [...td.matchAll(/aria-label="Ver produto">([^<]+)</g)].map(m => txt(m[1]));
      if (cods.length && colunas[i]) filtros[colunas[i]] = cods;
    });
    resultados.push({ fabricante, aplicacao, filtros });
  }
  return resultados;
}

async function buscarTecfil(consulta) {
  const q = consulta.trim().replace(/\./g, "<DOT>");
  const r = await fetch(BASE + encodeURIComponent(q), { headers: { "user-agent": "Mozilla/5.0 RadarPecas" } });
  if (!r.ok) throw new Error("Tecfil respondeu " + r.status);
  return parseTecfil(await r.text());
}

export default {
  async fetch(req) {
    const h = { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' };
    const q = new URL(req.url).searchParams.get('q') || '';
    if (q.length < 2) return new Response('{"erro":"q obrigatorio"}', { status: 400, headers: h });
    try { return new Response(JSON.stringify(await buscarTecfil(q)), { headers: { ...h, 'cache-control': 'public, max-age=86400' } }); }
    catch (e) { return new Response(JSON.stringify({ erro: e.message }), { status: 502, headers: h }); }
  }
};
