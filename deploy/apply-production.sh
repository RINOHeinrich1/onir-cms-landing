#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/anjary-05/onir-cms-landing.git}"
APP_DIR="${APP_DIR:-/opt/onir-cms-landing}"
WEB_ROOT="${WEB_ROOT:-/var/www/onir-cms-landing}"
APP_ENV="${APP_ENV:-/opt/onir-cms/.env.release}"
APP_DEPLOY="${APP_DEPLOY:-/opt/onir-cms/deploy.sh}"
APP_VERSION="${APP_VERSION:-0.8.0}"
APP_URL="https://cms-backoffice.onirtech.com"
BACKOFFICE_CERT="/etc/letsencrypt/live/cms-backoffice.onirtech.com/fullchain.pem"

if [ "$(id -u)" -ne 0 ]; then
  echo "Ce script doit être exécuté en root (sudo)." >&2
  exit 1
fi

if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO_URL" "$APP_DIR"
else
  git -C "$APP_DIR" fetch origin main
  git -C "$APP_DIR" reset --hard origin/main
fi

install -d -m 0755 "$WEB_ROOT"
rsync -a --delete --exclude ".git" --exclude "deploy" "$APP_DIR/" "$WEB_ROOT/"
chown -R www-data:www-data "$WEB_ROOT"

if [ ! -f "$BACKOFFICE_CERT" ]; then
  certbot certonly --nginx -d cms-backoffice.onirtech.com --non-interactive --agree-tos
fi

install -m 0644 "$APP_DIR/deploy/nginx/cms.onirtech.com.conf" /etc/nginx/sites-available/cms.onirtech.com.conf
install -m 0644 "$APP_DIR/deploy/nginx/cms-backoffice.onirtech.com.conf" /etc/nginx/sites-available/cms-backoffice.onirtech.com.conf
ln -sfn /etc/nginx/sites-available/cms.onirtech.com.conf /etc/nginx/sites-enabled/cms.onirtech.com.conf
ln -sfn /etc/nginx/sites-available/cms-backoffice.onirtech.com.conf /etc/nginx/sites-enabled/cms-backoffice.onirtech.com.conf

if [ -f "$APP_ENV" ]; then
  if grep -q '^APP_URL=' "$APP_ENV"; then
    sed -i "s|^APP_URL=.*|APP_URL=$APP_URL|" "$APP_ENV"
  else
    printf '\nAPP_URL=%s\n' "$APP_URL" >> "$APP_ENV"
  fi
fi

nginx -t
systemctl reload nginx

if [ -x "$APP_DEPLOY" ]; then
  APP_URL="$APP_URL" "$APP_DEPLOY" "$APP_VERSION"
else
  echo "Application non déployée : $APP_DEPLOY introuvable. Déployer ONIR CMS $APP_VERSION puis vérifier $APP_URL." >&2
fi

echo "Landing  : https://cms.onirtech.com"
echo "Backoffice: https://cms-backoffice.onirtech.com"
