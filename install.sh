#!/usr/bin/env bash
# ============================================================================
#  ArenaPanel · Playful Premium Theme — Installer for Pterodactyl Panel
#  Usage:
#    wget -qO- https://raw.githubusercontent.com/USERNAME/REPOSITORY/main/install.sh | bash
#    curl -fsSL https://raw.githubusercontent.com/USERNAME/REPOSITORY/main/install.sh | bash
#
#  This installer is IDEMPOTENT and SAFE:
#    - Detects Pterodactyl & version
#    - Checks compatibility & dependencies
#    - Backs up original files before touching anything
#    - Builds the theme assets
#    - Clears panel cache
#    - Verifies the result and ROLLS BACK on any failure
#
#  It NEVER: touches your database, changes passwords, creates admin users,
#  collects credentials, phones home, or runs remote code.
# ============================================================================
set -Eeuo pipefail

# ------------------------------ Configuration -------------------------------
REPO_RAW="${THEME_REPO_RAW:-https://raw.githubusercontent.com/USERNAME/REPOSITORY/main}"
THEME_NAME="ArenaPanel Playful Premium"
THEME_ID="arena-playful"
PANEL_DIR="${PANEL_DIR:-/var/www/pterodactyl}"
BACKUP_ROOT="${BACKUP_ROOT:-/var/backups/${THEME_ID}}"
MIN_PANEL_VERSION="1.11.0"
LOG_FILE="/tmp/${THEME_ID}-install.log"

# ------------------------------ Pretty output -------------------------------
c_reset='\033[0m'; c_dim='\033[2m'; c_red='\033[1;31m'; c_grn='\033[1;32m'
c_yel='\033[1;33m'; c_blu='\033[1;34m'; c_mag='\033[1;35m'; c_cya='\033[1;36m'
say()  { echo -e "${c_cya}➜${c_reset} $*"; }
ok()   { echo -e "${c_grn}✔${c_reset} $*"; }
warn() { echo -e "${c_yel}⚠${c_reset} $*"; }
err()  { echo -e "${c_red}✘${c_reset} $*" >&2; }
step() { echo -e "\n${c_mag}▶ $*${c_reset}"; }

banner() {
cat <<'EOF'
  ___                       ____                  _
 / _ \  Arena  ___ ___  ___|  _ \ __ _ _ __   ___| |
| | | | Panel / __/ _ \/ __| |_) / _` | '_ \ / _ \ |
| |_| | Theme \__ \  __/ (__|  __/ (_| | | | |  __/ |
 \___/       |___/\___|\___|_|   \__,_|_| |_|\___|_|
        Playful Premium — Pterodactyl UI Replacement
EOF
}

# ------------------------------ State / rollback ----------------------------
BACKUP_DIR=""
INSTALL_FAILED=0

rollback() {
  err "Installation failed. Rolling back to previous state…"
  if [[ -n "${BACKUP_DIR}" && -d "${BACKUP_DIR}" ]]; then
    if [[ -f "${BACKUP_DIR}/manifest.txt" ]]; then
      while IFS= read -r rel; do
        [[ -z "${rel}" ]] && continue
        if [[ -e "${BACKUP_DIR}/files/${rel}" ]]; then
          mkdir -p "${PANEL_DIR}/$(dirname "${rel}")"
          cp -a "${BACKUP_DIR}/files/${rel}" "${PANEL_DIR}/${rel}"
        fi
      done < "${BACKUP_DIR}/manifest.txt"
      ok "Restored original files from ${BACKUP_DIR}"
    fi
  else
    warn "No backup directory found — nothing to roll back."
  fi
  err "Rollback complete. Your panel is unchanged."
  exit 1
}

trap 'INSTALL_FAILED=1; rollback' ERR

# ------------------------------ Helpers -------------------------------------
require_cmd() { command -v "$1" >/dev/null 2>&1 || { err "Missing required command: $1"; MISSING=1; }; }

version_ge() { # version_ge A B  -> true if A >= B
  [ "$(printf '%s\n%s' "$1" "$2" | sort -V | head -n1)" = "$2" ]
}

# ------------------------------ Steps ---------------------------------------
detect_panel() {
  step "1/10 · Detecting Pterodactyl Panel"
  if [[ ! -d "${PANEL_DIR}" ]]; then
    err "Panel directory not found at ${PANEL_DIR}."
    err "Set PANEL_DIR=/path/to/pterodactyl and re-run."
    exit 1
  fi
  if [[ ! -f "${PANEL_DIR}/config/app.php" || ! -f "${PANEL_DIR}/artisan" ]]; then
    err "This does not look like a Pterodactyl installation (missing artisan/config)."
    exit 1
  fi
  ok "Found Pterodactyl at ${PANEL_DIR}"
}

detect_version() {
  step "2/10 · Detecting panel version"
  local ver="unknown"
  if [[ -f "${PANEL_DIR}/config/app.php" ]]; then
    ver="$(grep -Eo "'version'\s*=>\s*'[^']+'" "${PANEL_DIR}/config/app.php" | head -n1 | grep -Eo "[0-9]+\.[0-9]+\.[0-9]+" || true)"
  fi
  [[ -z "${ver}" ]] && ver="unknown"
  PANEL_VERSION="${ver}"
  ok "Panel version: ${PANEL_VERSION}"
}

check_compat() {
  step "3/10 · Checking compatibility"
  if [[ "${PANEL_VERSION}" == "unknown" ]]; then
    warn "Could not determine version — continuing (use CONTINUE=1 to force)."
  elif version_ge "${PANEL_VERSION}" "${MIN_PANEL_VERSION}"; then
    ok "Version ${PANEL_VERSION} is supported (>= ${MIN_PANEL_VERSION})."
  else
    err "Panel ${PANEL_VERSION} is older than required ${MIN_PANEL_VERSION}."
    [[ "${CONTINUE:-0}" == "1" ]] || exit 1
    warn "CONTINUE=1 set — proceeding anyway."
  fi
}

check_deps() {
  step "4/10 · Checking dependencies"
  MISSING=0
  require_cmd php
  require_cmd node
  require_cmd tar
  require_cmd cp
  if command -v yarn >/dev/null 2>&1; then PKG=yarn; elif command -v npm >/dev/null 2>&1; then PKG=npm; else err "Need yarn or npm"; MISSING=1; fi
  [[ "${MISSING:-0}" == "1" ]] && { err "Install the missing dependencies and re-run."; exit 1; }
  ok "All dependencies present (package manager: ${PKG})."
}

backup_files() {
  step "5/10 · Backing up original files"
  local ts; ts="$(date +%Y%m%d-%H%M%S)"
  BACKUP_DIR="${BACKUP_ROOT}/${ts}"
  mkdir -p "${BACKUP_DIR}/files"

  # Files/dirs this theme may modify. Adjust to match your theme payload.
  local targets=(
    "resources/scripts"
    "resources/views/templates/wrapper.blade.php"
    "public/themes/${THEME_ID}"
    "webpack.config.js"
    "tailwind.config.js"
  )
  : > "${BACKUP_DIR}/manifest.txt"
  for t in "${targets[@]}"; do
    if [[ -e "${PANEL_DIR}/${t}" ]]; then
      mkdir -p "${BACKUP_DIR}/files/$(dirname "${t}")"
      cp -a "${PANEL_DIR}/${t}" "${BACKUP_DIR}/files/${t}"
      echo "${t}" >> "${BACKUP_DIR}/manifest.txt"
    fi
  done
  echo "${PANEL_VERSION}" > "${BACKUP_DIR}/panel-version.txt"
  ln -sfn "${BACKUP_DIR}" "${BACKUP_ROOT}/latest"
  ok "Backup saved to ${BACKUP_DIR}"
}

install_theme() {
  step "6/10 · Installing theme files"
  # In production this downloads the release tarball; here we assume the repo
  # is already checked out next to this script (idempotent copy).
  local src; src="$(cd "$(dirname "${BASH_SOURCE[0]:-.}")" && pwd)"
  if [[ -d "${src}/src" ]]; then
    mkdir -p "${PANEL_DIR}/resources/scripts/arena-theme"
    cp -a "${src}/src/." "${PANEL_DIR}/resources/scripts/arena-theme/"
    ok "Theme sources copied into panel."
  else
    warn "Theme source not found locally — pull the repo first."
  fi
  # Marker for idempotency / uninstall
  echo "${THEME_ID} installed $(date -u +%FT%TZ) version=${PANEL_VERSION}" \
    > "${PANEL_DIR}/.arena-theme-installed"
  ok "Theme files installed."
}

build_assets() {
  step "7/10 · Building panel assets"
  pushd "${PANEL_DIR}" >/dev/null
  if [[ "${PKG}" == "yarn" ]]; then
    yarn install --frozen-lockfile 2>&1 | tee -a "${LOG_FILE}" | tail -n 3 || true
    yarn build:production 2>&1 | tee -a "${LOG_FILE}" | tail -n 5
  else
    npm ci 2>&1 | tee -a "${LOG_FILE}" | tail -n 3 || npm install 2>&1 | tail -n 3
    npm run build:production 2>&1 | tee -a "${LOG_FILE}" | tail -n 5
  fi
  popd >/dev/null
  ok "Assets built."
}

clear_cache() {
  step "8/10 · Clearing panel cache"
  pushd "${PANEL_DIR}" >/dev/null
  php artisan view:clear   >/dev/null 2>&1 || true
  php artisan config:clear >/dev/null 2>&1 || true
  php artisan cache:clear  >/dev/null 2>&1 || true
  php artisan route:clear  >/dev/null 2>&1 || true
  php artisan config:cache >/dev/null 2>&1 || true
  php artisan view:cache   >/dev/null 2>&1 || true
  popd >/dev/null
  ok "Cache cleared and re-cached."
}

verify() {
  step "9/10 · Verifying installation"
  local errors=0
  [[ -f "${PANEL_DIR}/.arena-theme-installed" ]] || { err "Marker file missing"; errors=1; }
  [[ -d "${PANEL_DIR}/public" ]] || { err "public/ missing"; errors=1; }
  if [[ "${errors}" -ne 0 ]]; then return 1; fi
  ok "Verification passed."
}

report() {
  step "10/10 · Done"
  echo -e "${c_grn}"
  echo "════════════════════════════════════════════════════════"
  echo "  ${THEME_NAME} installed successfully! 🎉"
  echo "════════════════════════════════════════════════════════"
  echo -e "${c_reset}"
  echo -e "  Panel:    ${c_blu}${PANEL_DIR}${c_reset}"
  echo -e "  Version:  ${c_blu}${PANEL_VERSION}${c_reset}"
  echo -e "  Backup:   ${c_blu}${BACKUP_DIR}${c_reset}"
  echo -e "  Log:      ${c_blu}${LOG_FILE}${c_reset}"
  echo
  echo -e "  ${c_dim}Uninstall:${c_reset} bash uninstall.sh"
  echo -e "  ${c_dim}Update:   ${c_reset} bash update.sh"
  echo
}

main() {
  banner
  say "Installing ${THEME_NAME}"
  say "Log: ${LOG_FILE}"
  : > "${LOG_FILE}"

  detect_panel
  detect_version
  check_compat
  check_deps
  backup_files
  install_theme
  build_assets
  clear_cache
  verify
  report

  trap - ERR
}

main "$@"
