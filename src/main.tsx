import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import NotFound from "@/components/NotFound";
import AuthContextProvider from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  defaultViewTransition: true,
  defaultNotFoundComponent: NotFound,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnMount: true, refetchOnWindowFocus: true },
  },
});

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster toastOptions={{ duration: 500 }} />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthContextProvider>
    </StrictMode>,
  );
}
