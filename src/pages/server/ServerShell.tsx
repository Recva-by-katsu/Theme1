import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Icon, type IconName } from "../../ui/icons";
import { Card, Button, ResourceBar } from "../../ui/components";
import { servers } from "../../data/mock";
import { useRouter, type ServerTab } from "../../app/router";
import { StatusDot } from "../_shared";
import { ServerOverview } from "./Overview";
import { ServerConsole } from "./Console";
import { ServerFiles } from "./Files";
import { ServerDatabases } from "./Databases";
import { ServerSchedules } from "./Schedules";
import { ServerBackups } from "./Backups";
import { ServerNetwork } from "./Network";
import { ServerStartup } from "./Startup";
import { ServerSettings } from "./Settings";

const tabs: { id: ServerTab; label: string; icon: IconName }[] = [
  { id: "overview", label: "Overview", icon: "Dashboard" },
  { id: "console", label: "Console", icon: "Console" },
  { id: "files", label: "Files", icon: "Files" },
  { id: "databases", label: "Databases", icon: "Database" },
  { id: "schedules", label: "Schedules", icon: "Clock" },
  { id: "backups", label: "Backups", icon: "Backup" },
  { id: "network", label: "Network", icon: "Network" },
  { id: "startup", label: "Startup", icon: "Rocket" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

export function PowerControls({ status, size = "md" }: { status: string; size?: "sm" | "md" }) {
  const online = status === "online";
  return (
    <div className="flex items-center gap-2">
      <Button size={size} variant="success" disabled={online}><Icon.Play className="h-4 w-4" /> Start</Button>
      <Button size={size} variant="secondary" disabled={!online}><Icon.Restart className="h-4 w-4" /> Restart</Button>
      <Button size={size} variant="danger" disabled={!online}><Icon.Stop className="h-4 w-4" /> Stop</Button>
    </div>
  );
}

export function ServerSubCard({ title, children, action, className }: { title?: string; children: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      {title && (
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 dark:border-white/8">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white">{title}</h3>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </Card>
  );
}

export function ServerShell({ id, tab }: { id: string; tab: ServerTab }) {
  const { go } = useRouter();
  const server = servers.find((s) => s.id === id) ?? servers[0];

  const content = () => {
    switch (tab) {
      case "overview": return <ServerOverview server={server} />;
      case "console": return <ServerConsole server={server} />;
      case "files": return <ServerFiles />;
      case "databases": return <ServerDatabases />;
      case "schedules": return <ServerSchedules />;
      case "backups": return <ServerBackups />;
      case "network": return <ServerNetwork />;
      case "startup": return <ServerStartup />;
      case "settings": return <ServerSettings server={server} />;
    }
  };

  return (
    <>
      {/* Server header */}
      <div className="mb-5 flex items-center gap-2 text-sm text-slate-400">
        <button onClick={() => go({ name: "servers" })} className="font-semibold hover:text-brand-600 dark:hover:text-brand-400">Servers</button>
        <Icon.Chevron className="h-3.5 w-3.5" />
        <span className="font-semibold text-slate-600 dark:text-slate-200">{server.name}</span>
      </div>

      <Card className="mb-5 overflow-hidden">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-slate-100 text-3xl dark:bg-white/5" style={{ imageRendering: "pixelated" }}>{server.icon}</div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-xl font-extrabold text-slate-900 dark:text-white">{server.name}</h1>
              <StatusDot status={server.status} label />
            </div>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Icon.Network className="h-3.5 w-3.5" /> {server.ip}</span>
              <span className="flex items-center gap-1"><Icon.Server className="h-3.5 w-3.5" /> {server.node}</span>
              <span className="flex items-center gap-1"><Icon.Clock className="h-3.5 w-3.5" /> {server.uptime}</span>
            </p>
          </div>
          <PowerControls status={server.status} size="sm" />
        </div>
      </Card>

      {/* Tab nav */}
      <div className="mb-5 -mx-1 flex gap-1 overflow-x-auto px-1 no-scrollbar">
        {tabs.map((t) => {
          const IconCmp = Icon[t.icon];
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => go({ name: "server", id, tab: t.id })}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200",
                active
                  ? "bg-brand-500 text-white shadow-[0_8px_20px_-8px_rgba(79,70,229,0.6)]"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/5",
              )}
            >
              <IconCmp className="h-4 w-4" /> {t.label}
            </button>
          );
        })}
      </div>

      <div key={tab} className="animate-[fade-in_0.3s_ease]">{content()}</div>
    </>
  );
}

export { ResourceBar };
