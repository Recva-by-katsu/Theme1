import { useState } from "react";
import { PageHeader } from "../layouts/AppLayout";
import { Button, Input, EmptyState } from "../ui/components";
import { Icon } from "../ui/icons";
import { servers } from "../data/mock";
import { ServerCard } from "./_shared";
import { cn } from "../utils/cn";

export function Servers() {
  const [q, setQ] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState<"all" | "online" | "offline">("all");

  const filtered = servers.filter((s) => {
    const matchQ = s.name.toLowerCase().includes(q.toLowerCase()) || s.game.toLowerCase().includes(q.toLowerCase());
    const matchF = filter === "all" || (filter === "online" ? s.status === "online" : s.status !== "online");
    return matchQ && matchF;
  });

  return (
    <>
      <PageHeader
        title="Servers"
        emoji="🖥️"
        subtitle={`${servers.length} servers · managed across your infrastructure`}
        action={<Button><Icon.Plus className="h-4 w-4" /> Deploy Server</Button>}
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1">
          <Icon.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search servers…" className="pl-9" />
        </div>
        <div className="flex gap-1 rounded-xl bg-slate-100 p-1 dark:bg-white/5">
          {(["all", "online", "offline"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition",
                filter === f ? "bg-white text-brand-600 shadow-soft dark:bg-slate-800 dark:text-brand-300" : "text-slate-500 dark:text-slate-400",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-xl bg-slate-100 p-1 dark:bg-white/5">
          <button onClick={() => setView("grid")} className={cn("grid h-8 w-8 place-items-center rounded-lg transition", view === "grid" ? "bg-white text-brand-600 shadow-soft dark:bg-slate-800" : "text-slate-400")}><Icon.Grid className="h-4 w-4" /></button>
          <button onClick={() => setView("list")} className={cn("grid h-8 w-8 place-items-center rounded-lg transition", view === "list" ? "bg-white text-brand-600 shadow-soft dark:bg-slate-800" : "text-slate-400")}><Icon.List className="h-4 w-4" /></button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="🔍" title="No servers found" description="Try adjusting your search or filters." />
      ) : (
        <div className={cn(view === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3")}>
          {filtered.map((s) => <ServerCard key={s.id} server={s} />)}
        </div>
      )}
    </>
  );
}
