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
import SearchResults from "./SearchResults";
import ConversationList from "./ConversationList";
import { initials } from "@/lib/utils";

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
          <SearchResults
            openThread={openThread}
            searchResults={searchResults}
          />
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
        <ConversationList conversations={conversations} unread={unread} />
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
