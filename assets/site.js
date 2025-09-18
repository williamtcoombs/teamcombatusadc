// assets/site.js
(function () {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  // classes you already use to hide the drawer
  const hideClasses = ['hidden', 'invisible', 'opacity-0', '-translate-y-2'];

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
      hideClasses.forEach(c => menu.classList.remove(c));
      document.body.style.overflow = 'hidden'; // scroll lock without Tailwind dep
      trapActive = true;
      menu.setAttribute('tabindex', '-1'); // ensure menu can receive focus
      const first = getFocusable(menu)[0] || menu;
      first.focus({ preventScroll: true });
      document.addEventListener('keydown', onKeydown, true);
    } else {
      hideClasses.forEach(c => menu.classList.add(c));
      document.body.style.overflow = ''; // restore scroll
      trapActive = false;
      document.removeEventListener('keydown', onKeydown, true);
      toggle.focus({ preventScroll: true }); // return focus to hamburger
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

    // Always handle Tab ourselves so it works even when browser won't tab to links
    if (e.key === 'Tab') {
      e.preventDefault();
      const focusables = getFocusable(menu);
      if (focusables.length === 0) {
        menu.focus();
        return;
      }
      const active = document.activeElement;
      let idx = focusables.indexOf(active);
      if (idx === -1) {
        focusables[0].focus();
        return;
      }
      idx += e.shiftKey ? -1 : 1;
      if (idx < 0) idx = focusables.length - 1;
      if (idx >= focusables.length) idx = 0;
      focusables[idx].focus();
    }
  }

  // init closed
  setOpen(false);

  // toggle click
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!open);
  });

  // close when a link/button inside the menu is clicked
  menu.addEventListener('click', (e) => {
    const el = e.target.closest('a, button');
    if (!el) return;
    if (toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
  });

  // optional: auto-close if resized to desktop width (Tailwind lg = 1024)
  window.addEventListener('resize', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (open && window.innerWidth >= 1024) setOpen(false);
  });
})();
