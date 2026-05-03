import { Link } from "@tanstack/react-router";

const Logo = ({ className = "" }: { className?: string }) => (
  <Link
    to="/"
    className={`group inline-flex items-center gap-2.5 ${className}`}
    aria-label="Sealed home"
  >
    <span
      aria-hidden
      className="bg-ink relative grid h-9 w-9 place-items-center rounded-xl shadow-[0_4px_14px_-4px_rgba(20,20,24,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-300 group-hover:scale-105"
    >
      <span className="bg-page/90 h-1.5 w-1.5 rounded-full" />
    </span>
    <span className="text-ink text-lg font-semibold tracking-tight">
      Sealed
    </span>
  </Link>
);

export default Logo;
