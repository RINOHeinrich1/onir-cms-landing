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
command -v npm >/dev/null 2>&1 || die "npm introuvable"

git -C "${ROOT}" fetch origin main
git -C "${ROOT}" reset --hard origin/main

cd "${ROOT}"
npm ci --no-audit --no-fund
LANDING_PARTNER_API_URL="${LANDING_PARTNER_API_URL:-https://preprod-partner-api.onir-cms.tech/partenaires}"
COMMERCIAL_BACK_URL="${COMMERCIAL_BACK_URL:-https://preprod-backoffice.onir-cms.tech}"
PREPROD_APP_URL="${PREPROD_APP_URL}" PREPROD_PARTNER_API_URL="${LANDING_PARTNER_API_URL}" COMMERCIAL_BACK_URL="${COMMERCIAL_BACK_URL}" npm run build
[[ -f "${ROOT}/dist/index.html" ]] || die "build incomplet: dist/index.html absent"

install -d -m 755 "${WEB_ROOT}"
rsync -a --no-owner --no-group --delete "${ROOT}/dist/" "${WEB_ROOT}/"

# Les liens de l'application doivent rester dans l'environnement preprod.
find "${WEB_ROOT}" -type f \
  \( -name '*.html' -o -name '*.js' -o -name '*.json' \) \
  -exec sed -i \
    -e "s|https://cms-backoffice.onirtech.com|${PREPROD_APP_URL}|g" \
    -e "s|https://magic-panel.onir-cms.tech|${PREPROD_APP_URL}|g" \
    -e "s|https://magic-link.onir-cms.tech|${PREPROD_APP_URL}|g" {} +

if ! grep -q "ONIR CMS" "${WEB_ROOT}/index.html"; then
  die "index.html preprod invalide"
fi
if grep -Rq "https://cms-backoffice.onirtech.com" "${WEB_ROOT}"; then
  die "des liens de production subsistent dans la landing preprod"
fi
if grep -Rq "https://magic-link.onir-cms.tech" "${WEB_ROOT}"; then
  die "des liens magic-link de production subsistent dans la landing preprod"
fi
if grep -Rq "https://partner-api.onir-cms.tech" "${WEB_ROOT}"; then
  die "des liens API partenaire de production subsistent dans la landing preprod"
fi

printf 'Landing preprod synchronisée.\n'
printf 'Source   : %s\n' "${ROOT}/dist"
printf 'Web root : %s\n' "${WEB_ROOT}"
printf 'App URL  : %s\n' "${PREPROD_APP_URL}"
