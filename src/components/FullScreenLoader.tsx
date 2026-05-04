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
    className="bg-page fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
  >
    <Logo />
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="border-line-2 border-t-ink h-4 w-4 animate-spin rounded-full border-2"
      />
      <span className="text-muted text-sm">{label}…</span>
    </div>
  </div>
);

export default FullScreenLoader;
