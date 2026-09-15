import { cn } from "../../utils/cn";
import { Icon, type IconName } from "../../ui/icons";
import { useRouter, type AdminPage } from "../../app/router";
import { AdminOverview } from "./Overview";
import { AdminUsers } from "./Users";
import { AdminServers } from "./Servers";
import { AdminNodes } from "./Nodes";
import { AdminLocations } from "./Locations";
import { AdminNests } from "./Nests";
import { AdminEggs } from "./Eggs";
import { AdminSettings } from "./Settings";

const nav: { id: AdminPage; label: string; icon: IconName }[] = [
  { id: "overview", label: "Overview", icon: "Dashboard" },
  { id: "users", label: "Users", icon: "Users" },
  { id: "servers", label: "Servers", icon: "Server" },
  { id: "nodes", label: "Nodes", icon: "Grid" },
  { id: "locations", label: "Locations", icon: "Location" },
  { id: "nests", label: "Nests", icon: "Egg" },
  { id: "eggs", label: "Eggs", icon: "Egg" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

export function AdminShell({ page }: { page: AdminPage }) {
  const { go } = useRouter();
  const content = () => {
    switch (page) {
      case "overview": return <AdminOverview />;
      case "users": return <AdminUsers />;
      case "servers": return <AdminServers />;
      case "nodes": return <AdminNodes />;
      case "locations": return <AdminLocations />;
      case "nests": return <AdminNests />;
      case "eggs": return <AdminEggs />;
      case "settings": return <AdminSettings />;
    }
  };

  return (
    <>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white dark:from-brand-500 dark:to-brand-700"><Icon.Shield className="h-6 w-6" /></span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Admin Panel</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">System-wide configuration & management</p>
        </div>
      </div>

      <div className="mb-6 -mx-1 flex gap-1 overflow-x-auto px-1 no-scrollbar">
        {nav.map((n) => {
          const IconCmp = Icon[n.icon];
          const active = page === n.id;
          return (
            <button
              key={n.id}
              onClick={() => go({ name: "admin", page: n.id })}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all",
                active ? "bg-slate-800 text-white shadow dark:bg-brand-500" : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5",
              )}
            >
              <IconCmp className="h-4 w-4" /> {n.label}
            </button>
          );
        })}
      </div>

      <div key={page} className="animate-[fade-in_0.3s_ease]">{content()}</div>
    </>
  );
}
