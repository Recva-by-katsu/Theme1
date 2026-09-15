import { useState } from "react";
import { Card, Button, Badge, IconButton, Dropdown, Modal, Input, Textarea, useToast } from "../../ui/components";
import { Icon } from "../../ui/icons";
import { nests } from "../../data/mock";
import { useRouter } from "../../app/router";

export function AdminNests() {
  const toast = useToast();
  const { go } = useRouter();
  const [create, setCreate] = useState(false);
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">Nests group related eggs together</p>
        <Button size="sm" onClick={() => setCreate(true)}><Icon.Plus className="h-4 w-4" /> Create Nest</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {nests.map((n) => (
          <Card key={n.name} hover className="p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-100 text-2xl dark:bg-white/5">{n.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2"><h3 className="font-bold text-slate-800 dark:text-white">{n.name}</h3><Badge tone="brand">{n.eggs} eggs</Badge></div>
                <p className="text-sm text-slate-400">{n.desc}</p>
              </div>
              <Dropdown trigger={<IconButton className="h-8 w-8"><Icon.Dots className="h-4 w-4" /></IconButton>}
                items={[{ label: "View Eggs", icon: <Icon.Egg className="h-4 w-4" />, onClick: () => go({ name: "admin", page: "eggs" }) }, { label: "Edit", icon: <Icon.Edit className="h-4 w-4" />, onClick: () => toast({ title: "Editing nest", tone: "info" }) }, { label: "Delete", icon: <Icon.Trash className="h-4 w-4" />, danger: true, onClick: () => toast({ title: "Nest deleted", tone: "danger" }) }]} />
            </div>
          </Card>
        ))}
      </div>
      <Modal open={create} onClose={() => setCreate(false)} title="Create Nest"
        footer={<><Button variant="secondary" onClick={() => setCreate(false)}>Cancel</Button><Button onClick={() => { setCreate(false); toast({ title: "Nest created", tone: "success" }); }}>Create</Button></>}>
        <div className="space-y-4"><Input label="Name" placeholder="Minecraft" /><Textarea label="Description" rows={3} /></div>
      </Modal>
    </>
  );
}
