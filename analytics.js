// ============================================================
// SHELF — Google Analytics (optional)
// ------------------------------------------------------------
// 1. Create a GA4 property at analytics.google.com (Admin → Create
//    property → set up a Web data stream) and copy the Measurement
//    ID it gives you (looks like "G-XXXXXXXXXX").
// 2. Paste it below instead of the placeholder.
// 3. Done — visits show up in GA's own dashboard, and every game
//    launch is sent as a "play_game" event (Reports → Engagement →
//    Events → play_game) so you can see what people actually play.
//
// Until you set a real ID, this file does nothing — the portal
// works exactly the same either way.
// ============================================================

const GA_MEASUREMENT_ID = "G-0BYME9MGKH"; // <-- replace with your own

(function () {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return;

  const CONSENT_KEY = "shelf.consent";
  const consent = localStorage.getItem(CONSENT_KEY);

  const STRINGS = {
    text: {
      sv: "Den här sidan använder Google Analytics för att se hur portalen används (t.ex. vilka spel som spelas). Inga personuppgifter säljs eller delas.",
      en: "This site uses Google Analytics to see how the portal is used (e.g. which games get played). No personal data is sold or shared."
    },
    accept: { sv: "Ok", en: "OK" },
    decline: { sv: "Neka", en: "Decline" }
  };
  const lang = localStorage.getItem("shelf.lang") || "sv";
  const t = (key) => STRINGS[key][lang] || STRINGS[key].sv;

  function loadGA() {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);

    window.ShelfAnalytics = {
      trackEvent(name, params) {
        if (window.gtag) window.gtag("event", name, params || {});
      }
    };
  }

  // No-op tracker until/unless consent is granted, so other scripts
  // can always safely call window.ShelfAnalytics.trackEvent(...).
  window.ShelfAnalytics = { trackEvent() {} };

  if (consent === "granted") {
    loadGA();
    return;
  }
  if (consent === "denied") {
    return; // asked before and said no — don't ask again
  }

  // Not asked yet — show a small consent banner.
  function showBanner() {
    const bar = document.createElement("div");
    bar.id = "consent-banner";
    bar.innerHTML = `
      <p>${t("text")}</p>
      <div class="consent-actions">
        <button id="consent-decline">${t("decline")}</button>
        <button id="consent-accept">${t("accept")}</button>
      </div>
    `;
    document.body.appendChild(bar);

    document.getElementById("consent-accept").addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "granted");
      bar.remove();
      loadGA();
    });
    document.getElementById("consent-decline").addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "denied");
      bar.remove();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showBanner);
  } else {
    showBanner();
  }
})();
