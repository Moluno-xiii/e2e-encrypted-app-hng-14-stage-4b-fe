import type { Dispatch, FormEvent, KeyboardEvent, SetStateAction } from "react";
import { FiSend } from "react-icons/fi";

type Props = {
  friendName: string;
  draft: string;
  isMutationPending: boolean;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  setDraft: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: FormEvent) => void;
};

const ChatInput = ({
  friendName,
  draft,
  isMutationPending,
  onKeyDown,
  setDraft,
  handleSubmit,
}: Props) => (
  <footer className="border-line bg-surface border-t px-4 py-3 lg:px-6">
    <form
      className="mx-auto flex max-w-3xl items-end gap-2.5"
      onSubmit={handleSubmit}
    >
      <div className="border-line bg-page focus-within:border-ink/40 focus-within:ring-ink/10 flex flex-1 items-end gap-2 rounded-md border px-3.5 py-2.5 transition-[border-color,box-shadow] focus-within:ring-2">
        <textarea
          rows={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={`Message ${friendName.split(" ")[0]}`}
          className="placeholder:text-faint field-sizing-content max-h-32 w-full resize-none bg-transparent text-[15px] leading-relaxed outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={!draft.trim() || isMutationPending}
        className="bg-ink text-page hover:bg-ink/90 grid h-10 w-10 shrink-0 place-items-center rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Send"
      >
        <FiSend size={15} />
      </button>
    </form>
  </footer>
);

export default ChatInput;
