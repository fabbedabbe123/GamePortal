// ============================================================
// SHELF — universal game translator
// ------------------------------------------------------------
// Include this AFTER a game-specific dictionary file that defines
// a global `GAME_I18N` array of { sv, en } phrase pairs, e.g.:
//
//   const GAME_I18N = [
//     { sv: "Poäng", en: "Score" },
//     { sv: "Nästa", en: "Next" }
//   ];
//
// This script reads ?lang=en|sv from the URL (the portal sets this
// automatically) and, if English is requested, walks the page and
// swaps any matching Swedish phrase for its English translation —
// in text and in common attributes (title, aria-label, placeholder,
// alt). It keeps watching the page after that, so text the game
// generates later (scores, messages, popups) gets translated too.
//
// If a game has no GAME_I18N file, this script does nothing.
// ============================================================

(function () {
  const params = new URLSearchParams(location.search);
  const lang = params.get("lang") || "sv";
  document.documentElement.lang = lang;

  if (lang !== "en") return; // game's native language — nothing to do
  if (typeof GAME_I18N === "undefined" || !GAME_I18N.length) return;

  // Longest phrases first, so e.g. "Poäng: " is swapped before "Poäng".
  const dict = GAME_I18N.slice().sort((a, b) => b.sv.length - a.sv.length);

  function translate(str) {
    let out = str;
    for (let i = 0; i < dict.length; i++) {
      const { sv, en } = dict[i];
      if (out.indexOf(sv) !== -1) out = out.split(sv).join(en);
    }
    return out;
  }

  const ATTRS = ["title", "aria-label", "placeholder", "alt"];

  function walk(node) {
    if (!node) return;
    if (node.nodeType === Node.TEXT_NODE) {
      const val = node.nodeValue;
      if (val && val.trim()) {
        const translated = translate(val);
        if (translated !== val) node.nodeValue = translated;
      }
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      for (const attr of ATTRS) {
        const v = node.getAttribute && node.getAttribute(attr);
        if (v) {
          const tv = translate(v);
          if (tv !== v) node.setAttribute(attr, tv);
        }
      }
      node.childNodes.forEach(walk);
    }
  }

  function translateAll() {
    walk(document.body);
  }

  function start() {
    translateAll();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes && m.addedNodes.forEach(walk);
        if (m.type === "characterData" && m.target) {
          const val = m.target.nodeValue;
          if (val) {
            const translated = translate(val);
            if (translated !== val) m.target.nodeValue = translated;
          }
        }
        if (m.type === "attributes" && m.target && ATTRS.includes(m.attributeName)) {
          const v = m.target.getAttribute(m.attributeName);
          if (v) {
            const tv = translate(v);
            if (tv !== v) m.target.setAttribute(m.attributeName, tv);
          }
        }
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS
    });

    // Safety-net sweep for anything a mutation event might have missed
    // (cheap: only runs while the game tab is open, dictionary is small).
    setInterval(translateAll, 1200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
