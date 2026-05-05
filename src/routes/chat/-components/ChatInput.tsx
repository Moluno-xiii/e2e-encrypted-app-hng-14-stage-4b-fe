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
}: Props) => {
  return (
    <footer className="border-line bg-surface border-t px-4 py-3 lg:px-6">
      <form
        className="mx-auto flex max-w-3xl items-end gap-2"
        onSubmit={handleSubmit}
      >
        <div className="bg-soft focus-within:ring-ink/15 flex flex-1 items-end gap-2 rounded-2xl px-4 py-2.5 transition-shadow focus-within:ring-2">
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
          className="bg-ink text-page hover:bg-ink/90 grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send"
        >
          <FiSend size={16} />
        </button>
      </form>
    </footer>
  );
};

export default ChatInput;
