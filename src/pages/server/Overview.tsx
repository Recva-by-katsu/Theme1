import { Card, ResourceBar } from "../../ui/components";
import { Icon } from "../../ui/icons";
import type { Server } from "../../data/mock";
import { ServerSubCard } from "./ServerShell";

export function ServerOverview({ server }: { server: Server }) {
  const dead = server.status === "offline";
  const bigStats = [
    { label: "CPU Usage", value: dead ? "0%" : `${Math.round((server.cpu / server.cpuMax) * 100)}%`, sub: `${server.cpu} / ${server.cpuMax}%`, icon: <Icon.Cpu className="h-5 w-5" />, tone: "from-brand-400 to-brand-600" },
    { label: "Memory", value: dead ? "0 GB" : `${server.ram} GB`, sub: `of ${server.ramMax} GB`, icon: <Icon.Ram className="h-5 w-5" />, tone: "from-candy-400 to-candy-500" },
    { label: "Disk", value: `${server.disk} GB`, sub: `of ${server.diskMax} GB`, icon: <Icon.Disk className="h-5 w-5" />, tone: "from-mint-400 to-mint-600" },
    { label: "Network", value: dead ? "0 MB/s" : `${server.netIn} MB/s`, sub: `↑ ${server.netOut} MB/s`, icon: <Icon.Network className="h-5 w-5" />, tone: "from-sun-400 to-sun-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {bigStats.map((s) => (
          <Card key={s.label} hover className="p-5">
            <div className={`mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.tone} text-white`}>{s.icon}</div>
            <p className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{s.value}</p>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{s.label}</p>
            <p className="text-xs text-slate-400">{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ServerSubCard title="Live Resource Usage" className="lg:col-span-2">
          <div className="space-y-4">
            <ResourceBar icon={<Icon.Cpu className="h-3.5 w-3.5" />} label="Processor" value={dead ? 0 : server.cpu} max={server.cpuMax} unit="%" />
            <ResourceBar icon={<Icon.Ram className="h-3.5 w-3.5" />} label="Memory" value={dead ? 0 : server.ram} max={server.ramMax} unit=" GB" />
            <ResourceBar icon={<Icon.Disk className="h-3.5 w-3.5" />} label="Storage" value={server.disk} max={server.diskMax} unit=" GB" />
          </div>
          {/* Mini chart */}
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold text-slate-400">CPU · last 60 minutes</p>
            <div className="flex h-24 items-end gap-1">
              {Array.from({ length: 40 }).map((_, i) => {
                const h = dead ? 3 : 20 + Math.abs(Math.sin(i * 0.5) * 60) + Math.random() * 15;
                return <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-brand-500/30 to-brand-500 transition-all" style={{ height: `${h}%` }} />;
              })}
            </div>
          </div>
        </ServerSubCard>

        <ServerSubCard title="Server Information">
          <dl className="space-y-3.5 text-sm">
            {[
              ["Address", server.ip],
              ["Game", server.game],
              ["Node", server.node],
              ["Uptime", server.uptime],
              ["Players", server.players ?? "N/A"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-3">
                <dt className="text-slate-400">{k}</dt>
                <dd className="truncate font-semibold text-slate-700 dark:text-slate-200">{v}</dd>
              </div>
            ))}
          </dl>
        </ServerSubCard>
      </div>
    </div>
  );
}
