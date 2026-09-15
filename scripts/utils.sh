#!/usr/bin/env bash
# Shared helpers for ArenaPanel theme scripts.
set -Eeuo pipefail

THEME_ID="${THEME_ID:-arena-playful}"
PANEL_DIR="${PANEL_DIR:-/var/www/pterodactyl}"
BACKUP_ROOT="${BACKUP_ROOT:-/var/backups/${THEME_ID}}"

c_reset='\033[0m'; c_red='\033[1;31m'; c_grn='\033[1;32m'; c_yel='\033[1;33m'; c_cya='\033[1;36m'
log_say(){ echo -e "${c_cya}➜${c_reset} $*"; }
log_ok(){  echo -e "${c_grn}✔${c_reset} $*"; }
log_warn(){ echo -e "${c_yel}⚠${c_reset} $*"; }
log_err(){ echo -e "${c_red}✘${c_reset} $*" >&2; }

is_pterodactyl() { [[ -f "${PANEL_DIR}/artisan" && -f "${PANEL_DIR}/config/app.php" ]]; }

panel_version() {
  grep -Eo "'version'\s*=>\s*'[^']+'" "${PANEL_DIR}/config/app.php" 2>/dev/null \
    | head -n1 | grep -Eo "[0-9]+\.[0-9]+\.[0-9]+" || echo "unknown"
}

version_ge() { [ "$(printf '%s\n%s' "$1" "$2" | sort -V | head -n1)" = "$2" ]; }

clear_panel_cache() {
  pushd "${PANEL_DIR}" >/dev/null
  php artisan view:clear   >/dev/null 2>&1 || true
  php artisan config:clear >/dev/null 2>&1 || true
  php artisan cache:clear  >/dev/null 2>&1 || true
  php artisan route:clear  >/dev/null 2>&1 || true
  popd >/dev/null
}
