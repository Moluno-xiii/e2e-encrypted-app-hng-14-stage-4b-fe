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
  <div className="space-y-1.5">
    <div className="flex items-baseline justify-between">
      <label
        htmlFor={name}
        className="text-ink text-sm font-medium tracking-tight"
      >
        {label}
      </label>
      {hint ? <span className="text-faint text-xs">{hint}</span> : null}
    </div>
    <input
      id={name}
      name={name}
      type={type}
      className={`border-line bg-surface placeholder:text-faint focus:border-ink/50 focus:ring-ink/10 block w-full rounded-lg border px-3.5 py-2.5 text-[15px] outline-none transition-[border-color,box-shadow] focus:ring-4 ${className}`}
      {...rest}
    />
  </div>
);

export default Field;
