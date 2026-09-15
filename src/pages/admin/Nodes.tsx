import { useState } from "react";
import { Card, Button, Badge, ResourceBar, Modal, Input, Select, useToast } from "../../ui/components";
import { Icon } from "../../ui/icons";
import { nodes } from "../../data/mock";
import { StatusDot } from "../_shared";

export function AdminNodes() {
  const toast = useToast();
  const [create, setCreate] = useState(false);
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">{nodes.length} nodes registered</p>
        <Button size="sm" onClick={() => setCreate(true)}><Icon.Plus className="h-4 w-4" /> Create Node</Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {nodes.map((n) => (
          <Card key={n.name} hover className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white dark:from-brand-500 dark:to-brand-700"><Icon.Grid className="h-5 w-5" /></span>
                <div>
                  <div className="flex items-center gap-2"><h3 className="font-bold text-slate-800 dark:text-white">{n.name}</h3><StatusDot status={n.status === "online" ? "online" : "starting"} /></div>
                  <p className="text-xs text-slate-400">{n.location} · {n.fqdn}</p>
                </div>
              </div>
              <Badge tone={n.status === "online" ? "green" : "amber"}>{n.status}</Badge>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <ResourceBar icon={<Icon.Cpu className="h-3 w-3" />} label="CPU" value={n.cpu} max={100} unit="%" />
              <ResourceBar icon={<Icon.Ram className="h-3 w-3" />} label="RAM" value={n.ram} max={100} unit="%" />
              <ResourceBar icon={<Icon.Disk className="h-3 w-3" />} label="Disk" value={n.disk} max={100} unit="%" />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-white/8">
              <span className="text-sm text-slate-400"><Icon.Server className="mr-1 inline h-4 w-4" /> {n.servers} servers</span>
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Node configuration", tone: "info" })}><Icon.Settings className="h-4 w-4" /> Configure</Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={create} onClose={() => setCreate(false)} title="Create Node" size="lg"
        footer={<><Button variant="secondary" onClick={() => setCreate(false)}>Cancel</Button><Button onClick={() => { setCreate(false); toast({ title: "Node created", tone: "success" }); }}>Create</Button></>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" placeholder="Node EU-3" />
          <Select label="Location"><option>Frankfurt</option><option>Dallas</option></Select>
          <Input label="FQDN" placeholder="eu3.arena.gg" />
          <Input label="Daemon port" type="number" defaultValue={8080} />
          <Input label="Memory (MB)" type="number" defaultValue={64000} />
          <Input label="Disk (MB)" type="number" defaultValue={500000} />
        </div>
      </Modal>
    </>
  );
}
