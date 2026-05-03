import { createFileRoute, Link } from "@tanstack/react-router";
import Field from "@/components/Field";

const RouteComponent = () => (
  <div className="rise space-y-9">
    <header className="space-y-3">
      <p className="text-ink-faint font-mono text-[10px] tracking-[0.28em] uppercase">
        <span className="text-accent">01</span>
        <span className="mx-2">—</span>
        <span>Return</span>
      </p>
      <h1 className="font-display text-ink text-4xl tracking-tight md:text-[2.75rem]">
        Welcome <span className="italic">back.</span>
      </h1>
      <p className="text-ink-muted leading-relaxed">
        Pick up the thread where you left it. Your keys are still where you put
        them.
      </p>
    </header>

    <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="name@correspondence.com"
        required
      />

      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••••••"
        hint="min 12"
        required
      />
      {/*
      <div className="flex items-center justify-between pt-1">
        <label className="text-ink-muted hover:text-ink flex cursor-pointer items-center gap-2 transition-colors">
          <input
            type="checkbox"
            className="border-hairline-strong accent-accent h-3.5 w-3.5 rounded-none border bg-transparent"
          />
          <span className="font-mono text-[11px] tracking-[0.16em] uppercase">
            Stay signed in
          </span>
        </label>
        <a
          href="#"
          className="decoration-hairline hover:decoration-accent hover:text-accent text-ink font-mono text-[11px] tracking-[0.16em] underline underline-offset-4 uppercase transition-colors"
        >
          Forgot it?
        </a>
      </div>*/}

      <button
        type="submit"
        className="group bg-ink text-paper border-ink hover:bg-paper hover:text-ink relative inline-flex w-full items-center justify-between border px-6 py-4 transition-colors duration-200"
      >
        <span className="font-mono text-[11px] tracking-[0.28em] uppercase">
          Open the door
        </span>
        <span
          aria-hidden
          className="font-display text-xl transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </button>
    </form>

    <p className="border-hairline text-ink-muted border-t pt-6 text-sm">
      First time here?{" "}
      <Link
        to="/auth/signup"
        className="text-ink decoration-hairline hover:decoration-accent hover:text-accent underline underline-offset-4 transition-colors"
      >
        Open an account →
      </Link>
    </p>
  </div>
);

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});
