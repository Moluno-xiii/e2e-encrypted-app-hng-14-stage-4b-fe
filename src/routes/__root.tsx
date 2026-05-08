import type { RouterContext } from "@/main";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => {
  return (
    <main className="flex min-h-dvh w-full">
      <Outlet />
      <TanStackRouterDevtools />
    </main>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
