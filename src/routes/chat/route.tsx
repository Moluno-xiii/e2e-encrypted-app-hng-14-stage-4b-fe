import {
  createFileRoute,
  Link,
  Outlet,
  useChildMatches,
} from "@tanstack/react-router";
import { threads } from "@/components/threads";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const RouteComponent = () => {
  const childMatches = useChildMatches();
  const hasOpenThread = childMatches.length > 0;

  return (
    <div className="bg-page text-ink grid h-dvh w-full grid-cols-1 overflow-hidden lg:grid-cols-[340px_minmax(0,1fr)]">
      <aside
        className={`border-line bg-surface flex flex-col border-r ${
          hasOpenThread ? "hidden lg:flex" : "flex"
        }`}
      >
        <header className="flex items-center justify-between px-4 pt-5 pb-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-ink h-7 w-7 rounded-full" aria-hidden />
            <span className="text-base font-semibold tracking-tight">
              Sealed
            </span>
          </Link>
          <button
            className="hover:bg-soft text-muted hover:text-ink grid h-9 w-9 place-items-center rounded-full transition-colors"
            aria-label="New conversation"
            title="New conversation"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </header>

        <div className="px-4 pb-3">
          <div className="bg-soft flex items-center gap-2 rounded-lg px-3 py-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-faint"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              placeholder="Search"
              className="placeholder:text-faint w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <ul className="flex-1 overflow-y-auto px-2 pb-4">
          {threads.map((t) => (
            <li key={t.id}>
              <Link
                to="/chat/$friend_id"
                params={{ friend_id: t.id }}
                activeProps={{ className: "bg-soft" }}
                inactiveProps={{ className: "hover:bg-soft" }}
                className="flex items-center gap-3 rounded-lg px-2.5 py-2.5 transition-colors"
              >
                <div className="relative shrink-0">
                  <div className="bg-soft-2 grid h-10 w-10 place-items-center rounded-full">
                    <span className="text-ink text-sm font-medium">
                      {initials(t.name)}
                    </span>
                  </div>
                  {t.online && (
                    <span
                      className="bg-online border-surface absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2"
                      aria-label="online"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-ink truncate text-[15px] font-medium tracking-tight">
                      {t.name}
                    </h3>
                    <span className="text-faint shrink-0 text-xs">
                      {t.time}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between gap-2">
                    <p
                      className={`truncate text-sm ${
                        t.unread > 0
                          ? "text-ink font-medium"
                          : "text-muted"
                      }`}
                    >
                      {t.excerpt}
                    </p>
                    {t.unread > 0 && (
                      <span className="bg-ink text-page inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1.5 text-[11px] font-medium">
                        {t.unread}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="border-line flex items-center justify-between border-t px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="bg-soft-2 grid h-8 w-8 place-items-center rounded-full">
              <span className="text-ink text-xs font-medium">YOU</span>
            </div>
            <span className="text-ink text-sm font-medium">You</span>
          </div>
          <button
            className="hover:bg-soft text-muted hover:text-ink grid h-8 w-8 place-items-center rounded-full transition-colors"
            aria-label="Settings"
            title="Settings"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </footer>
      </aside>

      <section
        className={`flex min-w-0 flex-col ${
          hasOpenThread ? "flex" : "hidden lg:flex"
        }`}
      >
        {hasOpenThread ? (
          <Outlet />
        ) : (
          <div className="flex flex-1 items-center justify-center px-6">
            <div className="max-w-sm text-center">
              <div className="bg-soft mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold tracking-tight">
                Select a conversation
              </h2>
              <p className="text-muted mt-1.5 text-sm leading-relaxed">
                Choose someone from the list, or start a new chat to begin.
              </p>
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
