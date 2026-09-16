#!/usr/bin/env bash
# ArenaPanel Playful Premium — CSS overlay theme installer for Pterodactyl 1.x.
# Works standalone via:
#   bash <(curl -fsSL https://raw.githubusercontent.com/Recva-by-katsu/Theme1/master/install.sh)
set -Eeuo pipefail

THEME_ID="${THEME_ID:-arena-playful}"
THEME_NAME="ArenaPanel Playful Premium"
PANEL_DIR="${PANEL_DIR:-/var/www/pterodactyl}"
BACKUP_ROOT="${BACKUP_ROOT:-/var/backups/${THEME_ID}}"
REPO_RAW="${REPO_RAW:-https://raw.githubusercontent.com/Recva-by-katsu/Theme1/master}"
MIN_PANEL_VERSION="1.10.0"

WRAPPER="resources/views/templates/wrapper.blade.php"
THEME_PUBLIC_DIR="public/themes/${THEME_ID}"
MARKER=".arena-theme-installed"

c_reset='\033[0m'; c_red='\033[1;31m'; c_grn='\033[1;32m'; c_cya='\033[1;36m'
log_say(){ echo -e "${c_cya}➜${c_reset} $*"; }
log_ok(){ echo -e "${c_grn}✔${c_reset} $*"; }
log_err(){ echo -e "${c_red}✘${c_reset} $*" >&2; }

BACKUP_DIR=""
ROLLING_BACK=0
rollback() {
  local exit_code=$?
  (( ROLLING_BACK )) && exit "${exit_code}"
  ROLLING_BACK=1; trap - ERR
  if [[ -n "${BACKUP_DIR}" && -f "${BACKUP_DIR}/wrapper.blade.php" ]]; then
    log_err "Installation failed; restoring wrapper from ${BACKUP_DIR}."
    cp -a "${BACKUP_DIR}/wrapper.blade.php" "${PANEL_DIR}/${WRAPPER}" || true
    rm -rf -- "${PANEL_DIR:?}/${THEME_PUBLIC_DIR}" "${PANEL_DIR}/${MARKER}" || true
  fi
  exit "${exit_code}"
}
trap rollback ERR

is_pterodactyl() { [[ -f "${PANEL_DIR}/artisan" && -f "${PANEL_DIR}/config/app.php" ]]; }

panel_version() {
  grep -Eo "'version'\s*=>\s*'[^']+'" "${PANEL_DIR}/config/app.php" 2>/dev/null \
    | head -n1 | grep -Eo "[0-9]+\.[0-9]+\.[0-9]+" || echo "unknown"
}
version_ge() { [[ "$(printf '%s\n%s' "$1" "$2" | sort -V | head -n1)" == "$2" ]]; }

fetch_theme_css() {
  # Prefer a local payload when running from a repo clone; otherwise download.
  local script_dir=""
  if [[ -n "${BASH_SOURCE[0]:-}" && -f "${BASH_SOURCE[0]}" ]]; then
    script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  fi
  if [[ -n "${script_dir}" && -f "${script_dir}/pterodactyl/theme.css" ]]; then
    cp "${script_dir}/pterodactyl/theme.css" "$1"
  else
    command -v curl >/dev/null 2>&1 || { log_err "curl is required to download the theme."; return 1; }
    curl -fsSL "${REPO_RAW}/pterodactyl/theme.css" -o "$1"
  fi
  # Sanity-check the payload so a 404 page or truncated download never gets installed.
  grep -q "arena-playful" "$1" || { log_err "Downloaded theme.css failed validation."; return 1; }
}

main() {
  log_say "Installing ${THEME_NAME}"

  is_pterodactyl || { log_err "Not a Pterodactyl panel at ${PANEL_DIR} (set PANEL_DIR if yours differs)."; exit 1; }
  [[ -f "${PANEL_DIR}/${WRAPPER}" ]] || { log_err "Missing ${WRAPPER}; unsupported panel layout."; exit 1; }
  [[ -w "${PANEL_DIR}/${WRAPPER}" ]] || { log_err "No write permission on the panel; run with sudo."; exit 1; }

  local version; version="$(panel_version)"
  if [[ "${version}" == "unknown" ]]; then
    [[ "${CONTINUE:-0}" == "1" ]] || { log_err "Cannot determine panel version; rerun with CONTINUE=1 to force."; exit 1; }
    log_say "Panel version unknown; continuing because CONTINUE=1."
  elif ! version_ge "${version}" "${MIN_PANEL_VERSION}"; then
    [[ "${CONTINUE:-0}" == "1" ]] || { log_err "Pterodactyl ${version} is below supported ${MIN_PANEL_VERSION}; rerun with CONTINUE=1 to force."; exit 1; }
  else
    log_ok "Detected Pterodactyl ${version}"
  fi

  local tmp_css; tmp_css="$(mktemp)"
  fetch_theme_css "${tmp_css}"
  log_ok "Theme payload ready"

  local stamp; stamp="$(date +%Y%m%d-%H%M%S)"
  # Only snapshot a pristine wrapper; a re-install must not overwrite the
  # original backup with an already-tagged copy.
  if ! grep -q "themes/${THEME_ID}/theme.css" "${PANEL_DIR}/${WRAPPER}"; then
    BACKUP_DIR="${BACKUP_ROOT}/${stamp}"
    mkdir -p "${BACKUP_DIR}"
    cp -a "${PANEL_DIR}/${WRAPPER}" "${BACKUP_DIR}/wrapper.blade.php"
    ln -sfn "${BACKUP_DIR}" "${BACKUP_ROOT}/latest"
    log_ok "Backup created: ${BACKUP_DIR}"
  else
    log_say "Theme already present; keeping the existing pristine backup."
  fi

  mkdir -p "${PANEL_DIR}/${THEME_PUBLIC_DIR}"
  install -m 0644 "${tmp_css}" "${PANEL_DIR}/${THEME_PUBLIC_DIR}/theme.css"
  rm -f "${tmp_css}"

  # Idempotent injection: refresh the tag if present, otherwise add before </head>.
  local tag="<link rel=\"stylesheet\" href=\"/themes/${THEME_ID}/theme.css?v=${stamp}\">"
  if grep -q "themes/${THEME_ID}/theme.css" "${PANEL_DIR}/${WRAPPER}"; then
    sed -i "s|<link rel=\"stylesheet\" href=\"/themes/${THEME_ID}/theme.css[^\"]*\">|${tag}|" "${PANEL_DIR}/${WRAPPER}"
    log_ok "Refreshed existing theme tag in wrapper.blade.php"
  else
    sed -i "s|</head>|    ${tag}\n    </head>|" "${PANEL_DIR}/${WRAPPER}"
    grep -q "themes/${THEME_ID}/theme.css" "${PANEL_DIR}/${WRAPPER}" || { log_err "Failed to inject theme tag."; exit 1; }
    log_ok "Injected theme tag into wrapper.blade.php"
  fi

  printf '%s installed %s version=%s\n' "${THEME_ID}" "$(date -u +%FT%TZ)" "${version}" > "${PANEL_DIR}/${MARKER}"

  if command -v php >/dev/null 2>&1; then
    (cd "${PANEL_DIR}" && php artisan view:clear) || log_err "php artisan view:clear failed; run it manually."
  else
    log_say "php not found; run 'php artisan view:clear' in ${PANEL_DIR} manually."
  fi

  trap - ERR
  log_ok "${THEME_NAME} installed. Refresh your panel (Ctrl+Shift+R) to see it."
  log_say "Uninstall anytime: bash <(curl -fsSL ${REPO_RAW}/uninstall.sh)"
}
main "$@"
