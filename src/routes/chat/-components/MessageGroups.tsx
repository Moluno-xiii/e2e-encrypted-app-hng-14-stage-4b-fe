import type { Message } from "@/types/messages";
import MessageGroup from "./MessageGroup";
import useAuth from "@/hooks/useAuth";
import useDecryptedMessages from "@/hooks/useDecryptedMessages";

const MessageGroups = ({
  groups,
  messages,
}: {
  groups: { date: string; items: Message[] }[];
  messages: Message[];
}) => {
  const { user, privateKey } = useAuth();
  const decrypted = useDecryptedMessages(messages, privateKey, user?.id);

  return (
    <ul>
      {groups.map((group) => (
        <li key={group.date} className="space-y-4">
          <div className="flex items-center justify-center">
            <span className="bg-soft text-muted rounded-full px-3 py-1 text-xs font-medium">
              {group.date}
            </span>
          </div>

          {group.items.map((m, i) => {
            const prev = group.items[i - 1];
            const text = decrypted.get(m.id);
            return (
              <MessageGroup m={m} prev={prev} text={text} userId={user?.id} />
            );
          })}
        </li>
      ))}
    </ul>
  );
};

export default MessageGroups;
