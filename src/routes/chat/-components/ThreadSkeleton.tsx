const bubbleWidths = ["w-2/5", "w-1/2", "w-1/3", "w-3/5", "w-2/5", "w-1/2"];
const bubbleSelfFlags = [false, true, false, true, true, false];

const ThreadSkeleton = () => (
  <div
    className="flex h-full min-h-0 animate-pulse flex-col"
    aria-busy="true"
    aria-label="Loading conversation"
  >
    <header className="border-line bg-surface flex items-center gap-3 border-b px-4 py-3 lg:px-6">
      <div className="bg-soft-2 h-9 w-9 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="bg-soft-2 h-3 w-1/4 rounded" />
        <div className="bg-soft h-2.5 w-16 rounded" />
      </div>
    </header>

    <main className="flex-1 overflow-hidden px-4 py-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-4">
        {bubbleWidths.map((w, i) => {
          const self = bubbleSelfFlags[i];
          return (
            <div
              key={i}
              className={`flex ${self ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`bg-soft h-9 ${w} rounded-2xl ${
                  self ? "rounded-br-md" : "rounded-bl-md"
                }`}
              />
            </div>
          );
        })}
      </div>
    </main>

    <footer className="border-line bg-surface border-t px-4 py-3 lg:px-6">
      <div className="bg-soft mx-auto h-10 max-w-3xl rounded-2xl" />
    </footer>
  </div>
);

export default ThreadSkeleton;
