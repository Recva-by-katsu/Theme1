import { cn } from "../utils/cn";
import { Card, Badge, Progress } from "../ui/components";
import { Icon } from "../ui/icons";
import type { Server, ServerStatus } from "../data/mock";
import { useRouter } from "../app/router";

const statusMap: Record<ServerStatus, { label: string; color: string; tone: "green" | "red" | "amber" }> = {
  online: { label: "Online", color: "bg-mint-500", tone: "green" },
  offline: { label: "Offline", color: "bg-rose-500", tone: "red" },
  starting: { label: "Starting", color: "bg-amber-500", tone: "amber" },
  stopping: { label: "Stopping", color: "bg-amber-500", tone: "amber" },
};

export function StatusDot({ status, label }: { status: ServerStatus; label?: boolean }) {
  const s = statusMap[status];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative flex h-2.5 w-2.5">
        {(status === "online" || status === "starting") && (
          <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", s.color)} />
        )}
        <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", s.color)} />
      </span>
      {label && <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{s.label}</span>}
    </span>
  );
}

export function StatusBadge({ status }: { status: ServerStatus }) {
  const s = statusMap[status];
  return <Badge tone={s.tone} dot>{s.label}</Badge>;
}

export function ServerCard({ server }: { server: Server }) {
  const { go } = useRouter();
  const cpuPct = Math.round((server.cpu / server.cpuMax) * 100);
  const ramPct = Math.round((server.ram / server.ramMax) * 100);
  const dead = server.status === "offline";
  return (
    <Card
      hover
      onClick={() => go({ name: "server", id: server.id, tab: "overview" })}
      className="group cursor-pointer p-5"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-100 text-2xl transition-transform group-hover:scale-110 dark:bg-white/5" style={{ imageRendering: "pixelated" }}>
          {server.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-bold text-slate-800 dark:text-white">{server.name}</h3>
            <StatusDot status={server.status} />
          </div>
          <p className="truncate text-xs text-slate-400">{server.game} · {server.node}</p>
        </div>
        <Icon.Chevron className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-500" />
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1"><Icon.Ram className="h-3.5 w-3.5" /> {server.ramMax} GB</span>
        <span className="flex items-center gap-1"><Icon.Cpu className="h-3.5 w-3.5" /> {server.cpuMax / 100} vCPU</span>
        {server.players && <span className="flex items-center gap-1"><Icon.Users className="h-3.5 w-3.5" /> {server.players}</span>}
      </div>

      <div className="mt-4 space-y-2.5">
        <div>
          <div className="mb-1 flex justify-between text-[11px] font-semibold text-slate-400">
            <span>CPU</span><span>{dead ? "—" : `${cpuPct}%`}</span>
          </div>
          <Progress value={dead ? 0 : cpuPct} tone={cpuPct > 85 ? "red" : cpuPct > 60 ? "amber" : "green"} />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-[11px] font-semibold text-slate-400">
            <span>RAM</span><span>{dead ? "—" : `${server.ram} / ${server.ramMax} GB`}</span>
          </div>
          <Progress value={dead ? 0 : ramPct} tone="brand" />
        </div>
      </div>
    </Card>
  );
}
