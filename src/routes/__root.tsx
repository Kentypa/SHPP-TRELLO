import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import type { store } from "../store/store";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Button } from "../shared/components/ui/Button";
import { useLogout } from "../shared/hooks/use-logout";
import { useSelector } from "react-redux";
import { authSelector } from "../store/selectors/auth-selector";
import MainPageIcon from "../assets/icons/apps.svg?react";
import LoginIcon from "../assets/icons/enter.svg?react";
import LogoutIcon from "../assets/icons/sign-out-alt.svg?react";
import { useMemo } from "react";

interface MyRouterContext {
  store: typeof store;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const authorized = useSelector(authSelector);
  const { handleLogout } = useLogout();
  const navigate = useNavigate();

  const authConfig = useMemo(
    () =>
      authorized
        ? { icon: LogoutIcon, action: handleLogout, label: "Logout" }
        : {
            icon: LoginIcon,
            action: () =>
              navigate({ to: "/sign-in", search: { redirect: "" } }),
            label: "Login",
          },
    [authorized, handleLogout, navigate],
  );

  return (
    <>
      <header className="flex p-3 bg-neutral-800 text-neutral-300 fill-neutral-300 justify-between items-center">
        <Link
          to="/"
          className="flex gap-4 items-center hover:text-blue-500 hover:fill-blue-500"
        >
          <MainPageIcon className="size-text" />
          <h1 className="font-bold">Trello from Temu</h1>
        </Link>

        <Button
          onClick={authConfig.action}
          className="flex gap-4 items-center hover:text-blue-500 hover:fill-blue-500"
        >
          <authConfig.icon className="size-text" />
          {authConfig.label}
        </Button>
      </header>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
