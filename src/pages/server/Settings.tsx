import { useState } from "react";
import { Button, Input, Textarea, Alert, IconButton, ConfirmDialog, useToast } from "../../ui/components";
import { Icon } from "../../ui/icons";
import type { Server } from "../../data/mock";
import { ServerSubCard } from "./ServerShell";

export function ServerSettings({ server }: { server: Server }) {
  const toast = useToast();
  const [reinstall, setReinstall] = useState(false);
  const [del, setDel] = useState(false);
  const [showSftp, setShowSftp] = useState(false);

  return (
    <div className="space-y-6">
      <ServerSubCard title="Server Details" action={<Button size="sm" onClick={() => toast({ title: "Details saved", tone: "success" })}><Icon.Check className="h-4 w-4" /> Save</Button>}>
        <div className="space-y-4">
          <Input label="Server name" defaultValue={server.name} />
          <Textarea label="Description" rows={3} defaultValue="Our community survival server. Griefing is not allowed." />
        </div>
      </ServerSubCard>

      <ServerSubCard title="SFTP Details">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 px-4 py-3 dark:bg-white/5">
            <p className="text-[11px] font-semibold uppercase text-slate-400">Connection</p>
            <p className="font-mono text-sm text-slate-700 dark:text-slate-200">sftp://{server.node.replace(/ /g, "").toLowerCase()}.arena.gg:2022</p>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-white/5">
            <div><p className="text-[11px] font-semibold uppercase text-slate-400">Username</p><p className="font-mono text-sm text-slate-700 dark:text-slate-200">{showSftp ? "alex.a1b2c3" : "••••••••••"}</p></div>
            <IconButton className="h-8 w-8" onClick={() => setShowSftp((s) => !s)}>{showSftp ? <Icon.EyeOff className="h-4 w-4" /> : <Icon.Eye className="h-4 w-4" />}</IconButton>
          </div>
        </div>
      </ServerSubCard>

      {/* Danger zone */}
      <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/50 p-1 dark:border-rose-500/25 dark:bg-rose-500/5">
        <div className="rounded-xl p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-rose-600 dark:text-rose-400"><Icon.Warning className="h-4 w-4" /> Danger Zone</h3>
          <div className="mt-4 space-y-4">
            <Alert tone="warning" title="Reinstall Server">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span>Reinstalling will re-run the installation script. Your files may be affected.</span>
                <Button variant="secondary" size="sm" onClick={() => setReinstall(true)} className="shrink-0"><Icon.Refresh className="h-4 w-4" /> Reinstall</Button>
              </div>
            </Alert>
            <Alert tone="danger" title="Delete Server">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span>Permanently delete this server and all of its data. This cannot be undone.</span>
                <Button variant="danger" size="sm" onClick={() => setDel(true)} className="shrink-0"><Icon.Trash className="h-4 w-4" /> Delete</Button>
              </div>
            </Alert>
          </div>
        </div>
      </div>

      <ConfirmDialog open={reinstall} onClose={() => setReinstall(false)} onConfirm={() => toast({ title: "Reinstall started", tone: "info" })}
        title="Reinstall server?" message="The install script will run again. Some configuration files may be overwritten." confirmText="Reinstall" />
      <ConfirmDialog open={del} onClose={() => setDel(false)} onConfirm={() => toast({ title: "Server scheduled for deletion", tone: "danger" })}
        title="Delete this server?" message={`Type the server name to confirm. All data for "${server.name}" will be destroyed forever.`} confirmText="Delete forever" danger />
    </div>
  );
}
