// ============================================================
// SHELF — shared leaderboard
// ------------------------------------------------------------
// Talks to the Cloudflare Worker (see /worker/cloudflare-worker.js)
// so everyone's best scores are visible to everyone, not just
// stored locally. Until WORKER_URL is set, this quietly does
// nothing — the portal works exactly the same either way.
// ============================================================

const WORKER_URL = "https://shelf.fabian-hallberg09.workers.dev"; // <-- set after deploying the Worker

(function () {
  const NICK_KEY = "shelf.nickname";
  const SUBMITTED_PREFIX = "shelf.lastSubmitted.";

  const STRINGS = {
    nickTitle: { sv: "Vad ska vi kalla dig?", en: "What should we call you?" },
    nickHint: { sv: "Det här namnet syns på topplistorna för alla som spelar.", en: "This name shows up on the leaderboards for everyone who plays." },
    nickLabel: { sv: "Smeknamn", en: "Nickname" },
    nickPlaceholder: { sv: "T.ex. Fabbe", en: "e.g. Fabbe" },
    nickSave: { sv: "Spara", en: "Save" },
    lbLoading: { sv: "Laddar...", en: "Loading..." },
    lbEmpty: { sv: "Ingen har spelat än — bli den första på listan!", en: "No one has played yet — be the first on the list!" },
    lbError: { sv: "Kunde inte hämta topplistan just nu.", en: "Couldn't load the leaderboard right now." }
  };
  function lang() { return localStorage.getItem("shelf.lang") || "sv"; }
  function t(key) { return STRINGS[key][lang()] || STRINGS[key].sv; }

  function workerReady() {
    return WORKER_URL && !WORKER_URL.includes("REPLACE-ME");
  }

  function getNickname() {
    return localStorage.getItem(NICK_KEY) || "";
  }
  function setNickname(name) {
    localStorage.setItem(NICK_KEY, name);
  }

  // ---------- Nickname modal ----------
  function updateNicknameTexts() {
    const overlay = document.getElementById("nickname-overlay");
    if (!overlay) return;
    overlay.querySelector(".modal-header h2").textContent = t("nickTitle");
    overlay.querySelector(".modal-hint").textContent = t("nickHint");
    overlay.querySelector("label").textContent = t("nickLabel");
    overlay.querySelector("#nickname-input").placeholder = t("nickPlaceholder");
    overlay.querySelector("#nickname-save").textContent = t("nickSave");
  }

  function ensureNicknameModal() {
    if (document.getElementById("nickname-overlay")) return;
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "nickname-overlay";
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h2>Vad ska vi kalla dig?</h2>
          <button class="icon-btn" id="nickname-close">✕</button>
        </div>
        <div class="modal-body">
          <p class="modal-hint">Det här namnet syns på topplistorna för alla som spelar.</p>
          <label>Smeknamn</label>
          <input type="text" id="nickname-input" maxlength="24" placeholder="T.ex. Fabbe">
          <button class="modal-btn primary" id="nickname-save">Spara</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.remove("open"); });
    document.getElementById("nickname-close").addEventListener("click", () => overlay.classList.remove("open"));
    document.getElementById("nickname-save").addEventListener("click", () => {
      const val = document.getElementById("nickname-input").value.trim();
      if (!val) return;
      setNickname(val);
      overlay.classList.remove("open");
      document.dispatchEvent(new CustomEvent("shelf:nickname-set"));
    });
    updateNicknameTexts();
  }

  function askNickname(callback) {
    ensureNicknameModal();
    updateNicknameTexts();
    const overlay = document.getElementById("nickname-overlay");
    const input = document.getElementById("nickname-input");
    input.value = getNickname();
    overlay.classList.add("open");
    if (callback) {
      document.addEventListener("shelf:nickname-set", callback, { once: true });
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
          <span class="lb-name">${escapeHtml(entry.nickname)}</span>
          <span class="lb-score">${entry.score}${label ? " " + label : ""}</span>
        </div>
      `).join("");
    } catch (e) {
      list.innerHTML = `<p class="modal-hint">${t("lbError")}</p>`;
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  document.addEventListener("shelf:lang-changed", updateNicknameTexts);

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
      // Ask for a nickname once, then retry the submission.
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
