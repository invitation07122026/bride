(function () {
  "use strict";

  function initDhol() {
    const btn = document.getElementById("dholBeatBtn");
    const count = document.getElementById("dholCount");
    const percent = document.getElementById("dholPercent");
    const fill = document.getElementById("dholProgressFill");
    const message = document.getElementById("dholMessage");
    const unlocked = document.getElementById("dholUnlocked");

    if (!btn || !count || !percent || !fill || !message || !unlocked) return;

    const beats = [
      "🎵 Beat 1 — Warm up those celebration feet!",
      "🔥 Beat 2 — The dhol has your attention!",
      "💃 Beat 3 — Add a little wedding swag!",
      "🕺 Beat 4 — No one is allowed to stand still!",
      "🥁 Beat 5 — Celebration energy is rising!",
      "✨ Beat 6 — One last beat before the celebration!",
      "🎉 Beat 7 — LET THE CELEBRATION BEGIN!"
    ];

    let taps = 0;
    let locked = false;
    let lastTap = 0;

    function confetti() {
      const symbols = ["🎉", "✨", "💛", "🌸", "🪷", "🥁"];
      for (let i = 0; i < 42; i++) {
        const el = document.createElement("span");
        el.className = "dhol-confetti";
        el.textContent = symbols[i % symbols.length];
        el.style.left = (Math.random() * 100) + "vw";
        el.style.setProperty("--dx", ((Math.random() - 0.5) * 180) + "px");
        el.style.animationDelay = (Math.random() * 0.35) + "s";
        el.style.fontSize = (12 + Math.random() * 10) + "px";
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2400);
      }
    }

    function beat() {
      const now = Date.now();
      if (locked || now - lastTap < 90) return;
      lastTap = now;

      taps = Math.min(taps + 1, 7);
      const pct = Math.round((taps / 7) * 100);
      count.textContent = String(taps);
      percent.textContent = pct + "%";
      fill.style.width = pct + "%";
      message.textContent = beats[taps - 1];

      btn.classList.remove("dhol-hit");
      void btn.offsetWidth;
      btn.classList.add("dhol-hit");

      if (taps === 7) {
        locked = true;
        unlocked.hidden = false;
        message.textContent = "🎊 The marriage celebration is ready!";
        confetti();
      }
    }

    // One handler on the actual button; works with mouse, touch and pen.
    btn.addEventListener("pointerup", function (e) {
      e.preventDefault();
      beat();
    }, { passive: false });

    // Fallback for browsers/devices that do not expose PointerEvent.
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      beat();
    });

    btn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        beat();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDhol, { once: true });
  } else {
    initDhol();
  }
})();
