#!/usr/bin/env bash
# Restore panel files from a backup created by backup.sh / install.sh.
# Usage: bash restore.sh [/path/to/backup]   (defaults to latest)
set -Eeuo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./utils.sh
source "${DIR}/utils.sh"

main() {
  local src="${1:-${BACKUP_ROOT}/latest}"
  [[ -d "${src}" ]] || { log_err "Backup not found: ${src}"; exit 1; }
  [[ -f "${src}/manifest.txt" ]] || { log_err "No manifest in ${src}"; exit 1; }

  while IFS= read -r rel; do
    [[ -z "${rel}" ]] && continue
    if [[ -e "${src}/files/${rel}" ]]; then
      mkdir -p "${PANEL_DIR}/$(dirname "${rel}")"
      cp -a "${src}/files/${rel}" "${PANEL_DIR}/${rel}"
      log_say "restored ${rel}"
    fi
  done < "${src}/manifest.txt"

  clear_panel_cache
  log_ok "Restore complete from ${src}"
}
main "$@"
