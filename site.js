// ===== Strict iOS-safe site.js (one-active-per-nav, theme, menu) =====
function normalizeBasename(pathname){try{let p=String(pathname||'').toLowerCase();p=p.split('#')[0].split('?')[0];if(p.startsWith('/'))p=p.slice(1);if(!p||p.endsWith('/'))return'index.html';const seg=p.split('/').pop()||'index.html';return seg.endsWith('.html')?seg:seg+'.html'}catch(_){return'index.html'}}
function setActiveStrict(){const current=normalizeBasename(location.pathname);const containers=[document.getElementById('site-header'),document.getElementById('mobile-menu'),document.querySelector('footer')].filter(Boolean);document.querySelectorAll('a.nav-link[aria-current=\"page\"]').forEach(a=>a.removeAttribute('aria-current'));containers.forEach(container=>{const scope=(container.querySelector&&container.querySelector('nav'))||container;const anchors=[...scope.querySelectorAll('a[href]')];if(!anchors.length)return;anchors.forEach(a=>{if(!a.classList.contains('nav-link'))a.classList.add('nav-link')});let set=false;anchors.forEach(a=>{let base;try{base=normalizeBasename(new URL(a.getAttribute('href')||'',location.href).pathname)}catch{base=normalizeBasename(a.getAttribute('href')||'')}const match=(base===current);if(match&&!set){a.setAttribute('aria-current','page');set=true}else{a.removeAttribute('aria-current')}})});}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',setActiveStrict,{once:true})}else{setActiveStrict()}window.addEventListener('pageshow',setActiveStrict);
// Theme toggle
(function(){const root=document.documentElement;const stored=localStorage.getItem('theme');const prefers=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;if(stored==='dark'||(!stored&&prefers))root.classList.add('dark');else root.classList.remove('dark');const btn=document.getElementById('theme-toggle');const setIcon=()=>{if(!btn)return;btn.innerHTML=root.classList.contains('dark')?'<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z\"/></svg>':'<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"5\"/><path d=\"M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42\"/></svg>';};if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',setIcon,{once:true})}else{setIcon()}window.addEventListener('pageshow',setIcon);btn&&btn.addEventListener('click',()=>{root.classList.toggle('dark');localStorage.setItem('theme',root.classList.contains('dark')?'dark':'light');setIcon()});})();
// Mobile menu
(function(){const btn=document.getElementById('menu-toggle');const menu=document.getElementById('mobile-menu');function toggle(e){if(!menu)return;const open=menu.getAttribute('data-open')==='true';const nxt=!open;menu.setAttribute('data-open',String(nxt));menu.classList.toggle('visible',nxt);menu.classList.toggle('invisible',!nxt);menu.classList.toggle('opacity-0',!nxt);menu.classList.toggle('translate-y-[-8px]',!nxt);menu.classList.toggle('hidden',!nxt);btn&&btn.setAttribute('aria-expanded',String(nxt));if(e)e.preventDefault()}function bind(){btn&&btn.addEventListener('click',toggle);btn&&btn.addEventListener('touchend',toggle);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu){menu.setAttribute('data-open','false');menu.classList.add('invisible','opacity-0','hidden');menu.classList.remove('visible')}})}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',bind,{once:true})}else{bind()}})();
// Header scroll + back-to-top
(function(){const header=document.getElementById('site-header');const inner=document.getElementById('header-inner');const backToTop=document.getElementById('backToTop');let ticking=false;function onScroll(){const y=window.scrollY||window.pageYOffset||0;if(!ticking){window.requestAnimationFrame(()=>{header&&header.classList.toggle('backdrop-blur',y>8);header&&header.classList.toggle('bg-white/70',y>8);header&&header.classList.toggle('dark:bg-slate-950/60',y>8);header&&header.classList.toggle('shadow',y>8);inner&&inner.classList.toggle('py-2',y>8);inner&&inner.classList.toggle('py-3',y<=8);const show=y>400;backToTop&&backToTop.classList.toggle('opacity-0',!show);backToTop&&backToTop.classList.toggle('translate-y-6',!show);ticking=false});ticking=true}}window.addEventListener('scroll',onScroll,{passive:true});onScroll();backToTop&&backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));})();
// Footer year & TOC
(function(){const el=document.getElementById('year');if(el)el.textContent=new Date().getFullYear()})();(function(){const toc=document.getElementById('toc');if(!toc)return;const hs=[...document.querySelectorAll('article h2, article h3')];hs.forEach(h=>{if(!h.id){h.id=h.textContent.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}const li=document.createElement('li');const a=document.createElement('a');a.href=`#${h.id}`;a.textContent=h.textContent;a.className='block hover:underline';if(h.tagName==='H3')li.className='ml-3';li.appendChild(a);toc.appendChild(li)})})();
// unify navbar active state by URL
(function() {
  try {
    var here = location.pathname.split('/').pop() || 'index.html';
    var nav = document.querySelector('nav');
    if (!nav) return;
    var links = nav.querySelectorAll('a[href]');
    links.forEach(function(a){
      var href = a.getAttribute('href');
      var file = (href || '').split('/').pop();
      if (file === here) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      } else {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      }
    });
  } catch(e){}
})();
