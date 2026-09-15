#!/usr/bin/env bash
# Shared helpers for ArenaPanel deployment scripts.
set -Eeuo pipefail

THEME_ID="${THEME_ID:-arena-playful}"
PANEL_DIR="${PANEL_DIR:-/var/www/pterodactyl}"
BACKUP_ROOT="${BACKUP_ROOT:-/var/backups/${THEME_ID}}"

c_reset='\033[0m'; c_red='\033[1;31m'; c_grn='\033[1;32m'; c_yel='\033[1;33m'; c_cya='\033[1;36m'
log_say(){ echo -e "${c_cya}➜${c_reset} $*"; }
log_ok(){ echo -e "${c_grn}✔${c_reset} $*"; }
log_warn(){ echo -e "${c_yel}⚠${c_reset} $*"; }
log_err(){ echo -e "${c_red}✘${c_reset} $*" >&2; }

THEME_TARGETS=(
  "resources/scripts"
  "resources/views/templates/wrapper.blade.php"
  "public/themes/${THEME_ID}"
  "webpack.config.js"
  "tailwind.config.js"
  ".arena-theme-installed"
)

is_pterodactyl() { [[ -f "${PANEL_DIR}/artisan" && -f "${PANEL_DIR}/config/app.php" ]]; }

panel_version() {
  grep -Eo "'version'\s*=>\s*'[^']+'" "${PANEL_DIR}/config/app.php" 2>/dev/null \
    | head -n1 | grep -Eo "[0-9]+\.[0-9]+\.[0-9]+" || echo "unknown"
}

version_ge() { [[ "$(printf '%s\n%s' "$1" "$2" | sort -V | head -n1)" == "$2" ]]; }

safe_relative_path() {
  [[ "$1" != /* && "$1" != *".."* && "$1" != *$'\n'* ]]
}

create_backup() {
  local dest="$1" target
  local -a present=()
  mkdir -p "${dest}"
  : > "${dest}/state.tsv"

  for target in "${THEME_TARGETS[@]}"; do
    safe_relative_path "${target}" || { log_err "Unsafe backup target: ${target}"; return 1; }
    if [[ -e "${PANEL_DIR}/${target}" ]]; then
      printf 'present\t%s\n' "${target}" >> "${dest}/state.tsv"
      present+=("${target}")
    else
      printf 'missing\t%s\n' "${target}" >> "${dest}/state.tsv"
    fi
  done

  if ((${#present[@]})); then
    tar -C "${PANEL_DIR}" -cpf "${dest}/original.tar" -- "${present[@]}"
  else
    tar -C "${PANEL_DIR}" -cpf "${dest}/original.tar" --files-from /dev/null
  fi
  panel_version > "${dest}/panel-version.txt"
}

restore_backup() {
  local src="$1" state rel
  [[ -f "${src}/state.tsv" && -f "${src}/original.tar" ]] || {
    log_err "Backup is incomplete: ${src}"; return 1;
  }

  while IFS=$'\t' read -r state rel; do
    [[ -n "${state}" && -n "${rel}" ]] || continue
    safe_relative_path "${rel}" || { log_err "Unsafe path in backup: ${rel}"; return 1; }
    rm -rf -- "${PANEL_DIR}/${rel}"
  done < "${src}/state.tsv"
  tar -C "${PANEL_DIR}" -xpf "${src}/original.tar"
}

build_panel_assets() {
  pushd "${PANEL_DIR}" >/dev/null
  if command -v yarn >/dev/null 2>&1; then
    yarn build:production
  elif command -v npm >/dev/null 2>&1; then
    npm run build:production
  else
    log_err "Neither yarn nor npm is available."; popd >/dev/null; return 1
  fi
  popd >/dev/null
}

clear_panel_cache() {
  pushd "${PANEL_DIR}" >/dev/null
  php artisan view:clear
  php artisan config:clear
  php artisan cache:clear
  php artisan route:clear
  php artisan config:cache
  php artisan view:cache
  popd >/dev/null
}
