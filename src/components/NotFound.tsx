import { Link } from "@tanstack/react-router";

const NotFound = () => (
  <div className="bg-paper text-ink relative grid min-h-dvh w-full place-items-center overflow-hidden px-6 py-16">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle at 18% 20%, var(--c-overlay) 0%, transparent 45%), radial-gradient(circle at 82% 80%, var(--c-overlay) 0%, transparent 45%)",
      }}
    />

    <div className="rise relative z-10 max-w-xl text-center">
      <div
        aria-hidden
        className="bg-accent text-accent-ink mx-auto mb-10 grid h-20 w-20 place-items-center rounded-full shadow-[0_0_0_1px_var(--c-accent),0_14px_40px_-14px_var(--c-accent)]"
      >
        <span className="font-display text-2xl italic">s</span>
      </div>

      <p className="text-ink-faint font-mono text-[10px] tracking-[0.32em] uppercase">
        Err_no_thread <span className="text-accent">·</span> 404
      </p>

      <h1 className="font-display mt-5 text-7xl leading-[0.95] tracking-tight md:text-[7.5rem]">
        Lost <span className="text-accent italic">letter.</span>
      </h1>

      <p className="text-ink-muted mx-auto mt-7 max-w-md leading-relaxed">
        The page you're searching for has been misplaced in transit. The address
        may have moved — or perhaps the envelope never arrived at all.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
        <Link
          to="/"
          replace
          className="group bg-ink text-paper border-ink hover:bg-paper hover:text-ink inline-flex items-center gap-3 border px-6 py-3.5 transition-colors duration-200"
        >
          <span className="font-mono text-[11px] tracking-[0.28em] uppercase">
            Return to inbox
          </span>
          <span
            aria-hidden
            className="font-display text-lg transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>

        <Link
          to="/auth/login"
          replace
          className="text-ink decoration-hairline hover:decoration-accent hover:text-accent font-mono text-[11px] tracking-[0.22em] uppercase underline underline-offset-[6px] transition-colors"
        >
          Or sign in
        </Link>
      </div>

      <div className="text-ink-faint mt-16 flex items-center justify-center gap-4 font-mono text-[10px] tracking-[0.28em] uppercase">
        <span className="bg-hairline h-px w-14" />
        <span>Return to sender</span>
        <span className="bg-hairline h-px w-14" />
      </div>
    </div>
  </div>
);

export default NotFound;
