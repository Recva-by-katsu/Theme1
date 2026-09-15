import { useState } from "react";
import { Card, Button, Input, Dropdown, IconButton, Modal, ConfirmDialog, useToast } from "../../ui/components";
import { Icon } from "../../ui/icons";
import { files as fileData, type FileItem } from "../../data/mock";
import { cn } from "../../utils/cn";

const extIcon: Record<string, string> = { properties: "⚙️", jar: "☕", txt: "📄", sh: "📜", json: "🔧" };

const sampleCode = `# Minecraft server properties
# Managed by ArenaPanel
server-port=25565
max-players=60
motd=\\u00A76Welcome to Survival Realms!
difficulty=hard
gamemode=survival
white-list=true
online-mode=true
view-distance=10
spawn-protection=16
enable-command-block=true`;

export function ServerFiles() {
  const toast = useToast();
  const [path, setPath] = useState(["home", "container"]);
  const [editing, setEditing] = useState<string | null>(null);
  const [code, setCode] = useState(sampleCode);
  const [newFolder, setNewFolder] = useState(false);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const list = fileData.filter((f) => f.name.toLowerCase().includes(q.toLowerCase()));

  if (editing) {
    return (
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 dark:border-white/8">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => setEditing(null)} className="flex items-center gap-1 font-semibold text-slate-500 hover:text-brand-600"><Icon.Chevron className="h-4 w-4 rotate-180" /> Files</button>
            <Icon.Chevron className="h-3.5 w-3.5 text-slate-300" />
            <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">{editing}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setEditing(null)}>Cancel</Button>
            <Button size="sm" onClick={() => { toast({ title: "File saved successfully", tone: "success" }); setEditing(null); }}><Icon.Check className="h-3.5 w-3.5" /> Save</Button>
          </div>
        </div>
        <div className="flex bg-[#0c0e16] font-mono text-[13px]" style={{ fontFamily: "var(--font-mono)" }}>
          <div className="select-none py-3 pl-4 pr-3 text-right text-slate-600">
            {code.split("\n").map((_, i) => <div key={i} className="leading-6">{i + 1}</div>)}
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="min-h-[420px] flex-1 resize-none bg-transparent py-3 pr-4 leading-6 text-slate-200 outline-none"
          />
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-1.5 overflow-x-auto rounded-xl bg-slate-100 px-3 py-2 no-scrollbar dark:bg-white/5">
          <Icon.Home className="h-4 w-4 shrink-0 text-slate-400" />
          {path.map((p, i) => (
            <span key={i} className="flex shrink-0 items-center gap-1.5 text-sm">
              <Icon.Chevron className="h-3 w-3 text-slate-300" />
              <button onClick={() => setPath(path.slice(0, i + 1))} className={cn("font-medium", i === path.length - 1 ? "text-slate-700 dark:text-slate-200" : "text-slate-400 hover:text-brand-600")}>{p}</button>
            </span>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={() => setNewFolder(true)}><Icon.Folder className="h-4 w-4" /> New Folder</Button>
        <Button variant="outline" size="sm"><Icon.Upload className="h-4 w-4" /> Upload</Button>
        <Button size="sm"><Icon.Plus className="h-4 w-4" /> New File</Button>
      </div>

      <div className="mb-3 relative max-w-xs">
        <Icon.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search files…" className="pl-9" />
      </div>

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-12 gap-4 border-b border-slate-100 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-slate-400 dark:border-white/8 sm:grid">
          <span className="col-span-6">Name</span><span className="col-span-2">Size</span><span className="col-span-3">Modified</span><span className="col-span-1" />
        </div>
        {list.map((f) => (
          <FileRow key={f.name} file={f} onOpen={() => { if (f.type === "folder") setPath([...path, f.name]); else { setEditing(f.name); setCode(sampleCode); } }} onDelete={() => setConfirmDel(f.name)} onRename={() => toast({ title: "Rename dialog opened", tone: "info" })} onDownload={() => toast({ title: `Downloading ${f.name}`, tone: "info" })} />
        ))}
      </Card>

      <Modal open={newFolder} onClose={() => setNewFolder(false)} title="Create New Folder"
        footer={<><Button variant="secondary" onClick={() => setNewFolder(false)}>Cancel</Button><Button onClick={() => { setNewFolder(false); toast({ title: "Folder created", tone: "success" }); }}>Create</Button></>}>
        <Input label="Folder name" placeholder="new-folder" autoFocus />
      </Modal>

      <ConfirmDialog open={!!confirmDel} onClose={() => setConfirmDel(null)} onConfirm={() => toast({ title: `${confirmDel} deleted`, tone: "danger" })}
        title="Delete file?" message={`This will permanently delete "${confirmDel}". This cannot be undone.`} confirmText="Delete" danger />
    </>
  );
}

function FileRow({ file, onOpen, onDelete, onRename, onDownload }: { file: FileItem; onOpen: () => void; onDelete: () => void; onRename: () => void; onDownload: () => void }) {
  return (
    <div className="group grid grid-cols-12 items-center gap-4 border-b border-slate-50 px-5 py-3 transition hover:bg-slate-50 last:border-0 dark:border-white/5 dark:hover:bg-white/[0.03]">
      <button onClick={onOpen} className="col-span-6 flex items-center gap-3 text-left">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-lg dark:bg-white/5">
          {file.type === "folder" ? "📁" : (extIcon[file.ext ?? ""] ?? "📄")}
        </span>
        <span className="truncate text-sm font-semibold text-slate-700 group-hover:text-brand-600 dark:text-slate-200">{file.name}</span>
      </button>
      <span className="col-span-2 hidden text-sm text-slate-400 sm:block">{file.size}</span>
      <span className="col-span-3 hidden text-sm text-slate-400 sm:block">{file.modified}</span>
      <div className="col-span-6 flex justify-end sm:col-span-1">
        <Dropdown
          trigger={<IconButton className="h-8 w-8 opacity-0 group-hover:opacity-100"><Icon.Dots className="h-4 w-4" /></IconButton>}
          items={[
            { label: "Rename", icon: <Icon.Edit className="h-4 w-4" />, onClick: onRename },
            { label: "Download", icon: <Icon.Download className="h-4 w-4" />, onClick: onDownload },
            { label: "Delete", icon: <Icon.Trash className="h-4 w-4" />, onClick: onDelete, danger: true },
          ]}
        />
      </div>
    </div>
  );
}
