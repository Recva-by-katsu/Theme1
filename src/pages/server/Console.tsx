import { useEffect, useRef, useState } from "react";
import { Card, Button, ResourceBar } from "../../ui/components";
import { Icon } from "../../ui/icons";
import type { Server } from "../../data/mock";
import { consoleLines } from "../../data/mock";
import { StatusDot } from "../_shared";
import { PowerControls } from "./ServerShell";
import { cn } from "../../utils/cn";

function colorLine(line: string) {
  if (line.includes("Done") || line.includes("Saved")) return "text-emerald-400";
  if (line.includes("WARN") || line.includes("offline")) return "text-amber-400";
  if (line.includes("ERROR") || line.includes("Exception")) return "text-rose-400";
  if (line.startsWith("[INFO] <")) return "text-sky-300";
  if (line.startsWith("[Server]")) return "text-slate-300";
  return "text-slate-400";
}

export function ServerConsole({ server }: { server: Server }) {
  const [lines, setLines] = useState<string[]>(consoleLines);
  const [cmd, setCmd] = useState("");
  const [full, setFull] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (server.status !== "online") return;
    const extra = ["[Server] Saving the game", "[INFO] Villager trade completed", "[INFO] Chunk loaded at 128,64,-256", "[Server] Autosave complete"];
    const t = setInterval(() => {
      setLines((p) => [...p.slice(-200), extra[Math.floor(Math.random() * extra.length)]]);
    }, 2600);
    return () => clearInterval(t);
  }, [server.status]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmd.trim()) return;
    setLines((p) => [...p, `> ${cmd}`]);
    setCmd("");
  };

  return (
    <div className={cn("space-y-4", full && "fixed inset-0 z-[80] bg-slate-950 p-4 space-y-3")}>
      {!full && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="flex items-center gap-3 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-500/15"><Icon.Cpu className="h-5 w-5" /></span>
            <div className="min-w-0 flex-1"><ResourceBar icon={<span />} label="CPU" value={server.cpu} max={server.cpuMax} unit="%" /></div>
          </Card>
          <Card className="flex items-center gap-3 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-candy-100 text-candy-500 dark:bg-candy-500/15"><Icon.Ram className="h-5 w-5" /></span>
            <div className="min-w-0 flex-1"><ResourceBar icon={<span />} label="RAM" value={server.ram} max={server.ramMax} unit="GB" /></div>
          </Card>
          <Card className="flex items-center gap-3 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint-100 text-mint-600 dark:bg-mint-500/15"><Icon.Disk className="h-5 w-5" /></span>
            <div className="min-w-0 flex-1"><ResourceBar icon={<span />} label="Disk" value={server.disk} max={server.diskMax} unit="GB" /></div>
          </Card>
        </div>
      )}

      <div className={cn("overflow-hidden rounded-2xl border border-slate-800 bg-[#0c0e16] shadow-xl", full && "flex-1")}>
        {/* Console top bar */}
        <div className="flex items-center gap-2 border-b border-slate-800 bg-[#12141f] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="ml-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Icon.Terminal className="h-4 w-4" /> {server.name} — console
          </span>
          <span className="ml-auto flex items-center gap-2">
            <StatusDot status={server.status} label />
            <button onClick={() => setLines([])} className="rounded-lg px-2 py-1 text-xs font-semibold text-slate-400 hover:bg-white/5 hover:text-white">Clear</button>
            <button onClick={() => setFull((f) => !f)} className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white">
              {full ? <Icon.Close className="h-4 w-4" /> : <Icon.Grid className="h-4 w-4" />}
            </button>
          </span>
        </div>

        {/* Log area */}
        <div ref={scrollRef} className={cn("overflow-y-auto p-4 font-mono text-[13px] leading-relaxed", full ? "h-[calc(100vh-180px)]" : "h-[380px]")} style={{ fontFamily: "var(--font-mono)" }}>
          {lines.length === 0 ? (
            <p className="text-slate-600">Console cleared. Waiting for output…</p>
          ) : lines.map((l, i) => (
            <div key={i} className={cn("whitespace-pre-wrap break-words", l.startsWith(">") ? "text-brand-300" : colorLine(l))}>{l}</div>
          ))}
        </div>

        {/* Command input */}
        <form onSubmit={send} className="flex items-center gap-2 border-t border-slate-800 bg-[#12141f] p-3">
          <span className="pl-1 font-mono text-emerald-400">$</span>
          <input
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            placeholder="Type a command…"
            className="flex-1 bg-transparent font-mono text-sm text-slate-200 outline-none placeholder:text-slate-600"
            style={{ fontFamily: "var(--font-mono)" }}
          />
          <Button type="submit" size="sm"><Icon.Play className="h-3.5 w-3.5" /> Send</Button>
        </form>
      </div>

      {full && <PowerControls status={server.status} size="sm" />}
    </div>
  );
}
