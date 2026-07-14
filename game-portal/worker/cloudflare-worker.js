// ============================================================
// SHELF — Cloudflare Worker (shared leaderboard + feedback)
// ------------------------------------------------------------
// This is the one small piece of "real backend" the portal needs —
// everything else in Shelf is static files. Deploy this once (free,
// no credit card) and every visitor's browser can submit scores and
// feedback that everyone else sees too, which plain GitHub Pages
// can't do on its own.
//
// SETUP (see README for the full walkthrough):
// 1. workers.cloudflare.com → sign up free → Create Worker
// 2. Paste this whole file in, replacing the starter code
// 3. Create a KV namespace (Workers → KV → Create), name it SHELF_KV
// 4. Bind it: Worker → Settings → Variables → KV Namespace Bindings
//    → Variable name "SHELF_KV" → select your namespace
// 5. Add a secret: Settings → Variables → Environment Variables
//    → Add "ADMIN_KEY" → any password you make up → Encrypt
// 6. Deploy. Copy the worker's URL (looks like
//    https://shelf-backend.<you>.workers.dev) into leaderboard.js
//    and games-admin.js in the portal (WORKER_URL constant).
// ============================================================

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    try {
      // ---------- Leaderboard: read top scores for a game ----------
      if (url.pathname === "/scores" && request.method === "GET") {
        const game = url.searchParams.get("game");
        if (!game) return json({ error: "missing game" }, 400);
        const list = JSON.parse((await env.SHELF_KV.get(`scores:${game}`)) || "[]");
        return json(list);
      }

      // ---------- Leaderboard: submit a score ----------
      if (url.pathname === "/scores" && request.method === "POST") {
        const body = await request.json();
        const game = String(body.game || "").slice(0, 60);
        const nickname = String(body.nickname || "Anonym").slice(0, 24);
        const score = Number(body.score);
        const better = body.better === "lower" ? "lower" : "higher";
        if (!game || !Number.isFinite(score)) return json({ error: "invalid payload" }, 400);

        const key = `scores:${game}`;
        let list = JSON.parse((await env.SHELF_KV.get(key)) || "[]");

        // Replace this nickname's existing entry if the new score is better,
        // otherwise keep their old one — one row per person, not per submit.
        const existingIdx = list.findIndex(e => e.nickname === nickname);
        const isBetter = (a, b) => (better === "lower" ? a < b : a > b);
        if (existingIdx === -1) {
          list.push({ nickname, score, ts: Date.now() });
        } else if (isBetter(score, list[existingIdx].score)) {
          list[existingIdx] = { nickname, score, ts: Date.now() };
        }

        list.sort((a, b) => (better === "lower" ? a.score - b.score : b.score - a.score));
        list = list.slice(0, 50);
        await env.SHELF_KV.put(key, JSON.stringify(list));
        return json({ ok: true });
      }

      // ---------- Feedback: submit an idea ----------
      if (url.pathname === "/feedback" && request.method === "POST") {
        const body = await request.json();
        const name = String(body.name || "Anonym").slice(0, 40);
        const message = String(body.message || "").trim().slice(0, 500);
        if (!message) return json({ error: "empty message" }, 400);

        const key = "feedback";
        let list = JSON.parse((await env.SHELF_KV.get(key)) || "[]");
        list.unshift({ name, message, ts: Date.now() });
        list = list.slice(0, 200);
        await env.SHELF_KV.put(key, JSON.stringify(list));
        return json({ ok: true });
      }

      // ---------- Feedback: read submissions (admin only) ----------
      if (url.pathname === "/feedback" && request.method === "GET") {
        const auth = request.headers.get("Authorization") || "";
        if (auth !== `Bearer ${env.ADMIN_KEY}`) return json({ error: "unauthorized" }, 401);
        const list = JSON.parse((await env.SHELF_KV.get("feedback")) || "[]");
        return json(list);
      }

      return json({ error: "not found" }, 404);
    } catch (err) {
      return json({ error: err.message || "server error" }, 500);
    }
  }
};
