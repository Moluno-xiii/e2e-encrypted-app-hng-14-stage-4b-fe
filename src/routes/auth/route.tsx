import FullScreenLoader from "@/components/FullScreenLoader";
import Logo from "@/components/Logo";
import useAuth from "@/hooks/useAuth";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import AuthWrapperUI from "./-components/AuthUiWrapper";

const RouteComponent = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) return;
    if (user) navigate({ to: "/chat", replace: true });
  }, [user, navigate]);

  if (isLoading || user) return <FullScreenLoader />;

  return (
    <div className="bg-page text-ink relative grid min-h-dvh w-full grid-cols-1 overflow-hidden lg:grid-cols-2">
      <AuthWrapperUI />
      <section className="relative z-10 flex flex-col items-center justify-center px-6 py-12 lg:py-12">
        <Logo className="mb-8 lg:hidden" />
        <div className="fade-in w-full max-w-md">
          <div className="bg-surface border-line shadow-card relative rounded-2xl border p-7 sm:p-8">
            <span
              aria-hidden
              className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-[color-mix(in_srgb,var(--c-ink)_18%,transparent)] to-transparent"
            />
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
};

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});
