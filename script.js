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
    tagline: { sv: "— din egna spelportal", en: "— your own game portal" },
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
    fullscreenTitle: { sv: "Fullskärm", en: "Fullscreen" }
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
            <span></span>
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

    langButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));

    buildCategoryPills();
    render();

    // If a game is currently open, reload it in the new language
    if (currentGameId) {
      const game = GAMES.find(g => g.id === currentGameId);
      if (game) gameFrame.src = `games/${game.folder}/index.html?lang=${lang}`;
    }
  }

  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      lang = btn.dataset.lang;
      localStorage.setItem(LANG_KEY, lang);
      applyLanguage();
    });
  });

  applyLanguage();
})();
