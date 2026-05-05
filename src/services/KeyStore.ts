import { createStore, del, get, set } from "idb-keyval";

const store = createStore("whisperbox-keys", "private-keys");

class KeyStore {
  constructor() {}

  async put(userId: string, privateKey: CryptoKey): Promise<void> {
    await set(userId, privateKey, store);
  }

  async get(userId: string): Promise<CryptoKey | null> {
    const value = await get<CryptoKey>(userId, store);
    return value ?? null;
  }

  async clear(userId: string): Promise<void> {
    await del(userId, store);
  }
}

const keyStoreInstance = new KeyStore();
export default keyStoreInstance;
