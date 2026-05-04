import { authTryCatch, customTryCatch } from "@/lib/customFetch";
import type {
  AuthSuccessType,
  AuthToken,
  LoginDTO,
  RefreshTokenResponse,
  RegisterDTO,
  User,
} from "@/types/auth";
import storageServiceInstance from "./StorageService";
import endpoints from "@/constants/endpoints";

class AuthService {
  private readonly accessTokenKey;
  private readonly refreshTokenKey;

  constructor() {
    this.accessTokenKey = "access_token";
    this.refreshTokenKey = "refresh_token";
  }

  login(body: LoginDTO) {
    return customTryCatch<AuthSuccessType>({
      url: endpoints.auth.login,
      options: {
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      },
      method: "POST",
    });
  }

  register(body: RegisterDTO) {
    return customTryCatch<AuthSuccessType>({
      url: endpoints.auth.register,
      options: {
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      },
      method: "POST",
    });
  }

  getCurrentUser() {
    return authTryCatch<User>({
      url: endpoints.auth.getCurrentUser,
      method: "GET",
    });
  }

  logout() {
    return authTryCatch({
      url: endpoints.auth.logout,
      options: {
        body: JSON.stringify({ refresh_token: this.getTokens().refresh_token }),
      },
      method: "POST",
    });
  }

  refreshToken() {
    return authTryCatch<RefreshTokenResponse>({
      url: endpoints.auth.refresh,
      options: {
        body: JSON.stringify({ refresh_token: this.getTokens().refresh_token }),
      },
      method: "POST",
    });
  }

  getTokens(): AuthToken {
    return {
      access_token: storageServiceInstance.getItem(this.accessTokenKey)!,
      refresh_token: storageServiceInstance.getItem(this.refreshTokenKey)!,
    };
  }

  removeAuthTokens() {
    storageServiceInstance.remvoeItem(this.accessTokenKey);
    storageServiceInstance.remvoeItem(this.refreshTokenKey);
  }

  setAuthTokens({ access_token, refresh_token }: AuthToken) {
    storageServiceInstance.setItem(this.accessTokenKey, access_token);
    storageServiceInstance.setItem(this.refreshTokenKey, refresh_token);
  }
}
const authServiceInstance = new AuthService();
export default authServiceInstance;
