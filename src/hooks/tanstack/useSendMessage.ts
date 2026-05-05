import usePublicKey from "@/hooks/tanstack/usePublicKey";
import useAuth from "@/hooks/useAuth";
import encryptionServiceInstance from "@/services/EncryptionService";
import messageServiceInstance from "@/services/MessageService";
import webSocketServiceInstance from "@/services/WebSocketService";
import type { Conversation, Message } from "@/types/messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type MessagesCache = {
  pages: Message[][];
  pageParams: (string | undefined)[];
};

const useSendMessage = (friendId: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const recipientKey = usePublicKey(friendId);

  return useMutation({
    mutationFn: async (plaintext: string) => {
      if (!recipientKey.data || !user) {
        throw new Error("Keys not ready");
      }
      const ownKey = await encryptionServiceInstance.importPublicKey(
        user.public_key,
      );
      const payload = await encryptionServiceInstance.encryptMessage(
        plaintext,
        recipientKey.data,
        ownKey,
      );

      const optimistic: Message = {
        id: `optimistic-${crypto.randomUUID()}`,
        from_user_id: user.id,
        to_user_id: friendId,
        payload,
        delivered: false,
        created_at: new Date().toISOString(),
      };

      queryClient.setQueryData<MessagesCache>(
        ["messages", friendId],
        (old) => {
          if (!old) return old;
          const [first = [], ...rest] = old.pages;
          return { ...old, pages: [[optimistic, ...first], ...rest] };
        },
      );

      const bumpConversation = (lastMessageAt: string) => {
        queryClient.setQueryData<Conversation[]>(
          ["conversations"],
          (old) => {
            if (!old) return old;
            const existing = old.find((c) => c.user_id === friendId);
            if (!existing) return old;
            const others = old.filter((c) => c.user_id !== friendId);
            return [
              { ...existing, last_message_at: lastMessageAt },
              ...others,
            ];
          },
        );
      };

      try {
        webSocketServiceInstance.sendMessage(friendId, payload);
        bumpConversation(optimistic.created_at);
        return { sentVia: "ws", optimisticId: optimistic.id };
      } catch {
        const result = await messageServiceInstance.sendOffline({
          to: friendId,
          payload,
        });
        if (!result.success) {
          queryClient.setQueryData<MessagesCache>(
            ["messages", friendId],
            (old) => {
              if (!old) return old;
              const [first = [], ...rest] = old.pages;
              return {
                ...old,
                pages: [first.filter((m) => m.id !== optimistic.id), ...rest],
              };
            },
          );
          throw new Error(result.error);
        }
        const real = result.data;
        queryClient.setQueryData<MessagesCache>(
          ["messages", friendId],
          (old) => {
            if (!old) return old;
            const [first = [], ...rest] = old.pages;
            return {
              ...old,
              pages: [
                [real, ...first.filter((m) => m.id !== optimistic.id)],
                ...rest,
              ],
            };
          },
        );
        bumpConversation(real.created_at);
        return { sentVia: "rest", optimisticId: optimistic.id };
      }
    },
  });
};

export default useSendMessage;
