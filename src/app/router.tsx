import { createContext, useContext, useState, type ReactNode } from "react";

export type Route =
  | { name: "login" }
  | { name: "dashboard" }
  | { name: "servers" }
  | { name: "server"; id: string; tab: ServerTab }
  | { name: "account"; tab: AccountTab }
  | { name: "admin"; page: AdminPage }
  | { name: "404" }
  | { name: "500" };

export type ServerTab =
  | "overview" | "console" | "files" | "databases" | "schedules"
  | "backups" | "network" | "startup" | "settings";

export type AccountTab = "profile" | "security" | "api" | "sessions";

export type AdminPage =
  | "overview" | "users" | "servers" | "nodes" | "locations"
  | "nests" | "eggs" | "settings";

const RouterCtx = createContext<{ route: Route; go: (r: Route) => void }>({
  route: { name: "login" },
  go: () => {},
});

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>({ name: "login" });
  const go = (r: Route) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  return <RouterCtx.Provider value={{ route, go }}>{children}</RouterCtx.Provider>;
}

export const useRouter = () => useContext(RouterCtx);
