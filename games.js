// ============================================================
// GAME REGISTRY
// Add a new game by copying an entry below and changing the values.
// "folder" must match a folder name inside /games/ that contains
// an index.html for that game.
//
// "thumb" is raw SVG markup used as cover art on the game row.
// "description" / "descriptionEn" let the card text switch language
// along with the portal. If a game doesn't support the built-in
// translation system, descriptionEn is still shown when English
// is selected — only the description text, not the game itself.
// ============================================================

const GAMES = [
  {
    id: "neon-runner",
    title: "Neon Runner",
    folder: "neon-runner",
    category: "Arcade",
    description: "Hoppa över hindren, jaga highscoren. En knapp, inga ursäkter.",
    descriptionEn: "Dodge the barriers, chase the high score. One button, zero mercy.",
    color: "#4FC9C0",
    cart: "01",
    addedAt: "2026-07-01",
    scoreKey: "neonRunnerBest",
    scoreLabel: "Poäng",
    scoreLabelEn: "Points",
    scoreBetter: "higher",
    thumb: `
      <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="nr-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#161a26"/>
            <stop offset="1" stop-color="#0d0f16"/>
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill="url(#nr-bg)"/>
        <line x1="0" y1="150" x2="320" y2="150" stroke="#2e3548" stroke-width="2"/>
        <rect x="235" y="108" width="16" height="42" fill="#e8b84b"/>
        <rect x="270" y="122" width="16" height="28" fill="#e8b84b"/>
        <rect x="70" y="116" width="22" height="34" rx="4" fill="#4fc9c0"/>
        <circle cx="81" cy="116" r="12" fill="#4fc9c0" opacity="0.35"/>
        <g opacity="0.5">
          <circle cx="40" cy="40" r="2" fill="#8a93ad"/>
          <circle cx="90" cy="25" r="1.5" fill="#8a93ad"/>
          <circle cx="150" cy="45" r="2" fill="#8a93ad"/>
          <circle cx="220" cy="30" r="1.5" fill="#8a93ad"/>
          <circle cx="280" cy="55" r="2" fill="#8a93ad"/>
        </g>
      </svg>
    `
  },
  {
    id: "memory-match",
    title: "Cartridge Match",
    folder: "memory-match",
    category: "Puzzle",
    description: "Vänd, matcha, minns. Klassiskt minnesspel i konsol-stil.",
    descriptionEn: "Flip, match, remember. Classic memory game, console-style.",
    color: "#E8B84B",
    cart: "02",
    addedAt: "2026-07-01",
    scoreKey: "cartridgeMatchBestMoves",
    scoreLabel: "Drag",
    scoreLabelEn: "Moves",
    scoreBetter: "lower",
    thumb: `
      <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="200" fill="#161a26"/>
        <rect x="90" y="55" width="52" height="52" rx="8" fill="#222738" stroke="#2e3548" stroke-width="2"/>
        <rect x="150" y="55" width="52" height="52" rx="8" fill="#2c3348" stroke="#e8b84b" stroke-width="2"/>
        <text x="176" y="89" font-size="26" text-anchor="middle">🎮</text>
        <rect x="210" y="55" width="52" height="52" rx="8" fill="#222738" stroke="#2e3548" stroke-width="2"/>
        <rect x="90" y="115" width="52" height="52" rx="8" fill="#2c3348" stroke="#e8b84b" stroke-width="2"/>
        <text x="116" y="149" font-size="26" text-anchor="middle">👾</text>
        <rect x="150" y="115" width="52" height="52" rx="8" fill="#222738" stroke="#2e3548" stroke-width="2"/>
        <rect x="210" y="115" width="52" height="52" rx="8" fill="#222738" stroke="#2e3548" stroke-width="2"/>
      </svg>
    `
  },
  {
    id: "keeper-reflex",
    title: "Keeper Reflex",
    folder: "keeper-reflex",
    category: "Sport",
    description: "Rädda skott mot klockan. Save-läge, straffar och sudden death.",
    descriptionEn: "Save shots against the clock. Save mode, penalties and sudden death.",
    color: "#3ddc84",
    cart: "03",
    addedAt: "2026-07-01",
    scoreKey: "keeperReflexRating",
    scoreLabel: "Rating",
    scoreBetter: "higher",
    thumb: `
      <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="kr-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#1c4d2e"/>
            <stop offset="1" stop-color="#16223c"/>
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill="url(#kr-bg)"/>
        <rect x="60" y="40" width="200" height="90" fill="none" stroke="#eef0e6" stroke-width="4"/>
        <line x1="60" y1="40" x2="40" y2="20" stroke="#eef0e6" stroke-width="2" opacity="0.6"/>
        <line x1="260" y1="40" x2="280" y2="20" stroke="#eef0e6" stroke-width="2" opacity="0.6"/>
        <circle cx="205" cy="70" r="16" fill="none" stroke="#f2a93b" stroke-width="3"/>
        <circle cx="205" cy="70" r="4" fill="#f2a93b"/>
        <circle cx="120" cy="115" r="11" fill="#eef0e6"/>
        <rect x="110" y="126" width="20" height="24" fill="#16223c"/>
        <circle cx="160" cy="165" r="9" fill="#eef0e6" opacity="0.9"/>
      </svg>
    `
  },
  {
    id: "gilded-fox",
    title: "The Gilded Fox",
    folder: "gilded-fox",
    category: "Casino",
    description: "Members' Room. Bordsspel med guld, sammet och höga insatser.",
    descriptionEn: "Members' Room. Table games with gold, velvet and high stakes.",
    color: "#c9a24b",
    cart: "04",
    addedAt: "2026-07-01",
    thumb: `
      <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gf-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#0b3d2e"/>
            <stop offset="1" stop-color="#082b21"/>
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill="url(#gf-bg)"/>
        <rect x="18" y="18" width="284" height="164" rx="10" fill="none" stroke="#c9a24b" stroke-width="2" opacity="0.7"/>
        <circle cx="160" cy="100" r="46" fill="none" stroke="#e6c876" stroke-width="2" opacity="0.8"/>
        <circle cx="160" cy="100" r="4" fill="#e6c876"/>
        <rect x="118" y="60" width="30" height="42" rx="4" fill="#12141c" stroke="#c9a24b" stroke-width="1.5"/>
        <text x="133" y="88" font-size="20" text-anchor="middle" fill="#e6c876">A</text>
        <rect x="172" y="60" width="30" height="42" rx="4" fill="#12141c" stroke="#c9a24b" stroke-width="1.5"/>
        <text x="187" y="88" font-size="18" text-anchor="middle" fill="#e6c876">7</text>
        <circle cx="95" cy="150" r="10" fill="#9a3b3b" stroke="#e6c876" stroke-width="1.5"/>
        <circle cx="118" cy="155" r="10" fill="#c9a24b" stroke="#e6c876" stroke-width="1.5"/>
        <circle cx="141" cy="150" r="10" fill="#3e8e7e" stroke="#e6c876" stroke-width="1.5"/>
      </svg>
    `
  },
  {
    id: "neon-alley",
    title: "Neon Alley",
    folder: "neon-alley",
    category: "Arcade",
    description: "En hel arkadhall: mullvadsjakt, breakout, korgkastning och en myntautomat. Samla poletter, tjäna tickets, köp uppgraderingar.",
    descriptionEn: "A whole arcade hall: whack-a-mole, breakout, basketball shootout, and a coin pusher. Earn tokens, win tickets, buy upgrades.",
    color: "#ff3f8e",
    cart: "05",
    addedAt: "2026-07-15",
    thumb: `
      <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="na-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#1a1030"/>
            <stop offset="1" stop-color="#0b0714"/>
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill="url(#na-bg)"/>
        <circle cx="40" cy="24" r="4" fill="#ffb703" opacity="0.9"/>
        <circle cx="80" cy="20" r="4" fill="#ff3f8e" opacity="0.9"/>
        <circle cx="120" cy="24" r="4" fill="#2de2ff" opacity="0.9"/>
        <circle cx="200" cy="24" r="4" fill="#39ff88" opacity="0.9"/>
        <circle cx="240" cy="20" r="4" fill="#ff3f8e" opacity="0.9"/>
        <circle cx="280" cy="24" r="4" fill="#ffb703" opacity="0.9"/>
        <rect x="110" y="60" width="100" height="90" rx="6" fill="#241640" stroke="#2de2ff" stroke-width="2"/>
        <rect x="122" y="70" width="76" height="46" rx="3" fill="#0b0714" stroke="#ff3f8e" stroke-width="1.5"/>
        <circle cx="145" cy="93" r="10" fill="none" stroke="#39ff88" stroke-width="2"/>
        <circle cx="175" cy="93" r="6" fill="#ffb703"/>
        <circle cx="140" cy="132" r="10" fill="#1a1030" stroke="#2de2ff" stroke-width="2"/>
        <rect x="137" y="105" width="6" height="26" fill="#2de2ff"/>
        <circle cx="180" cy="132" r="7" fill="#ff3f8e"/>
        <circle cx="196" cy="132" r="7" fill="#ffb703"/>
      </svg>
    `
  },
  {
    id: "mini-golf",
    title: "Mini Golf",
    folder: "mini-golf",
    category: "Sport",
    description: "Sex banor, fysikbaserad putting. Färre slag vinner — dra bollen bakåt och släpp för att slå.",
    descriptionEn: "Six holes, physics-based putting. Fewest strokes wins — drag the ball back and release to putt.",
    color: "#3ddc84",
    cart: "06",
    addedAt: "2026-07-16",
    scoreKey: "miniGolfBestStrokes",
    scoreLabel: "Slag",
    scoreLabelEn: "Strokes",
    scoreBetter: "lower",
    thumb: `
      <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mg-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#1f6b3a"/>
            <stop offset="1" stop-color="#154a28"/>
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill="url(#mg-bg)"/>
        <g opacity="0.08">
          <rect x="0" y="0" width="22" height="200" fill="#ffffff"/>
          <rect x="44" y="0" width="22" height="200" fill="#ffffff"/>
          <rect x="88" y="0" width="22" height="200" fill="#ffffff"/>
          <rect x="132" y="0" width="22" height="200" fill="#ffffff"/>
          <rect x="176" y="0" width="22" height="200" fill="#ffffff"/>
          <rect x="220" y="0" width="22" height="200" fill="#ffffff"/>
          <rect x="264" y="0" width="22" height="200" fill="#ffffff"/>
        </g>
        <rect x="130" y="80" width="40" height="90" rx="20" fill="#6b4a2f" opacity="0.85"/>
        <circle cx="245" cy="100" r="11" fill="#0b0b0b"/>
        <line x1="245" y1="100" x2="245" y2="58" stroke="#d8d8d8" stroke-width="2"/>
        <path d="M245 58 L268 66 L245 74 Z" fill="#e34b4b"/>
        <circle cx="70" cy="130" r="8" fill="#f4f4f0"/>
        <line x1="70" y1="130" x2="230" y2="104" stroke="#ffffff" stroke-width="2" stroke-dasharray="5,5" opacity="0.5"/>
      </svg>
    `
  },
  {
    id: "snake",
    title: "Snake",
    folder: "snake",
    category: "Arcade",
    description: "Klassikern. Ät guld, väx dig lång, krocka inte med väggen eller dig själv.",
    descriptionEn: "The classic. Eat gold, grow long, don't crash into the wall or yourself.",
    color: "#3ddc84",
    cart: "07",
    addedAt: "2026-07-16",
    scoreKey: "snakeBest",
    scoreLabel: "Poäng",
    scoreLabelEn: "Points",
    scoreBetter: "higher",
    thumb: `
      <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="200" fill="#0d1117"/>
        <g opacity="0.05">
          <line x1="40" y1="0" x2="40" y2="200" stroke="#ffffff"/>
          <line x1="80" y1="0" x2="80" y2="200" stroke="#ffffff"/>
          <line x1="120" y1="0" x2="120" y2="200" stroke="#ffffff"/>
          <line x1="160" y1="0" x2="160" y2="200" stroke="#ffffff"/>
          <line x1="200" y1="0" x2="200" y2="200" stroke="#ffffff"/>
          <line x1="240" y1="0" x2="240" y2="200" stroke="#ffffff"/>
          <line x1="280" y1="0" x2="280" y2="200" stroke="#ffffff"/>
        </g>
        <rect x="80" y="90" width="26" height="26" rx="4" fill="#3ddc84"/>
        <rect x="106" y="90" width="26" height="26" rx="4" fill="#3ddc84"/>
        <rect x="132" y="90" width="26" height="26" rx="4" fill="#3ddc84"/>
        <rect x="158" y="90" width="26" height="26" rx="4" fill="#4fc9c0"/>
        <circle cx="230" cy="103" r="10" fill="#e8b84b"/>
      </svg>
    `
  },
  {
    id: "2048",
    title: "2048",
    folder: "2048",
    category: "Puzzle",
    description: "Slå ihop lika brickor för att fördubbla dem. Nå 2048 — eller slå ditt eget poängrekord.",
    descriptionEn: "Merge matching tiles to double them. Reach 2048 — or just beat your own high score.",
    color: "#e8b84b",
    cart: "08",
    addedAt: "2026-07-16",
    scoreKey: "game2048Best",
    scoreLabel: "Poäng",
    scoreLabelEn: "Points",
    scoreBetter: "higher",
    thumb: `
      <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="200" fill="#12141c"/>
        <rect x="90" y="45" width="140" height="110" rx="8" fill="#1a1e2a"/>
        <rect x="98" y="53" width="60" height="46" rx="5" fill="#2c3348"/>
        <text x="128" y="83" font-family="sans-serif" font-weight="700" font-size="20" fill="#eef0f6" text-anchor="middle">2</text>
        <rect x="162" y="53" width="60" height="46" rx="5" fill="#e8b84b"/>
        <text x="192" y="83" font-family="sans-serif" font-weight="700" font-size="20" fill="#12141c" text-anchor="middle">8</text>
        <rect x="98" y="103" width="60" height="46" rx="5" fill="#4fc9c0"/>
        <text x="128" y="133" font-family="sans-serif" font-weight="700" font-size="18" fill="#12141c" text-anchor="middle">128</text>
        <rect x="162" y="103" width="60" height="46" rx="5" fill="#33405c"/>
        <text x="192" y="133" font-family="sans-serif" font-weight="700" font-size="20" fill="#eef0f6" text-anchor="middle">4</text>
      </svg>
    `
  },
  {
    id: "wordle",
    title: "Ordlek",
    folder: "wordle",
    category: "Puzzle",
    description: "Gissa dagens 5-bokstavsord på 6 försök. Samma ord för alla — jämför er streak.",
    descriptionEn: "Guess today's 5-letter word in 6 tries. Same word for everyone — compare your streak.",
    color: "#3ddc84",
    cart: "09",
    addedAt: "2026-07-16",
    scoreKey: "wordleBestStreak",
    scoreLabel: "Streak",
    scoreLabelEn: "Streak",
    scoreBetter: "higher",
    thumb: `
      <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="200" fill="#121213"/>
        <rect x="72" y="80" width="36" height="36" rx="4" fill="#3ddc84"/>
        <text x="90" y="105" font-family="sans-serif" font-weight="700" font-size="18" fill="#0b0b0b" text-anchor="middle">O</text>
        <rect x="112" y="80" width="36" height="36" rx="4" fill="#e8b84b"/>
        <text x="130" y="105" font-family="sans-serif" font-weight="700" font-size="18" fill="#0b0b0b" text-anchor="middle">R</text>
        <rect x="152" y="80" width="36" height="36" rx="4" fill="#3a3a3c" stroke="#565758" stroke-width="2"/>
        <text x="170" y="105" font-family="sans-serif" font-weight="700" font-size="18" fill="#eef0f6" text-anchor="middle">D</text>
        <rect x="192" y="80" width="36" height="36" rx="4" fill="#3ddc84"/>
        <text x="210" y="105" font-family="sans-serif" font-weight="700" font-size="18" fill="#0b0b0b" text-anchor="middle">E</text>
        <rect x="232" y="80" width="36" height="36" rx="4" fill="#3a3a3c" stroke="#565758" stroke-width="2"/>
        <text x="250" y="105" font-family="sans-serif" font-weight="700" font-size="18" fill="#eef0f6" text-anchor="middle">T</text>
      </svg>
    `
  }
];
