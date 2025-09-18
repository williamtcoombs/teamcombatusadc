// assets/site.js

(function () {
  // Elements from our "locked header/menu" playbook
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  // Utility: show/hide using your existing class conventions
  function setOpen(isOpen) {
    toggle.setAttribute('aria-expanded', String(isOpen));

    // Visibility classes you’ve standardized: hidden, invisible, opacity-0, -translate-y-2
    const hideClasses = ['hidden', 'invisible', 'opacity-0', '-translate-y-2'];
    if (isOpen) {
      hideClasses.forEach(c => menu.classList.remove(c));
      document.body.classList.add('overflow-hidden'); // lock background scroll
      installFocusTrap();
      // Send focus into menu (first focusable), else focus menu itself
      (getFocusable(menu)[0] || menu).focus({ preventScroll: true });
    } else {
      // Add classes after a micro-task so CSS transitions can run if you use them
      hideClasses.forEach(c => menu.classList.add(c));
      document.body.classList.remove('overflow-hidden'); // restore scroll
      removeFocusTrap();
      // Return focus to the hamburger
      toggle.focus({ preventScroll: true });
    }
  }

  // Initial state
  setOpen(false);

  // Click handler
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!open);
  });

  // ===== Accessibility polish =====

  // 1) ESC closes the menu
  function onKeydownEsc(e) {
    if (e.key === 'Escape') {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      if (open) {
        e.preventDefault();
        setOpen(false);
      }
    }
  }

  // 2) Focus trap: keep Tab/Shift+Tab inside the drawer
  let trapActive = false;
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

  function onKeydownTrap(e) {
    if (!trapActive) return;
    if (e.key !== 'Tab') return;

    const focusables = getFocusable(menu);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (e.shiftKey) {
      // Shift+Tab: if we're on first, loop to last
      if (active === first || !menu.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab: if we're on last, loop to first
      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function installFocusTrap() {
    if (trapActive) return;
    trapActive = true;
    document.addEventListener('keydown', onKeydownTrap, true);
    document.addEventListener('keydown', onKeydownEsc, true);
    // Optional: mark main content aria-hidden for SRs while dialog open
    const main = document.querySelector('main');
    if (main) main.setAttribute('aria-hidden', 'true');
  }

  function removeFocusTrap() {
    if (!trapActive) return;
    trapActive = false;
    document.removeEventListener('keydown', onKeydownTrap, true);
    document.removeEventListener('keydown', onKeydownEsc, true);
    const main = document.querySelector('main');
    if (main) main.removeAttribute('aria-hidden');
  }

  // Close the menu if any in-menu link is clicked (common pattern)
  menu.addEventListener('click', (e) => {
    const el = e.target.closest('a, button');
    if (!el) return;
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (open) setOpen(false);
  });
})();
