import { Link } from "@tanstack/react-router";

const Logo = ({ className = "" }: { className?: string }) => (
  <Link
    to="/"
    className={`group inline-flex items-center gap-2.5 ${className}`}
    aria-label="WhisperBox home"
  >
    <span
      aria-hidden
      className="bg-ink relative grid h-7 w-7 place-items-center rounded-[6px] transition-transform duration-300 group-hover:-translate-y-px"
    >
      <span className="bg-page/95 h-px w-3.5 rounded-full" />
    </span>
    <span className="text-ink text-[17px] leading-none font-medium tracking-[-0.01em]">
      Whisper<span className="text-muted">box</span>
    </span>
  </Link>
);

export default Logo;
