import { Button, Input, Select, useToast } from "../../ui/components";
import { Icon } from "../../ui/icons";
import { envVars } from "../../data/mock";
import { ServerSubCard } from "./ServerShell";

export function ServerStartup() {
  const toast = useToast();
  return (
    <div className="space-y-6">
      <ServerSubCard title="Startup Command">
        <div className="rounded-xl border border-slate-800 bg-[#0c0e16] p-4 font-mono text-sm text-emerald-300" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="text-slate-500">$</span> java -Xms128M -Xmx<span className="text-amber-300">{"{{SERVER_MEMORY}}"}</span>M -jar <span className="text-brand-300">{"{{SERVER_JARFILE}}"}</span>
        </div>
        <p className="mt-2 text-xs text-slate-400">Variables in {"{{ }}"} are replaced by the values below at boot.</p>
      </ServerSubCard>

      <div className="grid gap-6 lg:grid-cols-3">
        <ServerSubCard title="Docker Configuration">
          <Select label="Docker Image">
            <option>ghcr.io/pterodactyl/yolks:java_17</option>
            <option>ghcr.io/pterodactyl/yolks:java_21</option>
            <option>ghcr.io/pterodactyl/yolks:java_8</option>
          </Select>
        </ServerSubCard>

        <ServerSubCard title="Variables" className="lg:col-span-2" action={<Button size="sm" onClick={() => toast({ title: "Startup saved", tone: "success" })}><Icon.Check className="h-4 w-4" /> Save</Button>}>
          <div className="grid gap-4 sm:grid-cols-2">
            {envVars.map((v) => (
              <Input key={v.key} label={v.label} defaultValue={v.value} hint={v.key} />
            ))}
          </div>
        </ServerSubCard>
      </div>
    </div>
  );
}
