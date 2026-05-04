import { FiAlertCircle } from "react-icons/fi";

const FormError = ({ error }: { error: string | null }) => {
  if (!error) return null;
  return (
    <div
      role="alert"
      className="border-danger/20 bg-danger/10 text-danger flex items-start gap-2 rounded-lg border px-3 py-2 text-xs"
    >
      <FiAlertCircle className="mt-0.5 shrink-0" size={14} aria-hidden />
      <span className="leading-relaxed">{error}</span>
    </div>
  );
};

export default FormError;
