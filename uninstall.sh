#!/usr/bin/env bash
# ============================================================================
#  ArenaPanel · Playful Premium Theme — Uninstaller
#  Restores Pterodactyl to the state captured in the most recent backup.
#  Usage: bash uninstall.sh   (or: BACKUP_DIR=/path/to/backup bash uninstall.sh)
# ============================================================================
set -Eeuo pipefail

THEME_ID="arena-playful"
PANEL_DIR="${PANEL_DIR:-/var/www/pterodactyl}"
BACKUP_ROOT="${BACKUP_ROOT:-/var/backups/${THEME_ID}}"

c_reset='\033[0m'; c_red='\033[1;31m'; c_grn='\033[1;32m'; c_yel='\033[1;33m'; c_cya='\033[1;36m'
say()  { echo -e "${c_cya}➜${c_reset} $*"; }
ok()   { echo -e "${c_grn}✔${c_reset} $*"; }
warn() { echo -e "${c_yel}⚠${c_reset} $*"; }
err()  { echo -e "${c_red}✘${c_reset} $*" >&2; }

restore_from_backup() {
  local dir="$1"
  [[ -f "${dir}/manifest.txt" ]] || { err "No manifest in ${dir}"; return 1; }
  while IFS= read -r rel; do
    [[ -z "${rel}" ]] && continue
    if [[ -e "${dir}/files/${rel}" ]]; then
      mkdir -p "${PANEL_DIR}/$(dirname "${rel}")"
      cp -a "${dir}/files/${rel}" "${PANEL_DIR}/${rel}"
      say "restored ${rel}"
    fi
  done < "${dir}/manifest.txt"
}

main() {
  say "Uninstalling ${THEME_ID} theme"

  if [[ ! -f "${PANEL_DIR}/.arena-theme-installed" ]]; then
    warn "Theme marker not found — it may already be uninstalled."
  fi

  local dir="${BACKUP_DIR:-${BACKUP_ROOT}/latest}"
  if [[ -d "${dir}" ]]; then
    say "Restoring original files from ${dir}"
    restore_from_backup "${dir}"
    ok "Original files restored."
  else
    warn "No backup found at ${dir}; removing theme files only."
  fi

  rm -rf "${PANEL_DIR}/resources/scripts/arena-theme"
  rm -f  "${PANEL_DIR}/.arena-theme-installed"

  say "Rebuilding assets & clearing cache"
  pushd "${PANEL_DIR}" >/dev/null
  ( command -v yarn >/dev/null 2>&1 && yarn build:production ) \
    || ( command -v npm >/dev/null 2>&1 && npm run build:production ) || true
  php artisan view:clear   >/dev/null 2>&1 || true
  php artisan config:clear >/dev/null 2>&1 || true
  php artisan cache:clear  >/dev/null 2>&1 || true
  popd >/dev/null

  ok "Uninstall complete. Pterodactyl restored to its previous state."
}

main "$@"
