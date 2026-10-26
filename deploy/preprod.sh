#!/usr/bin/env bash
set -euo pipefail
umask 022

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_ROOT="${WEB_ROOT:-/var/www/onir-cms-landing-preprod}"
PREPROD_APP_URL="${PREPROD_APP_URL:-https://preprod-cms.onirtech.com}"

die() {
  printf 'ERREUR: %s\n' "$*" >&2
  exit 1
}

[[ -d "${ROOT}/.git" ]] || die "dépôt introuvable: ${ROOT}"
[[ "${WEB_ROOT}" == *preprod* ]] || die "répertoire web inattendu: ${WEB_ROOT}"
command -v rsync >/dev/null 2>&1 || die "rsync introuvable"

git -C "${ROOT}" fetch origin main
git -C "${ROOT}" reset --hard origin/main

install -d -m 755 "${WEB_ROOT}"
rsync -a --delete \
  --exclude ".git" \
  --exclude "deploy" \
  --exclude "README.md" \
  "${ROOT}/" "${WEB_ROOT}/"

# Les liens de l'application doivent rester dans l'environnement preprod.
find "${WEB_ROOT}" -type f \
  \( -name '*.html' -o -name '*.js' -o -name '*.json' \) \
  -exec sed -i "s|https://cms-backoffice.onirtech.com|${PREPROD_APP_URL}|g" {} +

if ! grep -q "ONIR CMS" "${WEB_ROOT}/index.html"; then
  die "index.html preprod invalide"
fi
if grep -Rq "https://cms-backoffice.onirtech.com" "${WEB_ROOT}"; then
  die "des liens de production subsistent dans la landing preprod"
fi

printf 'Landing preprod synchronisée.\n'
printf 'Source   : %s\n' "${ROOT}"
printf 'Web root : %s\n' "${WEB_ROOT}"
printf 'App URL  : %s\n' "${PREPROD_APP_URL}"
