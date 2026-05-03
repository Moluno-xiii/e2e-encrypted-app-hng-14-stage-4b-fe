import { createFileRoute, Link } from "@tanstack/react-router";
import Field from "@/components/Field";

const RouteComponent = () => (
  <div className="rise space-y-9">
    <header className="space-y-3">
      <p className="text-ink-faint font-mono text-[10px] tracking-[0.28em] uppercase">
        <span className="text-accent">02</span>
        <span className="mx-2">—</span>
        <span>Enroll</span>
      </p>
      <h1 className="font-display text-ink text-4xl tracking-tight md:text-[2.75rem]">
        Begin a quiet <span className="italic">correspondence.</span>
      </h1>
      <p className="text-ink-muted leading-relaxed">
        Three fields. That's all we keep. Your keys are generated on this
        device and never leave it.
      </p>
    </header>

    <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
      <Field
        label="Display name"
        name="name"
        type="text"
        autoComplete="nickname"
        placeholder="Your chosen name"
        required
      />

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
        autoComplete="new-password"
        placeholder="••••••••••••"
        hint="min 12"
        required
      />

      <label className="text-ink-muted hover:text-ink flex cursor-pointer items-start gap-3 pt-1 transition-colors">
        <input
          type="checkbox"
          required
          className="border-hairline-strong accent-accent mt-0.5 h-3.5 w-3.5 rounded-none border bg-transparent"
        />
        <span className="text-sm leading-relaxed">
          I understand my keys live only on my devices —{" "}
          <span className="text-ink">if I lose them, my letters are lost.</span>
        </span>
      </label>

      <button
        type="submit"
        className="group bg-ink text-paper border-ink hover:bg-paper hover:text-ink relative inline-flex w-full items-center justify-between border px-6 py-4 transition-colors duration-200"
      >
        <span className="font-mono text-[11px] tracking-[0.28em] uppercase">
          Generate keys & enter
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
      Already inside?{" "}
      <Link
        to="/auth/login"
        className="text-ink decoration-hairline hover:decoration-accent hover:text-accent underline underline-offset-4 transition-colors"
      >
        Return →
      </Link>
    </p>
  </div>
);

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});
