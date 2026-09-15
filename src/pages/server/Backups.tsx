import { useState } from "react";
import { Card, Button, Badge, Dropdown, IconButton, ConfirmDialog, Progress, useToast } from "../../ui/components";
import { Icon } from "../../ui/icons";
import { backups } from "../../data/mock";

export function ServerBackups() {
  const toast = useToast();
  const [del, setDel] = useState<string | null>(null);
  const used = 4; const max = 10;

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Backup slots</p>
            <p className="text-xs text-slate-400">{used} / {max} used</p>
          </div>
          <div className="max-w-xs"><Progress value={(used / max) * 100} tone="brand" /></div>
        </div>
        <Button size="sm" onClick={() => toast({ title: "Creating backup…", tone: "info" })}><Icon.Plus className="h-4 w-4" /> Create Backup</Button>
      </div>

      <Card className="overflow-hidden">
        {backups.map((b) => {
          const creating = b.status === "creating";
          return (
            <div key={b.name} className="group flex items-center gap-4 border-b border-slate-50 px-5 py-4 transition hover:bg-slate-50 last:border-0 dark:border-white/5 dark:hover:bg-white/[0.03]">
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white ${creating ? "bg-slate-400 animate-[pulse-soft_2s_infinite]" : "bg-gradient-to-br from-mint-400 to-mint-600"}`}><Icon.Backup className="h-5 w-5" /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-bold text-slate-800 dark:text-white">{b.name}</h3>
                  {b.locked && <Icon.Lock className="h-3.5 w-3.5 text-amber-500" />}
                </div>
                <p className="text-xs text-slate-400">{b.size} · {b.date}</p>
                {creating && <div className="mt-1.5 max-w-[160px]"><Progress value={64} tone="amber" /></div>}
              </div>
              {creating ? <Badge tone="amber" dot>Creating</Badge> : <Badge tone="green" dot>Complete</Badge>}
              {!creating && (
                <Dropdown
                  trigger={<IconButton className="h-8 w-8"><Icon.Dots className="h-4 w-4" /></IconButton>}
                  items={[
                    { label: "Download", icon: <Icon.Download className="h-4 w-4" />, onClick: () => toast({ title: "Downloading backup", tone: "info" }) },
                    { label: "Restore", icon: <Icon.Restart className="h-4 w-4" />, onClick: () => toast({ title: "Restore started", tone: "info" }) },
                    { label: b.locked ? "Unlock" : "Lock", icon: <Icon.Lock className="h-4 w-4" />, onClick: () => toast({ title: b.locked ? "Backup unlocked" : "Backup locked", tone: "success" }) },
                    { label: "Delete", icon: <Icon.Trash className="h-4 w-4" />, danger: true, onClick: () => setDel(b.name) },
                  ]}
                />
              )}
            </div>
          );
        })}
      </Card>

      <ConfirmDialog open={!!del} onClose={() => setDel(null)} onConfirm={() => toast({ title: `Backup ${del} deleted`, tone: "danger" })}
        title="Delete backup?" message={`"${del}" will be permanently removed and cannot be recovered.`} confirmText="Delete backup" danger />
    </>
  );
}
