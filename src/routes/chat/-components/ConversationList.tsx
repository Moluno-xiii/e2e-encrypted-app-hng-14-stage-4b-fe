import { formatCount, formatRelative, initials } from "@/lib/utils";
import type { Conversation } from "@/types/messages";
import { Link } from "@tanstack/react-router";

type Props = {
  conversations: Conversation[];
  unread: Map<string, number>;
};

const ConversationList = ({ conversations, unread }: Props) => {
  return (
    <ul className="flex-1 overflow-y-auto px-2 pb-4">
      {conversations.map((c) => {
        const count = unread?.get(c.user_id) ?? 0;
        return (
          <li key={c.user_id}>
            <Link
              preload="intent"
              to="/chat/$friend_id"
              params={{ friend_id: c.user_id }}
              activeProps={{ className: "bg-soft" }}
              inactiveProps={{ className: "hover:bg-soft" }}
              className="flex items-center gap-3 rounded-lg px-2.5 py-2.5 transition-colors"
            >
              <div className="bg-soft-2 grid h-10 w-10 shrink-0 place-items-center rounded-full">
                <span className="text-ink text-sm font-medium">
                  {initials(c.display_name)}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h3
                    className={`text-ink truncate text-[15px] tracking-tight ${
                      count > 0 ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {c.display_name}
                  </h3>
                  <span className="text-faint shrink-0 text-xs">
                    {formatRelative(c.last_message_at)}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <p className="text-muted truncate text-sm">@{c.username}</p>
                  {count > 0 && (
                    <span className="bg-ink text-page inline-flex h-4.5 min-w-4.5 shrink-0 items-center justify-center rounded-full px-1.5 text-[11px] font-medium">
                      {formatCount(count)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ConversationList;
