import useTheme from "@/hooks/useTheme";
import { FiMoon, FiSun } from "react-icons/fi";

type Variant = "icon" | "ghost";

type Props = {
  className?: string;
  variant?: Variant;
};

const ThemeToggle = ({ className = "", variant = "icon" }: Props) => {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  const base =
    "text-muted hover:text-ink transition-colors grid place-items-center";
  const variants: Record<Variant, string> = {
    icon: "h-8 w-8 rounded-md hover:bg-soft",
    ghost: "h-9 w-9 rounded-md",
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {isDark ? (
        <FiSun size={15} aria-hidden />
      ) : (
        <FiMoon size={15} aria-hidden />
      )}
    </button>
  );
};

export default ThemeToggle;
