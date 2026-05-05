type MessagePayload = {
  ciphertext: string;
  iv: string;
  encryptedKey: string;
  encryptedKeyForSelf: string;
};

type Message = {
  id: string;
  from_user_id: string;
  to_user_id: string;
  payload: MessagePayload;
  delivered: boolean;
  created_at: string;
};

type Conversation = {
  user_id: string;
  display_name: string;
  username: string;
  last_message_at: string;
};

type UserSearchResult = {
  id: string;
  username: string;
  display_name: string;
};

type PublicKeyResponse = {
  public_key: string;
};

type GetMessagesParams = {
  limit?: number;
  before?: string;
};

type SendMessageDTO = {
  to: string;
  payload: MessagePayload;
};

type WSClientEvent = {
  event: "message.send";
  to: string;
  payload: MessagePayload;
};

type WSServerEvent =
  | {
      event: "message.receive";
      id: string;
      from_user_id: string;
      to_user_id: string;
      payload: MessagePayload;
      created_at: string;
    }
  | { event: "user.online"; user_id: string }
  | { event: "user.offline"; user_id: string }
  | { event: "error"; detail: string };

export type {
  MessagePayload,
  Message,
  Conversation,
  UserSearchResult,
  PublicKeyResponse,
  GetMessagesParams,
  SendMessageDTO,
  WSClientEvent,
  WSServerEvent,
};
