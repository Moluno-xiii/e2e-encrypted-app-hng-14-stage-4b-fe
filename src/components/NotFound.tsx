import { Link } from "@tanstack/react-router";

const NotFound = () => (
  <div className="bg-page text-ink grid min-h-dvh w-full place-items-center px-6">
    <div className="w-full max-w-sm text-center">
      <p className="text-faint text-sm font-medium tracking-wide">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="text-muted mt-2 text-[15px] leading-relaxed">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        replace
        className="bg-ink text-page hover:bg-ink/90 mt-8 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
      >
        Back to home
      </Link>
    </div>
  </div>
);

export default NotFound;
