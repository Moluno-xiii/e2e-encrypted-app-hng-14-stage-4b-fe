import { createFileRoute, Link } from "@tanstack/react-router";
import LoginForm from "./-components/LoginForm";

const RouteComponent = () => (
  <div className="rise space-y-7">
    <header className="space-y-2.5">
      <p className="label-mono">Sign in</p>
      <h1 className="text-[28px] leading-tight font-medium tracking-tight">
        Welcome back.
      </h1>
    </header>
    <LoginForm />
    <div className="border-line border-t pt-5">
      <p className="text-muted text-center text-sm">
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
