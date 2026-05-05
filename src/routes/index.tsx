import HomePagePreview from "@/components/HomepagePreview";
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
    title: "Privacy first",
    body: "Your messages are yours and yours alone.",
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
    <HomePagePreview />
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
