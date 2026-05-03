import {
  createFileRoute,
  Link,
  Outlet,
  useChildMatches,
} from "@tanstack/react-router";
import { threads } from "@/components/threads";

const navItems = [
  { key: "inbox", label: "Inbox", glyph: "✶" },
  { key: "drafts", label: "Drafts", glyph: "✎" },
  { key: "archive", label: "Archive", glyph: "❖" },
  { key: "keys", label: "Keys", glyph: "⚿" },
];

const RouteComponent = () => {
  const childMatches = useChildMatches();
  const hasOpenThread = childMatches.length > 0;

  return (
    <div className="bg-paper text-ink grid h-dvh w-full grid-cols-1 overflow-hidden lg:grid-cols-[64px_340px_minmax(0,1fr)]">
      <aside className="border-hairline bg-paper-2 hidden flex-col items-center justify-between border-r py-5 lg:flex">
        <div className="flex flex-col items-center gap-6">
          <Link
            to="/"
            className="border-ink/30 font-display text-ink hover:border-accent hover:text-accent grid h-9 w-9 place-items-center rounded-full border text-base italic transition-colors"
          >
            s
          </Link>

          <div className="bg-hairline h-px w-6" />

          <nav className="flex flex-col items-center gap-3">
            {navItems.map((item, i) => (
              <button
                key={item.key}
                className={`group relative grid h-10 w-10 place-items-center transition-colors ${
                  i === 0
                    ? "text-ink"
                    : "text-ink-faint hover:text-ink"
                }`}
                aria-label={item.label}
                title={item.label}
              >
                <span className="font-display text-lg">{item.glyph}</span>
                {i === 0 && (
                  <span className="bg-accent absolute -left-0.5 top-1/2 h-5 w-0.5 -translate-y-1/2" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            className="text-ink-faint hover:text-ink grid h-10 w-10 place-items-center transition-colors"
            aria-label="Settings"
          >
            <span className="font-display text-lg">⚙</span>
          </button>
          <span className="bg-ok h-1.5 w-1.5 rounded-full" title="Encrypted" />
        </div>
      </aside>

      <section
        className={`border-hairline flex flex-col border-r ${
          hasOpenThread ? "hidden lg:flex" : "flex"
        }`}
      >
        <header className="border-hairline flex flex-col gap-4 border-b px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-ink-faint font-mono text-[10px] tracking-[0.28em] uppercase">
                — Inbox · 014
              </p>
              <h1 className="font-display mt-1 text-2xl tracking-tight">
                Correspondents
              </h1>
            </div>
            <button
              className="group bg-ink text-paper border-ink hover:bg-paper hover:text-ink inline-flex items-center justify-center border p-2.5 transition-colors duration-200"
              aria-label="Compose new"
              title="Compose new"
            >
              <span className="font-display text-base leading-none">✎</span>
            </button>
          </div>

          <label className="border-hairline focus-within:border-accent group flex items-center gap-2 border-b pb-2 transition-colors">
            <span
              aria-hidden
              className="text-ink-faint font-display text-sm"
            >
              ⌕
            </span>
            <input
              type="search"
              placeholder="Search by name or fingerprint…"
              className="placeholder:text-ink-faint/70 w-full bg-transparent text-sm focus:outline-none"
            />
            <span className="text-ink-faint font-mono text-[10px] tracking-[0.18em] uppercase">
              ⌘K
            </span>
          </label>

          <div className="text-ink-faint flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase">
            <button className="text-ink underline decoration-accent underline-offset-[6px]">
              All
            </button>
            <button className="hover:text-ink transition-colors">Unread</button>
            <button className="hover:text-ink transition-colors">Pinned</button>
            <span className="bg-hairline ml-auto h-px flex-1" />
            <span>{threads.length}</span>
          </div>
        </header>

        <ul className="flex-1 overflow-y-auto">
          {threads.map((t) => (
            <li key={t.id}>
              <Link
                to="/chat/$friend_id"
                params={{ friend_id: t.id }}
                activeProps={{
                  className:
                    "bg-paper-3 border-l-accent",
                }}
                inactiveProps={{
                  className: "border-l-transparent hover:bg-paper-2",
                }}
                className="border-hairline block border-b border-l-2 px-6 py-4 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-ink truncate text-lg leading-tight tracking-tight">
                    {t.name}
                    {t.online && (
                      <span
                        className="bg-ok ml-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full"
                        aria-label="online"
                      />
                    )}
                  </h3>
                  <span className="text-ink-faint shrink-0 font-mono text-[10px] tracking-[0.18em] uppercase">
                    {t.time}
                  </span>
                </div>
                <p className="text-ink-muted mt-1.5 line-clamp-2 text-sm leading-snug">
                  {t.excerpt}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-ink-faint font-mono text-[10px] tracking-wider">
                    {t.fingerprint}
                  </span>
                  {t.unread > 0 && (
                    <span className="bg-accent text-accent-ink inline-flex h-4 min-w-4 items-center justify-center px-1 font-mono text-[10px] tracking-wider">
                      {t.unread}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="border-hairline text-ink-faint flex items-center justify-between border-t px-6 py-3 font-mono text-[10px] tracking-[0.22em] uppercase">
          <span className="flex items-center gap-2">
            <span className="bg-ok inline-block h-1.5 w-1.5 rounded-full" />
            Connected
          </span>
          <span>End-to-end</span>
        </footer>
      </section>

      <section
        className={`relative flex flex-col ${
          hasOpenThread ? "flex" : "hidden lg:flex"
        }`}
      >
        {hasOpenThread ? (
          <Outlet />
        ) : (
          <div className="relative flex flex-1 items-center justify-center px-6">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(40% 40% at 50% 40%, color-mix(in srgb, var(--c-accent) 10%, transparent), transparent 70%)",
              }}
            />
            <div className="rise relative z-10 max-w-md text-center">
              <div
                aria-hidden
                className="bg-accent text-accent-ink mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full shadow-[0_0_0_1px_var(--c-accent),0_14px_40px_-14px_var(--c-accent)]"
              >
                <span className="font-display text-xl italic">s</span>
              </div>
              <p className="text-ink-faint font-mono text-[10px] tracking-[0.28em] uppercase">
                — Awaiting correspondence
              </p>
              <h2 className="font-display text-ink mt-4 text-4xl leading-tight tracking-tight">
                Select a thread <span className="italic">to begin.</span>
              </h2>
              <p className="text-ink-muted mt-5 leading-relaxed">
                Your conversations live here, sealed at the source. Pick a
                correspondent on the left, or compose a new letter.
              </p>
              <div className="text-ink-faint mt-8 flex items-center justify-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase">
                <span className="bg-hairline h-px w-10" />
                <span>Nothing leaves this device unencrypted</span>
                <span className="bg-hairline h-px w-10" />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export const Route = createFileRoute("/chat")({
  component: RouteComponent,
});
