import { useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { Icon, type IconName } from "../ui/icons";
import { Wordmark, Logo } from "../ui/Logo";
import { IconButton, Dropdown } from "../ui/components";
import { useTheme } from "../ui/theme";
import { useRouter, type Route } from "../app/router";

interface NavItem { id: string; label: string; icon: IconName; route: Route; }

const mainNav: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "Dashboard", route: { name: "dashboard" } },
  { id: "servers", label: "Servers", icon: "Server", route: { name: "servers" } },
  { id: "account", label: "Account", icon: "User", route: { name: "account", tab: "profile" } },
  { id: "admin", label: "Admin", icon: "Shield", route: { name: "admin", page: "overview" } },
];

function isActive(route: Route, item: NavItem): boolean {
  return route.name === item.route.name;
}

export function AppLayout({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();
  const { route, go } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SideContent = (
    <>
      <div className="px-4 py-5">
        <Wordmark />
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {mainNav.map((item) => {
          const active = isActive(route, item);
          const IconCmp = Icon[item.icon];
          return (
            <button
              key={item.id}
              onClick={() => { go(item.route); setMobileOpen(false); }}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200",
                active
                  ? "bg-gradient-to-r from-brand-500/12 to-brand-500/5 text-brand-600 dark:text-brand-300"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-100",
              )}
            >
              <span className={cn("transition-transform group-hover:scale-110", active && "text-brand-500")}>
                <IconCmp className="h-5 w-5" />
              </span>
              {item.label}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500" />}
            </button>
          );
        })}
      </nav>
      <div className="mx-3 mb-3 rounded-xl border border-slate-200/70 bg-gradient-to-br from-brand-50 to-white p-4 dark:border-white/8 dark:from-brand-500/10 dark:to-transparent">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-100">
          <span>✨</span> Pro Tier
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">You're using 6 of 20 servers.</p>
        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
          <div className="h-full w-[30%] rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-[#0a0b12] dark:text-slate-200">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/8 dark:bg-slate-950/60 lg:flex">
        {SideContent}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-[fade-in_0.2s]" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-2xl animate-[slide-up_0.3s] dark:bg-slate-950">
            <div className="flex items-center justify-between pr-3">
              <div />
              <IconButton onClick={() => setMobileOpen(false)} className="mt-4"><Icon.Close /></IconButton>
            </div>
            {SideContent}
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200/70 bg-white/70 px-4 backdrop-blur-xl dark:border-white/8 dark:bg-[#0a0b12]/70 sm:px-6">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Logo size={34} />
          </button>
          <div className="relative hidden max-w-md flex-1 md:block">
            <Icon.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search servers, files, settings…"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10 dark:border-white/8 dark:bg-white/5 dark:text-slate-100"
            />
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <IconButton onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? <Icon.Sun className="h-5 w-5" /> : <Icon.Moon className="h-5 w-5" />}
            </IconButton>
            <IconButton className="relative">
              <Icon.Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-candy-500 ring-2 ring-white dark:ring-[#0a0b12]" />
            </IconButton>
            <Dropdown
              trigger={
                <button className="flex items-center gap-2 rounded-xl p-1 pr-2 transition hover:bg-slate-100 dark:hover:bg-white/5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-candy-400 to-brand-500 text-sm font-bold text-white">AR</span>
                  <span className="hidden text-left sm:block">
                    <span className="block text-xs font-bold leading-tight text-slate-700 dark:text-slate-100">Alex Rivera</span>
                    <span className="block text-[10px] leading-tight text-slate-400">Owner</span>
                  </span>
                  <Icon.ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
                </button>
              }
              items={[
                { label: "My Account", icon: <Icon.User className="h-4 w-4" />, onClick: () => go({ name: "account", tab: "profile" }) },
                { label: "API Credentials", icon: <Icon.Key className="h-4 w-4" />, onClick: () => go({ name: "account", tab: "api" }) },
                { label: "Sign out", icon: <Icon.Logout className="h-4 w-4" />, danger: true, onClick: () => go({ name: "login" }) },
              ]}
            />
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:pb-10">
          <div key={JSON.stringify(route)} className="animate-[slide-up_0.4s_cubic-bezier(0.22,1,0.36,1)]">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-white/8 dark:bg-[#0a0b12]/90 lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
          {mainNav.map((item) => {
            const active = isActive(route, item);
            const IconCmp = Icon[item.icon];
            return (
              <button
                key={item.id}
                onClick={() => go(item.route)}
                className={cn(
                  "flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-semibold transition-all",
                  active ? "text-brand-600 dark:text-brand-300" : "text-slate-400",
                )}
              >
                <span className={cn("grid h-8 w-8 place-items-center rounded-xl transition-all", active && "bg-brand-500/12")}>
                  <IconCmp className="h-5 w-5" />
                </span>
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function PageHeader({ title, subtitle, action, emoji }: { title: string; subtitle?: string; action?: ReactNode; emoji?: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {emoji && <span>{emoji}</span>}{title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
