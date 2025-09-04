/*! Team Combat USA DC — small enhancement bundle */
(() => {
  const THEME_KEY = 'tc-theme';

  // Theme init from localStorage or system
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialDark = saved ? saved === 'dark' : prefersDark;
  document.documentElement.classList.toggle('dark', initialDark);

  // Theme toggle + back-to-top click handlers
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-theme-toggle]');
    if (t) {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    }
    const btt = e.target.closest('[data-back-to-top]');
    if (btt) window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Back-to-top show/hide
  const bttEl = document.querySelector('[data-back-to-top]');
  if (bttEl) {
    const toggle = () => bttEl.classList.toggle('btt-show', window.scrollY > 400);
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });
  }

  // Nav active highlighting (add aria-current/page and optional class)
  try {
    const path = location.pathname.replace(/\/index\.html$/, '/').toLowerCase();
    document.querySelectorAll('nav a[href]').forEach((a) => {
      let href = a.getAttribute('href') || '';
      try {
        let p = href.startsWith('http') ? new URL(href).pathname : new URL(href, location.origin).pathname;
        p = p.replace(/\/index\.html$/, '/').toLowerCase();
        if (p === path) {
          a.setAttribute('aria-current', 'page');
          a.classList.add('nav-active');
        }
      } catch {}
    });
  } catch {}

  // Remove any dev-only font notifications/widgets
  const devFont = document.querySelector('[data-font-notice], #fontcheck, .fonts-widget');
  if (devFont) devFont.remove();
})();