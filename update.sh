#!/usr/bin/env bash
# ArenaPanel updater. Requires a Pterodactyl-compatible payload.
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./scripts/utils.sh
source "${ROOT}/scripts/utils.sh"

THEME_PAYLOAD_DIR="${THEME_PAYLOAD_DIR:-${ROOT}/pterodactyl}"
BACKUP_DIR=""
ROLLING_BACK=0

rollback() {
  local exit_code=$?
  (( ROLLING_BACK )) && exit "${exit_code}"
  ROLLING_BACK=1; trap - ERR
  if [[ -n "${BACKUP_DIR}" && -d "${BACKUP_DIR}" ]]; then
    log_err "Update failed; restoring ${BACKUP_DIR}."
    restore_backup "${BACKUP_DIR}" || log_err "Automatic restore failed; restore manually from ${BACKUP_DIR}."
  fi
  exit "${exit_code}"
}
trap rollback ERR

main() {
  is_pterodactyl || { log_err "Not a Pterodactyl panel at ${PANEL_DIR}"; exit 1; }
  [[ -f "${PANEL_DIR}/.arena-theme-installed" ]] || { log_err "Theme marker not found; use install.sh."; exit 1; }
  [[ -f "${THEME_PAYLOAD_DIR}/resources/scripts/index.tsx" ]] || {
    log_err "Deployment payload not found or incomplete: ${THEME_PAYLOAD_DIR}"; exit 1;
  }

  local stamp; stamp="$(date +%Y%m%d-%H%M%S)"
  BACKUP_DIR="${BACKUP_ROOT}/pre-update-${stamp}"
  create_backup "${BACKUP_DIR}"
  log_ok "Pre-update backup created: ${BACKUP_DIR}"

  cp -a "${THEME_PAYLOAD_DIR}/." "${PANEL_DIR}/"
  printf '%s updated %s\n' "${THEME_ID}" "$(date -u +%FT%TZ)" > "${PANEL_DIR}/.arena-theme-installed"
  build_panel_assets
  clear_panel_cache
  trap - ERR
  log_ok "Update complete."
}
main "$@"
