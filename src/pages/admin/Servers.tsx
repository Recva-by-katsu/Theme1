import { useState } from "react";
import { Card, Button, Input, Dropdown, IconButton, Modal, Select, useToast } from "../../ui/components";
import { Icon } from "../../ui/icons";
import { servers } from "../../data/mock";
import { StatusBadge } from "../_shared";

export function AdminServers() {
  const toast = useToast();
  const [q, setQ] = useState("");
  const [create, setCreate] = useState(false);
  const list = servers.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1">
          <Icon.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search servers…" className="pl-9" />
        </div>
        <Button size="sm" onClick={() => setCreate(true)}><Icon.Plus className="h-4 w-4" /> Create Server</Button>
      </div>

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-12 gap-4 border-b border-slate-100 px-5 py-2.5 text-xs font-bold uppercase text-slate-400 dark:border-white/8 md:grid">
          <span className="col-span-4">Server</span><span className="col-span-3">Owner</span><span className="col-span-2">Node</span><span className="col-span-2">Status</span><span className="col-span-1" />
        </div>
        {list.map((s) => (
          <div key={s.id} className="grid grid-cols-12 items-center gap-4 border-b border-slate-50 px-5 py-3.5 last:border-0 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/[0.03]">
            <div className="col-span-10 flex items-center gap-3 md:col-span-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-xl dark:bg-white/5">{s.icon}</span>
              <div className="min-w-0"><p className="truncate font-semibold text-slate-800 dark:text-white">{s.name}</p><p className="truncate font-mono text-xs text-slate-400">{s.id}</p></div>
            </div>
            <span className="col-span-3 hidden text-sm text-slate-500 dark:text-slate-400 md:block">Alex Rivera</span>
            <span className="col-span-2 hidden text-sm text-slate-500 dark:text-slate-400 md:block">{s.node}</span>
            <span className="col-span-2 hidden md:block"><StatusBadge status={s.status} /></span>
            <div className="col-span-2 flex justify-end md:col-span-1">
              <Dropdown trigger={<IconButton className="h-8 w-8"><Icon.Dots className="h-4 w-4" /></IconButton>}
                items={[
                  { label: "Manage", icon: <Icon.Settings className="h-4 w-4" />, onClick: () => toast({ title: "Managing server", tone: "info" }) },
                  { label: "Suspend", icon: <Icon.Lock className="h-4 w-4" />, onClick: () => toast({ title: "Server suspended", tone: "info" }) },
                  { label: "Delete", icon: <Icon.Trash className="h-4 w-4" />, danger: true, onClick: () => toast({ title: "Server deleted", tone: "danger" }) },
                ]} />
            </div>
          </div>
        ))}
      </Card>

      <Modal open={create} onClose={() => setCreate(false)} title="Create Server" size="lg"
        footer={<><Button variant="secondary" onClick={() => setCreate(false)}>Cancel</Button><Button onClick={() => { setCreate(false); toast({ title: "Server created", tone: "success" }); }}>Deploy</Button></>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Server name" placeholder="My Server" />
          <Select label="Owner"><option>Alex Rivera</option><option>Sam Chen</option></Select>
          <Select label="Node"><option>Node EU-1</option><option>Node US-2</option></Select>
          <Select label="Egg"><option>Paper (Minecraft)</option><option>Rust</option></Select>
          <Input label="Memory (MB)" type="number" defaultValue={4096} />
          <Input label="Disk (MB)" type="number" defaultValue={20480} />
          <Input label="CPU limit (%)" type="number" defaultValue={200} />
          <Select label="Allocation"><option>203.0.113.10:25565</option></Select>
        </div>
      </Modal>
    </>
  );
}
