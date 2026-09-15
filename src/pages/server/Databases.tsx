import { useState } from "react";
import { Card, Button, Badge, IconButton, Modal, Input, ConfirmDialog, useToast, EmptyState } from "../../ui/components";
import { Icon } from "../../ui/icons";
import { databases } from "../../data/mock";

export function ServerDatabases() {
  const toast = useToast();
  const [show, setShow] = useState<Record<string, boolean>>({});
  const [create, setCreate] = useState(false);
  const [del, setDel] = useState<string | null>(null);

  const copy = (v: string) => { navigator.clipboard?.writeText(v); toast({ title: "Copied to clipboard", tone: "success" }); };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">{databases.length} of 4 databases used</p>
        <Button size="sm" onClick={() => setCreate(true)}><Icon.Plus className="h-4 w-4" /> New Database</Button>
      </div>

      {databases.length === 0 ? (
        <EmptyState icon="🗄️" title="No databases yet" description="Create a MySQL database to get started." action={<Button onClick={() => setCreate(true)}>Create Database</Button>} />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {databases.map((db) => (
            <Card key={db.name} className="overflow-hidden">
              <div className="flex items-center gap-3 border-b border-slate-100 p-5 dark:border-white/8">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white"><Icon.Database className="h-5 w-5" /></span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-bold text-slate-800 dark:text-white">{db.name}</h3>
                  <p className="text-xs text-slate-400">{db.size} · {db.connections} connections</p>
                </div>
                <Badge tone="green" dot>Active</Badge>
              </div>
              <div className="space-y-2.5 p-5 text-sm">
                <Field label="Host" value={`${db.host}:${db.port}`} onCopy={copy} />
                <Field label="Username" value={db.user} onCopy={copy} />
                <Field label="Password" value={show[db.name] ? "s3cr3t-P@ss-2026" : "••••••••••••"} secret shown={!!show[db.name]} onToggle={() => setShow((s) => ({ ...s, [db.name]: !s[db.name] }))} onCopy={() => copy("s3cr3t-P@ss-2026")} />
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => toast({ title: "Password rotated", tone: "success" })}><Icon.Refresh className="h-4 w-4" /> Rotate</Button>
                  <Button variant="danger" size="sm" className="flex-1" onClick={() => setDel(db.name)}><Icon.Trash className="h-4 w-4" /> Delete</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={create} onClose={() => setCreate(false)} title="Create New Database"
        footer={<><Button variant="secondary" onClick={() => setCreate(false)}>Cancel</Button><Button onClick={() => { setCreate(false); toast({ title: "Database created", tone: "success" }); }}>Create</Button></>}>
        <div className="space-y-4">
          <Input label="Database name" placeholder="s1_myapp" />
          <Input label="Allowed connections (host)" defaultValue="%" hint="Use % to allow connections from anywhere." />
        </div>
      </Modal>

      <ConfirmDialog open={!!del} onClose={() => setDel(null)} onConfirm={() => toast({ title: `Database ${del} deleted`, tone: "danger" })}
        title="Delete database?" message={`All data in "${del}" will be permanently lost.`} confirmText="Delete database" danger />
    </>
  );
}

function Field({ label, value, secret, shown, onToggle, onCopy }: { label: string; value: string; secret?: boolean; shown?: boolean; onToggle?: () => void; onCopy: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2 dark:bg-white/5">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="truncate font-mono text-sm text-slate-700 dark:text-slate-200" style={{ fontFamily: "var(--font-mono)" }}>{value}</p>
      </div>
      <div className="flex shrink-0 gap-1">
        {secret && <IconButton className="h-8 w-8" onClick={onToggle}>{shown ? <Icon.EyeOff className="h-4 w-4" /> : <Icon.Eye className="h-4 w-4" />}</IconButton>}
        <IconButton className="h-8 w-8" onClick={() => onCopy(value)}><Icon.Copy className="h-4 w-4" /></IconButton>
      </div>
    </div>
  );
}
