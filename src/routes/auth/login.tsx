import { createFileRoute, Link } from "@tanstack/react-router";
import LoginForm from "./-components/LoginForm";

const RouteComponent = () => (
  <div className="rise space-y-6">
    <header className="space-y-2">
      <h1 className="text-[26px] leading-tight font-semibold tracking-[-0.02em]">
        Welcome back
      </h1>
      <p className="text-muted text-sm">Sign in to continue to Sealed.</p>
    </header>
    <LoginForm />
    <div className="border-line relative flex items-center gap-3 border-t pt-5">
      <p className="text-muted flex-1 text-center text-sm">
        Don't have an account?{" "}
        <Link
          to="/auth/signup"
          className="text-ink font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  </div>
);

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});
