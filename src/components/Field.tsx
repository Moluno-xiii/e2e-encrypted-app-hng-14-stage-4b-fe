import type { InputHTMLAttributes } from "react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  hint?: string;
};

const Field = ({
  label,
  name,
  type = "text",
  hint,
  className = "",
  ...rest
}: FieldProps) => (
  <label htmlFor={name} className="group block">
    <span className="flex items-baseline justify-between">
      <span className="font-mono text-[10px] tracking-[0.25em] text-ink-faint uppercase">
        {label}
      </span>
      {hint ? (
        <span className="font-mono text-[10px] tracking-[0.18em] text-ink-faint/70 uppercase">
          {hint}
        </span>
      ) : null}
    </span>
    <input
      id={name}
      name={name}
      type={type}
      className={`mt-2 w-full border-b border-hairline bg-transparent pb-2 text-ink placeholder:text-ink-faint/60 transition-colors duration-200 focus:border-accent focus:outline-none ${className}`}
      {...rest}
    />
  </label>
);

export default Field;
