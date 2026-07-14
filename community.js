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
      <button id="announcement-dismiss" aria-label="Stäng">✕</button>
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
        status.textContent = "Skriv något först.";
        return;
      }
      status.className = "admin-status pending";
      status.textContent = "Skickar...";
      try {
        await fetch(`${WORKER_URL}/feedback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, message })
        });
        status.className = "admin-status success";
        status.textContent = "Tack! Skickat.";
        document.getElementById("feedback-message").value = "";
        setTimeout(() => overlay.classList.remove("open"), 1200);
      } catch (e) {
        status.className = "admin-status error";
        status.textContent = "Kunde inte skicka just nu — testa igen om en stund.";
      }
    });
  }

  function openFeedback() {
    ensureFeedbackModal();
    document.getElementById("feedback-overlay").classList.add("open");
  }

  function addFeedbackButton() {
    if (typeof WORKER_URL === "undefined" || WORKER_URL.includes("REPLACE-ME")) return;
    const btn = document.createElement("button");
    btn.className = "feedback-btn";
    btn.id = "feedback-open-btn";
    btn.textContent = "💬 Tyck till";
    btn.addEventListener("click", openFeedback);
    const footer = document.querySelector(".site-footer");
    if (footer) footer.before(btn);
  }

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
