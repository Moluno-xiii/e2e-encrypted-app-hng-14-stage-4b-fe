import { useEffect } from "react";
import authServiceInstance from "@/services/AuthService";
import webSocketServiceInstance from "@/services/WebSocketService";
import useAuth from "./useAuth";

const useWebSocket = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const token = authServiceInstance.getTokens().access_token;
    if (!token) return;
    webSocketServiceInstance.connect(token);
    return () => webSocketServiceInstance.disconnect();
  }, [user]);
};

export default useWebSocket;
