import { formatCount, formatRelative, initials } from "@/lib/utils";
import type { Conversation } from "@/types/messages";
import { Link } from "@tanstack/react-router";

type Props = {
  conversations: Conversation[];
  unread: Map<string, number>;
};

const ConversationList = ({ conversations, unread }: Props) => (
  <ul className="flex-1 overflow-y-auto px-2 py-2">
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
            className="flex items-center gap-3 rounded-md px-2.5 py-2.5 transition-colors"
          >
            <div className="bg-soft-2 grid h-9 w-9 shrink-0 place-items-center rounded-full">
              <span className="text-ink text-[11px] font-medium tracking-wide">
                {initials(c.display_name)}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3
                  className={`text-ink truncate text-[14.5px] tracking-tight ${
                    count > 0 ? "font-semibold" : "font-medium"
                  }`}
                >
                  {c.display_name}
                </h3>
                <span className="label-mono tnum shrink-0">
                  {formatRelative(c.last_message_at)}
                </span>
              </div>
              <div className="mt-0.5 flex items-center justify-between gap-2">
                <p className="text-muted truncate text-xs">@{c.username}</p>
                {count > 0 && (
                  <span className="bg-ink text-page tnum inline-flex h-4.5 min-w-4.5 shrink-0 items-center justify-center rounded-full px-1.5 font-mono text-[10.5px] leading-none font-medium">
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

export default ConversationList;
