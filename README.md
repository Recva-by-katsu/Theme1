# 🕹️ ArenaPanel — Playful Premium Theme for Pterodactyl

> A complete **UI/UX replacement** for the Pterodactyl Panel — not a reskin.
> Every user-facing screen, from **login** to the **admin panel**, has been
> rebuilt around one cohesive *Playful · Premium · Smooth* design system.

![theme](docs/preview.png)

This repository contains:

1. A **live, interactive preview** of the entire theme (React + Vite + Tailwind)
   — run it locally to click through every page.
2. Safety-first deployment scripts for a real Pterodactyl integration
   payload, with exact backup and rollback support.

---

## ✨ What's included

Every screen is redesigned and available in the preview app:

- **Auth** — Login, 2FA, password reveal, remember-me, loading & error states
- **Dashboard** — welcome hero, stat cards, server grid, cluster health, activity
- **Server** — Overview, Console (live), Files + Editor, Databases, Schedules,
  Backups, Network, Startup, Settings (with danger zone)
- **Account** — Profile, Security/2FA, API keys, Sessions
- **Admin** — Overview, Users, Servers, Nodes, Locations, Nests, Eggs, Settings
- **System** — 404 / 500 error pages, empty states, loading & skeletons
- **Components** — Buttons, Cards, Modals, Confirm dialogs, Dropdowns, Context
  menus, Tabs, Badges, Alerts, Toasts, Tables, Inputs, Selects, Toggles,
  Progress, Spinners, Skeletons
- **Mobile** — dedicated sidebar drawer + bottom navigation, responsive from
  320px → 1440px+
- **Theming** — real light/dark design tokens (not `background:black`)
- **Motion** — subtle, purposeful animations that respect
  `prefers-reduced-motion`
- **Pixel accents** — used only as identity (logo, empty states, 404)

---

## 🎨 Design System

| Token         | Value(s)                                             |
|---------------|------------------------------------------------------|
| Font          | Inter (UI) · JetBrains Mono (console/code)           |
| Brand         | Indigo/violet `#6366f1` + mint & candy accents       |
| Radius        | 8 (chips) · 12 (buttons/inputs) · 16–28 (cards)      |
| Shadows       | soft ambient + brand-tinted float on hover           |
| Elevation     | surface → card → popover → modal → toast             |
| Animations    | fade / slide-up / pop / shimmer / float (all subtle) |

Tokens live in [`src/index.css`](src/index.css) and reusable components in
[`src/ui/components.tsx`](src/ui/components.tsx).

---

## 🚀 Run the preview locally

```bash
npm install
npm run dev      # open the printed localhost URL
npm run build    # production build (single-file dist/index.html)
```

Log in with the pre-filled demo credentials, then explore every page,
toggle dark/light mode (top-right ☀️/🌙), and resize to test mobile.

---

## 📦 Install on a real Pterodactyl panel

Run this **on your panel server** (as root or with sudo):

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/Recva-by-katsu/Theme1/master/install.sh)
```

What gets installed is the **CSS overlay theme**
([`pterodactyl/theme.css`](pterodactyl/theme.css)) — it restyles the stock
Pterodactyl 1.x frontend with the Playful Premium look (colors, cards,
buttons, inputs, scrollbars) **without replacing any panel code**, so it is
safe, fast, and reversible:

1. Detect Pterodactyl → 2. Detect version (needs ≥ 1.10, or `CONTINUE=1`) →
3. Download & validate `theme.css` → 4. Backup `wrapper.blade.php` →
5. Copy CSS to `public/themes/arena-playful/` → 6. Inject one `<link>` tag →
7. Clear the view cache.

If any step after the backup fails, the wrapper is **restored automatically**.
No rebuild of panel assets is required — just hard-refresh your browser.

> The full React preview in `src/` is a design showcase; the deployable
> artifact for a live panel is the CSS overlay above.

If your panel is not at `/var/www/pterodactyl`:

```bash
PANEL_DIR=/srv/pterodactyl bash <(curl -fsSL https://raw.githubusercontent.com/Recva-by-katsu/Theme1/master/install.sh)
```

### Update

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/Recva-by-katsu/Theme1/master/update.sh)
```

### Uninstall

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/Recva-by-katsu/Theme1/master/uninstall.sh)
```

Uninstall restores the exact pre-install `wrapper.blade.php` backup (or, if no
backup exists, removes the injected tag) and deletes the theme files.

Configure paths via env vars — see [`docs/compatibility.md`](docs/compatibility.md).

---

## 🔒 Security

This project contains **no** backdoors, credential stealers, hidden admins,
telemetry, or remote code execution. The scripts only:

- read `config/app.php` to detect the version,
- copy/restore local theme files,
- run the panel's own `yarn/npm build` and `php artisan` cache commands.

They never modify your database, users, or secrets. All source is auditable.

---

## 🗂️ Project structure

```
pterodactyl-playful-theme/
├── install.sh · uninstall.sh · update.sh
├── README.md · LICENSE
├── scripts/            # backup.sh · restore.sh · utils.sh
├── docs/               # compatibility.md
└── src/
    ├── ui/             # design system (components, icons, theme, logo)
    ├── layouts/        # AppLayout (sidebar / topbar / mobile nav)
    ├── pages/          # login, dashboard, servers, account, error pages
    │   ├── server/     # overview, console, files, databases, schedules …
    │   └── admin/      # overview, users, servers, nodes, locations, eggs …
    ├── app/            # lightweight router
    └── data/           # mock data for the preview
```

---

## 📄 License

MIT — see [LICENSE](LICENSE).
