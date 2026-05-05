import useAuth from "@/hooks/useAuth";
import webSocketServiceInstance from "@/services/WebSocketService";
import type { Conversation, Message, WSServerEvent } from "@/types/messages";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

type MessagesCache = {
  pages: Message[][];
  pageParams: (string | undefined)[];
};

const useReceiveMessages = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const location = useLocation();
  const pathRef = useRef(location.pathname);

  useEffect(() => {
    pathRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    if (!user) return;

    const onReceive = (
      event: Extract<WSServerEvent, { event: "message.receive" }>,
    ) => {
      if (event.from_user_id === user.id) return;

      const friendId = event.from_user_id;
      const incoming: Message = {
        id: event.id,
        from_user_id: event.from_user_id,
        to_user_id: event.to_user_id,
        payload: event.payload,
        delivered: true,
        created_at: event.created_at,
      };

      queryClient.setQueryData<MessagesCache>(
        ["messages", friendId],
        (old) => {
          if (!old) return old;
          const [first = [], ...rest] = old.pages;
          if (first.some((m) => m.id === incoming.id)) return old;
          return { ...old, pages: [[incoming, ...first], ...rest] };
        },
      );

      queryClient.setQueryData<Conversation[]>(["conversations"], (old) => {
        if (!old) return old;
        const existing = old.find((c) => c.user_id === friendId);
        if (!existing) return old;
        const others = old.filter((c) => c.user_id !== friendId);
        return [
          { ...existing, last_message_at: event.created_at },
          ...others,
        ];
      });

      const isViewing =
        pathRef.current === `/chat/${friendId}` && document.hasFocus();
      if (!isViewing) {
        queryClient.setQueryData<Map<string, number>>(["unread"], (old) => {
          const next = new Map(old);
          next.set(friendId, (next.get(friendId) ?? 0) + 1);
          return next;
        });
      }

      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    };

    webSocketServiceInstance.on("message.receive", onReceive);
    return () => webSocketServiceInstance.off("message.receive", onReceive);
  }, [queryClient, user]);
};

export default useReceiveMessages;
