import Logo from "./Logo";

type FullScreenLoaderProps = {
  label?: string;
};

const FullScreenLoader = ({
  label = "Restoring session",
}: FullScreenLoaderProps) => (
  <div
    role="status"
    aria-live="polite"
    className="bg-page fixed inset-0 z-50 flex flex-col items-center justify-center gap-7"
  >
    <Logo />
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className="dot-pulse text-ink inline-flex items-center gap-1"
      >
        <span className="h-1 w-1 rounded-full bg-current" />
        <span className="h-1 w-1 rounded-full bg-current" />
        <span className="h-1 w-1 rounded-full bg-current" />
      </span>
      <span className="label-mono">{label}</span>
    </div>
  </div>
);

export default FullScreenLoader;
