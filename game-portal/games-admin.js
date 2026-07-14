// ============================================================
// SHELF — upload games straight from the site
// ------------------------------------------------------------
// This lets the portal's OWNER (not visitors) commit a new game
// directly into the GitHub repo behind the portal, using a
// Personal Access Token stored only in this browser. Once GitHub
// Pages rebuilds (usually under a minute), the new game is live
// for everyone who visits the site.
//
// Nothing here ever sends the token anywhere except api.github.com,
// and the token is never written into any file that gets committed.
// ============================================================

(function () {
  const REPO_KEY = "shelf.gh.repo";
  const TOKEN_KEY = "shelf.gh.token";
  const ADMIN_KEY_STORAGE = "shelf.worker.adminkey";

  const overlay = document.getElementById("admin-overlay");
  const openBtn = document.getElementById("add-game-btn");
  const closeBtn = document.getElementById("admin-close");

  const connectStep = document.getElementById("admin-connect-step");
  const dashboard = document.getElementById("admin-dashboard");

  const repoInput = document.getElementById("gh-repo");
  const tokenInput = document.getElementById("gh-token");
  const adminKeyInput = document.getElementById("worker-admin-key");
  const saveBtn = document.getElementById("gh-save");
  const connectStatus = document.getElementById("connect-status");
  const disconnectBtn = document.getElementById("gh-disconnect");

  const titleInput = document.getElementById("game-title");
  const categoryInput = document.getElementById("game-category");
  const catList = document.getElementById("cat-list");
  const descSvInput = document.getElementById("game-desc-sv");
  const descEnInput = document.getElementById("game-desc-en");
  const colorInput = document.getElementById("game-color");
  const fileInput = document.getElementById("game-file");
  const submitBtn = document.getElementById("game-submit");
  const submitStatus = document.getElementById("submit-status");

  function getRepo() { return localStorage.getItem(REPO_KEY) || ""; }
  function getToken() { return localStorage.getItem(TOKEN_KEY) || ""; }
  function getAdminKey() { return localStorage.getItem(ADMIN_KEY_STORAGE) || ""; }

  function showStep() {
    const connected = getRepo() && getToken();
    connectStep.style.display = connected ? "none" : "flex";
    dashboard.style.display = connected ? "block" : "none";
    if (connected) populateCategoryList();
  }

  // ---------- Tabs ----------
  document.querySelectorAll(".admin-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".admin-tab").forEach(t => t.classList.toggle("active", t === tab));
      document.querySelectorAll(".admin-tab-panel").forEach(p => {
        p.style.display = p.id === `tab-${tab.dataset.tab}` ? "flex" : "none";
      });
    });
  });

  function populateCategoryList() {
    if (typeof GAMES === "undefined") return;
    const cats = [...new Set(GAMES.map(g => g.category))];
    catList.innerHTML = cats.map(c => `<option value="${c}">`).join("");
  }

  function open() {
    overlay.classList.add("open");
    connectStatus.textContent = "";
    submitStatus.textContent = "";
    submitStatus.className = "admin-status";
    repoInput.value = getRepo();
    adminKeyInput.value = getAdminKey();
    showStep();
  }

  function close() {
    overlay.classList.remove("open");
  }

  // ---------- Keep the admin button hidden from regular visitors ----------
  // It only appears automatically once this browser is already connected.
  // Before that, the owner reveals it once with Ctrl+Shift+A (or ⌘+Shift+A
  // on Mac) to do the first-time setup — after that it just stays visible
  // on that browser/device.
  function updateButtonVisibility() {
    const connected = getRepo() && getToken();
    openBtn.style.display = connected ? "inline-block" : "none";
  }

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && key === "a") {
      e.preventDefault();
      openBtn.style.display = "inline-block";
      open();
    }
  });

  updateButtonVisibility();

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

  saveBtn.addEventListener("click", () => {
    const repo = repoInput.value.trim();
    const token = tokenInput.value.trim();
    const adminKey = adminKeyInput.value.trim();
    if (!repo.includes("/")) {
      connectStatus.textContent = "Skriv repo som anvandare/repo-namn.";
      connectStatus.className = "admin-status error";
      return;
    }
    if (!token) {
      connectStatus.textContent = "Token saknas.";
      connectStatus.className = "admin-status error";
      return;
    }
    localStorage.setItem(REPO_KEY, repo);
    localStorage.setItem(TOKEN_KEY, token);
    if (adminKey) localStorage.setItem(ADMIN_KEY_STORAGE, adminKey);
    tokenInput.value = "";
    showStep();
    updateButtonVisibility();
  });

  disconnectBtn.addEventListener("click", () => {
    localStorage.removeItem(REPO_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY_STORAGE);
    showStep();
    updateButtonVisibility();
  });

  // ---------- GitHub API helpers ----------

  function toBase64Utf8(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
  function fromBase64Utf8(b64) {
    return decodeURIComponent(escape(atob(b64.replace(/\n/g, ""))));
  }

  async function ghApi(path, options = {}) {
    const repo = getRepo();
    const token = getToken();
    const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      ...options,
      headers: {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github+json",
        ...(options.headers || {})
      }
    });
    if (!res.ok) {
      let msg = `GitHub svarade ${res.status}`;
      try {
        const data = await res.json();
        if (data.message) msg = data.message;
      } catch (e) {}
      throw new Error(msg);
    }
    return res.json();
  }

  async function getFileIfExists(path) {
    try {
      return await ghApi(path);
    } catch (e) {
      return null;
    }
  }

  function slugify(title) {
    return title
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "game";
  }

  function escapeSvgText(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function generateThumb(title, color) {
    const initials = title.trim().split(/\s+/).slice(0, 2).map(w => w[0] || "").join("").toUpperCase();
    return `
      <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="200" fill="#161a26"/>
        <circle cx="160" cy="100" r="58" fill="${color}" opacity="0.18"/>
        <circle cx="160" cy="100" r="40" fill="none" stroke="${color}" stroke-width="2"/>
        <text x="160" y="112" font-family="Georgia, serif" font-size="34" text-anchor="middle" fill="${color}">${escapeSvgText(initials)}</text>
      </svg>
    `;
  }

  submitBtn.addEventListener("click", async () => {
    const title = titleInput.value.trim();
    const category = categoryInput.value.trim() || "Övrigt";
    const descSv = descSvInput.value.trim();
    const descEn = descEnInput.value.trim() || descSv;
    const color = colorInput.value;
    const file = fileInput.files[0];

    if (!title || !descSv || !file) {
      submitStatus.textContent = "Fyll i titel, beskrivning och välj en spelfil.";
      submitStatus.className = "admin-status error";
      return;
    }

    submitBtn.disabled = true;
    submitStatus.className = "admin-status pending";
    submitStatus.textContent = "Läser filen...";

    try {
      const fileText = await file.text();
      const slug = slugify(title);
      const path = `games/${slug}/index.html`;

      submitStatus.textContent = `Laddar upp ${path}...`;
      const existingGameFile = await getFileIfExists(path);
      await ghApi(path, {
        method: "PUT",
        body: JSON.stringify({
          message: `Add game: ${title}`,
          content: toBase64Utf8(fileText),
          ...(existingGameFile ? { sha: existingGameFile.sha } : {})
        })
      });

      submitStatus.textContent = "Uppdaterar games.js...";
      const gamesFile = await ghApi("games.js");
      const gamesText = fromBase64Utf8(gamesFile.content);
      const count = (gamesText.match(/id:\s*"/g) || []).length;
      const cart = String(count + 1).padStart(2, "0");
      const thumb = generateThumb(title, color);

      const entry = `  {
    id: ${JSON.stringify(slug)},
    title: ${JSON.stringify(title)},
    folder: ${JSON.stringify(slug)},
    category: ${JSON.stringify(category)},
    description: ${JSON.stringify(descSv)},
    descriptionEn: ${JSON.stringify(descEn)},
    color: ${JSON.stringify(color)},
    cart: ${JSON.stringify(cart)},
    thumb: \`${thumb}\`
  },
`;

      const insertAt = gamesText.lastIndexOf("];");
      if (insertAt === -1) throw new Error("Hittade inte slutet av games.js — kontrollera filen manuellt.");
      const newGamesText = gamesText.slice(0, insertAt) + entry + gamesText.slice(insertAt);

      await ghApi("games.js", {
        method: "PUT",
        body: JSON.stringify({
          message: `Register game: ${title}`,
          content: toBase64Utf8(newGamesText),
          sha: gamesFile.sha
        })
      });

      // Reflect it immediately in this session without waiting for Pages to rebuild
      if (typeof GAMES !== "undefined") {
        GAMES.unshift({ id: slug, title, folder: slug, category, description: descSv, descriptionEn: descEn, color, cart, thumb });
        if (window.ShelfPortal && window.ShelfPortal.refresh) window.ShelfPortal.refresh();
      }

      submitStatus.className = "admin-status success";
      submitStatus.textContent = `Klart! "${title}" är committat till repot. Ge GitHub Pages en minut att bygga om, sedan syns det för alla.`;
      titleInput.value = "";
      categoryInput.value = "";
      descSvInput.value = "";
      descEnInput.value = "";
      fileInput.value = "";
    } catch (err) {
      submitStatus.className = "admin-status error";
      submitStatus.textContent = "Något gick fel: " + err.message;
    } finally {
      submitBtn.disabled = false;
    }
  });

  // ---------- Announcement ----------
  const announcementText = document.getElementById("announcement-text");
  const announcementSend = document.getElementById("announcement-send");
  const announcementClear = document.getElementById("announcement-clear");
  const announcementStatus = document.getElementById("announcement-status");

  async function writeAnnouncement(message) {
    announcementStatus.className = "admin-status pending";
    announcementStatus.textContent = "Skickar...";
    try {
      const file = await getFileIfExists("announcement.json");
      const payload = { message, id: String(Date.now()) };
      await ghApi("announcement.json", {
        method: "PUT",
        body: JSON.stringify({
          message: message ? `Announcement: ${message.slice(0, 50)}` : "Clear announcement",
          content: toBase64Utf8(JSON.stringify(payload, null, 2)),
          ...(file ? { sha: file.sha } : {})
        })
      });
      announcementStatus.className = "admin-status success";
      announcementStatus.textContent = message
        ? "Skickat! Syns för alla efter att GitHub Pages byggt om (ca en minut)."
        : "Meddelandet är borttaget.";
    } catch (err) {
      announcementStatus.className = "admin-status error";
      announcementStatus.textContent = "Något gick fel: " + err.message;
    }
  }

  announcementSend.addEventListener("click", () => {
    const msg = announcementText.value.trim();
    if (!msg) {
      announcementStatus.className = "admin-status error";
      announcementStatus.textContent = "Skriv ett meddelande först.";
      return;
    }
    writeAnnouncement(msg);
  });

  announcementClear.addEventListener("click", () => {
    announcementText.value = "";
    writeAnnouncement("");
  });

  // ---------- Feedback inbox ----------
  const feedbackRefresh = document.getElementById("feedback-refresh");
  const feedbackInbox = document.getElementById("feedback-inbox");

  async function loadFeedback() {
    feedbackInbox.innerHTML = `<p class="modal-hint">Laddar...</p>`;
    const adminKey = getAdminKey();
    if (typeof WORKER_URL === "undefined" || WORKER_URL.includes("REPLACE-ME")) {
      feedbackInbox.innerHTML = `<p class="modal-hint">Worker-URL är inte konfigurerad än — se README.</p>`;
      return;
    }
    if (!adminKey) {
      feedbackInbox.innerHTML = `<p class="modal-hint">Lägg in din Admin-nyckel på anslutningssidan först.</p>`;
      return;
    }
    try {
      const res = await fetch(`${WORKER_URL}/feedback`, {
        headers: { "Authorization": `Bearer ${adminKey}` }
      });
      if (!res.ok) throw new Error(`Worker svarade ${res.status}`);
      const list = await res.json();
      if (!Array.isArray(list) || list.length === 0) {
        feedbackInbox.innerHTML = `<p class="modal-hint">Ingen feedback än.</p>`;
        return;
      }
      feedbackInbox.innerHTML = list.map(item => `
        <div class="leaderboard-row" style="align-items:flex-start; flex-direction:column; gap:4px;">
          <div style="display:flex; justify-content:space-between; width:100%;">
            <span class="lb-name" style="font-weight:700;">${escapeHtmlLocal(item.name || "Anonym")}</span>
            <span class="lb-score" style="font-size:11px; color:var(--muted);">${new Date(item.ts).toLocaleString("sv-SE")}</span>
          </div>
          <div style="font-size:13px; color:var(--text);">${escapeHtmlLocal(item.message)}</div>
        </div>
      `).join("");
    } catch (err) {
      feedbackInbox.innerHTML = `<p class="modal-hint">Kunde inte hämta feedback: ${err.message}</p>`;
    }
  }

  function escapeHtmlLocal(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  feedbackRefresh.addEventListener("click", loadFeedback);
})();
