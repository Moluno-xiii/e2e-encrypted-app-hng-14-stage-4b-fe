import FullScreenLoader from "@/components/FullScreenLoader";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/shared/ThemeToggle";
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
    <div className="bg-page text-ink relative grid min-h-dvh w-full grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <AuthWrapperUI />
      <section className="relative z-10 flex flex-col items-center justify-center px-6 py-12 lg:py-12">
        <div className="absolute top-5 right-5 z-10">
          <ThemeToggle />
        </div>
        <Logo className="mb-10 lg:hidden" />
        <div className="fade-in w-full max-w-md">
          <div className="bg-surface border-line relative rounded-xl border p-7 sm:p-9">
            <Outlet />
          </div>
          <p className="label-mono mt-6 text-center">end-to-end encrypted</p>
        </div>
      </section>
    </div>
  );
};

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});
