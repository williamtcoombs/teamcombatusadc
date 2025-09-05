/* Plan A: force light mode for launch */
try { localStorage.setItem('tc-theme', 'light'); } catch(e) {}
if (document.documentElement.classList.contains('dark')) {
  document.documentElement.classList.remove('dark');
}


/*! Team Combat USA DC — UI bundle v2025-09-05-03 */
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
    qa('header nav').forEach(menu => {
      if (window.innerWidth >= 1024) {
        menu.removeAttribute('hidden');
        menu.style.display = '';
      }
    });
  };

  const targetMenuForToggle = (btn) => {
    if (!btn) return null;
    const id = btn.dataset.menuToggle || btn.getAttribute('aria-controls') || 'mobile-menu';
    return document.getElementById(id) || q('#site-header nav') || q('header nav');
  };

  document.addEventListener('DOMContentLoaded', () => {
    console.info('TC-UI loaded: v2025-09-05-03');

    // Init theme
    setTheme(detectTheme());

    // Theme toggle (delegated)
    document.addEventListener('click', (e) => { const t = e.target.closest('[data-theme-toggle], #theme-toggle'); if (!t) return; e.preventDefault(); /* Plan A: toggle disabled for launch */ });

    // Mobile menu: event delegation
    const activate = (btn) => {
      const menu = targetMenuForToggle(btn);
      if (!menu) return;
      if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) hideMenu(menu, btn); else showMenu(menu, btn);
    };

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-menu-toggle]');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      // Ensure aria-controls points to the menu id
      const menu = targetMenuForToggle(btn);
      if (menu && !btn.getAttribute('aria-controls')) btn.setAttribute('aria-controls', menu.id || 'mobile-menu');
      activate(btn);
    });

    // Active nav link marking
    const here = location.pathname.replace(/index\.html?$/i, '').toLowerCase();
    qa('nav a[href]').forEach(a => {
      try {
        const u = new URL(a.getAttribute('href'), location.origin);
        const p = u.pathname.replace(/index\.html?$/i, '').toLowerCase();
        if (p === here) { a.classList.add('active'); a.setAttribute('aria-current','page'); }
      } catch (e) {}
    });

    // Back to top
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
      const update = () => { backBtn.style.display = window.scrollY > 200 ? 'inline-flex' : 'none'; };
      window.addEventListener('scroll', update);
      backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      update();
    }

    ensureDesktop();
  });

  window.addEventListener('resize', ensureDesktop);
})();


/* back-to-top: refined global */
(function(){ 
  const THRESHOLD = 600;      // px scrolled before eligible
  const SHOW_DELAY = 350;     // ms after threshold before showing
  let showTimer = null;
  let lastWanted = false;
  const ensureBtn = () => {
    let btn = document.getElementById('backToTop');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'backToTop';
      btn.type = 'button';
      btn.setAttribute('aria-label','Back to top');
      btn.textContent = '↑ Top';
      document.body.appendChild(btn);
      btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
    return btn;
  };

  const setShown = (btn, on) => {
    if (!btn) return;
    if (on) btn.classList.add('show'); else btn.classList.remove('show');
  };

  const decide = () => {
    const want = window.scrollY > THRESHOLD;
    if (want === lastWanted) return;
    lastWanted = want;
    const btn = ensureBtn();
    if (want) {
      clearTimeout(showTimer);
      showTimer = setTimeout(() => setShown(btn, true), SHOW_DELAY);
    } else {
      clearTimeout(showTimer);
      setShown(btn, false);
    }
  };

  window.addEventListener('scroll', () => requestAnimationFrame(decide), { passive: true });
  window.addEventListener('resize', () => requestAnimationFrame(decide));
  document.addEventListener('DOMContentLoaded', () => decide());
  decide();
})();
