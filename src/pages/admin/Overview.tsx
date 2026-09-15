import { Card, ResourceBar, Badge } from "../../ui/components";
import { Icon } from "../../ui/icons";
import { nodes } from "../../data/mock";
import { StatusDot } from "../_shared";

export function AdminOverview() {
  const stats = [
    { label: "Total Servers", value: 90, icon: <Icon.Server className="h-5 w-5" />, tone: "from-brand-400 to-brand-600" },
    { label: "Total Users", value: 412, icon: <Icon.Users className="h-5 w-5" />, tone: "from-candy-400 to-candy-500" },
    { label: "Active Nodes", value: 4, icon: <Icon.Grid className="h-5 w-5" />, tone: "from-mint-400 to-mint-600" },
    { label: "Locations", value: 3, icon: <Icon.Location className="h-5 w-5" />, tone: "from-sun-400 to-sun-500" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} hover className="p-5">
            <div className={`mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.tone} text-white`}>{s.icon}</div>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{s.value}</p>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 font-bold text-slate-800 dark:text-white">Node Resource Utilization</h3>
          <div className="space-y-5">
            {nodes.map((n) => (
              <div key={n.name}>
                <div className="mb-2 flex items-center gap-2">
                  <StatusDot status={n.status === "online" ? "online" : "starting"} />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{n.name}</span>
                  <span className="text-xs text-slate-400">· {n.servers} servers</span>
                  <Badge tone={n.status === "online" ? "green" : "amber"} className="ml-auto">{n.status}</Badge>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <ResourceBar icon={<Icon.Cpu className="h-3 w-3" />} label="CPU" value={n.cpu} max={100} unit="%" />
                  <ResourceBar icon={<Icon.Ram className="h-3 w-3" />} label="RAM" value={n.ram} max={100} unit="%" />
                  <ResourceBar icon={<Icon.Disk className="h-3 w-3" />} label="Disk" value={n.disk} max={100} unit="%" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 font-bold text-slate-800 dark:text-white">System Status</h3>
          <ul className="space-y-3">
            {[
              ["Panel", "v1.11.7", "green"],
              ["Wings Daemon", "All online", "green"],
              ["Database", "Healthy", "green"],
              ["Redis Cache", "Connected", "green"],
              ["Queue Worker", "Running", "green"],
            ].map(([k, v, t]) => (
              <li key={k} className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5 dark:bg-white/5">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{k}</span>
                <Badge tone={t as "green"} dot>{v}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
