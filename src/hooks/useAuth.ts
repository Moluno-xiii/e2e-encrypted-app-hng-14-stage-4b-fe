import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth context was used outside its scope");
  return context;
};

export default useAuth;
