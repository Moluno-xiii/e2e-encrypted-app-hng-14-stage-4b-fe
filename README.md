# WhisperBox

End-to-end encrypted messaging app. with full encryption and decryption (client side) with the Web Crypto API. Built for HNG 14 stage 4b.

- **Live API:** https://whisperbox.koyeb.app
- **API docs:** https://whisperbox.koyeb.app/docs

## Stack

- React 19 + Vite + Tanstack router
- TypeScript,
- TanStack Query
- Tailwind CSS 4,
- `idb-keyval`, native `WebCrypto` (`SubtleCrypto`),
- WebSocket for realtime delivery.

## Getting started

```bash
git clone https://github.com/Moluno-xiii/e2e-encrypted-app-hng-14-stage-4b-fe
cd e2e-encrypted-app-hng-14-stage-4b-fe
pnpm install
pnpm dev
```

`.env` needs `VITE_API_BASE_URL` 

## Architecture

```
                          Browser (trusted)
 ┌────────────────────────────────────────────────────────────────┐
 │                                                                │
 │   Routes (TanStack Router)                                     │
 │   ├── /auth/login, /auth/signup                                │
 │   └── /chat/$friend_id          ── protected                   │
 │            │                                                   │
 │            ▼                                                   │
 │   Hooks  useAuth · useWebSocket · useReceiveMessages           │
 │          useDecryptedMessages · TanStack Query hooks           │
 │            │                                                   │
 │            ▼                                                   │
 │   Services                                                     │
 │   ├── AuthService          REST: register/login/refresh        │
 │   ├── UserService          search · fetch public key           │
 │   ├── ConversationService  list threads, history (paged)       │
 │   ├── MessageService       REST send (offline fallback)        │
 │   ├── WebSocketService     realtime send/receive + reconnect   │
 │   ├── EncryptionService    RSA-OAEP + AES-GCM + PBKDF2         │
 │   ├── KeyStore             IndexedDB store for CryptoKey       │
 │   └── StorageService       localStorage (JWTs only)            │
 │                                                                │
 │   Persistence                                                  │
 │   ├── localStorage   access_token, refresh_token               │
 │   └── IndexedDB      unwrapped RSA private key (CryptoKey)     │
 │                                                                │
 └────────────────────────────┬───────────────────────────────────┘
                              │ HTTPS (REST) + WSS (realtime)
                              │ Bearer JWT, 15-min access tokens
                              ▼
                   ┌──────────────────────────┐
                   │  WhisperBox API (Koyeb)  │
                   │  Stores opaque blobs:    │
                   │   - public_key           │
                   │   - wrapped_private_key  │
                   │   - pbkdf2_salt          │
                   │   - message payloads     │
                   │  Never sees plaintext    │
                   └──────────────────────────┘
```

## Encryption flow

Hybrid scheme: per-message AES-GCM symmetric key, wrapped with the recipient's RSA-OAEP public key.

### Registration

1. Generate RSA-OAEP 2048 keypair (`generateRSAKeyPair`)
2. Generate a random 128-bit salt (`generateSalt`)
3. Derive a wrapping key from the password with PBKDF2-SHA256, 100,000 iterations → AES-GCM-256 (`deriveWrappingKey`)
4. Wrap the RSA private key (PKCS8) with AES-GCM under the wrapping key, prepending a 96-bit IV (`wrapPrivateKey`)
5. Export public key as base64 SPKI
6. POST `public_key`, `wrapped_private_key`, `pbkdf2_salt` to `/auth/register`. The unwrapped private key is held in memory and saved to IndexedDB

### Login (session restore)

1. POST credentials to `/auth/login` → server returns `wrapped_private_key` + `pbkdf2_salt`
2. Re-derive the wrapping key with PBKDF2 + the supplied salt
3. `unwrapKey` produces the RSA private key as a `CryptoKey`
4. Persist the `CryptoKey` to IndexedDB under the user's id; keep a reference in `AuthContext`

### Sending a message (Alice → Bob)

1. `GET /users/{bobId}/public-key` → import as RSA-OAEP public key
2. Generate fresh AES-GCM 256 key + 96-bit IV
3. Encrypt plaintext under AES-GCM → `ciphertext`
4. Export the AES key raw and encrypt it twice with RSA-OAEP:
   - with **Bob's** public key → `encryptedKey`
   - with **Alice's** own public key → `encryptedKeyForSelf`
5. Send `{ ciphertext, iv, encryptedKey, encryptedKeyForSelf }` over WebSocket (or REST `/messages` as fallback)

### Receiving a message

1. Decide which wrapped key to use: `encryptedKeyForSelf` if the message was sent by us (history/echoes), else `encryptedKey`
2. Decrypt the wrapped key with the local RSA private key → AES key
3. Decrypt `ciphertext` with that AES key + `iv` → plaintext

If decryption throws, surface a `DecryptionError` rather than rendering garbage.

## Key management

| Material                                                     | Where it lives                                                                                              | Lifetime                          |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | --------------------------------- |
| RSA private key (unwrapped)                                  | IndexedDB (`whisperbox-keys/private-keys`) keyed by user id, plus an in-memory React state in `AuthContext` | Until logout                      |
| RSA private key (wrapped, AES-GCM under PBKDF2 wrapping key) | Server, returned by `/auth/login` and `/auth/me`                                                            | For the user's lifetime           |
| Wrapping key (AES-GCM)                                       | Memory only, derived on demand from the password                                                            | Discarded after wrap/unwrap       |
| Password                                                     | Never persisted, never sent in derived form                                                                 | Held only during the login submit |
| RSA public key                                               | Server, fetched per-recipient before send                                                                   | Stable per user                   |
| Per-message AES-GCM key                                      | Memory only, fresh each send                                                                                | Discarded after encrypt           |
| JWT access / refresh tokens                                  | `localStorage`                                                                                              | 15 min / refresh-token lifetime   |

Logout clears the IndexedDB entry, drops the in-memory `CryptoKey`, and removes JWTs.

`CryptoKey` instances are stored as structured-cloned IndexedDB values rather than as raw bytes, so the unwrapped private key never appears as plaintext bytes accessible to other code, but it is reachable to any script running on this origin.

## Security trade-offs

- **`localStorage` for JWTs.** Simpler than HttpOnly cookies and avoids the WebSocket-cookie/CORS dance, but it means any XSS on the origin can exfiltrate tokens. Mitigation depends on keeping the bundle and any third-party scripts trustworthy.
- **Persisting the unwrapped private key in IndexedDB.** Keeps the user logged in across reloads without re-prompting for the password. The cost is that an attacker with same-origin script execution (XSS, malicious browser extension) can use the key in place even if they cannot extract the bytes.
- **PBKDF2 100k / SHA-256 instead of Argon2.** PBKDF2 is what `SubtleCrypto` ships natively with no WASM dependency. It is weaker against GPU/ASIC attackers than Argon2id at the same wall-clock cost; the salted server-side blob is still one offline-attack target if the database leaks.
- **`encryptedKeyForSelf` for self-readable history.** Letting the sender re-read their own messages requires a second RSA-OAEP wrap of the AES key. Saves the user from a write-only history, but doubles RSA work per send and means every message embeds two recipients' worth of metadata.
- **No identity verification (no safety numbers, no key pinning).** Onboarding is one network round-trip — at the cost of trust-on-first-use without a way to detect a server-substituted public key.
- **Server-supplied wrapped private key.** The server can deliver the _correct_ wrapped private key, the _wrong_ one, or no key at all. A login decryption failure surfaces as a "wrong password" symptom; a malicious server cannot read the key but can deny access.
- **WebSocket auth via query string.** Browsers can't set custom headers on WS upgrades. Token-in-URL is acceptable over WSS, but tokens may appear in proxy logs. Tokens are short-lived (15 min) to bound that exposure.

## Known limitations

- **No forward secrecy.** Long-term RSA keys protect every message ever sent. If a private key is later compromised, all archived ciphertext for that user becomes readable. Real chat protocols (Signal, Olm/Megolm) use ratcheting to avoid this — out of scope here.
- **No key rotation.** A user's RSA keypair is generated once at registration. There is no way to rotate it without re-registering.
- **No multi-device support.** The wrapped private key is unwrapped on whichever device the user logs in from; there is no cross-device key transport, no device list, and no per-device subkey.
- **No identity verification UI.** No fingerprints, safety numbers, or QR-code key comparison. Users have no way to detect a public-key substitution by the server.
- **No message integrity beyond AES-GCM.** Sender authenticity is "the JWT identifies the sender." There is no signature on the ciphertext, so a malicious server can rewrite `from_user_id` on a stored row (the AES-GCM tag still verifies because the server isn't modifying the encrypted payload itself).
- **No metadata protection.** The server sees who talks to whom, when, how often, and message sizes. Only the _content_ is encrypted.
- **Plaintext-only payloads.** No support for attachments, images, voice, or read receipts — text only.
- **No offline support.** REST `/messages` exists as a fallback when the WebSocket is down, but messages composed while fully offline are not queued for retry.
- **No password change flow.** Changing the password would require re-wrapping the private key with a new PBKDF2-derived key; not implemented.
- **No account recovery.** Forgetting the password means the wrapped private key on the server cannot be unwrapped. All history becomes permanently unreadable. There is no recovery code or social-recovery mechanism.
- **Browser-only.** Depends on `SubtleCrypto`, `IndexedDB`, and `WebSocket`. No native clients.

## Project layout

```
src/
├── routes/                 file-based TanStack Router routes
│   ├── auth/               login, signup, layout
│   └── chat/$friend_id     conversation view
├── services/               domain logic (see architecture)
├── hooks/                  useAuth, useWebSocket, useReceiveMessages, ...
├── contexts/AuthContext    session + private-key state
├── components/             shared UI
├── lib/customFetch.ts      fetch wrapper with auto token refresh
└── constants/endpoints.ts  REST and WebSocket URLs
```

## Scripts

| Command        | What it does                                      |
| -------------- | ------------------------------------------------- |
| `pnpm dev`     | Vite dev server                                   |
| `pnpm build`   | TypeScript project build + Vite production bundle |
| `pnpm lint`    | ESLint over the workspace                         |
| `pnpm preview` | Preview the production build locally              |
