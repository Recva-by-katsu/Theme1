#!/usr/bin/env bash
# ArenaPanel Playful Premium — uninstaller. Standalone-safe:
#   bash <(curl -fsSL https://raw.githubusercontent.com/Recva-by-katsu/Theme1/master/uninstall.sh)
set -Eeuo pipefail

THEME_ID="${THEME_ID:-arena-playful}"
PANEL_DIR="${PANEL_DIR:-/var/www/pterodactyl}"
BACKUP_ROOT="${BACKUP_ROOT:-/var/backups/${THEME_ID}}"

WRAPPER="resources/views/templates/wrapper.blade.php"
THEME_PUBLIC_DIR="public/themes/${THEME_ID}"
MARKER=".arena-theme-installed"

c_reset='\033[0m'; c_red='\033[1;31m'; c_grn='\033[1;32m'; c_cya='\033[1;36m'
log_say(){ echo -e "${c_cya}➜${c_reset} $*"; }
log_ok(){ echo -e "${c_grn}✔${c_reset} $*"; }
log_err(){ echo -e "${c_red}✘${c_reset} $*" >&2; }

is_pterodactyl() { [[ -f "${PANEL_DIR}/artisan" && -f "${PANEL_DIR}/config/app.php" ]]; }

main() {
  is_pterodactyl || { log_err "Not a Pterodactyl panel at ${PANEL_DIR} (set PANEL_DIR if yours differs)."; exit 1; }
  [[ -w "${PANEL_DIR}/${WRAPPER}" ]] || { log_err "No write permission on the panel; run with sudo."; exit 1; }

  if ! grep -q "themes/${THEME_ID}/theme.css" "${PANEL_DIR}/${WRAPPER}" \
     && [[ ! -d "${PANEL_DIR}/${THEME_PUBLIC_DIR}" ]]; then
    log_say "Theme is not installed; nothing to do."
    exit 0
  fi

  # Prefer restoring the exact pre-install wrapper backup; fall back to tag removal.
  local backup="${BACKUP_DIR:-${BACKUP_ROOT}/latest}"
  if [[ -f "${backup}/wrapper.blade.php" ]]; then
    log_say "Restoring wrapper from ${backup}"
    cp -a "${backup}/wrapper.blade.php" "${PANEL_DIR}/${WRAPPER}"
  fi
  # Strip any remaining theme tag (covers missing or tagged backups).
  sed -i "\|themes/${THEME_ID}/theme.css|d" "${PANEL_DIR}/${WRAPPER}"

  rm -rf -- "${PANEL_DIR:?}/${THEME_PUBLIC_DIR}"
  rm -f "${PANEL_DIR}/${MARKER}"

  if command -v php >/dev/null 2>&1; then
    (cd "${PANEL_DIR}" && php artisan view:clear) || log_err "php artisan view:clear failed; run it manually."
  fi

  log_ok "Theme removed; the panel is back to its previous look."
}
main "$@"
