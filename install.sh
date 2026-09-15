#!/usr/bin/env bash
# ArenaPanel deployment installer. Requires a Pterodactyl-compatible payload.
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./scripts/utils.sh
source "${ROOT}/scripts/utils.sh"

THEME_NAME="ArenaPanel Playful Premium"
MIN_PANEL_VERSION="1.10.0"
THEME_PAYLOAD_DIR="${THEME_PAYLOAD_DIR:-${ROOT}/pterodactyl}"
BACKUP_DIR=""
ROLLING_BACK=0

rollback() {
  local exit_code=$?
  (( ROLLING_BACK )) && exit "${exit_code}"
  ROLLING_BACK=1
  trap - ERR
  if [[ -n "${BACKUP_DIR}" && -d "${BACKUP_DIR}" ]]; then
    log_err "Installation failed; restoring ${BACKUP_DIR}."
    restore_backup "${BACKUP_DIR}" || log_err "Automatic restore failed; restore manually from ${BACKUP_DIR}."
  fi
  exit "${exit_code}"
}
trap rollback ERR

require_command() { command -v "$1" >/dev/null 2>&1 || { log_err "Missing required command: $1"; return 1; }; }

validate_payload() {
  # A payload mirrors the Pterodactyl project root and must replace its frontend entry point.
  [[ -d "${THEME_PAYLOAD_DIR}" ]] || { log_err "Deployment payload not found: ${THEME_PAYLOAD_DIR}"; return 1; }
  [[ -f "${THEME_PAYLOAD_DIR}/resources/scripts/index.tsx" ]] || {
    log_err "Payload must include resources/scripts/index.tsx; the preview src/ directory is not deployable to Pterodactyl."; return 1;
  }
}

main() {
  log_say "Installing ${THEME_NAME}"
  is_pterodactyl || { log_err "Not a Pterodactyl panel at ${PANEL_DIR}"; exit 1; }
  validate_payload
  require_command php; require_command node; require_command tar
  command -v yarn >/dev/null 2>&1 || command -v npm >/dev/null 2>&1 || { log_err "Need yarn or npm"; exit 1; }

  local version; version="$(panel_version)"
  if [[ "${version}" == "unknown" ]]; then
    [[ "${CONTINUE:-0}" == "1" ]] || { log_err "Cannot determine panel version; rerun with CONTINUE=1 only after verifying compatibility."; exit 1; }
  elif ! version_ge "${version}" "${MIN_PANEL_VERSION}"; then
    [[ "${CONTINUE:-0}" == "1" ]] || { log_err "Pterodactyl ${version} is below supported ${MIN_PANEL_VERSION}."; exit 1; }
  fi

  local stamp; stamp="$(date +%Y%m%d-%H%M%S)"
  BACKUP_DIR="${BACKUP_ROOT}/${stamp}"
  create_backup "${BACKUP_DIR}"
  ln -sfn "${BACKUP_DIR}" "${BACKUP_ROOT}/latest"
  log_ok "Backup created: ${BACKUP_DIR}"

  cp -a "${THEME_PAYLOAD_DIR}/." "${PANEL_DIR}/"
  printf '%s installed %s version=%s\n' "${THEME_ID}" "$(date -u +%FT%TZ)" "${version}" > "${PANEL_DIR}/.arena-theme-installed"
  build_panel_assets
  clear_panel_cache
  trap - ERR
  log_ok "Theme installed successfully."
}
main "$@"
