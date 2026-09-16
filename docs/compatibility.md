# Compatibility

## Supported Pterodactyl versions

| Panel version | Status        | Notes                              |
|---------------|---------------|------------------------------------|
| 1.11.x        | ✅ Supported  | Recommended                        |
| 1.10.x        | ✅ Supported  | Minimum supported version          |
| < 1.10        | ⚠️ Untested   | Force with `CONTINUE=1` at your own risk |

The installer auto-detects the version from `config/app.php` and refuses to
continue when it cannot verify a supported version unless you pass
`CONTINUE=1`.

## Requirements

- `bash`, `curl`, `sed`, `grep` (present on any standard panel host)
- PHP with the Pterodactyl `artisan` CLI (used only for `view:clear`;
  the installer still works without it, then run `php artisan view:clear`
  manually)
- Write access to the panel directory (run with `sudo`)

No Node.js, yarn, or asset rebuild is required — the theme is a CSS overlay
loaded on top of the panel's existing compiled frontend.

## What the installer touches

- `public/themes/arena-playful/theme.css` — the theme file (new)
- `resources/views/templates/wrapper.blade.php` — one injected `<link>` tag
  (the original file is backed up first)
- `.arena-theme-installed` — install marker (new)

## What it never touches

- Panel source code, compiled assets, or build config
- The database (no migrations, no data changes)
- User passwords / accounts
- API keys or secrets

The only network call is downloading `theme.css` from this repository's raw
GitHub URL, and the download is validated before being installed.

## Environment variables

| Variable      | Default                       | Purpose                          |
|---------------|-------------------------------|----------------------------------|
| `PANEL_DIR`   | `/var/www/pterodactyl`        | Path to your panel install       |
| `BACKUP_ROOT` | `/var/backups/arena-playful`  | Where wrapper backups are stored |
| `CONTINUE`    | `0`                           | Force install on unknown/old ver |
| `REPO_RAW`    | this repo's raw master URL    | Alternate payload source         |
