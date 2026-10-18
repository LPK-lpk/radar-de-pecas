// Servidor local: serve o painel e faz a ponte com o catálogo Tecfil.
// Uso:  node server.mjs   → abra http://localhost:3000
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { buscarTecfil } from "./tecfil.mjs";

const raiz = fileURLToPath(new URL(".", import.meta.url));
const tipos = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".css": "text/css" };
const cache = new Map();

http.createServer(async (req, res) => {
  const u = new URL(req.url, "http://localhost");
  if (u.pathname === "/api/tecfil") {
    const q = u.searchParams.get("q") || "";
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.setHeader("access-control-allow-origin", "*");
    if (q.length < 2) { res.statusCode = 400; return res.end('{"erro":"q obrigatório"}'); }
    try {
      if (!cache.has(q)) cache.set(q, await buscarTecfil(q));
      return res.end(JSON.stringify(cache.get(q)));
    } catch (e) { res.statusCode = 502; return res.end(JSON.stringify({ erro: e.message })); }
  }
  const arq = u.pathname === "/" ? "index.html" : normalize(u.pathname).replace(/^([/\\])+/, "");
  if (!/^(index\.html|data\.js)$/.test(arq)) { res.statusCode = 404; return res.end("não encontrado"); }
  try {
    res.setHeader("content-type", tipos[extname(arq)] || "text/plain");
    res.end(await readFile(join(raiz, arq)));
  } catch { res.statusCode = 404; res.end("não encontrado"); }
}).listen(3000, () => console.log("Painel em http://localhost:3000"));
