import FullScreenLoader from "@/components/FullScreenLoader";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, type PropsWithChildren } from "react";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      toast.error("Session not found \n Redirecting...", { duration: 500 });
      navigate({ to: "/auth/login", replace: true });
    }
  }, [user, navigate]);

  if (isLoading === "init" || !user) return <FullScreenLoader />;

  return children;
};

export default ProtectedRoute;
