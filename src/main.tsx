import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import NotFound from "@/components/NotFound";
import AuthContextProvider, {
  type AuthContextType,
} from "./contexts/AuthContext";
import ThemeContextProvider from "./contexts/ThemeContext";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import useAuth from "./hooks/useAuth";

export type RouterContext = {
  queryClient: QueryClient;
  auth: AuthContextType | undefined;
};

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

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  defaultViewTransition: true,
  defaultNotFoundComponent: NotFound,
  defaultPendingMinMs: 0,
  context: {
    auth: undefined,
    queryClient,
  },
});

const RootElement = () => {
  const auth = useAuth();
  return <RouterProvider context={{ auth }} router={router} />;
};

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeContextProvider>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <Toaster toastOptions={{ duration: 500 }} />
            <RootElement />
          </AuthContextProvider>
        </QueryClientProvider>
      </ThemeContextProvider>
    </StrictMode>,
  );
}
