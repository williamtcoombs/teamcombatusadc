# Team Combat USA DC — Website

> Static site for Team Combat USA DC. Built with plain HTML + Tailwind CSS (compiled), and a tiny bit of vanilla JS.

## Live sites
- **Production:** https://www.teamcombatusadc.com
- **Preview (dev):** https://preview.teamcombatusadc.com

## How this repo works (quick start)
- Make edits in GitHub’s web UI (small, frequent commits are great).
- Pushing to **`main`**:
  - Triggers **Build CSS** GitHub Action → compiles Tailwind to `/assets/site.css`.
  - You then upload files from `main` to the **preview/dev site** for testing.
- After testing passes, upload the same files to **production**.

## Branch & deploy workflow
- Treat **`main` = staging**; preview site is your test environment.
- **Do not** edit the production host directly—always validate on preview first.
- Deploy mapping at upload time:
  - **DEV:** `robots.dev.txt → robots.txt`, `htaccess-dev.txt → .htaccess`
  - **PROD:** `robots.production.txt → robots.txt`, `htaccess-prod.txt → .htaccess`

## Repository structure
```
/
├─ .github/
│  └─ workflows/
│     └─ build-css.yml          # CI: builds /assets/site.css on push to main
├─ assets/
│  ├─ site.css                  # ✅ compiled by CI (what pages link to)
│  ├─ tailwind.css              # Tailwind source (input to the build)
│  ├─ site.js                   # site-wide JS
│  ├─ img/                      # images (prefer .webp/.avif)
│  ├─ icons/                    # favicon & web manifest (optional)
│  └─ fonts/                    # .woff2 + optional fonts.css
├─ docs/
│  ├─ production_readiness_checklist.md
│  ├─ automated_fixes_changes.csv
│  └─ postfix_audit.csv
├─ 404.html
├─ *.html                       # content pages (index, history, styles, etc.)
├─ robots.dev.txt
├─ robots.production.txt
├─ htaccess-dev.txt
├─ htaccess-prod.txt
├─ package.json
├─ postcss.config.js
└─ tailwind.config.js
```

## Frontend stack
- **HTML** only (no framework).
- **Tailwind CSS** via compiled file:
  - Source: `assets/tailwind.css`
  - Output: `assets/site.css` (minified; committed by CI)
- **JS:** `assets/site.js`

### HTML includes
```html
<!-- in <head> -->
<link rel="stylesheet" href="/assets/site.css">
<!-- before </body> -->
<script src="/assets/site.js"></script>
```

## Build system
- **GitHub Action:** `.github/workflows/build-css.yml` runs on pushes to `main`.
- Uses Node 20, Tailwind CLI + PostCSS/Autoprefixer.
- If the Action doesn’t commit `assets/site.css`, ensure the workflow has:
  ```yaml
  permissions:
    contents: write
  ```

### Local (optional)
If you prefer to build locally:
```bash
npm install
npm run build:css
# outputs assets/site.css
```

## Accessibility & SEO standards (baked in)
- **Skip link** at top of `<body>` → `#main`; every page has `<main id="main">`.
- **External links** include `rel="noopener noreferrer"`.
- **Images** use `loading="lazy"`; add meaningful `alt` text.
- **Canonical** `<link>` per page; **OG/Twitter** meta present.
- Track page-by-page items in `docs/production_readiness_checklist.md`.

## Robots & .htaccess templates
- Stored in repo root as `.txt` to avoid issues with dotfiles.
- At deploy:
  - DEV: copy `robots.dev.txt → robots.txt`, `htaccess-dev.txt → .htaccess`.
  - PROD: copy `robots.production.txt → robots.txt`, `htaccess-prod.txt → .htaccess`.
- `.gitignore` keeps `robots.txt` and `.htaccess` out of Git.

## Conventions & tips
- **Pages:** keep `.html` files at repo root (simple URLs/canonicals).
- **Links:** use root-relative (`/page.html`).
- **Images:** place under `assets/img/` with lowercase-hyphen names.
- **New pages:** duplicate a finished page, update `<title>`, canonical, OG/Twitter tags, and nav.

## Smoke test before production
1) Load homepage → console has no errors.
2) Click through every nav/footer link → no 404s.
3) Tab once → Skip link appears and jumps focus to main.
4) View source → canonical + OG/Twitter exist.
5) Network tab → `/assets/site.css` and `/assets/site.js` return 200.

---
_Maintainer: you (solo). Keep commits small; validate on preview; then ship to prod._


Do this now (fast path)

Kick the build

In GitHub, open README.md → add a newline → Commit directly to main.

Go to Actions → Build CSS → latest run. You should see it start and finish green.

Verify the output

After the run, open /assets/site.css in the repo.

It should be big (typically 100–300 KB+) and full of Tailwind utilities.

If you see the auto-commit “build: generate compiled Tailwind CSS”, you’re golden.

Update your dev server

Download that large assets/site.css from GitHub.

In your host’s File Manager, upload it to /assets/site.css (overwrite).

In Chrome DevTools (Network), reload the page and click /assets/site.css:

Status: 200

Size: large (not ~1–2 KB)

Hard refresh the page (Cmd/Ctrl + Shift + R).

Make sure pages point to the right file

Each page’s <head> should contain exactly:

<link rel="stylesheet" href="/assets/site.css">


No typography.css, no proposed-font-standardization.css, no site.css in page folders, no Tailwind CDN.

If you want me to enforce that automatically, deploy the cleanup ZIP I gave earlier (teamcombatusadc-canonical-assets.zip) after the big CSS is on the server.

If the Action doesn’t commit assets/site.css

Double-check these at the repo root:

tailwind.config.js with content: ["./**/*.html"]

postcss.config.js with tailwindcss + autoprefixer

assets/tailwind.css with:

@tailwind base;
@tailwind components;
@tailwind utilities;


package.json script:

"build:css": "npx tailwindcss -i ./assets/tailwind.css -o ./assets/site.css --minify"


Then push another tiny commit to trigger the workflow and check the logs.

+ a trivial line.
