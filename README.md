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

> **This repository currently contains the interactive preview only, not a
> Pterodactyl integration payload.** The installer intentionally stops before
> changing a panel unless a compatible payload is supplied. It must mirror the
> Pterodactyl project root and include `resources/scripts/index.tsx`.
>
> Always take your own backup first. The installer also creates an exact
> archive backup of every panel path it changes.

There is intentionally no copy-paste install command yet. A future release
must first include the compatible payload; only then will its release notes
provide the exact `THEME_PAYLOAD_DIR` command. Do **not** use the literal
`/path/to/pterodactyl-payload` placeholder.

The installer validates the payload and panel version, creates a backup,
applies the payload, builds assets, and clears caches. If a post-backup step
fails, it restores the archive automatically. It does not accept `curl | bash`
installation because that cannot safely provide the required payload.

1. Detect Pterodactyl → 2. Detect version → 3. Check compatibility →
4. Check dependencies → 5. Backup originals → 6. Install theme →
7. Build assets → 8. Clear cache → 9. Verify → 10. Report.

If **any** step fails it automatically **rolls back** to the previous state.

### Update

```bash
THEME_PAYLOAD_DIR=/path/to/pterodactyl-payload bash update.sh
```

### Uninstall

```bash
bash uninstall.sh   # restores the most recent exact backup and rebuilds
```

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
