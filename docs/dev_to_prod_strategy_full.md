
# Dev-to-Prod Rollout Strategy Discussion

## User's Question
i need your advice. we have finished a dev to prod rollout. we have started a new development cycle. i need your guidance. what we did yesterday was take the existing dev site, which for a moment in time, was identical--more or less--to the prod site, and started making changes to it. specifically, we added favicons. great addition, by the way, so thank you.

i woke up this morning thinking, what is the best long-term strategy for our next dev to prod rollout? several paths were apparent to me, and i'm sure there are others. i need to you recommend a course of action. do any of these make sense or can you recommend another?

1. stick with basic layout and focus on content only for this round. 
2. build from scratch where everything is standardized.
3. hybrid mix of #1 and #2.

## Assistant's Response

Love that you’re thinking ahead. Given where the site is (stable prod, active dev, micro-commit flow, Tailwind build in CI), the best path is **#3: a hybrid**—ship content quickly while methodically standardizing the foundation in parallel. You’ll get near-term wins without freezing progress, and you won’t accumulate more “one-off” cruft.

---

### What to adopt (hybrid strategy)
1) **Two parallel tracks**
- **Track A (Content-first):** Keep the current layout, move strictly page-by-page in navbar order (your preference), copy/SEO/a11y/perf polish, and small UI tweaks. Fast PRs, micro-commits.
- **Track B (Standardization):** In a separate branch, introduce reusable tokens & components (no redesign yet). When each piece is ready, cherry-pick into dev.

2) **Lightweight standardization scope (this cycle)**
- **Design tokens in Tailwind:** Define brand colors, spacing, radii, shadows, typography scale in `tailwind.config.js`. Replace ad-hoc classes with tokenized utilities as you touch pages.
- **Micro components (HTML snippets):** Header, footer, back-to-top, CTAs, card patterns. Don’t yank in a full static site generator yet—just keep canonical versions in `/partials` and copy as needed for now. (If time allows later: consider Eleventy or Nunjucks next cycle.)
- **Meta & assets baseline:** Canonical URLs, OG/Twitter tags, sitemap.xml, robots.txt, `manifest.webmanifest`, and your new **favicons** set.

3) **Branch & release model**
- `main = prod`.  
- `testing = preview/dev`.  
- `feature/* for work`.  
- Start each cycle by tagging prod (`release-2025-09-15`) so you always have a rollback anchor.
- For rollout: merge feature → testing, QA on preview, then open a “Release PR” from testing → main with a checklist. Tag on merge.

4) **Release checklist (keeps rollouts boring)**
- Lint: HTML, link-check, and Tailwind build passes.
- Accessibility smoke: landmarks, skip links, focus order, color contrast on new components.
- Performance: Lighthouse budget (LCP < 2.5s on home, JS < 150KB).
- SEO: canonical present, unique titles/descr, sitemap updated.
- Favicons & manifest: all links valid; icons render on iOS/Android/desktop.
- Visual scan on top 5 pages mobile + desktop.
- 404/500 and `robots.txt` sanity.
- Diff review: only intended files changed; no stray debug scripts.

5) **Hotfix & drift control**
- Any urgent prod hotfix? Patch on a `hotfix/*` branch off `main`, merge back to both `main` and `testing`. This keeps dev and prod from drifting.

---

### Why not #1 or #2 alone?
- **#1 (content only):** Fast, but you’ll extend the life of inconsistencies you already know about, making the *next* cycle harder.
- **#2 (rebuild from scratch):** Cleanest long-term, but it pauses momentum and risks scope creep. Better after you’ve codified tokens/components and learned from this cycle.

---

### Concrete 2–3 week cadence
**Week 1**
- Track A: Ship content polish for the next 3–4 pages in navbar order.  
- Track B: Add tokens to `tailwind.config.js`; extract Header/Footer/CTA partials; finalize favicon set + `manifest.webmanifest`.

**Week 2**
- Track A: Continue content pages; apply tokens opportunistically as you touch files.  
- Track B: Introduce a Card pattern and a standardized “Hero” section.

**Week 3**
- Cut **Release PR** from testing → main. Run the checklist, tag release, and deploy.

---

### Guardrails & tooling
- CI gates: Tailwind build, HTML link-check, axe-core check.
- PR hygiene: Small PRs (≤200 lines), clear purpose + screenshots.
- Naming: Prefix PRs `[tokens]`, `[component]`, `[meta]`, `[content]`.
- CHANGELOG.md: Add one line per PR.

---

### Immediate next steps
1) Create `feature/tokens-components` and add design tokens to Tailwind.  
2) Drop in full favicon set + `manifest.webmanifest` and verify tags are sitewide.  
3) Extract Header/Footer/CTA into `/partials`.  
4) Continue your navbar-order content pass on dev.


---

## Favicon/Manifest Fixes & Tailwind Token Starter

### 1. Favicon + Manifest (files & head block)

**Add files** to match your existing links:
```
/assets/img/favicon.svg
/assets/img/favicon-32x32.png
/assets/img/favicon-48x48.png
/assets/img/favicon-96x96.png
/assets/img/apple-touch-icon.png
/safari-pinned-tab.svg
/site.webmanifest
```

**Head snippet (use this exact block site-wide):**
```html
<!-- Favicons -->
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/assets/img/favicon-48x48.png" sizes="48x48" type="image/png">
<link rel="icon" href="/assets/img/favicon-96x96.png" sizes="96x96" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" sizes="180x180">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#991b1b">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#991b1b">
```

**`/site.webmanifest` (starter)**
```json
{
  "name": "Team Combat USA",
  "short_name": "TC USA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#991b1b",
  "icons": [
    { "src": "/assets/img/favicon-96x96.png", "sizes": "96x96", "type": "image/png" },
    { "src": "/assets/img/apple-touch-icon.png", "sizes": "180x180", "type": "image/png", "purpose": "any" }
  ]
}
```

### 2. OG Image on 404 Page
Add to `<head>` of `404.html`:
```html
<meta property="og:image" content="/assets/img/og-default.png">
```

### 3. Tailwind Tokens (Starter `tailwind.config.js`)
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#991b1b', // Brand Red
          800: '#7f1d1d',
          900: '#450a0a',
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        soft: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Antonio', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

Use these tokens gradually as you touch pages (don’t mass refactor yet).


---

## Release PR Template

Use this template when cutting a `testing → main` release PR.

```markdown
# Release: YYYY-MM-DD

## Summary
This release includes:
- Content updates for pages: [list pages]
- UI standardization (tokens/components): [list items]
- Favicon & manifest updates
- SEO & a11y fixes

## Checklist

- [ ] Tailwind build ✅
- [ ] Link-check ✅ (no broken asset links)
- [ ] Axe-core a11y smoke ✅ (landmarks, skip links, focus outline, contrast)
- [ ] Lighthouse budgets ✅ (LCP < 2.5s, JS < 150KB shipped)
- [ ] SEO ✅ (unique titles, descriptions, canonical, sitemap updated)
- [ ] Favicons & Manifest ✅ (render on iOS/Android/Desktop; pinned-tab color)
- [ ] Visual QA top 5 pages (mobile + desktop) ✅
- [ ] Diff review (no stray debug; keep dev FontCheck script intact) ✅
- [ ] Tag release after merge ✅

## Notes
(Add screenshots, release highlights, or testing instructions here.)
```

Keep this at `.github/pull_request_template_release.md` for easy reference.
