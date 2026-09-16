#!/usr/bin/env bash
# ArenaPanel uninstaller. Restores an exact installer backup.
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./scripts/utils.sh
source "${ROOT}/scripts/utils.sh"

main() {
  is_pterodactyl || { log_err "Not a Pterodactyl panel at ${PANEL_DIR}"; exit 1; }
  local backup="${BACKUP_DIR:-${BACKUP_ROOT}/latest}"
  [[ -d "${backup}" ]] || { log_err "No backup found at ${backup}; refusing to delete panel files."; exit 1; }

  log_say "Restoring panel files from ${backup}"
  restore_backup "${backup}"
  build_panel_assets
  clear_panel_cache
  log_ok "Uninstall complete; panel files were restored from the selected backup."
}
main "$@"
