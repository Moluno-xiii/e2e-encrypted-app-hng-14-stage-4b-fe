import { useEffect, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type ModalProps = PropsWithChildren<{
  title: string;
  isOpen: boolean;
  onClose: () => void;
  confirmCb: () => void | Promise<void>;
  isLoading?: boolean;
}>;

const Modal = (props: ModalProps) => {
  useEffect(() => {
    if (!props.isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [props]);

  if (!props.isOpen) return null;

  return createPortal(<ModalUI {...props} />, document.body);
};

export default Modal;

const ModalUI = ({
  confirmCb,
  onClose,
  title,
  children,
  isLoading = false,
}: ModalProps) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="bg-ink/30 absolute inset-0 backdrop-blur-sm"
      />
      <div className="bg-surface border-line fade-in relative z-10 w-full max-w-md rounded-xl border p-6">
        <p className="label-mono">Confirm</p>
        <h2
          id="modal-title"
          className="text-ink mt-2 text-lg font-medium tracking-[-0.015em]"
        >
          {title}
        </h2>
        {children && (
          <div className="text-muted mt-2 text-sm leading-relaxed">
            {children}
          </div>
        )}
        <div className="mt-7 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="text-ink border-line hover:bg-soft rounded-md border px-3.5 py-1.5 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={async () => {
              await confirmCb();
              onClose();
            }}
            className="bg-ink text-page hover:bg-ink/90 rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors disabled:opacity-60"
          >
            {isLoading ? "Loading…" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};
