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
