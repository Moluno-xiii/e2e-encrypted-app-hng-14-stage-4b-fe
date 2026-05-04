import authServiceInstance from "@/services/AuthService";
import encryptionServiceInstance from "@/services/EncryptionService";
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
  register: (input: RegisterDTO) => void;
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
    async function getCurrentUser() {
      try {
        const { data, error, success } =
          await authServiceInstance.getCurrentUser();
        if (!success) throw new Error(error);
        setUser(data);
      } catch (e) {
        console.error("error getting user ", e);
        setUser(null);
      } finally {
        setIsLoading(null);
      }
    }
    getCurrentUser();
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
    authServiceInstance.setAuthTokens({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    });
    setUser(data.user);
  };

  const register = async (input: RegisterDTO) => {
    const { error, success, data } = await authServiceInstance.register(input);

    if (!success) throw new Error(error);
    console.log("register data", data);
    authServiceInstance.setAuthTokens({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    });
    setUser(data.user);
  };

  const logout = async () => {
    setIsLoading("logout");
    await authServiceInstance.logout();
    toast.success("Logout succssful");
    authServiceInstance.removeAuthTokens();
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
