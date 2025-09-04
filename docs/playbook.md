Add two tiny safeguards

Ignore the live files so you don’t accidentally commit them:

# .gitignore
.htaccess
robots.txt


Add a short note in docs/playbook.md (or your checklist) with the deploy map:

DEV deploy

htaccess-dev.txt → rename to .htaccess

robots.dev.txt → rename to robots.txt

PROD deploy

htaccess-prod.txt → rename to .htaccess

robots.production.txt → rename to robots.txt





# here is the chatgpt-proposed github file structure
/
├─ .github/
│  └─ workflows/
│     └─ build-css.yml              # GitHub Action that builds assets/site.css on pushes to main
├─ assets/
│  ├─ site.css                      # ✅ compiled by the Action (what HTML links to)
│  ├─ tailwind.css                  # Tailwind source (imported by the build)
│  ├─ site.js                       # Your JS (what HTML loads)
│  ├─ img/                          # Images (prefer .webp/.avif; lowercase-hyphen names)
│  ├─ icons/                        # favicon.ico, apple-touch-icon.png, site.webmanifest (optional)
│  ├─ fonts/                        # .woff2 fonts + a small fonts.css if needed
│  └─ vendor/                       # (optional) any 3rd-party JS/CSS you must ship
├─ docs/
│  ├─ production_readiness_checklist.md
│  ├─ automated_fixes_changes.csv
│  ├─ postfix_audit.csv
│  └─ playbook.md                   # any notes/process docs
├─ 404.html
├─ *.html                           # your content pages (index, history, gameplan, etc.)
├─ sitemap.xml
├─ robots.dev.txt                   # source-of-truth for DEV robots
├─ robots.production.txt            # source-of-truth for PROD robots
├─ htaccess-dev.txt                 # source-of-truth for DEV .htaccess (Apache) or redirects file
├─ htaccess-prod.txt                # source-of-truth for PROD .htaccess (Apache) or redirects file
├─ package.json
├─ postcss.config.js
└─ tailwind.config.js
