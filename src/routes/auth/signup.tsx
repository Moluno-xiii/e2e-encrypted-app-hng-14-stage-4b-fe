import { createFileRoute, Link } from "@tanstack/react-router";
import Field from "@/components/Field";

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

    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <Field
        label="Name"
        name="name"
        autoComplete="nickname"
        placeholder="Your name"
        required
      />

      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
      />

      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="At least 8 characters"
        required
      />

      <button
        type="submit"
        className="bg-ink text-page hover:bg-ink/90 active:scale-[0.99] mt-1 flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium shadow-[0_1px_2px_rgba(20,20,24,0.18),0_4px_12px_-2px_rgba(20,20,24,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] transition-[background-color,transform]"
      >
        Create account
      </button>

      <p className="text-faint text-center text-xs">
        By continuing, you agree to our Terms and Privacy Policy.
      </p>
    </form>

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
