// assets/site.js
(function () {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  // Classes you already use to hide the drawer
  const hideClasses = ['hidden', 'invisible', 'opacity-0', '-translate-y-2'];

  // Utility: find focusable elements (links, buttons, inputs, etc.)
  function getFocusable(root) {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');
    return Array.from(root.querySelectorAll(selector))
      .filter(el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length));
  }

  let trapActive = false;

  function setOpen(isOpen) {
    toggle.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      // Show menu
      hideClasses.forEach(c => menu.classList.remove(c));

      // Lock background scroll (no CSS utility needed)
      document.body.style.overflow = 'hidden';

      // Mark main as hidden to screen readers (optional but good)
      const main = document.querySelector('main');
      if (main) main.setAttribute('aria-hidden', 'true');

      // Activate keyboard handling
      trapActive = true;
      document.addEventListener('keydown', onKeydown, true);

      // Ensure menu itself can take focus, then move focus inside
      if (!menu.hasAttribute('tabindex')) menu.setAttribute('tabindex', '-1');
      const first = getFocusable(menu)[0] || menu;
      first.focus({ preventScroll: true });

    } else {
      // Hide menu
      hideClasses.forEach(c => menu.classList.add(c));

      // Restore scroll
      document.body.style.overflow = '';

      // Restore SR visibility of main
      const main = document.querySelector('main');
      if (main) main.removeAttribute('aria-hidden');

      // Deactivate keyboard handling and return focus
      trapActive = false;
      document.removeEventListener('keydown', onKeydown, true);
      toggle.focus({ preventScroll: true });
    }
  }

  function onKeydown(e) {
    if (!trapActive) return;

    // Esc closes
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      return;
    }

    // Force Tab focus movement even when browser wouldn't tab to links
    if (e.key === 'Tab') {
      e.preventDefault();
      const focusables = getFocusable(menu);
      if (focusables.length === 0) {
        menu.focus();
        return;
      }
      const active = document.activeElement;
      let idx = focusables.indexOf(active);
      if (idx === -1) idx = -1; // start before first
      idx += e.shiftKey ? -1 : 1;
      if (idx < 0) idx = focusables.length - 1;
      if (idx >= focusables.length) idx = 0;
      focusables[idx].focus();
    }
  }

  // Init closed (also normalizes aria-expanded)
  setOpen(false);

  // Toggle click
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!open);
  });

  // Close when clicking any link/button inside the menu
  menu.addEventListener('click', (e) => {
    const el = e.target.closest('a, button');
    if (!el) return;
    if (toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
  });

  // Optional: auto-close if resized to desktop width (Tailwind lg = 1024)
  window.addEventListener('resize', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (open && window.innerWidth >= 1024) setOpen(false);
  });
})();
