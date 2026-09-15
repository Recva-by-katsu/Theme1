import { ThemeProvider } from "./ui/theme";
import { ToastProvider } from "./ui/components";
import { RouterProvider, useRouter } from "./app/router";
import { AppLayout } from "./layouts/AppLayout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Servers } from "./pages/Servers";
import { ServerShell } from "./pages/server/ServerShell";
import { Account } from "./pages/Account";
import { AdminShell } from "./pages/admin/AdminShell";
import { ErrorPage } from "./pages/ErrorPages";

function Routes() {
  const { route } = useRouter();

  if (route.name === "login") return <Login />;

  return (
    <AppLayout>
      {route.name === "dashboard" && <Dashboard />}
      {route.name === "servers" && <Servers />}
      {route.name === "server" && <ServerShell id={route.id} tab={route.tab} />}
      {route.name === "account" && <Account tab={route.tab} />}
      {route.name === "admin" && <AdminShell page={route.page} />}
      {route.name === "404" && <ErrorPage code="404" />}
      {route.name === "500" && <ErrorPage code="500" />}
    </AppLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <ToastProvider>
          <Routes />
        </ToastProvider>
      </RouterProvider>
    </ThemeProvider>
  );
}
