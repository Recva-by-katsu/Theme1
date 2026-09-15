import { PageHeader } from "../layouts/AppLayout";
import { Card, Button, ResourceBar } from "../ui/components";
import { Icon } from "../ui/icons";
import { servers } from "../data/mock";
import { useRouter } from "../app/router";
import { ServerCard } from "./_shared";

export function Dashboard() {
  const { go } = useRouter();
  const online = servers.filter((s) => s.status === "online").length;
  const totalRam = servers.reduce((a, s) => a + s.ram, 0).toFixed(1);
  const avgCpu = Math.round(servers.reduce((a, s) => a + (s.cpu / s.cpuMax) * 100, 0) / servers.length);

  const stats = [
    { label: "Total Servers", value: servers.length, sub: "across 4 nodes", icon: <Icon.Server className="h-5 w-5" />, tone: "from-brand-400 to-brand-600", emoji: "🖥️" },
    { label: "Online Now", value: online, sub: `${servers.length - online} offline`, icon: <Icon.Rocket className="h-5 w-5" />, tone: "from-mint-400 to-mint-600", emoji: "🟢" },
    { label: "Memory In Use", value: `${totalRam} GB`, sub: "of 58 GB allocated", icon: <Icon.Ram className="h-5 w-5" />, tone: "from-candy-400 to-candy-500", emoji: "💾" },
    { label: "Avg CPU Load", value: `${avgCpu}%`, sub: "healthy", icon: <Icon.Cpu className="h-5 w-5" />, tone: "from-sun-400 to-sun-500", emoji: "⚡" },
  ];

  return (
    <>
      <PageHeader
        title="Welcome back, Alex"
        emoji="👋"
        subtitle="Here's how your infrastructure is doing today."
        action={<Button onClick={() => go({ name: "servers" })}><Icon.Plus className="h-4 w-4" /> New Server</Button>}
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} hover className="relative overflow-hidden p-5">
            <div className="flex items-start justify-between">
              <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.tone} text-white shadow-soft`}>{s.icon}</div>
              <span className="text-2xl opacity-70" style={{ imageRendering: "pixelated" }}>{s.emoji}</span>
            </div>
            <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{s.value}</p>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{s.label}</p>
            <p className="mt-0.5 text-xs text-slate-400">{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Servers list */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Your Servers</h2>
            <button onClick={() => go({ name: "servers" })} className="flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400">
              View all <Icon.Chevron className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {servers.slice(0, 4).map((s) => <ServerCard key={s.id} server={s} />)}
          </div>
        </div>

        {/* Side column */}
        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="text-base font-bold text-slate-800 dark:text-white">Cluster Health</h3>
            <div className="mt-4 space-y-4">
              <ResourceBar icon={<Icon.Cpu className="h-3.5 w-3.5" />} label="CPU" value={58} max={100} unit="%" />
              <ResourceBar icon={<Icon.Ram className="h-3.5 w-3.5" />} label="Memory" value={62} max={100} unit="%" />
              <ResourceBar icon={<Icon.Disk className="h-3.5 w-3.5" />} label="Disk" value={44} max={100} unit="%" />
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-base font-bold text-slate-800 dark:text-white">Recent Activity</h3>
            <ul className="mt-4 space-y-3.5">
              {[
                { t: "Survival Realms restarted", w: "12 min ago", c: "text-mint-500", i: <Icon.Restart className="h-4 w-4" /> },
                { t: "Backup completed", w: "1 hour ago", c: "text-brand-500", i: <Icon.Backup className="h-4 w-4" /> },
                { t: "FiveM went offline", w: "3 hours ago", c: "text-rose-500", i: <Icon.Warning className="h-4 w-4" /> },
                { t: "New API key created", w: "yesterday", c: "text-amber-500", i: <Icon.Key className="h-4 w-4" /> },
              ].map((a, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 ${a.c} dark:bg-white/5`}>{a.i}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{a.t}</p>
                    <p className="text-xs text-slate-400">{a.w}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
