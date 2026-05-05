import encryptionServiceInstance, {
  DecryptionError,
} from "@/services/EncryptionService";
import type { Message } from "@/types/messages";
import { useEffect, useState } from "react";

type DecryptedMap = Map<string, string | DecryptionError>;

const useDecryptedMessages = (
  messages: Message[],
  privateKey: CryptoKey | undefined,
  currentUserId: string | undefined,
): DecryptedMap => {
  const [decrypted, setDecrypted] = useState<DecryptedMap>(new Map());

  useEffect(() => {
    if (!privateKey || !currentUserId) return;
    if (messages.length === 0) return;

    const todo = messages.filter((m) => !decrypted.has(m.id));
    if (todo.length === 0) return;

    let cancelled = false;

    Promise.all(
      todo.map(async (m) => {
        try {
          const text = await encryptionServiceInstance.decryptMessage(
            m.payload,
            privateKey,
            m.from_user_id === currentUserId,
          );
          return [m.id, text] as const;
        } catch (e) {
          return [
            m.id,
            e instanceof DecryptionError ? e : new DecryptionError(),
          ] as const;
        }
      }),
    ).then((results) => {
      if (cancelled) return;
      setDecrypted((prev) => {
        const next = new Map(prev);
        for (const [id, value] of results) next.set(id, value);
        return next;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [messages, privateKey, currentUserId, decrypted]);

  return decrypted;
};

export default useDecryptedMessages;
