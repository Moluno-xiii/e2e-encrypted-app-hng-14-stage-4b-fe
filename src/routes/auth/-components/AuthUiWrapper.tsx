import Logo from "@/components/Logo";
import { FaYCombinator } from "react-icons/fa6";

const AuthWrapperUI = () => (
  <aside className="border-line bg-surface relative z-10 hidden flex-col justify-between border-r p-10 lg:flex xl:p-14">
    <Logo />

    <div className="fade-in max-w-md space-y-12">
      <div className="space-y-5">
        <span className="border-line bg-page text-muted inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
          <span className="text-[6px] leading-none">Not</span>
          <span>backed by</span>
          <FaYCombinator aria-label="Y Combinator" />
        </span>
        <h2 className="text-[40px] leading-[1.04] font-medium tracking-[-0.025em] xl:text-[44px]">
          One-on-one. <br />
          End-to-end.
        </h2>
        <p className="text-muted text-[15px] leading-relaxed">
          Sign in to pick up a conversation, or create an account to start one.
        </p>
      </div>

      <div className="space-y-2">
        <div className="bg-ink text-page ml-auto max-w-70 rounded-xl rounded-br-md px-4 py-3">
          <p className="text-[14px] leading-relaxed">
            Please, can i get an extension for the stage 4 task?
          </p>
          <p className="text-page/55 mt-1.5 font-mono text-[10.5px] tracking-[0.14em] uppercase">
            19:42 · sent
          </p>
        </div>

        <article className="border-line bg-page relative max-w-85 rounded-xl border p-4">
          <div className="flex items-center gap-2.5">
            <div className="bg-soft-2 grid h-9 w-9 place-items-center rounded-full">
              <span className="text-ink text-[11px] font-semibold tracking-wide">
                CL
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-ink truncate text-sm font-medium tracking-tight">
                Coded Libra
              </p>
              <p className="label-mono mt-0.5">19:48 · today</p>
            </div>
          </div>
          <p className="text-ink mt-3 text-[14px] leading-relaxed">
            You're cooked
          </p>
        </article>
      </div>
    </div>

    <p className="label-mono">whisperbox · v0.1</p>
  </aside>
);

export default AuthWrapperUI;
