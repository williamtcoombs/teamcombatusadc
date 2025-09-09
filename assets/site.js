// Team Combat USA DC - site.js
// Mobile drawer accessibility + optional Back-to-Top fallback

(function () {
  // --- Mobile drawer logic ---
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  let lastFocus = null;
  let open = false;

  function setOpen(state) {
    open = state;
    toggle.setAttribute("aria-expanded", state);
    if (state) {
      menu.classList.remove("hidden", "invisible", "opacity-0", "-translate-y-2");
      menu.classList.add("block");
      lastFocus = document.activeElement;
      const firstLink = menu.querySelector("a, button");
      if (firstLink) firstLink.focus();
    } else {
      menu.classList.add("hidden");
      menu.classList.remove("block");
      if (lastFocus) lastFocus.focus();
    }
  }

  toggle.addEventListener("click", () => setOpen(!open));

  // Esc key closes menu
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
    }
  });

  // --- Back-to-Top fallback ---
  // Only run this if the Shadow-DOM button is NOT present
  if (!window.__TC_BTT_SHADOW__) {
    initBackToTop();
  }

  function ensureBackToTopButton() {
    let btn = document.getElementById("back-to-top");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "back-to-top";
      btn.type = "button";
      btn.setAttribute("aria-label", "Back to top");
      btn.className =
        "fixed bottom-5 right-5 hidden z-50 rounded-full shadow-lg ring-1 ring-black/5 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 px-3 py-2 text-sm font-medium";
      btn.textContent = "↑ Top";
      document.body.appendChild(btn);
    }
    return btn;
  }

  function initBackToTop() {
    const btn = ensureBackToTopButton();
    const showAt = 100;

    function show() {
      btn.classList.remove("hidden", "opacity-0", "pointer-events-none");
      btn.style.display = "inline-block";
    }
    function hide() {
      btn.classList.add("hidden");
      btn.style.display = "none";
    }
    function onScroll() {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      y > showAt ? show() : hide();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });

    let lastY = -1;
    (function loop() {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (y !== lastY) {
        lastY = y;
        onScroll();
      }
      requestAnimationFrame(loop);
    })();

    btn.addEventListener("click", () => {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {
        window.scrollTo(0, 0);
      }
      btn.blur();
    });

    onScroll();
  }
})();
