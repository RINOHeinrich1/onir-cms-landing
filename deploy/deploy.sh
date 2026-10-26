#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/RINOHeinrich1/onir-cms-landing.git}"
APP_DIR="${APP_DIR:-/opt/onir-cms-landing}"
WEB_ROOT="${WEB_ROOT:-/var/www/onir-cms-landing}"
BRANCH="${BRANCH:-main}"

if [ "$(id -u)" -ne 0 ]; then
  echo "Ce script doit être exécuté en root (sudo)." >&2
  exit 1
fi

if [ ! -d "$APP_DIR/.git" ]; then
  git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
else
  git -C "$APP_DIR" fetch origin "$BRANCH"
  git -C "$APP_DIR" checkout "$BRANCH"
  git -C "$APP_DIR" reset --hard "origin/$BRANCH"
fi

install -d -m 0755 "$WEB_ROOT"
rsync -a --delete --exclude ".git" --exclude "deploy" "$APP_DIR/" "$WEB_ROOT/"
chown -R www-data:www-data "$WEB_ROOT"

nginx -t
systemctl reload nginx
echo "Landing ONIR CMS déployée dans $WEB_ROOT"
