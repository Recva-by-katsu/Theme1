#!/usr/bin/env bash
# Create a timestamped backup of the theme-affected panel files.
set -Eeuo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./utils.sh
source "${DIR}/utils.sh"

TARGETS=(
  "resources/scripts"
  "resources/views/templates/wrapper.blade.php"
  "public/themes/${THEME_ID}"
  "webpack.config.js"
  "tailwind.config.js"
)

main() {
  is_pterodactyl || { log_err "Not a Pterodactyl panel at ${PANEL_DIR}"; exit 1; }
  ts="$(date +%Y%m%d-%H%M%S)"
  dest="${BACKUP_ROOT}/${ts}"
  mkdir -p "${dest}/files"
  : > "${dest}/manifest.txt"
  for t in "${TARGETS[@]}"; do
    if [[ -e "${PANEL_DIR}/${t}" ]]; then
      mkdir -p "${dest}/files/$(dirname "${t}")"
      cp -a "${PANEL_DIR}/${t}" "${dest}/files/${t}"
      echo "${t}" >> "${dest}/manifest.txt"
    fi
  done
  panel_version > "${dest}/panel-version.txt"
  ln -sfn "${dest}" "${BACKUP_ROOT}/latest"
  log_ok "Backup created at ${dest}"
}
main "$@"
