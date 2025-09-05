/*! Team Combat USA DC — UI bundle TC-UI v2025-09-05-02 */
(() => {
  const THEME_KEY = 'tc-theme';

  const q = (sel, root = document) => root.querySelector(sel);
  const qa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // THEME
  const setTheme = (mode) => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    try { localStorage.setItem(THEME_KEY, mode); } catch {};
  };
  const detectTheme = () => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {};
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // MENU helpers
  const showMenu = (menu, toggle) => {
    if (!menu) return;
    menu.removeAttribute('hidden');
    if (menu.classList) menu.classList.remove('hidden');
    if (window.innerWidth < 1024) menu.style.display = 'block';
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  };
  const hideMenu = (menu, toggle) => {
    if (!menu) return;
    menu.setAttribute('hidden', '');
    if (menu.classList) menu.classList.add('hidden');
    menu.style.display = '';
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  };

  const ensureDesktop = () => {
    qa('nav').forEach(menu => {
      if (window.innerWidth >= 1024) {
        menu.removeAttribute('hidden');
        menu.style.display = '';
      }
    });
  };

  const targetMenuForToggle = (btn) => {
    if (!btn) return null;
    const id = btn.dataset.menuToggle || btn.getAttribute('aria-controls') || 'mobile-menu';
    return document.getElementById(id) || q('#site-header nav') || q('header nav') || q('nav');
  };

  document.addEventListener('DOMContentLoaded', () => {
    console.info('TC-UI v2025-09-05-02 loaded');

    // Init theme
    setTheme(detectTheme());

    // Theme toggle
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-theme-toggle], #theme-toggle');
      if (!t) return;
      e.preventDefault();
      const nowDark = document.documentElement.classList.contains('dark');
      setTheme(nowDark ? 'light' : 'dark');
    });

    // Mobile menu: EVENT DELEGATION (works even if header is injected)
    const activate = (btn) => {
      const menu = targetMenuForToggle(btn);
      if (!menu) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) hideMenu(menu, btn); else showMenu(menu, btn);
    };

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-menu-toggle]');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      // Ensure ARIA baseline
      if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');
      const menu = targetMenuForToggle(btn);
      if (menu && !btn.getAttribute('aria-controls')) btn.setAttribute('aria-controls', menu.id || 'mobile-menu');
      activate(btn);
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const btn = e.target.closest('[data-menu-toggle]');
      if (!btn) return;
      e.preventDefault();
      activate(btn);
    });

    ensureDesktop();
  });

  window.addEventListener('resize', ensureDesktop);
})();