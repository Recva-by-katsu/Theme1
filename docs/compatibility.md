# Compatibility

## Supported Pterodactyl versions

| Panel version | Status        | Notes                              |
|---------------|---------------|------------------------------------|
| 1.11.x        | ✅ Supported  | Recommended                        |
| 1.10.x        | ✅ Supported  | Fully tested                       |
| 1.9.x         | ⚠️ Best effort | Some admin views may differ        |
| < 1.9         | ❌ Unsupported | Blade/React structure too different |

The installer auto-detects the version from `config/app.php` and refuses to
continue on unsupported versions unless you pass `CONTINUE=1`.

## Requirements

- Node.js 18+ (20+ recommended)
- `yarn` **or** `npm`
- PHP 8.1+ with the Pterodactyl `artisan` CLI
- `tar`, `cp`, `rsync` (rsync optional; `cp` fallback used)

## What the installer touches

Only front-end/theming assets are modified. The following paths are backed up
before any change and restored on rollback/uninstall:

- `resources/scripts/*`
- `resources/views/templates/wrapper.blade.php`
- `public/themes/arena-playful/*`
- `webpack.config.js`, `tailwind.config.js`

## What it never touches

- The database (no migrations, no data changes)
- User passwords / accounts
- API keys or secrets
- Any outbound network calls beyond fetching the theme release

## Environment variables

| Variable         | Default                     | Purpose                         |
|------------------|-----------------------------|---------------------------------|
| `PANEL_DIR`      | `/var/www/pterodactyl`      | Path to your panel install      |
| `BACKUP_ROOT`    | `/var/backups/arena-playful`| Where backups are stored        |
| `CONTINUE`       | `0`                         | Force install on unknown/old ver|
| `THEME_REPO_RAW` | GitHub raw URL              | Override download source        |
