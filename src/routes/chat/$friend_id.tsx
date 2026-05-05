import useConversations from "@/hooks/tanstack/useConversations";
import useMessages from "@/hooks/tanstack/useMessages";
import useSendMessage from "@/hooks/tanstack/useSendMessage";
import { groupByDate, initials } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type KeyboardEvent } from "react";
import toast from "react-hot-toast";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import ChatInput from "./-components/ChatInput";
import MessageGroups from "./-components/MessageGroups";
import ThreadSkeleton from "./-components/ThreadSkeleton";

type FriendInfoState = {
  friendInfo?: { display_name: string; username: string };
};

const RouteComponent = () => {
  const { friend_id } = Route.useParams();
  const { data: conversations } = useConversations();
  const friend = conversations?.find((c) => c.user_id === friend_id);
  const location = useLocation();
  const stateInfo = (location.state as FriendInfoState | undefined)?.friendInfo;

  const {
    messages,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useMessages(friend_id);

  const sendMutation = useSendMessage(friend_id);
  const [draft, setDraft] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    const reset = () => {
      queryClient.setQueryData<Map<string, number>>(["unread"], (old) => {
        if (!old?.has(friend_id)) return old;
        const next = new Map(old);
        next.delete(friend_id);
        return next;
      });
    };
    reset();
    window.addEventListener("focus", reset);
    return () => window.removeEventListener("focus", reset);
  }, [friend_id, queryClient]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || sendMutation.isPending) return;
    sendMutation.mutate(text, {
      onSuccess: () => setDraft(""),
      onError: (err) =>
        toast.error(err instanceof Error ? err.message : "Failed to send"),
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (isLoading) return <ThreadSkeleton />;

  const groups = groupByDate(messages);
  const friendName =
    friend?.display_name ?? stateInfo?.display_name ?? "Conversation";
  const friendUsername = friend?.username ?? stateInfo?.username;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="border-line bg-surface flex items-center gap-3 border-b px-4 py-3 lg:px-6">
        <Link
          to="/chat"
          className="text-muted hover:text-ink hover:bg-soft -ml-1 grid h-9 w-9 place-items-center rounded-md transition-colors lg:hidden"
          aria-label="Back"
        >
          <FiArrowLeft size={17} />
        </Link>

        <div className="bg-soft-2 grid h-9 w-9 shrink-0 place-items-center rounded-full">
          <span className="text-ink text-[11px] font-medium tracking-wide">
            {initials(friendName)}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-ink truncate text-[15px] font-semibold tracking-[-0.01em]">
            {friendName}
          </h2>
          {friendUsername && (
            <p className="text-muted truncate text-xs">@{friendUsername}</p>
          )}
        </div>

        <span
          className="border-line text-muted hidden items-center gap-1.5 rounded-md border px-2 py-1 sm:inline-flex"
          title="Messages in this thread are end-to-end encrypted"
        >
          <FiLock size={11} aria-hidden />
          <span className="label-mono">e2e</span>
        </span>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-7 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {hasNextPage && (
            <div className="mb-6 flex justify-center">
              <button
                type="button"
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
                className="text-muted hover:text-ink border-line hover:bg-soft rounded-md border px-3 py-1 text-xs font-medium transition-colors disabled:opacity-50"
              >
                {isFetchingNextPage ? "Loading…" : "Load older"}
              </button>
            </div>
          )}

          {isError && messages.length === 0 && (
            <div className="text-muted py-8 text-center text-sm">
              Couldn't load messages.
            </div>
          )}

          {groups.length === 0 && !isError && (
            <div className="text-muted py-12 text-center">
              <p className="label-mono">empty thread</p>
              <p className="mt-2 text-sm">No messages yet — say hi.</p>
            </div>
          )}

          <MessageGroups messages={messages} groups={groups} />
        </div>
      </main>

      <ChatInput
        draft={draft}
        setDraft={setDraft}
        friendName={friendName}
        handleSubmit={handleSubmit}
        isMutationPending={sendMutation.isPending}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export const Route = createFileRoute("/chat/$friend_id")({
  component: RouteComponent,
});
