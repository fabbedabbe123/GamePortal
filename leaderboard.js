// ============================================================
// SHELF — shared leaderboard
// ------------------------------------------------------------
// Talks to the Cloudflare Worker (see /worker/cloudflare-worker.js) so
// everyone's best scores are visible to everyone, not just stored
// locally. WORKER_URL comes from worker-config.js (loaded before this
// file). Until it's set, this quietly does nothing — the portal works
// exactly the same either way.
//
// Identity comes from window.ShelfProfile (profile.js) — the same
// claimed, unique username used for the profile corner is what shows
// up on leaderboards, so there's only one "who are you" system.
// ============================================================

(function () {
  const SUBMITTED_PREFIX = "shelf.lastSubmitted.";

  const STRINGS = {
    lbLoading: { sv: "Laddar...", en: "Loading..." },
    lbEmpty: { sv: "Ingen har spelat än — bli den första på listan!", en: "No one has played yet — be the first on the list!" },
    lbError: { sv: "Kunde inte hämta topplistan just nu.", en: "Couldn't load the leaderboard right now." }
  };
  function lang() { return localStorage.getItem("shelf.lang") || "sv"; }
  function t(key) { return STRINGS[key][lang()] || STRINGS[key].sv; }

  function workerReady() {
    return typeof WORKER_URL !== "undefined" && WORKER_URL && !WORKER_URL.includes("REPLACE-ME");
  }

  function getNickname() {
    return window.ShelfProfile ? window.ShelfProfile.getUsername() : "";
  }

  function askNickname(callback) {
    if (window.ShelfProfile) {
      window.ShelfProfile.ensureUsername(callback);
    } else if (callback) {
      callback();
    }
  }

  // ---------- Leaderboard modal ----------
  function ensureLeaderboardModal() {
    if (document.getElementById("leaderboard-overlay")) return;
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "leaderboard-overlay";
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h2 id="leaderboard-title">Topplista</h2>
          <button class="icon-btn" id="leaderboard-close">✕</button>
        </div>
        <div class="modal-body">
          <div id="leaderboard-list" class="leaderboard-list"></div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.remove("open"); });
    document.getElementById("leaderboard-close").addEventListener("click", () => overlay.classList.remove("open"));
  }

  async function showLeaderboard(game) {
    if (!workerReady()) return;
    ensureLeaderboardModal();
    const overlay = document.getElementById("leaderboard-overlay");
    const list = document.getElementById("leaderboard-list");
    document.getElementById("leaderboard-title").textContent = `🏆 ${game.title}`;
    list.innerHTML = `<p class="modal-hint">${t("lbLoading")}</p>`;
    overlay.classList.add("open");

    try {
      const res = await fetch(`${WORKER_URL}/scores?game=${encodeURIComponent(game.id)}`);
      const scores = await res.json();
      if (!Array.isArray(scores) || scores.length === 0) {
        list.innerHTML = `<p class="modal-hint">${t("lbEmpty")}</p>`;
        return;
      }
      const myName = getNickname();
      const label = lang() === "en" && game.scoreLabelEn ? game.scoreLabelEn : game.scoreLabel;
      list.innerHTML = scores.map((entry, i) => `
        <div class="leaderboard-row ${entry.nickname === myName ? "me" : ""}">
          <span class="lb-rank">${i + 1}</span>
          <span class="lb-name" style="cursor:pointer;" data-open-profile="${escapeHtml(entry.nickname)}">${escapeHtml(entry.nickname)}</span>
          <span class="lb-score">${entry.score}${label ? " " + label : ""}</span>
        </div>
      `).join("");
      list.querySelectorAll("[data-open-profile]").forEach(el => {
        el.addEventListener("click", () => {
          if (window.ShelfProfile) window.ShelfProfile.openProfile(el.dataset.openProfile);
        });
      });
    } catch (e) {
      list.innerHTML = `<p class="modal-hint">${t("lbError")}</p>`;
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ---------- Score submission ----------
  async function submitScoreIfImproved(game) {
    if (!workerReady() || !game.scoreKey) return;
    const raw = localStorage.getItem(game.scoreKey);
    if (raw === null) return;
    const score = Number(raw);
    if (!Number.isFinite(score)) return;

    const lastKey = SUBMITTED_PREFIX + game.id;
    const lastSubmitted = localStorage.getItem(lastKey);
    if (lastSubmitted !== null && Number(lastSubmitted) === score) return; // nothing new

    const nickname = getNickname();
    if (!nickname) {
      // Ask the player to claim a username once, then retry the submission.
      askNickname(() => submitScoreIfImproved(game));
      return;
    }

    try {
      await fetch(`${WORKER_URL}/scores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game: game.id,
          nickname,
          score,
          better: game.scoreBetter || "higher"
        })
      });
      localStorage.setItem(lastKey, String(score));
    } catch (e) {
      // Offline or Worker unreachable — fine, we'll just try again next time.
    }
  }

  window.ShelfLeaderboard = {
    isReady: workerReady,
    showLeaderboard,
    submitScoreIfImproved,
    getNickname,
    askNickname
  };
})();
