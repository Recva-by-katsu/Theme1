import { useState } from "react";
import { Card, Button, Badge, Dropdown, IconButton, Modal, Input, Select, useToast } from "../../ui/components";
import { Icon } from "../../ui/icons";
import { eggs } from "../../data/mock";

export function AdminEggs() {
  const toast = useToast();
  const [create, setCreate] = useState(false);
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">Eggs define how a server is installed and run</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast({ title: "Import dialog opened", tone: "info" })}><Icon.Upload className="h-4 w-4" /> Import</Button>
          <Button size="sm" onClick={() => setCreate(true)}><Icon.Plus className="h-4 w-4" /> Create Egg</Button>
        </div>
      </div>
      <Card className="overflow-hidden">
        <div className="hidden grid-cols-12 gap-4 border-b border-slate-100 px-5 py-2.5 text-xs font-bold uppercase text-slate-400 dark:border-white/8 md:grid">
          <span className="col-span-3">Egg</span><span className="col-span-2">Nest</span><span className="col-span-5">Docker Image</span><span className="col-span-2" />
        </div>
        {eggs.map((e) => (
          <div key={e.name} className="grid grid-cols-12 items-center gap-4 border-b border-slate-50 px-5 py-3.5 last:border-0 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/[0.03]">
            <div className="col-span-10 flex items-center gap-3 md:col-span-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sun-400 to-sun-500 text-white"><Icon.Egg className="h-5 w-5" /></span>
              <div className="min-w-0"><p className="truncate font-semibold text-slate-800 dark:text-white">{e.name}</p><p className="truncate text-xs text-slate-400">{e.author}</p></div>
            </div>
            <span className="col-span-2 hidden md:block"><Badge tone="brand">{e.nest}</Badge></span>
            <span className="col-span-5 hidden truncate font-mono text-xs text-slate-500 dark:text-slate-400 md:block" style={{ fontFamily: "var(--font-mono)" }}>{e.docker}</span>
            <div className="col-span-2 flex justify-end">
              <Dropdown trigger={<IconButton className="h-8 w-8"><Icon.Dots className="h-4 w-4" /></IconButton>}
                items={[{ label: "Edit", icon: <Icon.Edit className="h-4 w-4" />, onClick: () => toast({ title: "Editing egg", tone: "info" }) }, { label: "Export", icon: <Icon.Download className="h-4 w-4" />, onClick: () => toast({ title: "Egg exported", tone: "success" }) }, { label: "Delete", icon: <Icon.Trash className="h-4 w-4" />, danger: true, onClick: () => toast({ title: "Egg deleted", tone: "danger" }) }]} />
            </div>
          </div>
        ))}
      </Card>
      <Modal open={create} onClose={() => setCreate(false)} title="Create Egg" size="lg"
        footer={<><Button variant="secondary" onClick={() => setCreate(false)}>Cancel</Button><Button onClick={() => { setCreate(false); toast({ title: "Egg created", tone: "success" }); }}>Create</Button></>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" placeholder="Paper" /><Select label="Nest"><option>Minecraft</option><option>Software</option></Select>
          <Input label="Docker image" placeholder="ghcr.io/…" className="sm:col-span-2" />
          <Input label="Startup command" placeholder="java -jar server.jar" className="sm:col-span-2" />
        </div>
      </Modal>
    </>
  );
}
