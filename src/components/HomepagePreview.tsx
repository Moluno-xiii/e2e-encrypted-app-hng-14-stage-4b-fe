const HomePagePreview = () => {
  return (
    <section id="preview" className="px-6 pb-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="border-line bg-surface overflow-hidden rounded-2xl border shadow-sm">
          <div className="border-line flex items-center gap-1.5 border-b px-4 py-3">
            <span className="bg-soft-2 h-2.5 w-2.5 rounded-full" />
            <span className="bg-soft-2 h-2.5 w-2.5 rounded-full" />
            <span className="bg-soft-2 h-2.5 w-2.5 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)]">
            <div className="border-line hidden border-r p-3 sm:block">
              {[
                {
                  name: "Leo Messi",
                  excerpt: "rematch sunday?",
                  active: true,
                },
                {
                  name: "Erling Haaland",
                  excerpt: "see you at training",
                  active: false,
                },
                {
                  name: "Vini Jr",
                  excerpt: "you owe me a haircut",
                  active: false,
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className={`flex items-center gap-2.5 rounded-lg px-2 py-2 ${
                    t.active ? "bg-soft" : ""
                  }`}
                >
                  <div className="bg-soft-2 grid h-8 w-8 place-items-center rounded-full">
                    <span className="text-ink text-[11px] font-medium">
                      {t.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">{t.name}</p>
                    <p className="text-muted truncate text-[11px]">
                      {t.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-page flex flex-col p-5 sm:p-7">
              <div className="space-y-2.5">
                <div className="flex justify-start">
                  <div className="bg-soft text-ink max-w-[78%] rounded-2xl rounded-bl-md px-3.5 py-2 text-sm">
                    you owe me a goal at training 😅
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-ink text-page max-w-[78%] rounded-2xl rounded-br-md px-3.5 py-2 text-sm">
                    you missed an open net last week mate
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-soft text-ink max-w-[78%] rounded-2xl rounded-bl-md px-3.5 py-2 text-sm">
                    keeper had eight arms, what was i meant to do
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-soft text-ink max-w-[78%] rounded-2xl rounded-bl-md px-3.5 py-2 text-sm">
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
};

export default HomePagePreview;
