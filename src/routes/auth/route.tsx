import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

const cipherLines = [
  "9f8a0c43e1bd5e2fa9c7",
  "3b4f8e2c907ad1b65f23",
  "e7d2c1b8a93f4051c9d6",
  "b1c9a8e7f203456d8e1f",
  "4f8a7c91b3d2e0a5c8e6",
  "2c9d4e1f8a73b0c5e2d9",
  "7e3f1d8c9a04b2e6f1c3",
  "a4b1f02e9c7d3856b1f8",
];

const RouteComponent = () => (
  <div className="bg-paper text-ink grid min-h-dvh w-full lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
    <aside className="bg-ink text-paper relative hidden flex-col justify-between overflow-hidden p-10 lg:flex xl:p-14">
      <Link to="/" className="fade-in flex items-center gap-3">
        <span className="border-paper/30 font-display text-paper grid h-9 w-9 place-items-center rounded-full border text-lg italic">
          s
        </span>
        <span className="font-display text-lg tracking-tight italic">
          Sealed.
        </span>
      </Link>

      <div className="rise relative z-10 max-w-md">
        <p className="text-paper/50 mb-6 font-mono text-[10px] tracking-[0.3em] uppercase">
          — A correspondence service
        </p>
        <h2 className="font-display text-[2.5rem] leading-[1.04] tracking-tight xl:text-[3.25rem]">
          A quiet line,{" "}
          <span className="text-accent-soft italic">kept between two.</span>
        </h2>
        <p className="text-paper/65 mt-7 max-w-sm leading-relaxed">
          Messages sealed end-to-end. No metadata stored, no third party
          listening — just words, the way letters used to feel.
        </p>
        <div className="bg-paper/15 mt-10 h-px w-16" />
        <p className="text-paper/45 mt-6 max-w-sm font-mono text-[11px] leading-relaxed tracking-wide">
          “The right to whisper is the right to think aloud.”
        </p>
      </div>

      <div className="pointer-events-none absolute top-1/2 right-6 -translate-y-1/2 font-mono text-[10px] leading-loose select-none xl:right-10">
        {cipherLines.map((line, i) => (
          <div
            key={line}
            className={i === 2 ? "text-paper/35" : "text-paper/15"}
          >
            {line}
          </div>
        ))}
      </div>

      <div className="text-paper/45 fade-in flex items-end justify-between font-mono text-[10px] tracking-[0.22em] uppercase">
        <div>
          <div>End-to-end · zero metadata</div>
          <div className="text-paper/25 mt-1">
            X25519 · AES-256 · Curve25519
          </div>
        </div>
        <div className="text-right">
          <div>FILE 014</div>
          <div className="text-paper/25 mt-1">/auth</div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--c-accent) 0%, transparent 70%)",
          opacity: 0.18,
        }}
      />
    </aside>

    <section className="relative flex flex-col">
      <header className="border-hairline flex items-center justify-between border-b px-6 py-4 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="border-ink/40 font-display grid h-7 w-7 place-items-center rounded-full border text-sm italic">
            s
          </span>
          <span className="font-display text-base italic">Sealed.</span>
        </div>
        <span className="text-ink-muted font-mono text-[10px] tracking-[0.22em] uppercase">
          Encrypted
        </span>
      </header>

      <div className="text-ink-muted hidden items-center justify-end gap-2 px-10 py-6 font-mono text-[10px] tracking-[0.22em] uppercase lg:flex xl:px-14">
        <span className="bg-accent inline-block h-1.5 w-1.5 rounded-full" />
        <span>Connection encrypted</span>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-10 lg:py-8 xl:px-14">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      <footer className="border-hairline text-ink-faint flex items-center justify-between border-t px-6 py-4 font-mono text-[10px] tracking-[0.22em] uppercase lg:px-10 xl:px-14">
        <span>© Sealed · {new Date().getFullYear()}</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-ink transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-ink transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-ink transition-colors">
            Keys
          </a>
        </div>
      </footer>
    </section>
  </div>
);

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});
