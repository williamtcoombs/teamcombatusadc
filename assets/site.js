// assets/site.js
(function () {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  const hideClasses = ['hidden', 'invisible', 'opacity-0', '-translate-y-2'];

  function setOpen(isOpen) {
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      hideClasses.forEach(c => menu.classList.remove(c));
      document.body.style.overflow = 'hidden'; // lock scroll
      const main = document.querySelector('main');
      if (main) main.setAttribute('aria-hidden', 'true');
    } else {
      hideClasses.forEach(c => menu.classList.add(c));
      document.body.style.overflow = ''; // restore scroll
      const main = document.querySelector('main');
      if (main) main.removeAttribute('aria-hidden');
    }
  }

  // init closed
  setOpen(false);

  // toggle click
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!open);
  });

  // Esc closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      e.preventDefault();
      setOpen(false);
      toggle.focus({ preventScroll: true });
    }
  }, true);

  // close when clicking a link/button in the menu
  menu.addEventListener('click', (e) => {
    const el = e.target.closest('a, button');
    if (!el) return;
    if (toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
  });

  // auto-close if resized to desktop (Tailwind lg = 1024)
  window.addEventListener('resize', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (open && window.innerWidth >= 1024) setOpen(false);
  });
})();
