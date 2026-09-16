#!/usr/bin/env bash
# ArenaPanel Playful Premium — updater. Standalone-safe:
#   bash <(curl -fsSL https://raw.githubusercontent.com/Recva-by-katsu/Theme1/master/update.sh)
# Updating is the same idempotent operation as installing: it refreshes the
# CSS payload and the cache-busted tag, keeping a fresh wrapper backup.
set -Eeuo pipefail

REPO_RAW="${REPO_RAW:-https://raw.githubusercontent.com/Recva-by-katsu/Theme1/master}"

PANEL_DIR="${PANEL_DIR:-/var/www/pterodactyl}"
MARKER=".arena-theme-installed"

if [[ ! -f "${PANEL_DIR}/${MARKER}" ]]; then
  echo "Theme marker not found in ${PANEL_DIR}; run install.sh first." >&2
  exit 1
fi

script_dir=""
if [[ -n "${BASH_SOURCE[0]:-}" && -f "${BASH_SOURCE[0]}" ]]; then
  script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
fi

if [[ -n "${script_dir}" && -f "${script_dir}/install.sh" ]]; then
  exec bash "${script_dir}/install.sh"
else
  command -v curl >/dev/null 2>&1 || { echo "curl is required." >&2; exit 1; }
  exec bash <(curl -fsSL "${REPO_RAW}/install.sh")
fi
