import endpoints from "@/constants/endpoints";
import { authTryCatch } from "@/lib/customFetch";
import type { Message, SendMessageDTO } from "@/types/messages";

class MessageService {
  sendOffline(body: SendMessageDTO) {
    return authTryCatch<Message>({
      url: endpoints.messages.send,
      method: "POST",
      options: { body: JSON.stringify(body) },
    });
  }
}

const messageServiceInstance = new MessageService();
export default messageServiceInstance;
