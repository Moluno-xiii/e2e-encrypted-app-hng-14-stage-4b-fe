import { FiLock } from "react-icons/fi";

const sidebarThreads = [
  { name: "Leo Messi", excerpt: "rematch sunday?", active: true },
  { name: "Erling Haaland", excerpt: "see you at training", active: false },
  { name: "Vini Jr", excerpt: "you owe me a haircut", active: false },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");

const HomePagePreview = () => (
  <section id="preview" className="px-6 pb-24 lg:px-8">
    <div className="mx-auto max-w-5xl">
      <div className="border-line bg-surface overflow-hidden rounded-xl border">
        <div className="border-line flex items-center justify-between gap-4 border-b px-4 py-2.5">
          <div className="flex items-center gap-3">
            <span className="label-mono">whisperbox</span>
            <span className="bg-line-2 h-3 w-px" />
            <span className="text-faint text-xs">leo</span>
          </div>
          <div className="text-faint inline-flex items-center gap-1.5">
            <FiLock size={11} aria-hidden />
            <span className="label-mono">e2e</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[240px_minmax(0,1fr)]">
          <div className="border-line hidden border-r p-2 sm:block">
            {sidebarThreads.map((t) => (
              <div
                key={t.name}
                className={`flex items-center gap-2.5 rounded-md px-2 py-2 ${
                  t.active ? "bg-soft" : ""
                }`}
              >
                <div className="bg-soft-2 grid h-8 w-8 place-items-center rounded-full">
                  <span className="text-ink text-[10px] font-medium tracking-wide">
                    {initials(t.name)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium tracking-tight">
                    {t.name}
                  </p>
                  <p className="text-muted truncate text-[11px]">{t.excerpt}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-page flex flex-col p-6 sm:p-8">
            <div className="space-y-2.5">
              <div className="flex justify-start">
                <div className="bg-soft text-ink max-w-[78%] rounded-2xl rounded-bl-md px-3.5 py-2 text-sm leading-relaxed">
                  you owe me a goal at training
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-ink text-page max-w-[78%] rounded-2xl rounded-br-md px-3.5 py-2 text-sm leading-relaxed">
                  you missed an open net last week
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-soft text-ink max-w-[78%] rounded-2xl rounded-bl-md px-3.5 py-2 text-sm leading-relaxed">
                  keeper had eight arms, what was i meant to do
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-soft text-ink max-w-[78%] rounded-2xl rounded-bl-md px-3.5 py-2 text-sm leading-relaxed">
                  rematch sunday?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HomePagePreview;
