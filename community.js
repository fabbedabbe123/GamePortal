// ============================================================
// SHELF — announcements banner + visitor feedback
// ------------------------------------------------------------
// Announcements: the admin panel writes announcement.json straight
// into the repo (same trick as adding games), and every visitor's
// browser just reads that file — no Worker needed for this part.
//
// Feedback: needs the Worker (see leaderboard.js / WORKER_URL),
// since regular visitors can't write to the repo themselves.
// ============================================================

(function () {
  const DISMISSED_KEY = "shelf.dismissed-announcement";

  const STRINGS = {
    dismiss: { sv: "Stäng", en: "Close" },
    feedbackBtn: { sv: "💬 Tyck till", en: "💬 Feedback" },
    feedbackTitle: { sv: "Tyck till", en: "Feedback" },
    feedbackHint: { sv: "Idéer, buggar, önskemål om nya spel — allt går till ägaren av sidan.", en: "Ideas, bugs, requests for new games — it all goes straight to the site owner." },
    feedbackNameLabel: { sv: "Namn", en: "Name" },
    feedbackNameHint: { sv: "(valfritt)", en: "(optional)" },
    feedbackNamePlaceholder: { sv: "Ditt namn", en: "Your name" },
    feedbackMessageLabel: { sv: "Meddelande", en: "Message" },
    feedbackMessagePlaceholder: { sv: "Vad tänker du på?", en: "What's on your mind?" },
    feedbackSend: { sv: "Skicka", en: "Send" },
    feedbackEmptyError: { sv: "Skriv något först.", en: "Write something first." },
    feedbackSending: { sv: "Skickar...", en: "Sending..." },
    feedbackSent: { sv: "Tack! Skickat.", en: "Thanks! Sent." },
    feedbackFailed: { sv: "Kunde inte skicka just nu — testa igen om en stund.", en: "Couldn't send right now — try again in a bit." }
  };
  function lang() { return localStorage.getItem("shelf.lang") || "sv"; }
  function t(key) { return STRINGS[key][lang()] || STRINGS[key].sv; }

  // ---------- Announcement banner ----------
  async function checkAnnouncement() {
    try {
      const res = await fetch("announcement.json", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (!data.message || !data.message.trim()) return;
      if (localStorage.getItem(DISMISSED_KEY) === data.id) return;
      showAnnouncement(data);
    } catch (e) {
      // Fine if this fails (e.g. testing the file locally without a server)
    }
  }

  function showAnnouncement(data) {
    const bar = document.createElement("div");
    bar.id = "announcement-banner";
    bar.innerHTML = `
      <p>📢 ${escapeHtml(data.message)}</p>
      <button id="announcement-dismiss" aria-label="${t("dismiss")}">✕</button>
    `;
    document.body.prepend(bar);
    document.getElementById("announcement-dismiss").addEventListener("click", () => {
      localStorage.setItem(DISMISSED_KEY, data.id);
      bar.remove();
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ---------- Feedback ----------
  function updateFeedbackTexts() {
    const overlay = document.getElementById("feedback-overlay");
    const btn = document.getElementById("feedback-open-btn");
    if (btn) btn.textContent = t("feedbackBtn");
    if (!overlay) return;
    overlay.querySelector(".modal-header h2").textContent = t("feedbackTitle");
    overlay.querySelector(".modal-hint").textContent = t("feedbackHint");
    const labels = overlay.querySelectorAll("label");
    labels[0].firstChild.textContent = t("feedbackNameLabel") + " ";
    labels[0].querySelector(".label-hint").textContent = t("feedbackNameHint");
    labels[1].textContent = t("feedbackMessageLabel");
    overlay.querySelector("#feedback-name").placeholder = t("feedbackNamePlaceholder");
    overlay.querySelector("#feedback-message").placeholder = t("feedbackMessagePlaceholder");
    overlay.querySelector("#feedback-submit").textContent = t("feedbackSend");
  }

  function ensureFeedbackModal() {
    if (document.getElementById("feedback-overlay")) return;
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "feedback-overlay";
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h2>Tyck till</h2>
          <button class="icon-btn" id="feedback-close">✕</button>
        </div>
        <div class="modal-body">
          <p class="modal-hint">Idéer, buggar, önskemål om nya spel — allt går till ägaren av sidan.</p>
          <label>Namn <span class="label-hint">(valfritt)</span></label>
          <input type="text" id="feedback-name" maxlength="40" placeholder="Ditt namn">
          <label>Meddelande</label>
          <textarea id="feedback-message" rows="4" placeholder="Vad tänker du på?"></textarea>
          <button class="modal-btn primary" id="feedback-submit">Skicka</button>
          <div class="admin-status" id="feedback-status"></div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.remove("open"); });
    document.getElementById("feedback-close").addEventListener("click", () => overlay.classList.remove("open"));

    document.getElementById("feedback-submit").addEventListener("click", async () => {
      const name = document.getElementById("feedback-name").value.trim();
      const message = document.getElementById("feedback-message").value.trim();
      const status = document.getElementById("feedback-status");
      if (!message) {
        status.className = "admin-status error";
        status.textContent = t("feedbackEmptyError");
        return;
      }
      status.className = "admin-status pending";
      status.textContent = t("feedbackSending");
      try {
        await fetch(`${WORKER_URL}/feedback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, message })
        });
        status.className = "admin-status success";
        status.textContent = t("feedbackSent");
        document.getElementById("feedback-message").value = "";
        setTimeout(() => overlay.classList.remove("open"), 1200);
      } catch (e) {
        status.className = "admin-status error";
        status.textContent = t("feedbackFailed");
      }
    });
    updateFeedbackTexts();
  }

  function openFeedback() {
    ensureFeedbackModal();
    updateFeedbackTexts();
    document.getElementById("feedback-overlay").classList.add("open");
  }

  function addFeedbackButton() {
    if (typeof WORKER_URL === "undefined" || WORKER_URL.includes("REPLACE-ME")) return;
    const btn = document.createElement("button");
    btn.className = "feedback-btn";
    btn.id = "feedback-open-btn";
    btn.textContent = t("feedbackBtn");
    btn.addEventListener("click", openFeedback);
    const footer = document.querySelector(".site-footer");
    if (footer) footer.before(btn);
  }

  document.addEventListener("shelf:lang-changed", updateFeedbackTexts);

  function start() {
    checkAnnouncement();
    addFeedbackButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
