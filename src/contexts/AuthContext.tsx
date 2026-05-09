import queryCurrentUser from "@/hooks/tanstack/useCurrentUser";
import authServiceInstance from "@/services/AuthService";
import encryptionServiceInstance from "@/services/EncryptionService";
import keyStoreInstance from "@/services/KeyStore";
import type { LoginDTO, RegisterDTO, User } from "@/types/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "@/main";
import React, { createContext, useState, type PropsWithChildren } from "react";
import toast from "react-hot-toast";

export type AuthContextType = {
  user: User | undefined | null;
  register: (input: RegisterDTO, privateKey: CryptoKey) => void;
  login: (input: LoginDTO) => void;
  logout: () => void;
  refreshToken: () => void;
  privateKey: CryptoKey | undefined;
  isLoading: LoadingStates;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
type LoadingStates = "logout" | null;

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();
  const { data: user, isPending } = useQuery(queryCurrentUser());
  const [isLoading, setIsLoading] = useState<LoadingStates>(null);
  const [privateKey, setPrivateKey] = useState<CryptoKey>();

  const setCurrentUser = (next: User | null) => {
    queryClient.setQueryData(queryCurrentUser().queryKey, next);
  };

  const login = async (input: LoginDTO) => {
    const { error, success, data } = await authServiceInstance.login(input);
    if (!success) throw new Error(error);

    const privateKey = await encryptionServiceInstance.unlockPrivateKey(
      input.password,
      data.user.wrapped_private_key,
      data.user.pbkdf2_salt,
    );
    setPrivateKey(privateKey);
    await keyStoreInstance.put(data.user.id, privateKey);
    authServiceInstance.setAuthTokens({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    });
    setCurrentUser(data.user);
    router.navigate({ to: "/chat" });
    toast.success(`Welcome back, ${data.user.display_name}`);
  };

  const register = async (input: RegisterDTO, newPrivateKey: CryptoKey) => {
    const { error, success, data } = await authServiceInstance.register(input);
    if (!success) throw new Error(error);

    setPrivateKey(newPrivateKey);
    await keyStoreInstance.put(data.user.id, newPrivateKey);
    authServiceInstance.setAuthTokens({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    });
    setCurrentUser(data.user);
    router.navigate({ to: "/chat" });
    toast.success(`Welcome, ${data.user.display_name}`);
  };

  const logout = async () => {
    setIsLoading("logout");
    const currentUserId = user?.id;
    await authServiceInstance.logout();
    authServiceInstance.removeAuthTokens();
    if (currentUserId) await keyStoreInstance.clear(currentUserId);
    setPrivateKey(undefined);
    setCurrentUser(null);
    router.navigate({ to: "/auth/login" });
    toast.success("Logout successful");
    setIsLoading(null);
  };

  const refreshToken = async () => {
    const { error, success, data } = await authServiceInstance.refreshToken();
    if (!success) throw new Error(error);

    authServiceInstance.setAuthTokens({
      access_token: data?.access_token,
      refresh_token: authServiceInstance.getTokens().refresh_token,
    });
  };

  const providerReturn = {
    user,
    register,
    login,
    logout,
    refreshToken,
    privateKey,
    isLoading: isPending ? null : isLoading,
  };
  return (
    <AuthContext.Provider value={providerReturn}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContextProvider;
