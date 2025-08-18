# Combatives Website — Developer README

A lightweight runbook so you can take a break (even a couple of weeks) and jump back in without retesting everything from scratch.

---

## Project Layout

```
dev/
  index.html
  *.html
  assets/
    site.css
    site.js
    img/
  css/
    typography.css
    proposed-font-standardization.css
  robots.txt
  sitemap.xml
```
> Serve pages from `/dev/` locally (see below). Keep page titles unique for better SEO and to make scanning easier.

---

## Quick Start (Every Session)

1. **Local preview**
   ```bash
   # run from the project root (the folder that contains /dev)
   python -m http.server 8000
   # open http://localhost:8000/dev/index.html
   ```

2. **Run the quick health check**
   ```bash
   python quick_check.py
   ```
   The script:
   - scans all `dev/*.html`
   - validates internal links & asset paths (images/CSS/JS)
   - warns about duplicate `<title>` values
   - exits non‑zero if missing references are found

3. **Do the work** and keep notes in `DEVLOG.md` (template below).

---

## “Pause & Resume” Workflow

### Before you take a break
1. `python quick_check.py` → **must be clean**
2. **Commit & tag a known-good state**
   ```bash
   git add -A
   git commit -m "stable: all pages load and links checked"
   git tag -a stable -m "Known-good before break"
   git push --follow-tags
   ```
3. Update **`DEVLOG.md`** with:
   - ✅ What you verified today
   - 🪲 Known issues (if any)
   - 🎯 What to do first when you return

### When you return (10–15 minutes)
1. `git pull`
2. Skim the **last `DEVLOG.md` entry**
3. `python quick_check.py`
4. Start local preview and spot-check the main pages
5. Pick up the first TODO from the log

---

## DEVLOG.md Template

Create a `DEVLOG.md` in the project root and append entries like this:

```
## 2025-08-18
✅ Verified: index, navigation, images load
🪲 Known issues: none
🎯 Next: wire up styles.html to site.css helpers
```

Short and utilitarian is perfect—this is for *future you*.

---

## Scripts & Tools

### quick_check.py
- Run any time to validate internal references and titles.
- Recommended CI hook (optional): run on pull requests; block merges if it fails.

### Optional: Lighthouse snapshot
Use Chrome DevTools Lighthouse or `lighthouse-ci` to capture performance/accessibility/SEO snapshots before/after changes. Great for catching regressions without manual retesting.

---

## Content Hygiene

- **Unique `<title>` per page.** Helps SEO and avoids confusion in history/search.
- **Link paths**: prefer relative links that resolve inside `/dev`.
- **Images**: keep under `dev/assets/img/`; optimize if large.
- **Sitemap/robots**: update when you add pages so search engines get the latest.

---

## Troubleshooting

- **Missing references found by `quick_check.py`**  
  - Check that the path is correct relative to the referring HTML file.  
  - Verify the file exists under `dev/` and casing matches exactly.

- **Local preview doesn't reflect changes**  
  - Hard refresh the browser (Shift+Reload).  
  - If using another tool that caches, kill and restart the server.

---

## Future Enhancements (Optional)

- Add a GitHub Action to run `python quick_check.py` on push/PR.
- Add a simple visual baseline: screenshot a few key pages into `dev/baseline_screens/` and compare after changes.
- Integrate Prettier/HTML linting for consistent formatting.

---

## Files Included With This README

- `quick_check.py` — link/asset/title scanner (put in project root)  
- `playbook.md` — expanded pause-and-resume playbook

Happy building! 🛠️