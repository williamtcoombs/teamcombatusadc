# Return-From-Break Playbook

This is a lightweight, repeatable checklist to pause for ~2 weeks and safely resume development without retesting everything from scratch.

## 1) Commit a "Known-Good" Snapshot
- Use Git (GitHub/GitLab/Bitbucket). At the end of a working session, run:
  ```bash
  git add -A
  git commit -m "stable: all pages load and links checked"
  git tag -a stable -m "Known-good before break"
  git push --follow-tags
  ```

## 2) Leave Yourself a Trail
- Maintain a short `DEVLOG.md` in the repo:
  - What you verified today (pages tested, key flows).
  - Open TODOs (fixes, experiments).
  - What to do first when you come back.

Template:
```
## YYYY-MM-DD
✅ Verified: index, navigation, images load
🪲 Known issues: (none)
🎯 Next: wire up styles.html to site.css helpers
```

## 3) Quick Automated Checks
Run this before leaving *and* when returning:
```bash
python quick_check.py
```
It scans HTML for internal links, assets, and missing references and prints a report.

Optionally, run Lighthouse (Chrome DevTools or `lighthouse-ci`) for SEO/accessibility/perf snapshots.

## 4) One-Command Local Preview
Use Python's simple server:
```bash
# run from the project root that contains the `dev/` folder
python -m http.server 8000
# then open http://localhost:8000/dev/index.html
```
Or install `live-server` (Node) for auto-reload:
```bash
npm i -g live-server
live-server dev
```

## 5) Release Rhythm
- Work in feature branches; merge into `main` only when `quick_check.py` is clean.
- Tag `stable` each time you finish a bug-fix cycle.

## 6) Visual Snapshot (Optional)
- Capture screenshots of key pages (index, fundamentals, positions, drills). Store under `/dev/baseline_screens/`. On return, eyeball-diff with current pages.

---

## Runbook for Returning After a Break (10–15 minutes)

1. **Pull latest**: `git pull`
2. **Read `DEVLOG.md`**: scan last entry. Do those TODOs first.
3. **Run `python quick_check.py`**: confirm no missing files/links.
4. **Local preview**: `python -m http.server 8000` → visit the major pages in the nav.
5. **Spot-check visuals**: compare with `/dev/baseline_screens/` (if you made them).
6. **Proceed**: start on the top TODO; keep the log updated.

---

### Notes specific to this project
- HTML lives under `/dev/` with `/dev/assets/` for CSS/JS/images.
- Keep page titles unique for better SEO (the scanner flags duplicates).
- If you add pages, update internal links and re-run `quick_check.py`.

Happy building!