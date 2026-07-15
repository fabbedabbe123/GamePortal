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
    noAchievementsYet: { sv: "Inga än — spela lite för att låsa upp!", en: "None yet — play a bit to unlock some!" },
    friendsTitle: { sv: "Vänner", en: "Friends" },
    noFriendsYet: { sv: "Inga vänner än — lägg till någon med deras användarnamn.", en: "No friends yet — add someone using their username." },
    incomingTitle: { sv: "Förfrågningar", en: "Requests" },
    outgoingLabel: { sv: "Väntar på svar", en: "Awaiting reply" },
    addFriendPlaceholder: { sv: "Användarnamn...", en: "Username..." },
    addFriendBtn: { sv: "Lägg till", en: "Add" },
    acceptBtn: { sv: "Acceptera", en: "Accept" },
    declineBtn: { sv: "Neka", en: "Decline" },
    removeBtn: { sv: "Ta bort", en: "Remove" },
    friendAdded: { sv: "Vänförfrågan skickad!", en: "Friend request sent!" },
    friendAutoAccepted: { sv: "Ni är nu vänner!", en: "You're now friends!" },
    friendNotFound: { sv: "Hittar inget konto med det namnet.", en: "No account found with that name." },
    friendAlready: { sv: "Redan vänner.", en: "Already friends." },
    friendSelfError: { sv: "Du kan inte lägga till dig själv.", en: "You can't add yourself." },
    alreadyFriendsBtn: { sv: "Vänner ✓", en: "Friends ✓" },
    pendingBtn: { sv: "Väntar på svar...", en: "Awaiting reply..." },
    acceptRequestBtn: { sv: "Acceptera vänförfrågan", en: "Accept friend request" },
    addFriendBtnLarge: { sv: "Lägg till vän", en: "Add friend" },
    challengesTitle: { sv: "Utmaningar", en: "Challenges" },
    challengeBtn: { sv: "Utmana", en: "Challenge" },
    challengeGameLabel: { sv: "Spel", en: "Game" },
    challengeSendBtn: { sv: "Skicka utmaning", en: "Send challenge" },
    challengeNoScore: { sv: "Du har inget resultat i det spelet än — spela det först.", en: "You don't have a result in that game yet — play it first." },
    challengeSent: { sv: "Utmaning skickad!", en: "Challenge sent!" },
    challengePlayBtn: { sv: "Spela", en: "Play" },
    challengePending: { sv: "Väntar på svar", en: "Awaiting reply" },
    challengeWon: { sv: "Du vann!", en: "You won!" },
    challengeLost: { sv: "Du förlorade.", en: "You lost." },
    challengeBeat: { sv: "Slå:", en: "Beat:" },
    noChallengesYet: { sv: "Inga utmaningar än.", en: "No challenges yet." }
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

  async function fetchMyFriends() {
    const username = getUsername();
    const secret = getSecret();
    if (!username || !secret || !workerReady()) return null;
    try {
      const res = await fetch(`${WORKER_URL}/friends?username=${encodeURIComponent(username)}&secret=${encodeURIComponent(secret)}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  async function fetchMyChallenges() {
    const username = getUsername();
    const secret = getSecret();
    if (!username || !secret || !workerReady()) return [];
    try {
      const res = await fetch(`${WORKER_URL}/challenges?username=${encodeURIComponent(username)}&secret=${encodeURIComponent(secret)}`);
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      return [];
    }
  }

  async function openProfile(targetUsername) {
    const myUsername = getUsername();
    if (!myUsername) { openClaim(() => openProfile(targetUsername)); return; }

    const viewingSelf = !targetUsername || targetUsername.toLowerCase() === myUsername.toLowerCase();
    const displayUsername = viewingSelf ? myUsername : targetUsername;

    ensureProfileModal();
    document.getElementById("profile-modal-title").textContent = viewingSelf ? t("profileTitle") : displayUsername;
    const body = document.getElementById("profile-body");
    body.innerHTML = `<p class="modal-hint">...</p>`;
    document.getElementById("profile-overlay").classList.add("open");

    if (!workerReady()) {
      body.innerHTML = `<p class="modal-hint">${t("claimError")}</p>`;
      return;
    }

    try {
      const res = await fetch(`${WORKER_URL}/users?username=${encodeURIComponent(displayUsername)}`);
      const data = await res.json();
      if (!res.ok) throw new Error("not found");

      const achievementsHtml = (data.achievements || []).length
        ? data.achievements.map(id => {
            const a = ACHIEVEMENTS[id];
            if (!a) return "";
            return `<div class="leaderboard-row"><span style="font-size:16px;">${a.icon}</span><span class="lb-name">${lang() === "en" ? a.en : a.sv}</span></div>`;
          }).join("")
        : `<p class="modal-hint">${t("noAchievementsYet")}</p>`;

      const friendData = await fetchMyFriends();
      const friendsSectionHtml = viewingSelf
        ? renderOwnFriendsSection(friendData)
        : renderFriendActionSection(displayUsername, friendData);

      const challengesSectionHtml = viewingSelf
        ? renderChallengesSection(await fetchMyChallenges())
        : "";

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
        <div class="leaderboard-list" style="margin-bottom:10px;">${achievementsHtml}</div>
        ${challengesSectionHtml}
        ${friendsSectionHtml}
      `;
      wireProfileBodyActions(displayUsername);
    } catch (e) {
      body.innerHTML = `<p class="modal-hint">${t("claimError")}</p>`;
    }
  }

  function renderOwnFriendsSection(friendData) {
    const friends = friendData ? friendData.friends || [] : [];
    const incoming = friendData ? friendData.incoming || [] : [];
    const outgoing = friendData ? friendData.outgoing || [] : [];

    const incomingHtml = incoming.length ? `
      <div class="section-label" style="margin:14px 0 8px;">${t("incomingTitle")}</div>
      <div class="leaderboard-list" style="margin-bottom:10px;">
        ${incoming.map(name => `
          <div class="leaderboard-row">
            <span class="lb-name" style="cursor:pointer;" data-view-profile="${escapeHtml(name)}">${escapeHtml(name)}</span>
            <span style="display:flex; gap:6px;">
              <button class="lb-btn" data-accept="${escapeHtml(name)}">${t("acceptBtn")}</button>
              <button class="lb-btn" data-decline="${escapeHtml(name)}">${t("declineBtn")}</button>
            </span>
          </div>
        `).join("")}
      </div>
    ` : "";

    const friendsHtml = friends.length
      ? friends.map(name => `
          <div class="leaderboard-row">
            <span class="lb-name" style="cursor:pointer;" data-view-profile="${escapeHtml(name)}">${escapeHtml(name)}</span>
            <button class="lb-btn" data-decline="${escapeHtml(name)}">${t("removeBtn")}</button>
          </div>
        `).join("")
      : `<p class="modal-hint">${t("noFriendsYet")}</p>`;

    const outgoingHtml = outgoing.length ? `
      <div style="margin-top:8px;">
        ${outgoing.map(name => `<span class="tag" style="margin-right:6px;">${escapeHtml(name)} — ${t("outgoingLabel")}</span>`).join("")}
      </div>
    ` : "";

    return `
      ${incomingHtml}
      <div class="section-label" style="margin:14px 0 8px;">${t("friendsTitle")}</div>
      <div class="leaderboard-list">${friendsHtml}</div>
      ${outgoingHtml}
      <label style="margin-top:14px;">${t("addFriendBtnLarge")}</label>
      <div style="display:flex; gap:8px;">
        <input type="text" id="add-friend-input" maxlength="24" placeholder="${t("addFriendPlaceholder")}" style="flex:1;">
        <button class="modal-btn primary" id="add-friend-btn" style="margin:0; white-space:nowrap;">${t("addFriendBtn")}</button>
      </div>
      <div class="admin-status" id="friend-action-status"></div>
    `;
  }

  function challengeableGames() {
    return (typeof GAMES !== "undefined" ? GAMES : []).filter(g => g.scoreKey);
  }

  function renderChallengesSection(challenges) {
    const pendingIncoming = challenges.filter(c => c.status === "pending" && c.to === getUsername());
    const pendingOutgoing = challenges.filter(c => c.status === "pending" && c.from === getUsername());
    const completed = challenges.filter(c => c.status === "completed").slice(0, 5);

    if (!pendingIncoming.length && !pendingOutgoing.length && !completed.length) return "";

    function gameTitle(id) {
      const g = challengeableGames().find(g => g.id === id);
      return g ? g.title : id;
    }

    const incomingHtml = pendingIncoming.map(c => `
      <div class="leaderboard-row">
        <span class="lb-name">${escapeHtml(c.from)} — ${escapeHtml(gameTitle(c.game))}<br>
          <span style="color:var(--muted); font-size:11px;">${t("challengeBeat")} ${c.targetScore}</span>
        </span>
        <button class="lb-btn" data-play-challenge="${escapeHtml(c.game)}">${t("challengePlayBtn")}</button>
      </div>
    `).join("");

    const outgoingHtml = pendingOutgoing.map(c => `
      <div class="leaderboard-row">
        <span class="lb-name">${escapeHtml(c.to)} — ${escapeHtml(gameTitle(c.game))}</span>
        <span class="tag">${t("challengePending")}</span>
      </div>
    `).join("");

    const completedHtml = completed.map(c => {
      const won = c.result && c.result.winner === getUsername();
      const other = c.from === getUsername() ? c.to : c.from;
      return `
        <div class="leaderboard-row">
          <span class="lb-name">${escapeHtml(other)} — ${escapeHtml(gameTitle(c.game))}</span>
          <span class="lb-score" style="color:${won ? "var(--accent-2)" : "var(--accent-pink)"};">${won ? t("challengeWon") : t("challengeLost")}</span>
        </div>
      `;
    }).join("");

    return `
      <div class="section-label" style="margin:0 0 10px;">${t("challengesTitle")}</div>
      <div class="leaderboard-list" style="margin-bottom:12px;">
        ${incomingHtml}${outgoingHtml}${completedHtml || (!incomingHtml && !outgoingHtml ? `<p class="modal-hint">${t("noChallengesYet")}</p>` : "")}
      </div>
    `;
  }

  function renderFriendActionSection(targetUsername, friendData) {
    const friends = friendData ? friendData.friends || [] : [];
    const incoming = friendData ? friendData.incoming || [] : [];
    const outgoing = friendData ? friendData.outgoing || [] : [];

    let buttonHtml;
    let isFriend = false;
    if (friends.some(f => f.toLowerCase() === targetUsername.toLowerCase())) {
      buttonHtml = `<button class="modal-btn ghost" disabled>${t("alreadyFriendsBtn")}</button>`;
      isFriend = true;
    } else if (outgoing.some(f => f.toLowerCase() === targetUsername.toLowerCase())) {
      buttonHtml = `<button class="modal-btn ghost" disabled>${t("pendingBtn")}</button>`;
    } else if (incoming.some(f => f.toLowerCase() === targetUsername.toLowerCase())) {
      buttonHtml = `<button class="modal-btn primary" data-accept="${escapeHtml(targetUsername)}">${t("acceptRequestBtn")}</button>`;
    } else {
      buttonHtml = `<button class="modal-btn primary" data-add-friend="${escapeHtml(targetUsername)}">${t("addFriendBtnLarge")}</button>`;
    }

    const games = challengeableGames();
    const challengeFormHtml = isFriend && games.length ? `
      <div class="section-label" style="margin:16px 0 10px;">${t("challengeBtn")}</div>
      <label id="challenge-game-label">${t("challengeGameLabel")}</label>
      <select id="challenge-game-select">
        ${games.map(g => `<option value="${g.id}">${g.title}</option>`).join("")}
      </select>
      <button class="modal-btn primary" id="send-challenge-btn" data-challenge-target="${escapeHtml(targetUsername)}">${t("challengeSendBtn")}</button>
      <div class="admin-status" id="challenge-send-status"></div>
    ` : "";

    return `
      <div style="margin-top:6px; text-align:center;">
        ${buttonHtml}
        <div class="admin-status" id="friend-action-status"></div>
      </div>
      ${challengeFormHtml}
    `;
  }

  function wireProfileBodyActions(displayUsername) {
    const body = document.getElementById("profile-body");
    const status = document.getElementById("friend-action-status");

    body.querySelectorAll("[data-view-profile]").forEach(el => {
      el.addEventListener("click", () => openProfile(el.dataset.viewProfile));
    });

    body.querySelectorAll("[data-accept]").forEach(el => {
      el.addEventListener("click", async () => {
        await respondFriendAction("accept", el.dataset.accept);
        openProfile(displayUsername);
      });
    });

    body.querySelectorAll("[data-decline]").forEach(el => {
      el.addEventListener("click", async () => {
        await respondFriendAction("decline", el.dataset.decline);
        openProfile(displayUsername);
      });
    });

    const addBtn = document.getElementById("add-friend-btn");
    if (addBtn) {
      addBtn.addEventListener("click", async () => {
        const input = document.getElementById("add-friend-input");
        const target = input.value.trim();
        if (!target) return;
        await sendFriendRequest(target);
        openProfile(displayUsername);
      });
    }

    const bigAddBtn = body.querySelector("[data-add-friend]");
    if (bigAddBtn) {
      bigAddBtn.addEventListener("click", async () => {
        await sendFriendRequest(bigAddBtn.dataset.addFriend);
        openProfile(displayUsername);
      });
    }

    const sendChallengeBtn = document.getElementById("send-challenge-btn");
    if (sendChallengeBtn) {
      sendChallengeBtn.addEventListener("click", async () => {
        const gameId = document.getElementById("challenge-game-select").value;
        const challengeStatus = document.getElementById("challenge-send-status");
        const ok = await sendChallenge(sendChallengeBtn.dataset.challengeTarget, gameId, challengeStatus);
        if (ok) setTimeout(() => openProfile(displayUsername), 900);
      });
    }

    body.querySelectorAll("[data-play-challenge]").forEach(el => {
      el.addEventListener("click", () => {
        document.getElementById("profile-overlay").classList.remove("open");
        if (window.ShelfPortal && window.ShelfPortal.launchGameById) {
          window.ShelfPortal.launchGameById(el.dataset.playChallenge);
        }
      });
    });
  }

  async function sendChallenge(target, gameId, statusEl) {
    const username = getUsername();
    const secret = getSecret();
    const game = challengeableGames().find(g => g.id === gameId);
    if (!username || !secret || !game || !workerReady()) return false;

    const raw = localStorage.getItem(game.scoreKey);
    const myScore = Number(raw);
    if (raw === null || !Number.isFinite(myScore)) {
      statusEl.className = "admin-status error";
      statusEl.textContent = t("challengeNoScore");
      return false;
    }

    statusEl.className = "admin-status pending";
    statusEl.textContent = "...";
    try {
      const res = await fetch(`${WORKER_URL}/challenges`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username, secret, target: target,
          game: gameId, targetScore: myScore, better: game.scoreBetter || "higher"
        })
      });
      if (!res.ok) throw new Error("failed");
      statusEl.className = "admin-status success";
      statusEl.textContent = t("challengeSent");
      return true;
    } catch (e) {
      statusEl.className = "admin-status error";
      statusEl.textContent = t("claimError");
      return false;
    }
  }

  // ---------- Resolve challenges after playing (called from script.js) ----------
  async function checkChallenges(gameId) {
    const username = getUsername();
    const secret = getSecret();
    if (!username || !secret || !workerReady()) return;
    const game = challengeableGames().find(g => g.id === gameId);
    if (!game) return;

    const raw = localStorage.getItem(game.scoreKey);
    if (raw === null) return;
    const myScore = Number(raw);
    if (!Number.isFinite(myScore)) return;

    try {
      const challenges = await fetchMyChallenges();
      const pending = challenges.filter(c => c.status === "pending" && c.to === username && c.game === gameId);
      for (const c of pending) {
        await fetch(`${WORKER_URL}/challenges/resolve`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, secret, id: c.id, myScore })
        });
      }
    } catch (e) {
      // fine — they'll just still show as pending next time
    }
  }

  async function sendFriendRequest(target) {
    const username = getUsername();
    const secret = getSecret();
    if (!username || !secret || !workerReady()) return;
    try {
      const res = await fetch(`${WORKER_URL}/friends/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, secret, target })
      });
      const data = await res.json();
      if (!res.ok && data.error !== "already requested") {
        // Silently ignore — the profile re-render will reflect the real state either way.
      }
    } catch (e) { /* fine, re-render will just show the prior state */ }
  }

  async function respondFriendAction(kind, otherUsername) {
    const username = getUsername();
    const secret = getSecret();
    if (!username || !secret || !workerReady()) return;
    try {
      await fetch(`${WORKER_URL}/friends/${kind}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, secret, from: otherUsername, target: otherUsername })
      });
    } catch (e) { /* fine */ }
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
      el.addEventListener("click", () => openProfile());
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
    trackPlay,
    checkChallenges
  };
})();
