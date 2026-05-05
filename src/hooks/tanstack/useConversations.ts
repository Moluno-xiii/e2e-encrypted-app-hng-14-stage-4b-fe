import conversationServiceInstance from "@/services/ConversationService";
import type { Conversation } from "@/types/messages";
import { useQuery } from "@tanstack/react-query";

const fetchConversations = async (): Promise<Conversation[]> => {
  const result = await conversationServiceInstance.listConversations();
  if (!result.success) throw new Error(result.error);
  return result.data;
};

const useConversations = () =>
  useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

export default useConversations;
