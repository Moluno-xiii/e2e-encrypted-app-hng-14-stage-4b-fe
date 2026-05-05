import authServiceInstance from "@/services/AuthService";
import encryptionServiceInstance from "@/services/EncryptionService";
import keyStoreInstance from "@/services/KeyStore";
import type { LoginDTO, RegisterDTO, User } from "@/types/auth";
import React, {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import toast from "react-hot-toast";

type AuthContextType = {
  user: User | undefined | null;
  register: (input: RegisterDTO, privateKey: CryptoKey) => void;
  login: (input: LoginDTO) => void;
  logout: () => void;
  refreshToken: () => void;
  privateKey: CryptoKey | undefined;
  isLoading: LoadingStates;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
type LoadingStates = "init" | "logout" | null;

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(undefined);
  const [isLoading, setIsLoading] = useState<LoadingStates>("init");
  const [privateKey, setPrivateKey] = useState<CryptoKey>();

  useEffect(() => {
    async function hydrateSession() {
      try {
        const { data, error, success } =
          await authServiceInstance.getCurrentUser();
        if (!success) throw new Error(error);
        setUser(data);
        const storedKey = await keyStoreInstance.get(data.id);
        if (storedKey) setPrivateKey(storedKey);
      } catch (e) {
        console.error("error getting user ", e);
        setUser(null);
      } finally {
        setIsLoading(null);
      }
    }
    hydrateSession();
  }, []);

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
    setUser(data.user);
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
    setUser(data.user);
  };

  const logout = async () => {
    setIsLoading("logout");
    const currentUserId = user?.id;
    await authServiceInstance.logout();
    toast.success("Logout succssful");
    authServiceInstance.removeAuthTokens();
    if (currentUserId) await keyStoreInstance.clear(currentUserId);
    setPrivateKey(undefined);
    setIsLoading(null);
    setUser(null);
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
    isLoading,
  };
  return (
    <AuthContext.Provider value={providerReturn}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContextProvider;
