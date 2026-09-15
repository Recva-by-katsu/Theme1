#!/usr/bin/env bash
# Create an exact, timestamped backup of theme-affected panel paths.
set -Eeuo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./utils.sh
source "${DIR}/utils.sh"

main() {
  is_pterodactyl || { log_err "Not a Pterodactyl panel at ${PANEL_DIR}"; exit 1; }
  local stamp dest; stamp="$(date +%Y%m%d-%H%M%S)"; dest="${BACKUP_ROOT}/${stamp}"
  create_backup "${dest}"
  ln -sfn "${dest}" "${BACKUP_ROOT}/latest"
  log_ok "Backup created at ${dest}"
}
main "$@"
