import { useState } from "react";
import { Card, Button, Input, Select, Toggle, Tabs, useToast } from "../../ui/components";
import { Icon } from "../../ui/icons";

export function AdminSettings() {
  const toast = useToast();
  const [tab, setTab] = useState("general");
  const [reg, setReg] = useState(false);
  const [maint, setMaint] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: <Icon.Settings className="h-4 w-4" /> },
    { id: "mail", label: "Mail", icon: <Icon.Bell className="h-4 w-4" /> },
    { id: "security", label: "Security", icon: <Icon.Shield className="h-4 w-4" /> },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "general" && (
        <Card className="p-6">
          <h3 className="mb-4 font-bold text-slate-800 dark:text-white">General Configuration</h3>
          <div className="space-y-4">
            <Input label="Panel name" defaultValue="ArenaPanel" />
            <Input label="Panel URL" defaultValue="https://panel.arena.gg" />
            <Select label="Default language"><option>English</option><option>Bahasa Indonesia</option><option>Deutsch</option></Select>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-white/5">
              <div><p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Open registration</p><p className="text-xs text-slate-400">Allow new users to sign up.</p></div>
              <Toggle checked={reg} onChange={setReg} />
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-white/5">
              <div><p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Maintenance mode</p><p className="text-xs text-slate-400">Temporarily disable the panel for users.</p></div>
              <Toggle checked={maint} onChange={setMaint} />
            </div>
          </div>
          <div className="mt-5 flex justify-end"><Button onClick={() => toast({ title: "Settings saved", tone: "success" })}><Icon.Check className="h-4 w-4" /> Save</Button></div>
        </Card>
      )}

      {tab === "mail" && (
        <Card className="p-6">
          <h3 className="mb-4 font-bold text-slate-800 dark:text-white">Mail Settings</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Driver"><option>SMTP</option><option>Mailgun</option><option>Sendmail</option></Select>
            <Input label="From address" defaultValue="no-reply@arena.gg" />
            <Input label="SMTP host" defaultValue="smtp.arena.gg" />
            <Input label="SMTP port" type="number" defaultValue={587} />
            <Input label="Username" defaultValue="postmaster" />
            <Input label="Password" type="password" placeholder="••••••••" />
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="outline" onClick={() => toast({ title: "Test email sent", tone: "info" })}>Send test</Button>
            <Button onClick={() => toast({ title: "Mail settings saved", tone: "success" })}>Save</Button>
          </div>
        </Card>
      )}

      {tab === "security" && (
        <Card className="p-6">
          <h3 className="mb-4 font-bold text-slate-800 dark:text-white">Security Policies</h3>
          <div className="space-y-4">
            <Select label="Require 2FA"><option>Not required</option><option>Admins only</option><option>All users</option></Select>
            <Input label="Session lifetime (minutes)" type="number" defaultValue={120} />
            <Input label="reCAPTCHA site key" placeholder="6Lc…" />
          </div>
          <div className="mt-5 flex justify-end"><Button onClick={() => toast({ title: "Security settings saved", tone: "success" })}>Save</Button></div>
        </Card>
      )}
    </div>
  );
}
