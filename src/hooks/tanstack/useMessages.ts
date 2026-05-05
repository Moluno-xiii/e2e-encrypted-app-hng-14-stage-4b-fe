import conversationServiceInstance from "@/services/ConversationService";
import type { Message } from "@/types/messages";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 50;

const fetchPage = async (
  friendId: string,
  before?: string,
): Promise<Message[]> => {
  const result = await conversationServiceInstance.getMessages(friendId, {
    limit: PAGE_SIZE,
    before,
  });
  if (!result.success) throw new Error(result.error);
  return result.data;
};

const useMessages = (friendId: string) => {
  const query = useInfiniteQuery({
    queryKey: ["messages", friendId],
    queryFn: ({ pageParam }) => fetchPage(friendId, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.length < PAGE_SIZE
        ? undefined
        : lastPage[lastPage.length - 1].created_at,
  });

  const messages = query.data?.pages.flat().slice().reverse() ?? [];

  return { ...query, messages };
};

export default useMessages;
