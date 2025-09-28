# Team Combat USA Website

This repository contains the source code for the **Team Combat USA** website.

- **Production**: https://www.teamcombatusadc.com  
- **Preview/Dev**: https://preview.teamcombatusadc.com

---

## 🚀 Project Overview

Static site built with **HTML + compiled Tailwind CSS** and a small JS bundle.

Highlights:
- **Accessibility**: semantic structure, skip link, `aria-current` for active nav, mobile drawer with ARIA, back‑to‑top control.
- **Responsive UI**: unified header/nav across pages.
- **SEO/Metadata**: canonical URLs, page‑specific descriptions, Open Graph + Twitter tags, `sitemap.xml`, `robots.txt`.
- **Performance**: single compiled CSS (`assets/site.css`), single script (`assets/site.js`), light‑only mode guard.

---

## 📂 Repository Structure

```
├── *.html                         # All site pages (Home, Warrior Ethos, History, etc.)
├── assets/
│   ├── site.css                   # Compiled Tailwind CSS (build output)
│   ├── tailwind.css               # Tailwind source (input)
│   ├── site.js                    # Navigation & back‑to‑top logic
│   └── img/                       # Images (incl. og-default.png)
├── sitemap.xml
├── robots.txt
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── .github/pull_request_template.md
```

---

## ⚙️ Development

### Prerequisites
- **Node.js 18+** (for building CSS)
- Optional: **Python 3** (quick local static file server)

### Install dependencies
```bash
npm install
```

### Build CSS (one‑shot)
```bash
npm run build:css
```
> Compiles `assets/tailwind.css` → **`assets/site.css`** (minified).

### Build CSS (watch mode during edits)
```bash
npm run watch:css
```

---

## 👀 Local Preview Options

Choose one of these; all serve the current folder as a static site.

### Option A — Python (zero setup)
```bash
# From the project root
python3 -m http.server 5173
# Open: http://localhost:5173
```
> Stop with `Ctrl+C`.

### Option B — Quick Node server
```bash
# Using http-server without installing globally
npx http-server -p 5173 .
# Open: http://localhost:5173
```

### Option C — Live reload (nice DX)
```bash
# Using live-server without global install
npx live-server --port=5173 --no-browser .
# Then open: http://localhost:5173
```
> If you like these tools, add scripts to `package.json`:
>
> ```json
> {
>   "scripts": {
>     "preview": "http-server -p 5173 .",
>     "dev": "live-server --port=5173 --no-browser ."
>   },
>   "devDependencies": {
>     "http-server": "^14.1.1",
>     "live-server": "^1.2.2"
>   }
> }
> ```

---

## 🧑‍💻 Workflow

- Branches:
  - `testing` → preview/dev site
  - `main` → production
- Practice **micro‑commits** and **PRs** from `testing` → `main`.
- Tailwind build is run via npm scripts (can be wired to CI if desired).

---

## ✅ Current Status (Checkpoint)

- **Done**: header/nav unification; light‑only guard; metadata/SEO cleanup for `index.html` and `warrior-ethos.html` (canonical, descriptions, OG/Twitter), OG image standardized.
- **Next**: continue the metadata/SEO pass in **navbar order**, starting with `history.html`.

---

## 🗺️ Roadmap / Nice‑to‑haves

- Accessibility polish (keyboard focus trap for the mobile drawer, Escape‑to‑close).
- Performance pass (image `loading="lazy"` where appropriate; asset compression).
- Analytics (if desired).
- CI: auto‑build CSS on PRs and enforce consistent meta tag order.

---

## 📜 License

© Team Combat USA. All rights reserved.
