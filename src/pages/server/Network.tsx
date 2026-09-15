import { useState } from "react";
import { Card, Button, Badge, IconButton, useToast } from "../../ui/components";
import { Icon } from "../../ui/icons";
import { allocations } from "../../data/mock";

export function ServerNetwork() {
  const toast = useToast();
  const [list, setList] = useState(allocations);

  const makePrimary = (port: number) => {
    setList((l) => l.map((a) => ({ ...a, primary: a.port === port })));
    toast({ title: "Primary allocation updated", tone: "success" });
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">{list.length} of 5 allocations assigned</p>
        <Button size="sm" onClick={() => toast({ title: "Allocation assigned", tone: "success" })}><Icon.Plus className="h-4 w-4" /> Assign New</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {list.map((a) => (
          <Card key={a.port} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white"><Icon.Network className="h-5 w-5" /></span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono font-bold text-slate-800 dark:text-white" style={{ fontFamily: "var(--font-mono)" }}>:{a.port}</h3>
                    {a.primary && <Badge tone="brand">Primary</Badge>}
                  </div>
                  <p className="font-mono text-xs text-slate-400">{a.ip}</p>
                </div>
              </div>
              {!a.primary && (
                <IconButton className="h-8 w-8 text-rose-500" onClick={() => { setList((l) => l.filter((x) => x.port !== a.port)); toast({ title: "Allocation removed", tone: "danger" }); }}><Icon.Trash className="h-4 w-4" /></IconButton>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-white/5">
              <span className="text-xs font-semibold text-slate-400">Alias</span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{a.alias || "—"}</span>
            </div>
            {!a.primary && (
              <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => makePrimary(a.port)}>
                <Icon.Check className="h-4 w-4" /> Make Primary
              </Button>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
