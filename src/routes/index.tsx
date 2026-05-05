import HomePagePreview from "@/components/HomepagePreview";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FiArrowRight } from "react-icons/fi";

const features = [
  {
    index: "01",
    title: "Direct messages.",
    body: "One-on-one conversations. No groups, no broadcasts, no ads.",
  },
  {
    index: "02",
    title: "Encrypted on your device.",
    body: "Keys are generated in your browser. The server only forwards ciphertext.",
  },
  {
    index: "03",
    title: "Nothing else stored.",
    body: "No phone number, no contact upload, no read receipts harvested.",
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

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link
            to="/auth/login"
            className="text-ink hidden rounded-md px-3 py-1.5 text-sm font-medium hover:underline sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            to="/auth/signup"
            className="bg-ink text-page hover:bg-ink/90 inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors"
          >
            Get started
            <FiArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </header>

    <section className="px-6 pt-24 pb-20 lg:px-8 lg:pt-36 lg:pb-24">
      <div className="rise mx-auto max-w-3xl">
        <p className="label-mono text-center">Whisperbox · v0.1</p>
        <h1 className="mt-6 text-center text-[44px] leading-[1.02] font-medium tracking-[-0.025em] sm:text-[56px] lg:text-[68px]">
          Private messages, <br className="hidden sm:block" />
          read by no one else.
        </h1>
        <p className="text-muted mx-auto mt-6 max-w-xl text-center text-[17px] leading-relaxed">
          A small, end-to-end encrypted messenger. You and the person you're
          writing to — and nothing in between.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-3">
          <Link
            to="/auth/signup"
            className="bg-ink text-page hover:bg-ink/90 inline-flex items-center justify-center gap-1.5 rounded-md px-5 py-2.5 text-sm font-medium transition-colors"
          >
            Create an account
            <FiArrowRight size={14} aria-hidden />
          </Link>
          <Link
            to="/auth/login"
            className="text-ink border-line hover:bg-soft inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-sm font-medium transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>

    <HomePagePreview />

    <section
      id="features"
      className="border-line border-y px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <p className="label-mono">What's inside</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
          One thing, done quietly.
        </h2>

        <ul className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3">
          {features.map((f) => (
            <li key={f.index} className="border-line border-t pt-5">
              <p className="label-mono">{f.index}</p>
              <h3 className="mt-3 text-[17px] font-medium tracking-tight">
                {f.title}
              </h3>
              <p className="text-muted mt-2 text-[15px] leading-relaxed">
                {f.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="px-6 py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="label-mono">Open the box</p>
        <h2 className="mt-4 text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
          Start a conversation.
        </h2>
        <p className="text-muted mx-auto mt-4 max-w-md text-[15px] leading-relaxed">
          Free. No phone number. Set up in under a minute.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/auth/signup"
            className="bg-ink text-page hover:bg-ink/90 inline-flex items-center justify-center gap-1.5 rounded-md px-5 py-2.5 text-sm font-medium transition-colors"
          >
            Create an account
            <FiArrowRight size={14} aria-hidden />
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

    <footer className="border-line border-t px-6 py-10 lg:px-8">
      <div className="text-muted mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 text-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="label-mono">© {new Date().getFullYear()}</span>
        </div>
        <p className="label-mono">Built by Moluno</p>
      </div>
    </footer>
  </div>
);

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
