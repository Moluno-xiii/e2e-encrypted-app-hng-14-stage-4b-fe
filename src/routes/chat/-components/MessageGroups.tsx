import type { Message } from "@/types/messages";
import MessageGroup from "./MessageGroup";
import useAuth from "@/hooks/useAuth";
import useDecryptedMessages from "@/hooks/useDecryptedMessages";

type Props = {
  groups: { date: string; items: Message[] }[];
  messages: Message[];
};

const MessageGroups = ({ groups, messages }: Props) => {
  const { user, privateKey } = useAuth();
  const decrypted = useDecryptedMessages(messages, privateKey, user?.id);

  return (
    <ul className="space-y-7">
      {groups.map((group) => (
        <li key={group.date}>
          <div className="my-4 flex items-center gap-3">
            <span className="bg-line-2 hairline-rule h-px flex-1" />
            <span className="label-mono">{group.date}</span>
            <span className="bg-line-2 hairline-rule h-px flex-1" />
          </div>

          <div>
            {group.items.map((m, i) => {
              const prev = group.items[i - 1];
              const text = decrypted.get(m.id);
              return (
                <MessageGroup
                  key={m.id}
                  m={m}
                  prev={prev}
                  text={text}
                  userId={user?.id}
                />
              );
            })}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MessageGroups;
