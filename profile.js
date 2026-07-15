// ============================================================
// SHELF — user profiles (Fas 1: unikt användarnamn + profil)
// ------------------------------------------------------------
// A username here is "claimed" through the Worker the first time
// someone picks one — the Worker rejects it if it's already taken,
// and gives back a secret token that proves ownership for future
// visits (stored only in this browser's localStorage).
//
// This becomes the identity used for the leaderboard too (see the
// bottom of this file, where it hooks into window.ShelfLeaderboard).
// ============================================================

(function () {
  const USERNAME_KEY = "shelf.profile.username";
  const SECRET_KEY = "shelf.profile.secret";

  function lang() { return localStorage.getItem("shelf.lang") || "sv"; }

  const STRINGS = {
    claimTitle: { sv: "Välj ditt användarnamn", en: "Choose your username" },
    claimHint: { sv: "Namnet är unikt — ingen annan kan ta det. Det syns på topplistor och i din profil.", en: "This name is unique — no one else can take it. It shows up on leaderboards and in your profile." },
    claimLabel: { sv: "Användarnamn", en: "Username" },
    claimPlaceholder: { sv: "T.ex. Fabbe", en: "e.g. Fabbe" },
    claimSave: { sv: "Skapa", en: "Create" },
    claimTaken: { sv: "Namnet är redan taget — testa ett annat.", en: "That name is already taken — try another." },
    claimInvalid: { sv: "Använd 2–24 tecken: bokstäver, siffror, understreck eller mellanslag.", en: "Use 2–24 characters: letters, numbers, underscores, or spaces." },
    claimError: { sv: "Kunde inte skapa kontot just nu — testa igen om en stund.", en: "Couldn't create the account right now — try again in a bit." },
    profileTitle: { sv: "Din profil", en: "Your profile" },
    memberSince: { sv: "Medlem sedan", en: "Member since" },
    gamesPlayed: { sv: "Omgångar spelade", en: "Rounds played" },
    gamesExplored: { sv: "Olika spel utforskade", en: "Different games explored" },
    achievementsTitle: { sv: "Achievements", en: "Achievements" },
    noAchievementsYet: { sv: "Inga än — spela lite för att låsa upp!", en: "None yet — play a bit to unlock some!" }
  };
  function t(key) { return STRINGS[key][lang()] || STRINGS[key].sv; }

  const ACHIEVEMENTS = {
    newcomer: { icon: "🆕", sv: "Nykomling", en: "Newcomer" },
    played5: { icon: "🎮", sv: "5 omgångar spelade", en: "Played 5 rounds" },
    played25: { icon: "🏅", sv: "25 omgångar spelade", en: "Played 25 rounds" },
    played100: { icon: "💯", sv: "100 omgångar spelade", en: "Played 100 rounds" },
    explorer: { icon: "🗺️", sv: "Utforskare — 3 olika spel", en: "Explorer — 3 different games" }
  };

  function workerReady() {
    return typeof WORKER_URL !== "undefined" && !WORKER_URL.includes("REPLACE-ME");
  }

  function getUsername() { return localStorage.getItem(USERNAME_KEY) || ""; }
  function getSecret() { return localStorage.getItem(SECRET_KEY) || ""; }
  function setIdentity(username, secret) {
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(SECRET_KEY, secret);
  }

  // ---------- Claim modal ----------
  function ensureClaimModal() {
    if (document.getElementById("claim-overlay")) return;
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "claim-overlay";
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h2 id="claim-title">Välj ditt användarnamn</h2>
          <button class="icon-btn" id="claim-close">✕</button>
        </div>
        <div class="modal-body">
          <p class="modal-hint" id="claim-hint">Namnet är unikt — ingen annan kan ta det.</p>
          <label id="claim-label">Användarnamn</label>
          <input type="text" id="claim-input" maxlength="24" placeholder="T.ex. Fabbe">
          <button class="modal-btn primary" id="claim-save">Skapa</button>
          <div class="admin-status" id="claim-status"></div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.remove("open"); });
    document.getElementById("claim-close").addEventListener("click", () => overlay.classList.remove("open"));
    document.getElementById("claim-save").addEventListener("click", submitClaim);
    document.getElementById("claim-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") submitClaim();
    });
    updateClaimTexts();
  }

  function updateClaimTexts() {
    const overlay = document.getElementById("claim-overlay");
    if (!overlay) return;
    document.getElementById("claim-title").textContent = t("claimTitle");
    document.getElementById("claim-hint").textContent = t("claimHint");
    document.getElementById("claim-label").textContent = t("claimLabel");
    document.getElementById("claim-input").placeholder = t("claimPlaceholder");
    document.getElementById("claim-save").textContent = t("claimSave");
  }

  let pendingCallback = null;

  async function submitClaim() {
    const input = document.getElementById("claim-input");
    const status = document.getElementById("claim-status");
    const username = input.value.trim();

    if (!/^[a-zA-Z0-9_ ]{2,24}$/.test(username)) {
      status.className = "admin-status error";
      status.textContent = t("claimInvalid");
      return;
    }
    if (!workerReady()) {
      status.className = "admin-status error";
      status.textContent = t("claimError");
      return;
    }

    status.className = "admin-status pending";
    status.textContent = "...";
    try {
      const res = await fetch(`${WORKER_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });
      const data = await res.json();
      if (!res.ok) {
        status.className = "admin-status error";
        status.textContent = data.error === "taken" ? t("claimTaken") : t("claimInvalid");
        return;
      }
      setIdentity(data.username, data.secret);
      document.getElementById("claim-overlay").classList.remove("open");
      renderProfileCorner();
      if (pendingCallback) { const cb = pendingCallback; pendingCallback = null; cb(); }
    } catch (e) {
      status.className = "admin-status error";
      status.textContent = t("claimError");
    }
  }

  function openClaim(callback) {
    ensureClaimModal();
    updateClaimTexts();
    document.getElementById("claim-input").value = "";
    document.getElementById("claim-status").textContent = "";
    pendingCallback = callback || null;
    document.getElementById("claim-overlay").classList.add("open");
  }

  function ensureUsername(callback) {
    if (getUsername()) { callback(); return; }
    openClaim(callback);
  }

  // ---------- Profile modal ----------
  function ensureProfileModal() {
    if (document.getElementById("profile-overlay")) return;
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "profile-overlay";
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h2 id="profile-modal-title">Din profil</h2>
          <button class="icon-btn" id="profile-close">✕</button>
        </div>
        <div class="modal-body" id="profile-body"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.remove("open"); });
    document.getElementById("profile-close").addEventListener("click", () => overlay.classList.remove("open"));
  }

  function formatDate(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString(lang() === "en" ? "en-GB" : "sv-SE");
  }

  async function openProfile() {
    const username = getUsername();
    if (!username) { openClaim(openProfile); return; }
    ensureProfileModal();
    document.getElementById("profile-modal-title").textContent = t("profileTitle");
    const body = document.getElementById("profile-body");
    body.innerHTML = `<p class="modal-hint">...</p>`;
    document.getElementById("profile-overlay").classList.add("open");

    if (!workerReady()) {
      body.innerHTML = `<p class="modal-hint">${t("claimError")}</p>`;
      return;
    }
    try {
      const res = await fetch(`${WORKER_URL}/users?username=${encodeURIComponent(username)}`);
      const data = await res.json();
      if (!res.ok) throw new Error("not found");

      const achievementsHtml = (data.achievements || []).length
        ? data.achievements.map(id => {
            const a = ACHIEVEMENTS[id];
            if (!a) return "";
            return `<div class="leaderboard-row"><span style="font-size:16px;">${a.icon}</span><span class="lb-name">${lang() === "en" ? a.en : a.sv}</span></div>`;
          }).join("")
        : `<p class="modal-hint">${t("noAchievementsYet")}</p>`;

      body.innerHTML = `
        <div style="text-align:center; margin-bottom:6px;">
          <div style="font-family:var(--font-display); font-size:20px;">${escapeHtml(data.username)}</div>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--muted);">${t("memberSince")} ${formatDate(data.createdAt)}</div>
        </div>
        <div class="leaderboard-list" style="margin-bottom:10px;">
          <div class="leaderboard-row"><span class="lb-name">${t("gamesPlayed")}</span><span class="lb-score">${data.stats.gamesPlayed || 0}</span></div>
          <div class="leaderboard-row"><span class="lb-name">${t("gamesExplored")}</span><span class="lb-score">${(data.stats.distinctGames || []).length}</span></div>
        </div>
        <div class="section-label" style="margin:0 0 10px;">${t("achievementsTitle")}</div>
        <div class="leaderboard-list">${achievementsHtml}</div>
      `;
    } catch (e) {
      body.innerHTML = `<p class="modal-hint">${t("claimError")}</p>`;
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ---------- Profile corner ----------
  function renderProfileCorner() {
    let el = document.getElementById("profile-corner");
    if (!el) {
      el = document.createElement("button");
      el.id = "profile-corner";
      el.addEventListener("click", openProfile);
      document.body.appendChild(el);
    }
    const username = getUsername();
    el.textContent = username ? `👤 ${username}` : `👤 ${lang() === "en" ? "Set username" : "Välj namn"}`;
  }

  // ---------- Track a play (fire-and-forget) ----------
  async function trackPlay(gameId) {
    const username = getUsername();
    const secret = getSecret();
    if (!username || !secret || !workerReady()) return;
    try {
      await fetch(`${WORKER_URL}/users/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, secret, game: gameId })
      });
    } catch (e) {
      // fine if this fails — stats just won't tick up this once
    }
  }

  document.addEventListener("shelf:lang-changed", () => {
    updateClaimTexts();
    renderProfileCorner();
  });

  function start() {
    renderProfileCorner();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  window.ShelfProfile = {
    getUsername,
    ensureUsername,
    openProfile,
    openClaim,
    trackPlay
  };
})();
