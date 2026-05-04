import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, type PropsWithChildren } from "react";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) navigate({ to: "/auth/login", replace: true });
  }, [user, navigate]);

  if (user) return children;
  return (
    <div className="flex w-full items-center justify-center bg-red-600 text-center text-5xl">
      Loading
    </div>
  );
};

export default ProtectedRoute;
