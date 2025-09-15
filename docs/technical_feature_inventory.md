# Technical Feature Inventory – Team Combat USA Site

This document summarizes all technical features detected in the HTML, JS, and CSS files you provided.

---

## 📦 Global Assets & Infrastructure

| File | Status |
|------|--------|
| `robots.txt` | ✅ Present |
| `sitemap.xml` | ✅ Present |
| `manifest.webmanifest` | ❌ Missing |
| `site.css` | ✅ Present |
| `assets/site.js` | ✅ Present |

---

## 🔹 Navigation & Interaction (JavaScript)

- **Mobile drawer** (hamburger → slide-down menu): ✅
- **Back-to-Top button** (runtime-injected after 100px scroll): ✅
- **Theme toggle (JS)**: ❌ Not found
- **Reduced motion support**: ❌ Not implemented

---

## 🎨 Styling / Design System (CSS)

- **Dark mode styles** (`html.dark …`): ✅ Present
- **Legacy back-to-top CSS** (`#backToTop`): ⚠️ Present but unused
- **Brand tokens** (`--brand-…`): ✅ Present
- **Skip link styles** (`.skip-link`): ✅ Present

---

## ♿ Accessibility

- **Skip link**: Present on all main pages ✅
- **Landmarks**: `<main>` + `<nav>` on all pages ✅
- **Alt attributes**: No missing `alt` attributes ✅

---

## 🔍 SEO

| Feature | Status |
|---------|--------|
| Canonical tags | ✅ 16/16 pages |
| Meta robots | ⚠️ Only on 404 (`noindex, nofollow`) |
| Open Graph | ✅ Titles & descriptions (16/16); images (15/16) |
| Twitter Card | ✅ 16/16 pages |
| JSON-LD structured data | ❌ None |
| Favicons | ✅ Present via head snippet |

---

## 🔒 Security

- All `target="_blank"` links use `rel="noopener noreferrer"` ✅

---

## ⚡ Performance Metrics

- Avg scripts per page: ~3.6
- `defer` usage: ~0.94/page (main script deferred) ✅
- `/assets/site.js`: Included on all pages ✅

---

## 🔎 Recommendations

### Keep (working well)
- Runtime Back-to-Top in `site.js`
- Mobile drawer + ARIA
- Canonicals, OG/Twitter, skip links, alt text
- `robots.txt`, `sitemap.xml`

### Streamline / Delete
- Remove legacy `#backToTop` CSS (duplicate)
- Add `<meta name="robots" content="index, follow">` to all main pages
- If dark mode isn’t live, decide whether to toggle or prune

### Add (nice wins this cycle)
- `manifest.webmanifest` + `<link rel="manifest">`
- `prefers-reduced-motion` handling for Back-to-Top
- JSON-LD (`WebSite`, `Organization`)
- Tailwind tokens for colors/spacing to replace custom CSS vars

---

This report is based on a static audit of every HTML page and the `site.js`/`site.css` files you shared.
