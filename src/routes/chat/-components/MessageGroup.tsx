import { formatTime } from "@/lib/utils";
import { DecryptionError } from "@/services/EncryptionService";
import type { Message } from "@/types/messages";

type Props = {
  m: Message;
  userId: string | undefined;
  text: string | DecryptionError | undefined;
  prev: Message;
};

const MessageGroup = ({ m, userId, text, prev }: Props) => {
  const fromSelf = m.from_user_id === userId;

  const isGrouped = prev && prev.from_user_id === m.from_user_id;
  const decryptFailed = text instanceof DecryptionError;
  const display = decryptFailed ? "⚠ Could not decrypt" : (text ?? "…");

  return (
    <div
      key={m.id}
      className={`flex ${
        fromSelf ? "justify-end" : "justify-start"
      } ${isGrouped ? "mt-1" : "mt-3"}`}
    >
      <div
        className={`flex max-w-[78%] flex-col gap-1 sm:max-w-[68%] ${
          fromSelf ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-3.5 py-2 text-[15px] leading-relaxed ${
            decryptFailed
              ? "border-danger/20 bg-danger/10 text-danger rounded-2xl border"
              : fromSelf
                ? "bg-ink text-page rounded-2xl rounded-br-md"
                : "bg-soft text-ink rounded-2xl rounded-bl-md"
          }`}
        >
          {display}
        </div>
        <span className="text-faint px-1 text-[11px]">
          {formatTime(m.created_at)}
        </span>
      </div>
    </div>
  );
};

export default MessageGroup;
