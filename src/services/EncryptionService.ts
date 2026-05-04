type KeyMaterial = {
  public_key: string;
  wrapped_private_key: string;
  pbkdf2_salt: string;
};

const PBKDF2_ITERATIONS = 100_000;
const PBKDF2_SALT_BYTES = 16;
const RSA_MODULUS_LENGTH = 2048;
const AES_GCM_LENGTH = 256;
const AES_GCM_IV_BYTES = 12;

class EncryptionService {
  private readonly subtle: SubtleCrypto;

  constructor() {
    this.subtle = window.crypto.subtle;
  }

  async generateRSAKeyPair(): Promise<CryptoKeyPair> {
    return this.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: RSA_MODULUS_LENGTH,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"],
    );
  }

  generateSalt(): Uint8Array<ArrayBuffer> {
    return window.crypto.getRandomValues(new Uint8Array(PBKDF2_SALT_BYTES));
  }

  async deriveWrappingKey(
    password: string,
    salt: BufferSource,
  ): Promise<CryptoKey> {
    const passwordKey = await this.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"],
    );

    return this.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: PBKDF2_ITERATIONS,
        hash: "SHA-256",
      },
      passwordKey,
      { name: "AES-GCM", length: AES_GCM_LENGTH },
      false,
      ["wrapKey", "unwrapKey"],
    );
  }

  async wrapPrivateKey(
    privateKey: CryptoKey,
    wrappingKey: CryptoKey,
  ): Promise<ArrayBuffer> {
    const iv = window.crypto.getRandomValues(new Uint8Array(AES_GCM_IV_BYTES));
    const wrapped = await this.subtle.wrapKey(
      "pkcs8",
      privateKey,
      wrappingKey,
      { name: "AES-GCM", iv },
    );

    const packed = new Uint8Array(iv.byteLength + wrapped.byteLength);
    packed.set(iv, 0);
    packed.set(new Uint8Array(wrapped), iv.byteLength);
    return packed.buffer;
  }

  async unwrapPrivateKey(
    wrappedPrivateKey: ArrayBuffer,
    wrappingKey: CryptoKey,
  ): Promise<CryptoKey> {
    const packed = new Uint8Array(wrappedPrivateKey);
    const iv = packed.slice(0, AES_GCM_IV_BYTES);
    const ciphertext = packed.slice(AES_GCM_IV_BYTES);
    return this.subtle.unwrapKey(
      "pkcs8",
      ciphertext,
      wrappingKey,
      { name: "AES-GCM", iv },
      { name: "RSA-OAEP", hash: "SHA-256" },
      true,
      ["decrypt"],
    );
  }

  async exportPublicKey(publicKey: CryptoKey): Promise<string> {
    const spki = await this.subtle.exportKey("spki", publicKey);
    return this.bufferToBase64(spki);
  }

  async importPublicKey(base64: string): Promise<CryptoKey> {
    return this.subtle.importKey(
      "spki",
      this.base64ToBuffer(base64),
      { name: "RSA-OAEP", hash: "SHA-256" },
      true,
      ["encrypt"],
    );
  }

  async buildRegistrationKeyMaterial(password: string): Promise<KeyMaterial> {
    const keyPair = await this.generateRSAKeyPair();
    const salt = this.generateSalt();
    const wrappingKey = await this.deriveWrappingKey(password, salt);
    const wrappedPrivateKey = await this.wrapPrivateKey(
      keyPair.privateKey,
      wrappingKey,
    );
    const publicKey = await this.exportPublicKey(keyPair.publicKey);

    return {
      public_key: publicKey,
      wrapped_private_key: this.bufferToBase64(wrappedPrivateKey),
      pbkdf2_salt: this.bufferToBase64(salt),
    };
  }

  async unlockPrivateKey(
    password: string,
    wrappedPrivateKeyBase64: string,
    saltBase64: string,
  ): Promise<CryptoKey> {
    const salt = new Uint8Array(this.base64ToBuffer(saltBase64));
    const wrappingKey = await this.deriveWrappingKey(password, salt);
    const wrappedPrivateKey = this.base64ToBuffer(wrappedPrivateKeyBase64);
    return this.unwrapPrivateKey(wrappedPrivateKey, wrappingKey);
  }

  bufferToBase64(buffer: ArrayBuffer | ArrayBufferView): string {
    const bytes =
      buffer instanceof ArrayBuffer
        ? new Uint8Array(buffer)
        : new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  base64ToBuffer(base64: string): ArrayBuffer {
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
}

const encryptionServiceInstance = new EncryptionService();
export default encryptionServiceInstance;
export type { KeyMaterial };
