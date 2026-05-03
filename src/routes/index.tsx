import { createFileRoute, Link } from "@tanstack/react-router";

const pillars = [
  {
    n: "01",
    title: "Sealed at source.",
    body: "Your messages are encrypted on your device, before they leave it. We see ciphertext. So does the network. So does anyone who tries.",
    tag: "X25519 · AES-256",
  },
  {
    n: "02",
    title: "No record kept.",
    body: "We retain no metadata, no read receipts to harvest, no contact graphs to lose. The conversation belongs to the two of you and ends there.",
    tag: "Zero metadata",
  },
  {
    n: "03",
    title: "Keys live with you.",
    body: "Cryptographic keys are generated and stored on your device. We could not unlock your letters even if we were asked, ordered, or compelled.",
    tag: "Device-resident",
  },
];

const specimen = [
  {
    from: "Ada",
    time: "03:42 GMT",
    body: "I read your last note three times. Tell me again — slowly — what you meant by the word ‘later’.",
    side: "left" as const,
  },
  {
    from: "Hugo",
    time: "03:46 GMT",
    body: "Later as in, after the rain stops. After the city forgets what it was angry about. After we both decide we'd rather not be careful.",
    side: "right" as const,
  },
];

const RouteComponent = () => (
  <div className="bg-paper text-ink relative w-full overflow-x-hidden">
    <header className="border-hairline relative z-10 flex items-center justify-between border-b px-6 py-4 lg:px-12 xl:px-20">
      <div className="flex items-center gap-3">
        <span className="border-ink/30 font-display text-ink grid h-8 w-8 place-items-center rounded-full border text-base italic">
          s
        </span>
        <span className="font-display text-lg tracking-tight italic">
          Sealed.
        </span>
      </div>

      <nav className="text-ink-muted hidden items-center gap-8 font-mono text-[11px] tracking-[0.2em] uppercase md:flex">
        <a href="#manifesto" className="hover:text-ink transition-colors">
          Manifesto
        </a>
        <a href="#principles" className="hover:text-ink transition-colors">
          Principles
        </a>
        <a href="#specimen" className="hover:text-ink transition-colors">
          Specimen
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <Link
          to="/auth/login"
          className="text-ink-muted hover:text-ink hidden font-mono text-[11px] tracking-[0.22em] uppercase transition-colors sm:inline-flex"
        >
          Sign in
        </Link>
        <Link
          to="/auth/signup"
          className="group bg-ink text-paper border-ink hover:bg-paper hover:text-ink inline-flex items-center gap-2 border px-4 py-2.5 transition-colors duration-200"
        >
          <span className="font-mono text-[10px] tracking-[0.24em] uppercase">
            Begin
          </span>
          <span
            aria-hidden
            className="font-display text-base transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </header>

    <section className="border-hairline text-ink-faint flex items-center justify-between border-b px-6 py-2.5 font-mono text-[10px] tracking-[0.28em] uppercase lg:px-12 xl:px-20">
      <span>No. 014</span>
      <span className="hidden sm:inline">
        End-to-end · Zero metadata · Device-resident keys
      </span>
      <span> {new Date().getFullYear()}</span>
    </section>

    <section className="relative px-6 pt-16 pb-24 lg:px-12 lg:pt-24 lg:pb-32 xl:px-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 80% 20%, color-mix(in srgb, var(--c-accent) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-12 gap-x-6 gap-y-12">
        <div className="rise col-span-12 lg:col-span-8">
          <p className="text-ink-faint font-mono text-[11px] tracking-[0.32em] uppercase">
            <span className="text-accent">●</span>
            <span className="ml-3">A correspondence service</span>
          </p>

          <h1 className="font-display mt-6 text-[3.5rem] leading-[0.92] tracking-[-0.02em] sm:text-[5rem] lg:text-[7.5rem] xl:text-[9rem]">
            Write
            <br />
            <span className="italic">like nobody's</span>
            <br />
            <span className="text-accent italic">listening.</span>
          </h1>

          <p className="text-ink-muted mt-10 max-w-xl text-lg leading-relaxed lg:text-xl">
            Sealed is a messaging app for people who'd rather their thoughts
            stayed theirs. Encrypted on your device. Forgotten by ours. The way
            letters used to feel, with the speed of light.
          </p>

          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            <Link
              to="/auth/signup"
              className="group bg-ink text-paper border-ink hover:bg-paper hover:text-ink inline-flex items-center gap-3 border px-7 py-4 transition-colors duration-200"
            >
              <span className="font-mono text-[11px] tracking-[0.28em] uppercase">
                Open an account
              </span>
              <span
                aria-hidden
                className="font-display text-lg transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <Link
              to="/auth/login"
              className="text-ink decoration-hairline hover:decoration-accent hover:text-accent font-mono text-[11px] tracking-[0.22em] uppercase underline underline-offset-[6px] transition-colors"
            >
              Or sign in
            </Link>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-4 lg:pl-6">
          <div className="border-hairline border-l pl-6">
            <p className="text-ink-faint font-mono text-[10px] tracking-[0.28em] uppercase">
              From the masthead
            </p>
            <p className="font-display text-ink mt-4 text-2xl leading-snug italic">
              “Privacy is the soil in which every honest sentence grows.”
            </p>
            <p className="text-ink-muted mt-6 font-mono text-[10px] tracking-[0.18em] uppercase">
              — Editor's note, p. 1
            </p>

            <div className="bg-hairline mt-10 h-px w-full" />

            <dl className="mt-10 grid grid-cols-2 gap-y-6 font-mono text-[11px] tracking-wide">
              <div>
                <dt className="text-ink-faint text-[10px] tracking-[0.22em] uppercase">
                  Cipher
                </dt>
                <dd className="text-ink mt-1">AES-256-GCM</dd>
              </div>
              <div>
                <dt className="text-ink-faint text-[10px] tracking-[0.22em] uppercase">
                  Exchange
                </dt>
                <dd className="text-ink mt-1">X25519</dd>
              </div>
              <div>
                <dt className="text-ink-faint text-[10px] tracking-[0.22em] uppercase">
                  Identity
                </dt>
                <dd className="text-ink mt-1">Ed25519</dd>
              </div>
              <div>
                <dt className="text-ink-faint text-[10px] tracking-[0.22em] uppercase">
                  Forward secrecy
                </dt>
                <dd className="text-ink mt-1">Per-message</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </section>

    <section
      id="manifesto"
      className="bg-paper-3 border-hairline border-y px-6 py-20 lg:px-12 lg:py-28 xl:px-20"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-3">
          <p className="text-ink-faint font-mono text-[10px] tracking-[0.32em] uppercase">
            ¶ Manifesto
          </p>
          <h2 className="font-display text-ink mt-4 text-3xl leading-tight tracking-tight lg:text-4xl">
            On <span className="italic">silence,</span>
            <br />
            and on its <span className="text-accent italic">defense.</span>
          </h2>
        </div>

        <div className="text-ink col-span-12 grid gap-8 text-lg leading-relaxed lg:col-span-9 lg:grid-cols-2 lg:gap-12 lg:text-[17px]">
          <p>
            Most messaging is loud — group threads, read receipts, typing
            indicators, status circles. Sealed is the opposite of that. A place
            where two people can speak, slowly if they want to, without their
            conversation becoming a product.
          </p>
          <p className="text-ink-muted">
            We built it the way letters were built: addressed plainly, sealed
            firmly, opened only by the recipient. The keys are yours. The
            archive is yours. The pace is yours. We are simply the post.
          </p>
        </div>
      </div>
    </section>

    <section
      id="principles"
      className="border-hairline border-b px-6 py-20 lg:px-12 lg:py-28 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="border-hairline flex items-end justify-between border-b pb-6">
          <div>
            <p className="text-ink-faint font-mono text-[10px] tracking-[0.32em] uppercase">
              ¶ Three principles
            </p>
            <h2 className="font-display text-ink mt-3 text-3xl tracking-tight lg:text-4xl">
              What we keep — <span className="italic">and what we don't.</span>
            </h2>
          </div>
          <span className="text-ink-faint hidden font-mono text-[10px] tracking-[0.28em] uppercase md:inline">
            §§ 01 — 03
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.n} className="group flex flex-col">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-accent text-5xl italic">
                  {p.n}
                </span>
                <span className="text-ink-faint font-mono text-[10px] tracking-[0.22em] uppercase">
                  {p.tag}
                </span>
              </div>
              <div className="bg-hairline group-hover:bg-accent mt-4 h-px w-full transition-colors duration-300" />
              <h3 className="font-display text-ink mt-6 text-2xl tracking-tight">
                {p.title}
              </h3>
              <p className="text-ink-muted mt-4 leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section
      id="specimen"
      className="bg-ink text-paper relative overflow-hidden px-6 py-20 lg:px-12 lg:py-28 xl:px-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(40% 50% at 90% 10%, color-mix(in srgb, var(--c-accent) 24%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <p className="text-paper/45 font-mono text-[10px] tracking-[0.32em] uppercase">
            ¶ Specimen
          </p>
          <h2 className="font-display mt-4 text-3xl leading-tight tracking-tight lg:text-4xl">
            A page from <span className="italic">an exchange.</span>
          </h2>
          <p className="text-paper/65 mt-6 leading-relaxed">
            No bubbles. No avatars. No noise. Just a name, the time, and what
            was said — set in type that respects the words.
          </p>

          <div className="mt-10 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase">
            <span className="bg-accent inline-block h-1.5 w-1.5 rounded-full" />
            <span className="text-paper/50">Encrypted · sealed at source</span>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="border-paper/15 bg-paper/3 relative border p-6 backdrop-blur-sm sm:p-10">
            <div className="text-paper/40 border-paper/15 mb-8 flex items-center justify-between border-b pb-4 font-mono text-[10px] tracking-[0.22em] uppercase">
              <span>Thread · 0x9f8a</span>
              <span className="hidden sm:inline">
                X25519 · 03 May {new Date().getFullYear()}
              </span>
              <span>2 of 2</span>
            </div>

            <div className="space-y-10">
              {specimen.map((m) => (
                <div
                  key={m.from + m.time}
                  className={
                    m.side === "right"
                      ? "ml-auto max-w-[88%] text-right sm:max-w-[78%]"
                      : "max-w-[88%] sm:max-w-[78%]"
                  }
                >
                  <div
                    className={`flex items-baseline gap-3 font-mono text-[10px] tracking-[0.22em] uppercase ${
                      m.side === "right" ? "justify-end" : ""
                    }`}
                  >
                    <span className="text-paper">{m.from}</span>
                    <span className="bg-paper/20 h-px w-6" />
                    <span className="text-paper/40">{m.time}</span>
                  </div>
                  <p className="font-display mt-3 text-xl leading-snug italic sm:text-2xl">
                    “{m.body}”
                  </p>
                </div>
              ))}
            </div>

            <div className="text-paper/30 border-paper/15 mt-10 flex items-center justify-between border-t pt-4 font-mono text-[10px] tracking-[0.22em] uppercase">
              <span>End of page</span>
              <span>↩ continue ↪</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="px-6 py-24 lg:px-12 lg:py-32 xl:px-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-ink-faint font-mono text-[10px] tracking-[0.32em] uppercase">
          ¶ Begin
        </p>
        <h2 className="font-display text-ink mt-6 text-4xl leading-none tracking-tight sm:text-6xl lg:text-7xl">
          Two people.
          <br />
          <span className="italic">One sealed line.</span>
        </h2>
        <p className="text-ink-muted mx-auto mt-8 max-w-xl leading-relaxed">
          Open an account in under a minute. Your keys are generated on this
          device — no email loop, no SMS, no second factor we control.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            to="/auth/signup"
            className="group bg-ink text-paper border-ink hover:bg-paper hover:text-ink inline-flex items-center gap-3 border px-8 py-4 transition-colors duration-200"
          >
            <span className="font-mono text-[11px] tracking-[0.28em] uppercase">
              Generate keys & enter
            </span>
            <span
              aria-hidden
              className="font-display text-lg transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            to="/auth/login"
            className="text-ink decoration-hairline hover:decoration-accent hover:text-accent font-mono text-[11px] tracking-[0.22em] uppercase underline underline-offset-[6px] transition-colors"
          >
            Already have keys
          </Link>
        </div>
      </div>
    </section>

    <footer className="border-hairline border-t px-6 py-10 lg:px-12 xl:px-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="border-ink/30 font-display text-ink grid h-7 w-7 place-items-center rounded-full border text-sm italic">
            s
          </span>
          <span className="font-display text-base italic">Sealed.</span>
          <span className="text-ink-faint ml-2 font-mono text-[10px] tracking-[0.22em] uppercase">
            {new Date().getFullYear()}
          </span>
        </div>

        <p>
          Built by <span className="font-semibold">&copy;Moluno</span>
        </p>
      </div>
    </footer>
  </div>
);

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
