/* Team Combat USA DC - site JS (bundle minimal) */
(function () {
  function qs(id){ return document.getElementById(id); }
  function on(el, ev, fn){ if (el) el.addEventListener(ev, fn); }

  document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle
    var themeBtn = qs('theme-toggle');
    var root = document.documentElement;
    var saved = localStorage.getItem('theme');
    if (saved === 'dark') root.classList.add('dark');
    if (saved === 'light') root.classList.remove('dark');
    on(themeBtn, 'click', function () {
      var isDark = root.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Mobile menu
    var btn = qs('menu-toggle');
    var menu = qs('mobile-menu');
    function setOpen(open) {
      if (!menu || !btn) return;
      menu.setAttribute('data-open', open ? 'true' : 'false');
      btn.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('hidden', !open);
      menu.classList.toggle('invisible', !open);
      menu.classList.toggle('opacity-0', !open);
      menu.classList.toggle('translate-y-[-8px]', !open);
    }
    on(btn, 'click', function () {
      var open = menu && menu.getAttribute('data-open') === 'true';
      setOpen(!open);
    });
    setOpen(false);

    // Back to top
    var back = qs('backToTop');
    function atTop(){ return window.scrollY < 300; }
    function updateBack() {
      if (!back) return;
      back.style.display = atTop() ? 'none' : 'inline-block';
    }
    on(window, 'scroll', updateBack);
    on(back, 'click', function(){ window.scrollTo({top: 0, behavior:'smooth'}); });
    updateBack();

    // Lazyload swap
    var lazy = document.querySelectorAll('img.lazyload[data-src]');
    var swap = function(img){
      var full = img.getAttribute('data-src');
      if (full) { img.src = full; img.removeAttribute('data-src'); }
    };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(entries, obs){
        entries.forEach(function(entry){
          if (entry.isIntersecting) { swap(entry.target); obs.unobserve(entry.target); }
        });
      });
      lazy.forEach(function(i){ io.observe(i); });
    } else {
      lazy.forEach(swap);
    }
  });
})();
