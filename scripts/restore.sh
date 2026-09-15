#!/usr/bin/env bash
# Restore panel files from a backup created by backup.sh or install.sh.
# Usage: bash restore.sh [/path/to/backup]
set -Eeuo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./utils.sh
source "${DIR}/utils.sh"

main() {
  local backup="${1:-${BACKUP_ROOT}/latest}"
  is_pterodactyl || { log_err "Not a Pterodactyl panel at ${PANEL_DIR}"; exit 1; }
  restore_backup "${backup}"
  clear_panel_cache
  log_ok "Restore complete from ${backup}"
}
main "$@"
