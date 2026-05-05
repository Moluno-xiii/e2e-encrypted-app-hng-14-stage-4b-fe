import Logo from "@/components/Logo";
import { FaYCombinator } from "react-icons/fa6";

const AuthWrapperUI = () => {
  return (
    <>
      <div
        aria-hidden
        className="bg-grid bg-grid-mask pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 h-130 w-130 rounded-full opacity-50 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--c-soft-2) 90%, transparent), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-32 h-110 w-110 rounded-full opacity-60 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--c-soft) 95%, transparent), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/4 h-120 w-120 rounded-full opacity-45 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--c-soft-2) 80%, transparent), transparent 60%)",
        }}
      />

      <aside className="relative z-10 hidden flex-col justify-between p-10 lg:flex xl:p-14">
        <Logo />

        <div className="fade-in max-w-md space-y-10">
          <div className="space-y-3">
            <span className="border-line bg-surface/70 text-muted inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
              <span className="text-[6px]">Not</span>backed by <FaYCombinator />
            </span>
            <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.02em] xl:text-[2.75rem]">
              A calmer way to chat.
            </h2>
            <p className="text-muted text-[15px] leading-relaxed">
              Private conversations, end-to-end encrypted. Quiet by design — no
              groups, no broadcasts, no noise.
            </p>
          </div>

          <div className="relative">
            <article className="border-line bg-surface shadow-card relative max-w-85 rounded-2xl border p-4">
              <span
                aria-hidden
                className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-[color-mix(in_srgb,var(--c-ink)_18%,transparent)] to-transparent"
              />
              <div className="flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <div className="bg-soft-2 grid h-9 w-9 place-items-center rounded-full">
                    <span className="text-ink text-xs font-semibold">AM</span>
                  </div>
                  <span className="bg-online border-surface absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-ink truncate text-sm font-medium">
                    Ada Mercer
                  </p>
                  <p className="text-faint text-[11px]">Active now · 3:42 AM</p>
                </div>
              </div>
              <p className="text-ink mt-3 text-[14px] leading-relaxed">
                What are you reading tonight?
              </p>
            </article>

            <div className="bg-ink text-page shadow-card relative -mt-3 ml-auto max-w-70 translate-x-3 rounded-2xl rounded-br-md px-4 py-3">
              <p className="text-[14px] leading-relaxed">
                Just finished. Want to talk about it?
              </p>
              <p className="text-page/55 mt-1 text-[11px]">3:43 AM · seen</p>
            </div>

            <div
              aria-hidden
              className="text-faint absolute top-1/2 -left-2 hidden -translate-x-full -translate-y-1/2 text-xs xl:block"
            >
              ↳
            </div>
          </div>
        </div>

        <p className="text-faint text-xs">
          Trusted by people who like to talk in private.
        </p>
      </aside>
    </>
  );
};

export default AuthWrapperUI;
