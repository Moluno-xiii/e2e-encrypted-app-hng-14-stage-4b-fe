import endpoints from "@/constants/endpoints";
import { authTryCatch } from "@/lib/customFetch";
import type {
  Conversation,
  GetMessagesParams,
  Message,
} from "@/types/messages";

class ConversationService {
  listConversations() {
    return authTryCatch<Conversation[]>({
      url: endpoints.conversations.list,
      method: "GET",
    });
  }

  getMessages(userId: string, params?: GetMessagesParams) {
    return authTryCatch<Message[]>({
      url: endpoints.conversations.messages(userId, params),
      method: "GET",
    });
  }
}

const conversationServiceInstance = new ConversationService();
export default conversationServiceInstance;
