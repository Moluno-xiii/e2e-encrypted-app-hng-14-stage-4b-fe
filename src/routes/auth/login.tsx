import { createFileRoute, Link } from "@tanstack/react-router";
import Field from "@/components/Field";

const RouteComponent = () => (
  <div className="rise space-y-6">
    <header className="space-y-2">
      <h1 className="text-[26px] leading-tight font-semibold tracking-[-0.02em]">
        Welcome back
      </h1>
      <p className="text-muted text-sm">
        Sign in to continue to Sealed.
      </p>
    </header>

    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
      />

      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between">
          <label
            htmlFor="password"
            className="text-ink text-sm font-medium tracking-tight"
          >
            Password
          </label>
          <a
            href="#"
            className="text-muted hover:text-ink text-xs transition-colors"
          >
            Forgot password?
          </a>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
          className="border-line bg-surface placeholder:text-faint focus:border-ink/40 focus:ring-ink/10 block w-full rounded-lg border px-3.5 py-2.5 text-[15px] outline-none transition-[border-color,box-shadow] focus:ring-4"
        />
      </div>

      <button
        type="submit"
        className="bg-ink text-page hover:bg-ink/90 active:scale-[0.99] mt-1 flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium shadow-[0_1px_2px_rgba(20,20,24,0.18),0_4px_12px_-2px_rgba(20,20,24,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] transition-[background-color,transform]"
      >
        Sign in
      </button>
    </form>

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
