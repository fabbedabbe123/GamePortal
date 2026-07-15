(function () {
  const grid = document.getElementById("grid");
  const searchInput = document.getElementById("search");
  const categoryPills = document.getElementById("category-pills");
  const favToggle = document.getElementById("fav-toggle");
  const player = document.getElementById("player");
  const gameFrame = document.getElementById("game-frame");
  const playerTitle = document.getElementById("player-title");
  const backBtn = document.getElementById("back-btn");
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const langButtons = document.querySelectorAll("#lang-toggle button");

  const FAV_KEY = "shelf.favorites";
  const LANG_KEY = "shelf.lang";
  let favorites = new Set(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
  let lang = localStorage.getItem(LANG_KEY) || "sv";

  // ---------- Portal chrome translations ----------
  const STRINGS = {
    tagline: { sv: "- Designad av Fabbe", en: "- Designed by Fabbe" },
    total: { sv: "spel", en: "games" },
    fav: { sv: "favoriter", en: "favorites" },
    cat: { sv: "kategorier", en: "categories" },
    searchPlaceholder: { sv: "Sök bland dina spel...", en: "Search your games..." },
    all: { sv: "Alla", en: "All" },
    favorites: { sv: "Favoriter", en: "Favorites" },
    library: { sv: "Ditt bibliotek", en: "Your library" },
    play: { sv: "Spela", en: "Play" },
    back: { sv: "Tillbaka", en: "Back" },
    empty: { sv: "Inga spel matchar. Testa ett annat filter eller sök.", en: "No games match. Try another filter or search." },
    fullscreenTitle: { sv: "Fullskärm", en: "Fullscreen" },
    addGame: { sv: "Admin", en: "Admin" },
    modalTitle: { sv: "Admin", en: "Admin" },
    ghSave: { sv: "Spara & fortsätt", en: "Save & continue" },
    gameSubmit: { sv: "Ladda upp & publicera", en: "Upload & publish" },

    connectHint1: { sv: "Det här kopplar portalen till ditt GitHub-repo, så att spel och meddelanden du lägger till här hamnar direkt i repot och dyker upp för alla som besöker sidan (efter att GitHub Pages byggt om, oftast under en minut).", en: "This connects the portal to your GitHub repo, so games and announcements you add here go straight into the repo and show up for everyone who visits the site (after GitHub Pages rebuilds, usually within a minute)." },
    connectHint2: { sv: 'Token sparas bara lokalt i den här webbläsaren. Dela den aldrig med någon. Skapa helst en "fine-grained" token med behörighet begränsad till bara det här repot (Contents: Read and write) — se README för instruktioner.', en: 'The token is only stored locally in this browser. Never share it with anyone. Ideally create a "fine-grained" token scoped to just this repo (Contents: Read and write) — see the README for instructions.' },
    labelRepo: { sv: "GitHub repo", en: "GitHub repo" },
    labelRepoHint: { sv: "(t.ex. dittnamn/game-portal)", en: "(e.g. yourname/game-portal)" },
    labelToken: { sv: "Personal Access Token", en: "Personal Access Token" },
    labelAdminKey: { sv: "Admin-nyckel", en: "Admin key" },
    labelAdminKeyHint: { sv: "(valfritt — krävs bara för Feedback-fliken, se README)", en: "(optional — only needed for the Feedback tab, see README)" },

    tabAddGame: { sv: "+ Spel", en: "+ Game" },
    tabAnnouncement: { sv: "📢 Meddelande", en: "📢 Announcement" },
    tabFeedback: { sv: "💬 Feedback", en: "💬 Feedback" },
    tabStats: { sv: "📊 Statistik", en: "📊 Stats" },

    labelTitle: { sv: "Titel", en: "Title" },
    labelCategory: { sv: "Kategori", en: "Category" },
    labelDescSv: { sv: "Beskrivning (svenska)", en: "Description (Swedish)" },
    labelDescEn: { sv: "Description", en: "Description" },
    labelDescEnHint: { sv: "(engelska, valfritt)", en: "(English, optional)" },
    labelColor: { sv: "Accentfärg", en: "Accent color" },
    labelFile: { sv: "Spelfil", en: "Game file" },
    labelFileHint: { sv: "(en enda .html-fil)", en: "(a single .html file)" },

    announcementHint: { sv: "Visas som en banner högst upp för alla besökare tills de stänger den eller du tar bort den.", en: "Shows as a banner at the top for every visitor until they close it or you remove it." },
    labelAnnouncement: { sv: "Meddelande", en: "Message" },
    announcementSend: { sv: "Skicka till alla", en: "Send to everyone" },
    announcementClear: { sv: "Ta bort meddelande", en: "Remove message" },

    feedbackTabHint: { sv: "Kräver Admin-nyckel (samma sida där du la in GitHub-token) och att Worker-URL är satt i leaderboard.js.", en: "Requires the Admin key (same page where you entered the GitHub token) and a Worker URL set in leaderboard.js." },
    feedbackRefresh: { sv: "Uppdatera", en: "Refresh" },

    statsHint: { sv: "Full statistik (besökare, sessioner, vilka spel som spelas) finns i Google Analytics egen dashboard.", en: "Full stats (visitors, sessions, which games get played) live in Google Analytics' own dashboard." },
    statsLink: { sv: "Öppna Google Analytics", en: "Open Google Analytics" },

    disconnect: { sv: "Koppla från GitHub", en: "Disconnect from GitHub" }
  };
  function t(key) { return STRINGS[key][lang] || STRINGS[key].sv; }

  let state = {
    query: "",
    category: "all",
    onlyFav: false
  };

  function saveFavorites() {
    localStorage.setItem(FAV_KEY, JSON.stringify([...favorites]));
  }

  function iconStar(filled) {
    return filled
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
  }

  function gameDesc(game) {
    return lang === "en" && game.descriptionEn ? game.descriptionEn : game.description;
  }

  function buildCategoryPills() {
    const cats = [...new Set(GAMES.map(g => g.category))].sort();
    categoryPills.innerHTML = "";

    const allPill = document.createElement("div");
    allPill.className = "pill active";
    allPill.textContent = t("all");
    allPill.dataset.cat = "all";
    categoryPills.appendChild(allPill);

    cats.forEach(cat => {
      const pill = document.createElement("div");
      pill.className = "pill";
      pill.textContent = cat;
      pill.dataset.cat = cat;
      if (state.category === cat) pill.classList.add("active");
      categoryPills.appendChild(pill);
    });
    if (state.category === "all") allPill.classList.add("active");

    document.getElementById("stat-cat").textContent = cats.length;
  }

  categoryPills.addEventListener("click", (e) => {
    const pill = e.target.closest(".pill");
    if (!pill) return;
    state.category = pill.dataset.cat;
    [...categoryPills.children].forEach(p => p.classList.toggle("active", p === pill));
    render();
  });

  function matchesFilters(game) {
    const q = state.query.trim().toLowerCase();
    if (q && !game.title.toLowerCase().includes(q) && !game.category.toLowerCase().includes(q)) return false;
    if (state.category !== "all" && game.category !== state.category) return false;
    if (state.onlyFav && !favorites.has(game.id)) return false;
    return true;
  }

  function cardHTML(game) {
    const isFav = favorites.has(game.id);
    return `
      <div class="cart" style="--cart-color:${game.color}" data-id="${game.id}" tabindex="0" role="button" aria-label="${t("play")} ${game.title}">
        <div class="cart-thumb">${game.thumb}</div>
        <div class="cart-body">
          <div class="cart-top">
            <div>
              <h3 class="cart-title">${game.title}</h3>
              <div class="cart-tags">
                <span class="tag">${game.category}</span>
                <span class="cart-code">CART-${game.cart || "00"}</span>
              </div>
            </div>
            <button class="fav-btn ${isFav ? "active" : ""}" data-id="${game.id}" aria-label="favorite">
              ${iconStar(isFav)}
            </button>
          </div>
          <p class="cart-desc">${gameDesc(game)}</p>
          <div class="cart-meta">
            ${game.scoreKey ? `<button class="lb-btn" data-id="${game.id}" aria-label="leaderboard">🏆 Topplista</button>` : "<span></span>"}
            <span class="cart-play">▶ ${t("play")}</span>
          </div>
        </div>
      </div>
    `;
  }

  function render() {
    const filtered = GAMES.filter(matchesFilters);
    grid.innerHTML = filtered.length
      ? filtered.map(cardHTML).join("")
      : `<div class="empty-state">${t("empty")}</div>`;

    document.getElementById("stat-total").textContent = GAMES.length;
    document.getElementById("stat-fav").textContent = favorites.size;
  }

  grid.addEventListener("click", (e) => {
    const favBtn = e.target.closest(".fav-btn");
    if (favBtn) {
      e.stopPropagation();
      const id = favBtn.dataset.id;
      favorites.has(id) ? favorites.delete(id) : favorites.add(id);
      saveFavorites();
      render();
      return;
    }
    const lbBtn = e.target.closest(".lb-btn");
    if (lbBtn) {
      e.stopPropagation();
      const game = GAMES.find(g => g.id === lbBtn.dataset.id);
      if (game && window.ShelfLeaderboard) window.ShelfLeaderboard.showLeaderboard(game);
      return;
    }
    const cart = e.target.closest(".cart");
    if (cart) launchGame(cart.dataset.id, cart);
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const cart = e.target.closest(".cart");
    if (cart) {
      e.preventDefault();
      launchGame(cart.dataset.id, cart);
    }
  });

  let currentGameId = null;

  function launchGame(id, cardEl) {
    const game = GAMES.find(g => g.id === id);
    if (!game) return;
    currentGameId = id;
    if (window.ShelfAnalytics) {
      window.ShelfAnalytics.trackEvent("play_game", {
        game_id: game.id,
        game_title: game.title,
        game_category: game.category
      });
    }
    if (cardEl) cardEl.classList.add("launching");
    setTimeout(() => {
      playerTitle.textContent = game.title;
      gameFrame.src = `games/${game.folder}/index.html?lang=${lang}`;
      player.classList.add("open");
      if (cardEl) cardEl.classList.remove("launching");
    }, 160);
  }

  function closePlayer() {
    player.classList.remove("open");
    if (currentGameId && window.ShelfLeaderboard) {
      const game = GAMES.find(g => g.id === currentGameId);
      if (game) window.ShelfLeaderboard.submitScoreIfImproved(game);
    }
    currentGameId = null;
    setTimeout(() => { gameFrame.src = ""; }, 300);
  }

  backBtn.addEventListener("click", closePlayer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && player.classList.contains("open")) closePlayer();
  });

  fullscreenBtn.addEventListener("click", () => {
    if (gameFrame.requestFullscreen) gameFrame.requestFullscreen();
    else if (gameFrame.webkitRequestFullscreen) gameFrame.webkitRequestFullscreen();
  });

  searchInput.addEventListener("input", (e) => {
    state.query = e.target.value;
    render();
  });

  favToggle.addEventListener("click", () => {
    state.onlyFav = !state.onlyFav;
    favToggle.classList.toggle("active", state.onlyFav);
    render();
  });

  // ---------- Language ----------
  function setText(id, key) {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  }

  function applyLanguage() {
    document.documentElement.lang = lang;
    document.getElementById("game-count-label").textContent = t("tagline");
    document.getElementById("stat-total-label").textContent = t("total");
    document.getElementById("stat-fav-label").textContent = t("fav");
    document.getElementById("stat-cat-label").textContent = t("cat");
    document.getElementById("fav-toggle-label").textContent = t("favorites");
    document.getElementById("section-label").textContent = t("library");
    document.getElementById("back-btn-label").textContent = t("back");
    document.getElementById("fullscreen-btn").title = t("fullscreenTitle");
    searchInput.placeholder = t("searchPlaceholder");
    document.getElementById("add-game-label").textContent = t("addGame");
    setText("admin-title", "modalTitle");
    setText("gh-save", "ghSave");
    setText("game-submit", "gameSubmit");

    setText("connect-hint-1", "connectHint1");
    setText("connect-hint-2", "connectHint2");
    setText("label-repo-hint", "labelRepoHint");
    setText("label-token", "labelToken");
    setText("label-adminkey-hint", "labelAdminKeyHint");
    // labelRepo / labelAdminKey have a nested hint span, so set only the leading text node
    const labelRepoEl = document.getElementById("label-repo");
    if (labelRepoEl) labelRepoEl.firstChild.textContent = t("labelRepo") + " ";
    const labelAdminKeyEl = document.getElementById("label-adminkey");
    if (labelAdminKeyEl) labelAdminKeyEl.firstChild.textContent = t("labelAdminKey") + " ";

    setText("tab-btn-add-game", "tabAddGame");
    setText("tab-btn-announcement", "tabAnnouncement");
    setText("tab-btn-feedback", "tabFeedback");
    setText("tab-btn-stats", "tabStats");

    setText("label-title", "labelTitle");
    setText("label-category", "labelCategory");
    setText("label-desc-sv", "labelDescSv");
    setText("label-desc-en-hint", "labelDescEnHint");
    const labelDescEnEl = document.getElementById("label-desc-en");
    if (labelDescEnEl) labelDescEnEl.firstChild.textContent = t("labelDescEn") + " ";
    setText("label-color", "labelColor");
    setText("label-file-hint", "labelFileHint");
    const labelFileEl = document.getElementById("label-file");
    if (labelFileEl) labelFileEl.firstChild.textContent = t("labelFile") + " ";

    setText("announcement-hint", "announcementHint");
    setText("label-announcement", "labelAnnouncement");
    setText("announcement-send", "announcementSend");
    setText("announcement-clear", "announcementClear");

    setText("feedback-refresh", "feedbackRefresh");
    setText("stats-hint", "statsHint");
    setText("stats-link", "statsLink");
    setText("gh-disconnect", "disconnect");

    langButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));

    buildCategoryPills();
    render();

    // If a game is currently open, reload it in the new language
    if (currentGameId) {
      const game = GAMES.find(g => g.id === currentGameId);
      if (game) gameFrame.src = `games/${game.folder}/index.html?lang=${lang}`;
    }

    document.dispatchEvent(new CustomEvent("shelf:lang-changed", { detail: { lang } }));
  }

  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      lang = btn.dataset.lang;
      localStorage.setItem(LANG_KEY, lang);
      applyLanguage();
    });
  });

  applyLanguage();

  window.ShelfPortal = { refresh: render };
})();
