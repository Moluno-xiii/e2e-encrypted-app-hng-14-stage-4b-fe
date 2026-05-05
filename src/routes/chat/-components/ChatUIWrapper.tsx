import Modal from "@/components/shared/Modal";
import useConversations from "@/hooks/tanstack/useConversations";
import useUnread from "@/hooks/tanstack/useUnread";
import useUserSearch from "@/hooks/tanstack/useUserSearch";
import useAuth from "@/hooks/useAuth";
import useDebounce from "@/hooks/useDebounce";
import type { Conversation, UserSearchResult } from "@/types/messages";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FiLogOut, FiSearch } from "react-icons/fi";
import ConversationListSkeleton from "./ConversationListSkeleton";
import SearchResults from "./SearchResults";
import ConversationList from "./ConversationList";
import { initials } from "@/lib/utils";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/shared/ThemeToggle";

type Props = {
  hasOpenThread: boolean;
};

const fingerprint = (publicKey: string | undefined): string => {
  if (!publicKey) return "";
  const cleaned = publicKey.replace(/[^a-zA-Z0-9]/g, "");
  return cleaned.slice(-8).toLowerCase();
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
      <header className="flex items-center justify-between px-4 pt-5 pb-4">
        <Logo />
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="text-muted hover:bg-soft hover:text-ink grid h-8 w-8 place-items-center rounded-md transition-colors"
            aria-label="Sign out"
          >
            <FiLogOut size={15} />
          </button>
        </div>
      </header>

      <div className="px-4 pb-4">
        <label
          htmlFor="conversation-search"
          className="border-line bg-page focus-within:border-ink/40 focus-within:ring-ink/10 flex items-center gap-2 rounded-md border px-3 py-2 transition-[border-color,box-shadow] focus-within:ring-2"
        >
          <FiSearch className="text-faint shrink-0" size={14} />
          <input
            id="conversation-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find someone"
            className="placeholder:text-faint w-full bg-transparent text-sm outline-none"
          />
        </label>
      </div>

      <div className="border-line flex items-center justify-between border-y px-5 py-2">
        <span className="label-mono">
          {isSearching ? "Search" : "Conversations"}
        </span>
        {!isSearching && conversations && conversations.length > 0 && (
          <span className="label-mono tnum">
            {String(conversations.length).padStart(2, "0")}
          </span>
        )}
      </div>

      {isSearching ? (
        isSearchLoading ? (
          <ConversationListSkeleton count={3} />
        ) : isSearchError ? (
          <div className="text-muted flex flex-1 items-center justify-center px-6 text-center text-sm">
            Search failed.
          </div>
        ) : !searchResults || searchResults.length === 0 ? (
          <div className="text-muted flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="label-mono">no match</p>
            <p className="text-sm">
              Nothing found for &ldquo;{debouncedQuery}&rdquo;.
            </p>
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
        <div className="text-muted flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
          <p className="label-mono">empty</p>
          <p className="text-ink text-sm font-medium tracking-tight">
            No conversations yet
          </p>
          <p className="text-xs leading-relaxed">
            Search above to find someone.
          </p>
        </div>
      ) : (
        <ConversationList conversations={conversations} unread={unread} />
      )}

      {user && (
        <footer className="border-line flex items-center justify-between border-t px-4 py-3.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="bg-soft-2 grid h-8 w-8 shrink-0 place-items-center rounded-full">
              <span className="text-ink text-[11px] font-medium tracking-wide">
                {initials(user.display_name)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-ink truncate text-sm font-medium tracking-tight">
                {user.display_name}
              </p>
              <p className="label-mono truncate" title="Public key fingerprint">
                fp · {fingerprint(user.public_key)}
              </p>
            </div>
          </div>
        </footer>
      )}

      <Modal
        isLoading={isLoading === "logout"}
        isOpen={isLogoutModalOpen}
        confirmCb={async () => await logout()}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Sign out of WhisperBox?"
      />
    </aside>
  );
};

export default ChatUIWrapper;
