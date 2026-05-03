import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findThread, type Message } from "@/components/threads";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const groupByDate = (messages: Message[]) => {
  const groups: { date: string; items: Message[] }[] = [];
  for (const m of messages) {
    const last = groups[groups.length - 1];
    if (last && last.date === m.date) last.items.push(m);
    else groups.push({ date: m.date, items: [m] });
  }
  return groups;
};

const RouteComponent = () => {
  const { friend_id } = Route.useParams();
  const thread = findThread(friend_id);
  if (!thread) throw notFound();

  const groups = groupByDate(thread.messages);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="border-line bg-surface/85 flex items-center justify-between gap-3 border-b px-4 py-3 backdrop-blur lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/chat"
            className="text-muted hover:text-ink hover:bg-soft -ml-1 grid h-9 w-9 place-items-center rounded-full transition-colors lg:hidden"
            aria-label="Back"
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
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>

          <div className="relative shrink-0">
            <div className="bg-soft-2 grid h-10 w-10 place-items-center rounded-full">
              <span className="text-ink text-sm font-medium">
                {initials(thread.name)}
              </span>
            </div>
            {thread.online && (
              <span className="bg-online border-surface absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2" />
            )}
          </div>

          <div className="min-w-0">
            <h2 className="text-ink truncate text-[15px] font-semibold tracking-tight">
              {thread.name}
            </h2>
            <p className="text-muted truncate text-xs">
              {thread.online ? "Active now" : "Last seen recently"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="hover:bg-soft text-muted hover:text-ink grid h-9 w-9 place-items-center rounded-full transition-colors"
            aria-label="Voice call"
            title="Voice call"
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
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button>
          <button
            className="hover:bg-soft text-muted hover:text-ink grid h-9 w-9 place-items-center rounded-full transition-colors"
            aria-label="More"
            title="More"
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
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="text-faint flex items-center justify-center gap-1.5 text-xs">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Messages are end-to-end encrypted</span>
          </div>

          {groups.map((group) => (
            <section key={group.date} className="space-y-4">
              <div className="flex items-center justify-center">
                <span className="bg-soft text-muted rounded-full px-3 py-1 text-xs font-medium">
                  {group.date}
                </span>
              </div>

              {group.items.map((m, i) => {
                const prev = group.items[i - 1];
                const isGrouped = prev && prev.fromSelf === m.fromSelf;

                return (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.fromSelf ? "justify-end" : "justify-start"
                    } ${isGrouped ? "mt-1" : "mt-3"}`}
                  >
                    <div
                      className={`flex max-w-[78%] flex-col gap-1 sm:max-w-[68%] ${
                        m.fromSelf ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`px-3.5 py-2 text-[15px] leading-relaxed ${
                          m.fromSelf
                            ? "bg-ink text-page rounded-2xl rounded-br-md"
                            : "bg-soft text-ink rounded-2xl rounded-bl-md"
                        }`}
                      >
                        {m.body}
                      </div>
                      <span className="text-faint px-1 text-[11px]">
                        {m.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </section>
          ))}
        </div>
      </main>

      <footer className="border-line bg-surface border-t px-4 py-3 lg:px-6">
        <form
          className="mx-auto flex max-w-3xl items-end gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <button
            type="button"
            className="hover:bg-soft text-muted hover:text-ink grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors"
            aria-label="Attach"
            title="Attach"
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
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>

          <div className="bg-soft focus-within:ring-ink/15 flex flex-1 items-end gap-2 rounded-2xl px-4 py-2.5 transition-shadow focus-within:ring-2">
            <textarea
              rows={1}
              placeholder={`Message ${thread.name.split(" ")[0]}`}
              className="placeholder:text-faint max-h-32 w-full resize-none bg-transparent text-[15px] leading-relaxed outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-ink text-page hover:bg-ink/90 grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors"
            aria-label="Send"
            title="Send"
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
              <path d="M22 2 11 13" />
              <path d="m22 2-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </form>
      </footer>
    </div>
  );
};

export const Route = createFileRoute("/chat/$friend_id")({
  component: RouteComponent,
});
