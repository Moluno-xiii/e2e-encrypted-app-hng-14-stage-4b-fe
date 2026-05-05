import Modal from "@/components/shared/Modal";
import useConversations from "@/hooks/tanstack/useConversations";
import useUnread from "@/hooks/tanstack/useUnread";
import useUserSearch from "@/hooks/tanstack/useUserSearch";
import useAuth from "@/hooks/useAuth";
import useDebounce from "@/hooks/useDebounce";
import type { Conversation, UserSearchResult } from "@/types/messages";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { PiSignOut } from "react-icons/pi";
import ConversationListSkeleton from "./ConversationListSkeleton";

const formatCount = (n: number): string => (n > 9 ? "9+" : String(n));

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const formatRelative = (iso: string): string => {
  const date = new Date(iso);
  const diffMin = Math.floor((Date.now() - date.getTime()) / 60_000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d`;
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};

type Props = {
  hasOpenThread: boolean;
};

const ChatUIWrapper = ({ hasOpenThread }: Props) => {
  const { logout, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim(), 250);
  const isSearching = debouncedQuery.length > 0;

  const {
    data: conversations,
    isLoading: isLoadingConversations,
    isError,
  } = useConversations();

  const {
    data: searchResults,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useUserSearch(debouncedQuery);

  const { data: unread } = useUnread();

  const openThread = (result: UserSearchResult) => {
    queryClient.setQueryData<Conversation[]>(["conversations"], (old) => {
      const seed: Conversation = {
        user_id: result.id,
        display_name: result.display_name,
        username: result.username,
        last_message_at: new Date().toISOString(),
      };
      if (!old) return [seed];
      if (old.some((c) => c.user_id === result.id)) return old;
      return [seed, ...old];
    });
    setQuery("");
    navigate({
      to: "/chat/$friend_id",
      params: { friend_id: result.id },
      state: {
        friendInfo: {
          display_name: result.display_name,
          username: result.username,
        },
      } as never,
    });
  };

  return (
    <aside
      className={`border-line bg-surface flex min-h-0 flex-col border-r ${
        hasOpenThread ? "hidden lg:flex" : "flex"
      }`}
    >
      <header className="flex items-center justify-between px-4 pt-5 pb-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-ink h-7 w-7 rounded-full" aria-hidden />
          <span className="text-base font-semibold tracking-tight">Sealed</span>
        </Link>
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="hover:bg-soft text-muted hover:text-ink grid h-9 w-9 place-items-center rounded-full transition-colors"
          aria-label="Logout"
        >
          <PiSignOut color="red" />
        </button>
      </header>

      <div className="px-4 pb-3">
        <div className="bg-soft flex items-center gap-2 rounded-lg px-3 py-2">
          <CiSearch />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search people"
            className="placeholder:text-faint w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {isSearching ? (
        isSearchLoading ? (
          <ConversationListSkeleton count={3} />
        ) : isSearchError ? (
          <div className="text-muted flex flex-1 items-center justify-center px-6 text-center text-sm">
            Search failed.
          </div>
        ) : !searchResults || searchResults.length === 0 ? (
          <div className="text-muted flex flex-1 flex-col items-center justify-center px-6 text-center text-sm">
            No users found for "{debouncedQuery}".
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto px-2 pb-4">
            {searchResults.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => openThread(r)}
                  className="hover:bg-soft flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition-colors"
                >
                  <div className="bg-soft-2 grid h-10 w-10 shrink-0 place-items-center rounded-full">
                    <span className="text-ink text-sm font-medium">
                      {initials(r.display_name)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-ink truncate text-[15px] font-medium tracking-tight">
                      {r.display_name}
                    </h3>
                    <p className="text-muted mt-0.5 truncate text-sm">
                      @{r.username}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )
      ) : isLoadingConversations ? (
        <ConversationListSkeleton />
      ) : isError ? (
        <div className="text-muted flex flex-1 items-center justify-center px-6 text-center text-sm">
          Couldn't load conversations.
        </div>
      ) : !conversations || conversations.length === 0 ? (
        <div className="text-muted flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="text-ink text-sm font-medium">No conversations yet</p>
          <p className="mt-1 text-xs leading-relaxed">
            Search for someone to start a chat.
          </p>
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto px-2 pb-4">
          {conversations.map((c) => {
            const count = unread?.get(c.user_id) ?? 0;
            return (
              <li key={c.user_id}>
                <Link
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
                      <p className="text-muted truncate text-sm">
                        @{c.username}
                      </p>
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
      )}

      <footer className="border-line flex items-center justify-between border-t px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="bg-soft-2 grid h-8 w-8 place-items-center rounded-full">
            <span className="text-ink text-xs font-medium">
              {initials(user!.display_name)}
            </span>
          </div>
          <span className="text-ink text-sm font-medium">{user?.username}</span>
        </div>
      </footer>
      <Modal
        isLoading={isLoading === "logout"}
        isOpen={isLogoutModalOpen}
        confirmCb={async () => await logout()}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Are you sure you want to logout"
      />
    </aside>
  );
};

export default ChatUIWrapper;
