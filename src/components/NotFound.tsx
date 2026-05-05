import { Link } from "@tanstack/react-router";
import { FiArrowLeft } from "react-icons/fi";

const NotFound = () => (
  <div className="bg-page text-ink grid min-h-dvh w-full place-items-center px-6">
    <div className="w-full max-w-sm text-center">
      <p className="label-mono">404 · not found</p>
      <h1 className="mt-4 text-2xl font-medium tracking-[-0.02em]">
        This box is empty.
      </h1>
      <p className="text-muted mt-3 text-[15px] leading-relaxed">
        The page you're looking for doesn't exist, or it was moved.
      </p>
      <Link
        to="/"
        replace
        className="bg-ink text-page hover:bg-ink/90 mt-8 inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-medium transition-colors"
      >
        <FiArrowLeft size={14} aria-hidden />
        Back to home
      </Link>
    </div>
  </div>
);

export default NotFound;
