// Inglês Live — ponte segura entre o app e a API da Anthropic (a chave fica só aqui).
// Deploy: cd ingles/worker && npx wrangler deploy && npx wrangler secret put ANTHROPIC_API_KEY
const MODEL = "claude-haiku-5-5";
const MAX_MSGS = 20;      // histórico enviado por turno
const MAX_CHARS = 600;    // tamanho máximo de cada mensagem

const NIVEIS = {
  iniciante: "Beginner (A1-A2): very short, simple sentences, common words, speak slowly.",
  intermediario: "Intermediate (B1-B2): natural everyday English, moderate vocabulary.",
  avancado: "Advanced (C1): natural fluent English with idioms and nuance."
};

const sistema = (nivel, tema) => `You are a friendly English conversation tutor for a Brazilian Portuguese speaker.
Level: ${NIVEIS[nivel] || NIVEIS.intermediario}
Topic/scenario: ${tema || "free casual conversation"}.
The user's messages come from speech recognition, so ignore missing punctuation/capitalization.
Rules:
- Reply in English only in "reply": 1-3 short sentences, then ask ONE follow-up question to keep the conversation going.
- If the user made a real grammar, vocabulary or word-choice mistake, put the corrected version in "correction" with a very short explanation in Portuguese (pt-BR). If there was no mistake, use "".
- "tip" is optional: a useful new word or phrase with its Portuguese meaning, or "".
- If the user writes in Portuguese, answer in English simply and encourage them to try in English; "correction" can give the English version of what they said.
Output ONLY valid JSON: {"reply":"...","correction":"...","tip":"..."}`;

export default {
  async fetch(req, env) {
    const h = {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type"
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: h });
    if (req.method !== "POST") return new Response('{"erro":"use POST"}', { status: 405, headers: h });
    if (!env.ANTHROPIC_API_KEY) return new Response('{"erro":"chave nao configurada"}', { status: 500, headers: h });

    let body;
    try { body = await req.json(); } catch { return new Response('{"erro":"json invalido"}', { status: 400, headers: h }); }

    const msgs = (Array.isArray(body.messages) ? body.messages : [])
      .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
      .slice(-MAX_MSGS)
      .map(m => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
    if (!msgs.length || msgs[msgs.length - 1].role !== "user") return new Response('{"erro":"sem mensagem"}', { status: 400, headers: h });

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: MODEL, max_tokens: 400,
        system: sistema(body.nivel, String(body.tema || "").slice(0, 120)),
        messages: msgs
      })
    });
    if (!r.ok) return new Response(JSON.stringify({ erro: "IA respondeu " + r.status }), { status: 502, headers: h });
    const j = await r.json();
    const texto = (j.content || []).map(c => c.text || "").join("").trim();
    let out;
    try { out = JSON.parse(texto.slice(texto.indexOf("{"), texto.lastIndexOf("}") + 1)); }
    catch { out = { reply: texto, correction: "", tip: "" }; }
    return new Response(JSON.stringify({ reply: out.reply || "", correction: out.correction || "", tip: out.tip || "" }), { headers: h });
  }
};
