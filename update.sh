#!/usr/bin/env bash
# ============================================================================
#  ArenaPanel · Playful Premium Theme — Updater
#  Safely updates an existing installation without clobbering user config.
#  Usage: bash update.sh
# ============================================================================
set -Eeuo pipefail

THEME_ID="arena-playful"
PANEL_DIR="${PANEL_DIR:-/var/www/pterodactyl}"
BACKUP_ROOT="${BACKUP_ROOT:-/var/backups/${THEME_ID}}"
REPO_RAW="${THEME_REPO_RAW:-https://raw.githubusercontent.com/USERNAME/REPOSITORY/main}"

c_reset='\033[0m'; c_red='\033[1;31m'; c_grn='\033[1;32m'; c_yel='\033[1;33m'; c_cya='\033[1;36m'
say(){ echo -e "${c_cya}➜${c_reset} $*"; }; ok(){ echo -e "${c_grn}✔${c_reset} $*"; }
warn(){ echo -e "${c_yel}⚠${c_reset} $*"; }; err(){ echo -e "${c_red}✘${c_reset} $*" >&2; }

main() {
  say "Updating ${THEME_ID} theme"

  if [[ ! -f "${PANEL_DIR}/.arena-theme-installed" ]]; then
    warn "Theme not installed yet — running fresh install instead."
    if [[ -f "$(dirname "${BASH_SOURCE[0]:-.}")/install.sh" ]]; then
      exec bash "$(dirname "${BASH_SOURCE[0]:-.}")/install.sh"
    else
      exec bash -c "curl -fsSL ${REPO_RAW}/install.sh | bash"
    fi
  fi

  # 1. Snapshot current state (reuses installer's backup convention)
  local ts; ts="$(date +%Y%m%d-%H%M%S)"
  local snap="${BACKUP_ROOT}/pre-update-${ts}"
  mkdir -p "${snap}"
  [[ -d "${PANEL_DIR}/resources/scripts/arena-theme" ]] && \
    cp -a "${PANEL_DIR}/resources/scripts/arena-theme" "${snap}/" || true
  # Preserve any user overrides so we never overwrite them
  if [[ -f "${PANEL_DIR}/resources/scripts/arena-theme/user.config.ts" ]]; then
    cp -a "${PANEL_DIR}/resources/scripts/arena-theme/user.config.ts" "${snap}/user.config.ts"
    ok "Preserved user configuration."
  fi
  ok "Pre-update snapshot: ${snap}"

  # 2. Pull latest sources
  local src; src="$(cd "$(dirname "${BASH_SOURCE[0]:-.}")" && pwd)"
  if [[ -d "${src}/src" ]]; then
    rsync -a --delete --exclude 'user.config.ts' "${src}/src/." "${PANEL_DIR}/resources/scripts/arena-theme/" 2>/dev/null \
      || cp -a "${src}/src/." "${PANEL_DIR}/resources/scripts/arena-theme/"
    ok "Theme sources updated."
  else
    warn "Local sources missing; pull the repository and re-run."
  fi
  # Restore preserved user config
  [[ -f "${snap}/user.config.ts" ]] && cp -a "${snap}/user.config.ts" "${PANEL_DIR}/resources/scripts/arena-theme/user.config.ts"

  # 3. Rebuild + clear cache
  say "Rebuilding assets"
  pushd "${PANEL_DIR}" >/dev/null
  ( command -v yarn >/dev/null 2>&1 && yarn build:production ) \
    || ( command -v npm >/dev/null 2>&1 && npm run build:production ) || true
  php artisan view:clear >/dev/null 2>&1 || true
  php artisan cache:clear >/dev/null 2>&1 || true
  php artisan config:cache >/dev/null 2>&1 || true
  popd >/dev/null

  echo "${THEME_ID} updated $(date -u +%FT%TZ)" > "${PANEL_DIR}/.arena-theme-installed"
  ok "Update complete. 🎉"
}

main "$@"
