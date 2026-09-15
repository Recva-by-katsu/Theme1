import { useState } from "react";
import { Card, Button, Input, Badge, Dropdown, IconButton, Modal, ConfirmDialog, useToast, Select } from "../../ui/components";
import { Icon } from "../../ui/icons";
import { adminUsers } from "../../data/mock";

export function AdminUsers() {
  const toast = useToast();
  const [q, setQ] = useState("");
  const [role, setRole] = useState("all");
  const [create, setCreate] = useState(false);
  const [del, setDel] = useState<string | null>(null);

  const list = adminUsers.filter((u) => (u.name.toLowerCase().includes(q.toLowerCase()) || u.email.includes(q.toLowerCase())) && (role === "all" || u.role.toLowerCase() === role));

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1">
          <Icon.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users…" className="pl-9" />
        </div>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
          <option value="all">All roles</option><option value="owner">Owner</option><option value="admin">Admin</option><option value="user">User</option>
        </select>
        <Button size="sm" onClick={() => setCreate(true)}><Icon.Plus className="h-4 w-4" /> Create User</Button>
      </div>

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-12 gap-4 border-b border-slate-100 px-5 py-2.5 text-xs font-bold uppercase text-slate-400 dark:border-white/8 md:grid">
          <span className="col-span-5">User</span><span className="col-span-2">Role</span><span className="col-span-2">Servers</span><span className="col-span-2">2FA</span><span className="col-span-1" />
        </div>
        {list.map((u) => (
          <div key={u.email} className="grid grid-cols-12 items-center gap-4 border-b border-slate-50 px-5 py-3.5 last:border-0 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/[0.03]">
            <div className="col-span-10 flex items-center gap-3 md:col-span-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-candy-400 to-brand-500 text-sm font-bold text-white">{u.avatar}</span>
              <div className="min-w-0"><p className="truncate font-semibold text-slate-800 dark:text-white">{u.name}</p><p className="truncate text-xs text-slate-400">{u.email}</p></div>
            </div>
            <span className="col-span-2 hidden md:block"><Badge tone={u.role === "Owner" ? "brand" : u.role === "Admin" ? "pink" : "slate"}>{u.role}</Badge></span>
            <span className="col-span-2 hidden text-sm font-semibold text-slate-600 dark:text-slate-300 md:block">{u.servers}</span>
            <span className="col-span-2 hidden md:block">{u.twofa ? <Badge tone="green" dot>On</Badge> : <Badge tone="slate">Off</Badge>}</span>
            <div className="col-span-2 flex justify-end md:col-span-1">
              <Dropdown trigger={<IconButton className="h-8 w-8"><Icon.Dots className="h-4 w-4" /></IconButton>}
                items={[
                  { label: "Edit", icon: <Icon.Edit className="h-4 w-4" />, onClick: () => toast({ title: "Editing user", tone: "info" }) },
                  { label: "Permissions", icon: <Icon.Shield className="h-4 w-4" />, onClick: () => toast({ title: "Permissions opened", tone: "info" }) },
                  { label: "Delete", icon: <Icon.Trash className="h-4 w-4" />, danger: true, onClick: () => setDel(u.name) },
                ]} />
            </div>
          </div>
        ))}
      </Card>

      <Modal open={create} onClose={() => setCreate(false)} title="Create User" size="lg"
        footer={<><Button variant="secondary" onClick={() => setCreate(false)}>Cancel</Button><Button onClick={() => { setCreate(false); toast({ title: "User created", tone: "success" }); }}>Create User</Button></>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="First name" /><Input label="Last name" /><Input label="Username" /><Input label="Email" type="email" />
          <Select label="Role"><option>User</option><option>Admin</option></Select>
          <Input label="Password" type="password" />
        </div>
      </Modal>
      <ConfirmDialog open={!!del} onClose={() => setDel(null)} onConfirm={() => toast({ title: `${del} deleted`, tone: "danger" })}
        title="Delete user?" message={`"${del}" and all associated data will be removed.`} confirmText="Delete user" danger />
    </>
  );
}
