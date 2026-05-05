import useConversations from "@/hooks/tanstack/useConversations";
import useMessages from "@/hooks/tanstack/useMessages";
import useSendMessage from "@/hooks/tanstack/useSendMessage";
import useAuth from "@/hooks/useAuth";
import useDecryptedMessages from "@/hooks/useDecryptedMessages";
import { DecryptionError } from "@/services/EncryptionService";
import type { Message } from "@/types/messages";
import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  useEffect,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import toast from "react-hot-toast";
import { FiArrowLeft, FiLock, FiSend } from "react-icons/fi";
import ThreadSkeleton from "./-components/ThreadSkeleton";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const formatTime = (iso: string): string =>
  new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

const formatDay = (iso: string): string => {
  const date = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
  if (sameDay(date, today)) return "Today";
  if (sameDay(date, yesterday)) return "Yesterday";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const groupByDate = (messages: Message[]) => {
  const groups: { date: string; items: Message[] }[] = [];
  for (const m of messages) {
    const day = formatDay(m.created_at);
    const last = groups[groups.length - 1];
    if (last && last.date === day) last.items.push(m);
    else groups.push({ date: day, items: [m] });
  }
  return groups;
};

type FriendInfoState = {
  friendInfo?: { display_name: string; username: string };
};

const RouteComponent = () => {
  const { friend_id } = Route.useParams();
  const { user, privateKey } = useAuth();
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

  const decrypted = useDecryptedMessages(messages, privateKey, user?.id);
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
      <header className="border-line bg-surface/85 flex items-center gap-3 border-b px-4 py-3 backdrop-blur lg:px-6">
        <Link
          to="/chat"
          className="text-muted hover:text-ink hover:bg-soft -ml-1 grid h-9 w-9 place-items-center rounded-full transition-colors lg:hidden"
          aria-label="Back"
        >
          <FiArrowLeft size={18} />
        </Link>

        <div className="bg-soft-2 grid h-10 w-10 shrink-0 place-items-center rounded-full">
          <span className="text-ink text-sm font-medium">
            {initials(friendName)}
          </span>
        </div>

        <div className="min-w-0">
          <h2 className="text-ink truncate text-[15px] font-semibold tracking-tight">
            {friendName}
          </h2>
          {friendUsername && (
            <p className="text-muted truncate text-xs">@{friendUsername}</p>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {hasNextPage && (
            <div className="flex justify-center">
              <button
                type="button"
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
                className="text-muted hover:text-ink border-line hover:bg-soft rounded-full border px-3 py-1 text-xs font-medium transition-colors disabled:opacity-50"
              >
                {isFetchingNextPage ? "Loading…" : "Load older"}
              </button>
            </div>
          )}

          {isError && messages.length === 0 && (
            <div className="text-muted text-center text-sm">
              Couldn't load messages.
            </div>
          )}

          <div className="text-faint flex items-center justify-center gap-1.5 text-xs">
            <FiLock size={12} aria-hidden />
            <span>Messages are end-to-end encrypted</span>
          </div>

          {groups.length === 0 && !isError && (
            <div className="text-muted py-8 text-center text-sm">
              No messages yet — say hi.
            </div>
          )}

          {groups.map((group) => (
            <section key={group.date} className="space-y-4">
              <div className="flex items-center justify-center">
                <span className="bg-soft text-muted rounded-full px-3 py-1 text-xs font-medium">
                  {group.date}
                </span>
              </div>

              {group.items.map((m, i) => {
                const fromSelf = m.from_user_id === user?.id;
                const prev = group.items[i - 1];
                const isGrouped = prev && prev.from_user_id === m.from_user_id;
                const text = decrypted.get(m.id);
                const decryptFailed = text instanceof DecryptionError;
                const display = decryptFailed
                  ? "⚠ Could not decrypt"
                  : (text ?? "…");

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
              })}
            </section>
          ))}
        </div>
      </main>

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
              onKeyDown={handleKeyDown}
              placeholder={`Message ${friendName.split(" ")[0]}`}
              className="placeholder:text-faint field-sizing-content max-h-32 w-full resize-none bg-transparent text-[15px] leading-relaxed outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!draft.trim() || sendMutation.isPending}
            className="bg-ink text-page hover:bg-ink/90 grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send"
          >
            <FiSend size={16} />
          </button>
        </form>
      </footer>
    </div>
  );
};

export const Route = createFileRoute("/chat/$friend_id")({
  component: RouteComponent,
});
