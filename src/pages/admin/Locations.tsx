import { useState } from "react";
import { Card, Button, IconButton, Dropdown, Modal, Input, useToast } from "../../ui/components";
import { Icon } from "../../ui/icons";
import { locations } from "../../data/mock";

export function AdminLocations() {
  const toast = useToast();
  const [create, setCreate] = useState(false);
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">Group nodes by physical or logical region</p>
        <Button size="sm" onClick={() => setCreate(true)}><Icon.Plus className="h-4 w-4" /> Create Location</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((l) => (
          <Card key={l.short} hover className="p-5">
            <div className="flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-mint-400 to-mint-600 text-lg font-extrabold text-white">{l.short}</span>
              <Dropdown trigger={<IconButton className="h-8 w-8"><Icon.Dots className="h-4 w-4" /></IconButton>}
                items={[{ label: "Edit", icon: <Icon.Edit className="h-4 w-4" />, onClick: () => toast({ title: "Editing location", tone: "info" }) }, { label: "Delete", icon: <Icon.Trash className="h-4 w-4" />, danger: true, onClick: () => toast({ title: "Location deleted", tone: "danger" }) }]} />
            </div>
            <h3 className="mt-3 font-bold text-slate-800 dark:text-white">{l.long}</h3>
            <div className="mt-3 flex gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1"><Icon.Grid className="h-4 w-4" /> {l.nodes} nodes</span>
              <span className="flex items-center gap-1"><Icon.Server className="h-4 w-4" /> {l.servers} servers</span>
            </div>
          </Card>
        ))}
      </div>
      <Modal open={create} onClose={() => setCreate(false)} title="Create Location"
        footer={<><Button variant="secondary" onClick={() => setCreate(false)}>Cancel</Button><Button onClick={() => { setCreate(false); toast({ title: "Location created", tone: "success" }); }}>Create</Button></>}>
        <div className="space-y-4"><Input label="Short code" placeholder="EU" /><Input label="Description" placeholder="Europe (Frankfurt)" /></div>
      </Modal>
    </>
  );
}
