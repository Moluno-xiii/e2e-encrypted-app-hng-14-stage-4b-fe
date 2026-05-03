import Logo from "@/components/Logo";
import { createFileRoute, Link } from "@tanstack/react-router";

const features = [
  {
    title: "Private by default",
    body: "Conversations are end-to-end encrypted. Only you and the person you're talking to can read them.",
  },
  {
    title: "Quiet by design",
    body: "No groups, no broadcasts, no ads. One-on-one conversations, the way they should feel.",
  },
  {
    title: "Yours, always",
    body: "Your messages live on your devices. Export, delete, or move on whenever you like.",
  },
];

const RouteComponent = () => (
  <div className="bg-page text-ink w-full">
    <header className="border-line border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Logo />

        <nav className="text-muted hidden items-center gap-7 text-sm md:flex">
          <a href="#features" className="hover:text-ink transition-colors">
            Features
          </a>
          <a href="#preview" className="hover:text-ink transition-colors">
            Preview
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/auth/login"
            className="text-ink hidden rounded-lg px-3 py-1.5 text-sm font-medium hover:underline sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            to="/auth/signup"
            className="bg-ink text-page hover:bg-ink/90 inline-flex items-center rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>

    <section className="px-6 pt-20 pb-16 lg:px-8 lg:pt-32 lg:pb-20">
      <div className="rise mx-auto max-w-3xl text-center">
        <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          A calmer way to chat.
        </h1>
        <p className="text-muted mx-auto mt-5 max-w-xl text-lg leading-relaxed">
          Sealed is a private, one-on-one messaging app. End-to-end encrypted,
          quiet, and built for the conversations that matter.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-3">
          <Link
            to="/auth/signup"
            className="bg-ink text-page hover:bg-ink/90 inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
          >
            Create an account
          </Link>
          <Link
            to="/auth/login"
            className="text-ink border-line hover:bg-soft inline-flex items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>

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
                  name: "Ada Mercer",
                  excerpt: "What are you reading?",
                  active: true,
                },
                {
                  name: "Hugo Vellan",
                  excerpt: "Thanks, got it.",
                  active: false,
                },
                {
                  name: "June Akiyama",
                  excerpt: "Same time tomorrow?",
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
                    Did you see the place I sent yesterday?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-ink text-page max-w-[78%] rounded-2xl rounded-br-md px-3.5 py-2 text-sm">
                    Yeah, looks great. Let's book it before the weekend.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-soft text-ink max-w-[78%] rounded-2xl rounded-bl-md px-3.5 py-2 text-sm">
                    Agreed. I'll handle it tomorrow morning.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-soft text-ink max-w-[78%] rounded-2xl rounded-bl-md px-3.5 py-2 text-sm">
                    What are you reading tonight?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="features" className="border-line border-y px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for one thing, done well.
          </h2>
          <p className="text-muted mt-3 text-[15px] leading-relaxed">
            No feeds, no statuses, no read receipts to harvest. Just clear,
            private conversation.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title}>
              <h3 className="text-base font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="text-muted mt-2 text-sm leading-relaxed">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="px-6 py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Start a conversation.
        </h2>
        <p className="text-muted mt-3 text-[15px] leading-relaxed">
          Free to use. No phone number required. Set up in under a minute.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/auth/signup"
            className="bg-ink text-page hover:bg-ink/90 inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
          >
            Create an account
          </Link>
          <Link
            to="/auth/login"
            className="text-muted hover:text-ink text-sm font-medium transition-colors"
          >
            Sign in →
          </Link>
        </div>
      </div>
    </section>

    <footer className="border-line border-t px-6 py-8 lg:px-8">
      <div className="text-muted mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="bg-ink h-5 w-5 rounded-full" aria-hidden />
          <span className="text-ink font-medium">Sealed</span>
          <span className="text-faint">© {new Date().getFullYear()}</span>
        </div>
        <p>
          By <span className="animate-pulse font-semibold">Moluno</span>
        </p>
      </div>
    </footer>
  </div>
);

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
