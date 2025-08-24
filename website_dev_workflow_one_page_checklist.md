# Website Dev Workflow – One‑Page Checklist
*A simple, repeatable flow for working in short bursts without losing context.*

---
## 0) Before You Start (once per machine)
- Install Git and set your name/email.
- Clone your repo (if not already):
  ```bash
  git clone <YOUR_REPO_URL>
  cd <YOUR_REPO_FOLDER>
  ```

---
## 1) Start a Session (get current & branch off)
```bash
git checkout main
git pull origin main
# create a focused branch for this task
git checkout -b feature/<short-task-name>
```
**Examples:** `feature/nav-cleanup`, `feature/about-typos`, `fix/contact-form`.

**Tip:** Write the task in the branch name so you remember later.

---
## 2) Work in Small Steps (commit often)
- Make a small change → run locally in your browser.
- Stage & commit with a clear message:
```bash
git add -A
git commit -m "Short verb: what changed and why"
```
**Commit style:**
- Use present tense ("add", "fix", "tweak").
- Keep to 50–72 chars if possible.
- One logical idea per commit.

---
## 3) Take a Break Anytime (safe pause)
- Ensure your last change is committed.
- Optional: push your WIP so it’s backed up:
```bash
git push -u origin feature/<short-task-name>
```
- Jot a quick note in the **Session Log** (at bottom) so Future‑You knows the next step.

**Resume next time:**
```bash
cd <YOUR_REPO_FOLDER>
git fetch --all
# If the branch is local:  git checkout feature/<short-task-name>
# If you only pushed to origin:  git checkout -t origin/feature/<short-task-name>
```

---
## 4) Wrap Up the Task (merge)
**Quick local merge (fastest):**
```bash
git checkout main
git pull origin main
git merge --no-ff feature/<short-task-name>
git push origin main
```
**or**
**Pull Request on GitHub (clean history, optional):**
```bash
git push -u origin feature/<short-task-name>
```
Then open GitHub → **Compare & pull request** → review → **Merge** → delete branch.

---
## 5) Reset for the Next Task
```bash
git checkout main
git pull origin main
# (optional) delete merged local branch
git branch -d feature/<short-task-name>
```

---
## 6) Daily/Session Hygiene
- Keep branches tiny (aim to finish in 1–2 sittings).
- Commit messages answer: *What changed? Why?*  
- After merging, sanity‑check your live site (if deployed).

---
## 7) Common One‑Liners
- **See branches:** `git branch --all`
- **Check status:** `git status`
- **See last commits:** `git log --oneline -n 10`
- **Stash quick WIP (if you must switch):**
  ```bash
  git stash push -m "WIP <what>"
  # later
  git stash list
  git stash pop
  ```

---
## 8) 30‑Second Restart (when returning after days off)
1. `git checkout main && git pull origin main`  
2. `git branch --all` (remind yourself what’s in flight)  
3. If continuing: `git checkout feature/<short-task-name>`  
   If new task: `git checkout -b feature/<new-task>`  
4. Open your TODO below and take the smallest next step.

---
## TODO Scratchpad (edit freely)
- [ ]
- [ ]
- [ ]

---
## Session Log (last 5 entries)
- **YYYY‑MM‑DD:** What I did → Next action
- **YYYY‑MM‑DD:** …
- **YYYY‑MM‑DD:** …
- **YYYY‑MM‑DD:** …
- **YYYY‑MM‑DD:** …

