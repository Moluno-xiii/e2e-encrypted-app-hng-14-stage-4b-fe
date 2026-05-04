import { createFileRoute, Link } from "@tanstack/react-router";
import RegisterForm from "./-components/RegisterForm";

const RouteComponent = () => (
  <div className="rise space-y-6">
    <header className="space-y-2">
      <h1 className="text-[26px] leading-tight font-semibold tracking-[-0.02em]">
        Create your account
      </h1>
      <p className="text-muted text-sm">
        Start a private conversation in under a minute.
      </p>
    </header>
    <RegisterForm />
    <div className="border-line border-t pt-5">
      <p className="text-muted text-center text-sm">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-ink font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  </div>
);

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});
