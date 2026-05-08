import { createFileRoute, Link } from "@tanstack/react-router";
import RegisterForm from "./-components/RegisterForm";

const RouteComponent = () => (
  <div className="rise space-y-7">
    <header className="space-y-2.5">
      <p className="label-mono">Create account</p>
      <h1 className="text-[28px] leading-tight font-medium tracking-tight">
        Set up your box.
      </h1>
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
