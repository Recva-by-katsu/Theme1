import { useState } from "react";
import { PageHeader } from "../layouts/AppLayout";
import { Card, Button, Input, Badge, Tabs, Toggle, Alert, IconButton, Modal, ConfirmDialog, useToast } from "../ui/components";
import { Icon } from "../ui/icons";
import { apiKeys, sessions } from "../data/mock";
import { useRouter, type AccountTab } from "../app/router";

export function Account({ tab }: { tab: AccountTab }) {
  const { go } = useRouter();
  const tabs = [
    { id: "profile", label: "Profile", icon: <Icon.User className="h-4 w-4" /> },
    { id: "security", label: "Security", icon: <Icon.Shield className="h-4 w-4" /> },
    { id: "api", label: "API Keys", icon: <Icon.Key className="h-4 w-4" /> },
    { id: "sessions", label: "Sessions", icon: <Icon.Console className="h-4 w-4" /> },
  ];

  return (
    <>
      <PageHeader title="Account Settings" emoji="👤" subtitle="Manage your profile, security and integrations." />
      <div className="max-w-3xl">
        <div className="mb-6"><Tabs tabs={tabs} active={tab} onChange={(id) => go({ name: "account", tab: id as AccountTab })} /></div>
        {tab === "profile" && <Profile />}
        {tab === "security" && <Security />}
        {tab === "api" && <ApiKeys />}
        {tab === "sessions" && <Sessions />}
      </div>
    </>
  );
}

function Profile() {
  const toast = useToast();
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <span className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-candy-400 to-brand-500 text-2xl font-extrabold text-white">AR</span>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Alex Rivera</h3>
            <p className="text-sm text-slate-400">alex@arena.gg</p>
            <Button variant="outline" size="sm" className="mt-2"><Icon.Upload className="h-4 w-4" /> Change avatar</Button>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="mb-4 font-bold text-slate-800 dark:text-white">Personal Info</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="First name" defaultValue="Alex" />
          <Input label="Last name" defaultValue="Rivera" />
          <Input label="Username" defaultValue="alexr" />
          <Input label="Email" type="email" defaultValue="alex@arena.gg" />
        </div>
        <div className="mt-5 flex justify-end"><Button onClick={() => toast({ title: "Profile updated", tone: "success" })}><Icon.Check className="h-4 w-4" /> Save Changes</Button></div>
      </Card>
    </div>
  );
}

function Security() {
  const toast = useToast();
  const [tfa, setTfa] = useState(true);
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-4 font-bold text-slate-800 dark:text-white">Change Password</h3>
        <div className="space-y-4">
          <Input label="Current password" type="password" placeholder="••••••••" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="New password" type="password" placeholder="••••••••" />
            <Input label="Confirm password" type="password" placeholder="••••••••" />
          </div>
        </div>
        <div className="mt-5 flex justify-end"><Button onClick={() => toast({ title: "Password changed", tone: "success" })}>Update Password</Button></div>
      </Card>
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">Two-Factor Authentication {tfa && <Badge tone="green" dot>Enabled</Badge>}</h3>
            <p className="mt-1 text-sm text-slate-400">Add an extra layer of security to your account.</p>
          </div>
          <Toggle checked={tfa} onChange={(v) => { setTfa(v); toast({ title: v ? "2FA enabled" : "2FA disabled", tone: v ? "success" : "danger" }); }} />
        </div>
        {tfa && <Alert tone="success"><span className="text-sm">Your account is protected with an authenticator app.</span></Alert>}
      </Card>
    </div>
  );
}

function ApiKeys() {
  const toast = useToast();
  const [create, setCreate] = useState(false);
  const [del, setDel] = useState<string | null>(null);
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">Use API keys to interact with ArenaPanel programmatically.</p>
        <Button size="sm" onClick={() => setCreate(true)}><Icon.Plus className="h-4 w-4" /> Create Key</Button>
      </div>
      <Card className="overflow-hidden">
        {apiKeys.map((k) => (
          <div key={k.key} className="flex items-center gap-4 border-b border-slate-50 px-5 py-4 last:border-0 dark:border-white/5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-500/15"><Icon.Key className="h-5 w-5" /></span>
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-slate-800 dark:text-white">{k.desc}</h3>
              <p className="font-mono text-xs text-slate-400">{k.key} · created {k.created}</p>
            </div>
            <span className="hidden text-xs text-slate-400 sm:block">Last used {k.last}</span>
            <IconButton className="h-8 w-8 text-rose-500" onClick={() => setDel(k.desc)}><Icon.Trash className="h-4 w-4" /></IconButton>
          </div>
        ))}
      </Card>
      <Modal open={create} onClose={() => setCreate(false)} title="Create API Key"
        footer={<><Button variant="secondary" onClick={() => setCreate(false)}>Cancel</Button><Button onClick={() => { setCreate(false); toast({ title: "API key created", tone: "success" }); }}>Create</Button></>}>
        <div className="space-y-4">
          <Input label="Description" placeholder="What is this key for?" />
          <Input label="Allowed IPs (optional)" placeholder="Leave blank to allow all" />
        </div>
      </Modal>
      <ConfirmDialog open={!!del} onClose={() => setDel(null)} onConfirm={() => toast({ title: "API key revoked", tone: "danger" })}
        title="Revoke API key?" message={`Applications using "${del}" will immediately lose access.`} confirmText="Revoke" danger />
    </>
  );
}

function Sessions() {
  const toast = useToast();
  return (
    <Card className="overflow-hidden">
      {sessions.map((s) => (
        <div key={s.ip} className="flex items-center gap-4 border-b border-slate-50 px-5 py-4 last:border-0 dark:border-white/5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-500 dark:bg-white/5"><Icon.Console className="h-5 w-5" /></span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2"><h3 className="truncate font-semibold text-slate-800 dark:text-white">{s.device}</h3>{s.current && <Badge tone="green" dot>This device</Badge>}</div>
            <p className="text-xs text-slate-400">{s.ip} · {s.location} · {s.last}</p>
          </div>
          {!s.current && <Button variant="outline" size="sm" onClick={() => toast({ title: "Session revoked", tone: "danger" })}>Revoke</Button>}
        </div>
      ))}
    </Card>
  );
}
