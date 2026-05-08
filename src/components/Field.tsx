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
      <label htmlFor={name} className="label-mono text-ink/80">
        {label}
      </label>
      {hint ? <span className="text-faint text-xs">{hint}</span> : null}
    </div>
    <input
      id={name}
      name={name}
      type={type}
      className={`border-line bg-page placeholder:text-faint focus:border-ink/40 focus:ring-ink/10 block w-full rounded-md border px-3.5 py-2.5 text-[15px] transition-[border-color,box-shadow] outline-none focus:ring-2 ${className}`}
      {...rest}
    />
  </div>
);

export default Field;
