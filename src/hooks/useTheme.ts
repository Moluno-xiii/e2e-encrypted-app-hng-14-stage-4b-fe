import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Theme context was used outside its scope");
  return context;
};

export default useTheme;
