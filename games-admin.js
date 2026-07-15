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
//
// Game files can be a single .html, or a .zip containing an
// index.html at its root plus any other files the game needs
// (images, extra JS/CSS, etc) — each file in the zip is committed
// to its own path under games/<slug>/.
// ============================================================

(function () {
  const REPO_KEY = "shelf.gh.repo";
  const TOKEN_KEY = "shelf.gh.token";
  const ADMIN_KEY_STORAGE = "shelf.worker.adminkey";

  function lang() { return localStorage.getItem("shelf.lang") || "sv"; }
  const STRINGS = {
    connectRepoError: { sv: "Skriv repo som anvandare/repo-namn.", en: "Enter the repo as username/repo-name." },
    connectTokenError: { sv: "Token saknas.", en: "Token is missing." },
    submitMissingFields: { sv: "Fyll i titel, beskrivning och välj en spelfil.", en: "Fill in the title, description, and choose a game file." },
    readingFile: { sv: "Läser filen...", en: "Reading the file..." },
    checkingName: { sv: "Kontrollerar namnet...", en: "Checking the name..." },
    readingZip: { sv: "Läser zip-filen...", en: "Reading the zip file..." },
    zipNoIndex: { sv: "Zip-filen måste innehålla en index.html i roten.", en: "The zip file must contain an index.html at its root." },
    updatingGamesJs: { sv: "Uppdaterar games.js...", en: "Updating games.js..." },
    genericError: { sv: "Något gick fel: ", en: "Something went wrong: " },
    announcementSending: { sv: "Skickar...", en: "Sending..." },
    announcementSentMsg: { sv: "Skickat! Syns för alla efter att GitHub Pages byggt om (ca en minut).", en: "Sent! Everyone will see it once GitHub Pages rebuilds (about a minute)." },
    announcementClearedMsg: { sv: "Meddelandet är borttaget.", en: "The message has been removed." },
    announcementEmptyError: { sv: "Skriv ett meddelande först.", en: "Write a message first." },
    feedbackLoading: { sv: "Laddar...", en: "Loading..." },
    feedbackNotConfigured: { sv: "Worker-URL är inte konfigurerad än — se README.", en: "Worker URL isn't set up yet — see the README." },
    feedbackNoAdminKey: { sv: "Lägg in din Admin-nyckel på anslutningssidan först.", en: "Enter your Admin key on the connect page first." },
    feedbackNone: { sv: "Ingen feedback än.", en: "No feedback yet." },
    feedbackError: { sv: "Kunde inte hämta feedback: ", en: "Couldn't load feedback: " },
    lbResetLabel: { sv: "Nollställ den här topplistan", en: "Reset this leaderboard" },
    lbConfirmReset: { sv: "Klicka igen för att bekräfta — går inte att ångra", en: "Click again to confirm — cannot be undone" },
    lbResetting: { sv: "Nollställer...", en: "Resetting..." },
    lbResetDone: { sv: "Topplistan är nollställd.", en: "The leaderboard has been reset." },
    codeInvalidAmount: { sv: "Ange ett belopp större än 0.", en: "Enter an amount greater than 0." },
    codeGenerating: { sv: "Skapar kod...", en: "Creating code..." },
    codeCreated: { sv: "Klart! Dela koden med en kompis — den funkar bara en gång.", en: "Done! Share the code with a friend — it only works once." },
    codeCopied: { sv: "Kopierad!", en: "Copied!" },
    codeNoneYet: { sv: "Inga koder skapade än.", en: "No codes created yet." },
    codeUsed: { sv: "använd", en: "used" },
    codeUnused: { sv: "oanvänd", en: "unused" }
  };
  function t(key) { return STRINGS[key][lang()] || STRINGS[key].sv; }
  function uploadingPathMsg(path) { return lang() === "en" ? `Uploading ${path}...` : `Laddar upp ${path}...`; }
  function uploadingFileOfMsg(i, total, name) {
    return lang() === "en" ? `Uploading file ${i} of ${total} (${name})...` : `Laddar upp fil ${i} av ${total} (${name})...`;
  }
  function submitSuccessMsg(title) {
    return lang() === "en"
      ? `Done! "${title}" has been committed to the repo. Give GitHub Pages a minute to rebuild, then it'll show up for everyone.`
      : `Klart! "${title}" är committat till repot. Ge GitHub Pages en minut att bygga om, sedan syns det för alla.`;
  }
  function renamedNoticeMsg(slug) {
    return lang() === "en"
      ? `(A game with that name already existed, so this one was saved as "${slug}".)`
      : `(Ett spel med det namnet fanns redan, så det här sparades som "${slug}".)`;
  }

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
      document.querySelectorAll(".admin-tab").forEach(tb => tb.classList.toggle("active", tb === tab));
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
  // Before that, the owner reveals it once with the secret shortcut to do
  // the first-time setup — after that it just stays visible on that
  // browser/device.
  function updateButtonVisibility() {
    const connected = getRepo() && getToken();
    openBtn.style.display = connected ? "inline-block" : "none";
  }

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (e.ctrlKey && e.altKey && key === "c") {
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
      connectStatus.textContent = t("connectRepoError");
      connectStatus.className = "admin-status error";
      return;
    }
    if (!token) {
      connectStatus.textContent = t("connectTokenError");
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
      let msg = `GitHub: ${res.status}`;
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

  // Uploads a single self-contained .html file as games/<slug>/index.html
  async function uploadHtmlGame(file, slug, setStatus) {
    const fileText = await file.text();
    const path = `games/${slug}/index.html`;
    setStatus(uploadingPathMsg(path));
    const existing = await getFileIfExists(path);
    await ghApi(path, {
      method: "PUT",
      body: JSON.stringify({
        message: `Add game: ${slug}`,
        content: toBase64Utf8(fileText),
        ...(existing ? { sha: existing.sha } : {})
      })
    });
  }

  // Uploads every file inside a .zip to games/<slug>/<relative-path>.
  // Requires an index.html at the zip's root.
  async function uploadZipGame(file, slug, setStatus) {
    if (typeof JSZip === "undefined") {
      throw new Error("JSZip did not load — check your internet connection and try again.");
    }
    const zip = await JSZip.loadAsync(file);
    const entries = Object.entries(zip.files).filter(([, f]) => !f.dir);
    const hasRootIndex = entries.some(([name]) => name.toLowerCase() === "index.html");
    if (!hasRootIndex) throw new Error(t("zipNoIndex"));

    let i = 0;
    for (const [name, entry] of entries) {
      i++;
      setStatus(uploadingFileOfMsg(i, entries.length, name));
      const path = `games/${slug}/${name}`;
      const content64 = await entry.async("base64");
      const existing = await getFileIfExists(path);
      await ghApi(path, {
        method: "PUT",
        body: JSON.stringify({
          message: `Add game asset: ${name}`,
          content: content64,
          ...(existing ? { sha: existing.sha } : {})
        })
      });
    }
  }

  function normalizeCategory(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return "";
    // Title-case each word so "arcade" / "ARCADE" / "Arcade" all collapse
    // into the same filter pill instead of three near-duplicates.
    return trimmed
      .split(/\s+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  }

  function uniqueSlug(baseSlug, existingIds) {
    if (!existingIds.has(baseSlug)) return baseSlug;
    let n = 2;
    while (existingIds.has(`${baseSlug}-${n}`)) n++;
    return `${baseSlug}-${n}`;
  }

  submitBtn.addEventListener("click", async () => {
    const title = titleInput.value.trim();
    const category = normalizeCategory(categoryInput.value) || "Övrigt";
    const descSv = descSvInput.value.trim();
    const descEn = descEnInput.value.trim() || descSv;
    const color = colorInput.value;
    const file = fileInput.files[0];

    if (!title || !descSv || !file) {
      submitStatus.textContent = t("submitMissingFields");
      submitStatus.className = "admin-status error";
      return;
    }

    submitBtn.disabled = true;
    submitStatus.className = "admin-status pending";
    const setStatus = (msg) => { submitStatus.textContent = msg; };
    setStatus(t("checkingName"));

    try {
      // Fetch games.js up front so we can both check for name collisions
      // and know how many games already exist (for the cart number).
      const gamesFile = await ghApi("games.js");
      const gamesText = fromBase64Utf8(gamesFile.content);
      const existingIds = new Set([...gamesText.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]));
      const baseSlug = slugify(title);
      const slug = uniqueSlug(baseSlug, existingIds);
      const renamed = slug !== baseSlug;

      setStatus(file.name.toLowerCase().endsWith(".zip") ? t("readingZip") : t("readingFile"));
      const isZip = file.name.toLowerCase().endsWith(".zip");

      if (isZip) {
        await uploadZipGame(file, slug, setStatus);
      } else {
        await uploadHtmlGame(file, slug, setStatus);
      }

      setStatus(t("updatingGamesJs"));
      const count = existingIds.size;
      const cart = String(count + 1).padStart(2, "0");
      const thumb = generateThumb(title, color);
      const addedAt = new Date().toISOString().slice(0, 10);

      const entry = `  {
    id: ${JSON.stringify(slug)},
    title: ${JSON.stringify(title)},
    folder: ${JSON.stringify(slug)},
    category: ${JSON.stringify(category)},
    description: ${JSON.stringify(descSv)},
    descriptionEn: ${JSON.stringify(descEn)},
    color: ${JSON.stringify(color)},
    cart: ${JSON.stringify(cart)},
    addedAt: ${JSON.stringify(addedAt)},
    thumb: \`${thumb}\`
  },
`;

      const insertAt = gamesText.lastIndexOf("];");
      if (insertAt === -1) throw new Error("Couldn't find the end of games.js — check the file manually.");
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
        GAMES.unshift({ id: slug, title, folder: slug, category, description: descSv, descriptionEn: descEn, color, cart, addedAt, thumb });
        if (window.ShelfPortal && window.ShelfPortal.refresh) window.ShelfPortal.refresh();
      }

      submitStatus.className = "admin-status success";
      submitStatus.textContent = submitSuccessMsg(title) + (renamed ? " " + renamedNoticeMsg(slug) : "");
      titleInput.value = "";
      categoryInput.value = "";
      descSvInput.value = "";
      descEnInput.value = "";
      fileInput.value = "";
    } catch (err) {
      submitStatus.className = "admin-status error";
      submitStatus.textContent = t("genericError") + err.message;
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
    announcementStatus.textContent = t("announcementSending");
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
      announcementStatus.textContent = message ? t("announcementSentMsg") : t("announcementClearedMsg");
    } catch (err) {
      announcementStatus.className = "admin-status error";
      announcementStatus.textContent = t("genericError") + err.message;
    }
  }

  announcementSend.addEventListener("click", () => {
    const msg = announcementText.value.trim();
    if (!msg) {
      announcementStatus.className = "admin-status error";
      announcementStatus.textContent = t("announcementEmptyError");
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
    feedbackInbox.innerHTML = `<p class="modal-hint">${t("feedbackLoading")}</p>`;
    const adminKey = getAdminKey();
    if (typeof WORKER_URL === "undefined" || WORKER_URL.includes("REPLACE-ME")) {
      feedbackInbox.innerHTML = `<p class="modal-hint">${t("feedbackNotConfigured")}</p>`;
      return;
    }
    if (!adminKey) {
      feedbackInbox.innerHTML = `<p class="modal-hint">${t("feedbackNoAdminKey")}</p>`;
      return;
    }
    try {
      const res = await fetch(`${WORKER_URL}/feedback`, {
        headers: { "Authorization": `Bearer ${adminKey}` }
      });
      if (!res.ok) throw new Error(`Worker: ${res.status}`);
      const list = await res.json();
      if (!Array.isArray(list) || list.length === 0) {
        feedbackInbox.innerHTML = `<p class="modal-hint">${t("feedbackNone")}</p>`;
        return;
      }
      const dateLocale = lang() === "en" ? "en-GB" : "sv-SE";
      feedbackInbox.innerHTML = list.map(item => `
        <div class="leaderboard-row" style="align-items:flex-start; flex-direction:column; gap:4px;">
          <div style="display:flex; justify-content:space-between; width:100%;">
            <span class="lb-name" style="font-weight:700;">${escapeHtmlLocal(item.name || "Anonym")}</span>
            <span class="lb-score" style="font-size:11px; color:var(--muted);">${new Date(item.ts).toLocaleString(dateLocale)}</span>
          </div>
          <div style="font-size:13px; color:var(--text);">${escapeHtmlLocal(item.message)}</div>
        </div>
      `).join("");
    } catch (err) {
      feedbackInbox.innerHTML = `<p class="modal-hint">${t("feedbackError")}${err.message}</p>`;
    }
  }

  function escapeHtmlLocal(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  feedbackRefresh.addEventListener("click", loadFeedback);

  // ---------- Leaderboard reset ----------
  const lbGameSelect = document.getElementById("lb-game-select");
  const lbResetBtn = document.getElementById("lb-reset-btn");
  const lbResetStatus = document.getElementById("lb-reset-status");
  let lbResetArmed = false;

  function populateLeaderboardGames() {
    if (typeof GAMES === "undefined") return;
    const withScores = GAMES.filter(g => g.scoreKey);
    lbGameSelect.innerHTML = withScores.map(g => `<option value="${g.id}">${g.title}</option>`).join("");
  }

  function resetResetButton() {
    lbResetArmed = false;
    lbResetBtn.textContent = t("lbResetLabel");
    lbResetBtn.classList.remove("primary");
  }

  lbResetBtn.addEventListener("click", async () => {
    const adminKey = getAdminKey();
    if (typeof WORKER_URL === "undefined" || WORKER_URL.includes("REPLACE-ME")) {
      lbResetStatus.className = "admin-status error";
      lbResetStatus.textContent = t("feedbackNotConfigured");
      return;
    }
    if (!adminKey) {
      lbResetStatus.className = "admin-status error";
      lbResetStatus.textContent = t("feedbackNoAdminKey");
      return;
    }

    if (!lbResetArmed) {
      lbResetArmed = true;
      lbResetBtn.textContent = t("lbConfirmReset");
      lbResetBtn.classList.add("primary");
      return;
    }

    const gameId = lbGameSelect.value;
    if (!gameId) return;

    lbResetStatus.className = "admin-status pending";
    lbResetStatus.textContent = t("lbResetting");
    try {
      const res = await fetch(`${WORKER_URL}/scores?game=${encodeURIComponent(gameId)}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${adminKey}` }
      });
      if (!res.ok) throw new Error(`Worker: ${res.status}`);
      lbResetStatus.className = "admin-status success";
      lbResetStatus.textContent = t("lbResetDone");
    } catch (err) {
      lbResetStatus.className = "admin-status error";
      lbResetStatus.textContent = t("genericError") + err.message;
    } finally {
      resetResetButton();
    }
  });

  document.querySelector('[data-tab="leaderboards"]').addEventListener("click", () => {
    populateLeaderboardGames();
    resetResetButton();
    lbResetStatus.textContent = "";
  });

  document.addEventListener("shelf:lang-changed", () => {
    if (lbResetBtn) resetResetButton();
    if (codeCurrencySelect) populateCurrencyOptions();
  });

  // ---------- Currency codes ----------
  const codeGameSelect = document.getElementById("code-game-select");
  const codeCurrencySelect = document.getElementById("code-currency-select");
  const codeAmountInput = document.getElementById("code-amount");
  const codeGenerateBtn = document.getElementById("code-generate-btn");
  const codeGenerateStatus = document.getElementById("code-generate-status");
  const codeResult = document.getElementById("code-result");
  const codeResultValue = document.getElementById("code-result-value");
  const codeCopyBtn = document.getElementById("code-copy-btn");
  const codeRefreshBtn = document.getElementById("code-refresh-btn");
  const codeHistory = document.getElementById("code-history");

  const CURRENCIES_BY_GAME = {
    "neon-alley": [
      { value: "tokens", sv: "Poletter", en: "Tokens" },
      { value: "tickets", sv: "Tickets", en: "Tickets" }
    ],
    "gilded-fox": [
      { value: "chips", sv: "Marker (chips)", en: "Chips" }
    ]
  };

  function populateCurrencyOptions(){
    const options = CURRENCIES_BY_GAME[codeGameSelect.value] || [];
    codeCurrencySelect.innerHTML = options.map(o => `<option value="${o.value}">${lang() === "en" ? o.en : o.sv}</option>`).join("");
  }
  codeGameSelect.addEventListener("change", populateCurrencyOptions);
  populateCurrencyOptions();

  codeGenerateBtn.addEventListener("click", async () => {
    const adminKey = getAdminKey();
    if (typeof WORKER_URL === "undefined" || WORKER_URL.includes("REPLACE-ME")) {
      codeGenerateStatus.className = "admin-status error";
      codeGenerateStatus.textContent = t("feedbackNotConfigured");
      return;
    }
    if (!adminKey) {
      codeGenerateStatus.className = "admin-status error";
      codeGenerateStatus.textContent = t("feedbackNoAdminKey");
      return;
    }
    const game = codeGameSelect.value;
    const currency = codeCurrencySelect.value;
    const amount = parseInt(codeAmountInput.value, 10);
    if (!amount || amount <= 0){
      codeGenerateStatus.className = "admin-status error";
      codeGenerateStatus.textContent = t("codeInvalidAmount");
      return;
    }

    codeGenerateStatus.className = "admin-status pending";
    codeGenerateStatus.textContent = t("codeGenerating");
    codeResult.style.display = "none";
    try {
      const res = await fetch(`${WORKER_URL}/codes`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${adminKey}` },
        body: JSON.stringify({ game, currency, amount })
      });
      if (!res.ok) throw new Error(`Worker: ${res.status}`);
      const data = await res.json();
      codeResultValue.value = data.code;
      codeResult.style.display = "block";
      codeGenerateStatus.className = "admin-status success";
      codeGenerateStatus.textContent = t("codeCreated");
    } catch (err) {
      codeGenerateStatus.className = "admin-status error";
      codeGenerateStatus.textContent = t("genericError") + err.message;
    }
  });

  codeCopyBtn.addEventListener("click", () => {
    codeResultValue.select();
    try {
      document.execCommand("copy");
      codeGenerateStatus.className = "admin-status success";
      codeGenerateStatus.textContent = t("codeCopied");
    } catch (e) {
      // Selecting the text is still enough for a manual copy if this fails
    }
  });

  async function loadCodeHistory(){
    codeHistory.innerHTML = `<p class="modal-hint">${t("feedbackLoading")}</p>`;
    const adminKey = getAdminKey();
    if (typeof WORKER_URL === "undefined" || WORKER_URL.includes("REPLACE-ME")) {
      codeHistory.innerHTML = `<p class="modal-hint">${t("feedbackNotConfigured")}</p>`;
      return;
    }
    if (!adminKey) {
      codeHistory.innerHTML = `<p class="modal-hint">${t("feedbackNoAdminKey")}</p>`;
      return;
    }
    try {
      const res = await fetch(`${WORKER_URL}/codes`, {
        headers: { "Authorization": `Bearer ${adminKey}` }
      });
      if (!res.ok) throw new Error(`Worker: ${res.status}`);
      const list = await res.json();
      if (!Array.isArray(list) || list.length === 0) {
        codeHistory.innerHTML = `<p class="modal-hint">${t("codeNoneYet")}</p>`;
        return;
      }
      codeHistory.innerHTML = list.map(item => `
        <div class="leaderboard-row">
          <span class="lb-name" style="font-family:var(--font-mono);">${item.code}</span>
          <span class="lb-score" style="font-size:11px; color:${item.used ? 'var(--muted)' : 'var(--accent)'};">
            ${item.game} · ${item.amount} ${item.currency} · ${item.used ? t("codeUsed") : t("codeUnused")}
          </span>
        </div>
      `).join("");
    } catch (err) {
      codeHistory.innerHTML = `<p class="modal-hint">${t("feedbackError")}${err.message}</p>`;
    }
  }

  codeRefreshBtn.addEventListener("click", loadCodeHistory);
})();
