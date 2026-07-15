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
  "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
  });
}

// Simple abuse guard: allows up to `limit` requests per IP per `windowSeconds`
// for a given bucket (e.g. "scores" or "feedback"). Not perfectly precise
// (KV is eventually consistent) but enough to stop casual spam/bots.
async function checkRateLimit(env, request, bucket, limit, windowSeconds) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const key = `ratelimit:${bucket}:${ip}`;
  const current = parseInt((await env.SHELF_KV.get(key)) || "0", 10);
  if (current >= limit) return false;
  await env.SHELF_KV.put(key, String(current + 1), { expirationTtl: windowSeconds });
  return true;
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
        if (!(await checkRateLimit(env, request, "scores", 30, 600))) {
          return json({ error: "too many requests, slow down" }, 429);
        }
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

      // ---------- Leaderboard: reset a game's scores (admin only) ----------
      if (url.pathname === "/scores" && request.method === "DELETE") {
        const auth = request.headers.get("Authorization") || "";
        if (auth !== `Bearer ${env.ADMIN_KEY}`) return json({ error: "unauthorized" }, 401);
        const game = url.searchParams.get("game");
        if (!game) return json({ error: "missing game" }, 400);
        await env.SHELF_KV.delete(`scores:${game}`);
        return json({ ok: true });
      }

      // ---------- Feedback: submit an idea ----------
      if (url.pathname === "/feedback" && request.method === "POST") {
        if (!(await checkRateLimit(env, request, "feedback", 10, 600))) {
          return json({ error: "too many requests, slow down" }, 429);
        }
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

      // ---------- Play counts (used for "most played" sorting) ----------
      if (url.pathname === "/plays" && request.method === "GET") {
        const counts = JSON.parse((await env.SHELF_KV.get("playcounts")) || "{}");
        return json(counts);
      }

      if (url.pathname === "/plays" && request.method === "POST") {
        const body = await request.json();
        const game = String(body.game || "").slice(0, 60);
        if (!game) return json({ error: "missing game" }, 400);
        const counts = JSON.parse((await env.SHELF_KV.get("playcounts")) || "{}");
        counts[game] = (counts[game] || 0) + 1;
        await env.SHELF_KV.put("playcounts", JSON.stringify(counts));
        return json({ ok: true });
      }

      // ---------- Currency codes: create one (admin only) ----------
      if (url.pathname === "/codes" && request.method === "POST") {
        const auth = request.headers.get("Authorization") || "";
        if (auth !== `Bearer ${env.ADMIN_KEY}`) return json({ error: "unauthorized" }, 401);
        const body = await request.json();
        const game = String(body.game || "").slice(0, 60);
        const currency = String(body.currency || "").slice(0, 30);
        const amount = Number(body.amount);
        if (!game || !currency || !Number.isFinite(amount) || amount <= 0) {
          return json({ error: "invalid payload" }, 400);
        }

        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars
        let code = "";
        for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];

        const record = { code, game, currency, amount, used: false, createdAt: Date.now() };
        await env.SHELF_KV.put(`code:${code}`, JSON.stringify(record));

        let log = JSON.parse((await env.SHELF_KV.get("codes:log")) || "[]");
        log.unshift(record);
        log = log.slice(0, 100);
        await env.SHELF_KV.put("codes:log", JSON.stringify(log));

        return json({ ok: true, code });
      }

      // ---------- Currency codes: list recent ones (admin only) ----------
      if (url.pathname === "/codes" && request.method === "GET") {
        const auth = request.headers.get("Authorization") || "";
        if (auth !== `Bearer ${env.ADMIN_KEY}`) return json({ error: "unauthorized" }, 401);
        const log = JSON.parse((await env.SHELF_KV.get("codes:log")) || "[]");
        return json(log);
      }

      // ---------- Currency codes: redeem (public, one-time use) ----------
      if (url.pathname === "/codes/redeem" && request.method === "POST") {
        if (!(await checkRateLimit(env, request, "redeem", 20, 600))) {
          return json({ error: "too many requests, slow down" }, 429);
        }
        const body = await request.json();
        const code = String(body.code || "").trim().toUpperCase();
        const game = String(body.game || "");
        if (!code) return json({ error: "missing code" }, 400);

        const key = `code:${code}`;
        const raw = await env.SHELF_KV.get(key);
        if (!raw) return json({ error: "invalid code" }, 404);
        const data = JSON.parse(raw);
        if (data.used) return json({ error: "already used" }, 410);
        if (data.game !== game) return json({ error: "wrong game" }, 400);

        data.used = true;
        data.usedAt = Date.now();
        await env.SHELF_KV.put(key, JSON.stringify(data));

        let log = JSON.parse((await env.SHELF_KV.get("codes:log")) || "[]");
        log = log.map(e => (e.code === code ? { ...e, used: true } : e));
        await env.SHELF_KV.put("codes:log", JSON.stringify(log));

        return json({ ok: true, currency: data.currency, amount: data.amount });
      }

      return json({ error: "not found" }, 404);
    } catch (err) {
      return json({ error: err.message || "server error" }, 500);
    }
  }
};
