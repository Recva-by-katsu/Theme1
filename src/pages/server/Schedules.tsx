import { useState } from "react";
import { Card, Button, Badge, Toggle, Modal, Input, Select, useToast } from "../../ui/components";
import { Icon } from "../../ui/icons";
import { schedules as data } from "../../data/mock";

export function ServerSchedules() {
  const toast = useToast();
  const [list, setList] = useState(data);
  const [create, setCreate] = useState(false);

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">Automate tasks with cron-based schedules</p>
        <Button size="sm" onClick={() => setCreate(true)}><Icon.Plus className="h-4 w-4" /> New Schedule</Button>
      </div>

      <div className="space-y-3">
        {list.map((s, idx) => (
          <Card key={s.name} hover className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-sun-400 to-sun-500 text-white"><Icon.Clock className="h-5 w-5" /></span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800 dark:text-white">{s.name}</h3>
                    <Badge tone={s.status ? "green" : "slate"} dot>{s.status ? "Active" : "Paused"}</Badge>
                  </div>
                  <p className="font-mono text-xs text-slate-400">{s.cron}</p>
                </div>
              </div>
              <div className="grid flex-1 grid-cols-3 gap-4 text-center sm:text-left">
                <div><p className="text-[11px] font-semibold uppercase text-slate-400">Next run</p><p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{s.next}</p></div>
                <div><p className="text-[11px] font-semibold uppercase text-slate-400">Last run</p><p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{s.last}</p></div>
                <div><p className="text-[11px] font-semibold uppercase text-slate-400">Tasks</p><p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{s.tasks}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <Toggle checked={s.status} onChange={(v) => { setList((l) => l.map((x, i) => i === idx ? { ...x, status: v } : x)); toast({ title: v ? "Schedule enabled" : "Schedule paused", tone: "info" }); }} />
                <Button variant="secondary" size="sm"><Icon.Edit className="h-4 w-4" /></Button>
                <Button variant="success" size="sm"><Icon.Play className="h-4 w-4" /> Run now</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={create} onClose={() => setCreate(false)} title="Create Schedule" size="lg"
        footer={<><Button variant="secondary" onClick={() => setCreate(false)}>Cancel</Button><Button onClick={() => { setCreate(false); toast({ title: "Schedule created", tone: "success" }); }}>Create Schedule</Button></>}>
        <div className="space-y-4">
          <Input label="Schedule name" placeholder="Nightly Restart" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {["Minute", "Hour", "Day (month)", "Month", "Day (week)"].map((l, i) => <Input key={l} label={l} defaultValue={i === 0 ? "0" : "*"} />)}
          </div>
          <div className="rounded-xl border border-slate-200 p-4 dark:border-white/8">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200"><Icon.List className="h-4 w-4" /> Task Builder</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <Select label="Action"><option>Send command</option><option>Send power action</option><option>Create backup</option></Select>
              <Input label="Payload" placeholder="say Server restarting in 5m" />
            </div>
            <Button variant="outline" size="sm" className="mt-3"><Icon.Plus className="h-4 w-4" /> Add another task</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
