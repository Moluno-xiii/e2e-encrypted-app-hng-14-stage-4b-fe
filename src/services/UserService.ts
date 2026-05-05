import endpoints from "@/constants/endpoints";
import { authTryCatch } from "@/lib/customFetch";
import type { PublicKeyResponse, UserSearchResult } from "@/types/messages";

class UserService {
  searchUsers(query: string) {
    return authTryCatch<UserSearchResult[]>({
      url: endpoints.users.search(query),
      method: "GET",
    });
  }

  getPublicKey(userId: string) {
    return authTryCatch<PublicKeyResponse>({
      url: endpoints.users.publicKey(userId),
      method: "GET",
    });
  }
}

const userServiceInstance = new UserService();
export default userServiceInstance;
