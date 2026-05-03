import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findThread, type Message } from "@/components/threads";

const groupByDate = (messages: Message[]) => {
  const groups: { date: string; items: Message[] }[] = [];
  for (const m of messages) {
    const last = groups[groups.length - 1];
    if (last && last.date === m.date) {
      last.items.push(m);
    } else {
      groups.push({ date: m.date, items: [m] });
    }
  }
  return groups;
};

const RouteComponent = () => {
  const { friend_id } = Route.useParams();
  const thread = findThread(friend_id);
  if (!thread) throw notFound();

  const groups = groupByDate(thread.messages);

  return (
    <div className="flex h-full flex-col">
      <header className="border-hairline bg-paper/80 flex items-center justify-between gap-4 border-b px-6 py-4 backdrop-blur-sm lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            to="/chat"
            className="text-ink-faint hover:text-ink font-display text-xl transition-colors lg:hidden"
            aria-label="Back to inbox"
          >
            ←
          </Link>

          <div className="border-ink/20 bg-paper-3 grid h-11 w-11 shrink-0 place-items-center rounded-full border">
            <span className="font-display text-ink text-lg italic">
              {thread.name.charAt(0).toLowerCase()}
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <h2 className="font-display text-ink truncate text-xl tracking-tight">
                {thread.name}
              </h2>
              <span
                className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                  thread.online ? "bg-ok" : "bg-ink-faint"
                }`}
              />
            </div>
            <p className="text-ink-faint mt-0.5 truncate font-mono text-[10px] tracking-[0.18em] uppercase">
              {thread.online ? "Online · " : "Last seen recently · "}
              <span className="text-accent">{thread.fingerprint}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="text-ink-faint hover:text-ink hover:bg-paper-3 grid h-9 w-9 place-items-center transition-colors"
            aria-label="Verify keys"
            title="Verify keys"
          >
            <span className="font-display text-base">⚿</span>
          </button>
          <button
            className="text-ink-faint hover:text-ink hover:bg-paper-3 grid h-9 w-9 place-items-center transition-colors"
            aria-label="Search in thread"
            title="Search"
          >
            <span className="font-display text-base">⌕</span>
          </button>
          <button
            className="text-ink-faint hover:text-ink hover:bg-paper-3 grid h-9 w-9 place-items-center transition-colors"
            aria-label="Archive"
            title="Archive"
          >
            <span className="font-display text-base">❖</span>
          </button>
          <button
            className="text-ink-faint hover:text-ink hover:bg-paper-3 grid h-9 w-9 place-items-center transition-colors"
            aria-label="More"
            title="More"
          >
            <span className="font-display text-lg leading-none">⋯</span>
          </button>
        </div>
      </header>

      <div className="bg-paper text-ink-faint flex items-center justify-center gap-3 px-6 py-2 font-mono text-[10px] tracking-[0.24em] uppercase">
        <span className="bg-hairline h-px flex-1" />
        <span className="flex items-center gap-2">
          <span className="bg-ok inline-block h-1.5 w-1.5 rounded-full" />
          Sealed end-to-end · X25519
        </span>
        <span className="bg-hairline h-px flex-1" />
      </div>

      <main className="relative flex-1 overflow-y-auto px-6 py-8 lg:px-12 lg:py-10">
        <div className="mx-auto max-w-3xl space-y-12">
          {groups.map((group) => (
            <section key={group.date} className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="bg-hairline h-px flex-1" />
                <span className="text-ink-faint font-mono text-[10px] tracking-[0.32em] uppercase">
                  {group.date}
                </span>
                <span className="bg-hairline h-px flex-1" />
              </div>

              {group.items.map((m) => (
                <article
                  key={m.id}
                  className={`max-w-[88%] sm:max-w-[80%] ${
                    m.fromSelf ? "ml-auto text-right" : ""
                  }`}
                >
                  <div
                    className={`flex items-baseline gap-3 font-mono text-[10px] tracking-[0.22em] uppercase ${
                      m.fromSelf ? "justify-end" : ""
                    }`}
                  >
                    <span className="text-ink">
                      {m.fromSelf ? "You" : thread.name.split(" ")[0]}
                    </span>
                    <span className="bg-hairline h-px w-6" />
                    <span className="text-ink-faint">{m.time}</span>
                  </div>
                  <p
                    className={`font-display text-ink mt-2 text-xl leading-snug tracking-tight sm:text-[1.4rem] ${
                      m.fromSelf ? "" : "italic"
                    }`}
                  >
                    {m.body}
                  </p>
                </article>
              ))}
            </section>
          ))}

          <div className="text-ink-faint flex items-center justify-center gap-3 pt-2 font-mono text-[10px] tracking-[0.24em] uppercase">
            <span className="bg-hairline h-px w-10" />
            <span>End of thread</span>
            <span className="bg-hairline h-px w-10" />
          </div>
        </div>
      </main>

      <footer className="border-hairline bg-paper-2 border-t px-6 py-5 lg:px-12">
        <form
          className="mx-auto max-w-3xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="block">
            <span className="text-ink-faint font-mono text-[10px] tracking-[0.28em] uppercase">
              Compose to{" "}
              <span className="text-ink">
                {thread.name.split(" ")[0].toLowerCase()}
              </span>
            </span>
            <textarea
              rows={2}
              placeholder="Begin writing — your words are sealed before they leave this device."
              className="placeholder:text-ink-faint/70 mt-2 w-full resize-none bg-transparent font-display text-lg leading-relaxed text-ink focus:outline-none"
            />
          </label>

          <div className="border-hairline mt-3 flex items-center justify-between border-t pt-3">
            <div className="text-ink-faint flex items-center gap-4 font-mono text-[10px] tracking-[0.22em] uppercase">
              <button
                type="button"
                className="hover:text-ink transition-colors"
                aria-label="Attach"
              >
                ⌧ Attach
              </button>
              <span className="bg-hairline h-3 w-px" />
              <span className="hidden sm:inline">
                Encrypted to{" "}
                <span className="text-accent">{thread.fingerprint}</span>
              </span>
            </div>

            <button
              type="submit"
              className="group bg-ink text-paper border-ink hover:bg-paper hover:text-ink inline-flex items-center gap-3 border px-5 py-2.5 transition-colors duration-200"
            >
              <span className="text-paper group-hover:text-ink font-mono text-[11px] tracking-[0.28em] uppercase">
                Seal & send
              </span>
              <span
                aria-hidden
                className="text-paper group-hover:text-ink font-display text-base transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export const Route = createFileRoute("/chat/$friend_id")({
  component: RouteComponent,
});
