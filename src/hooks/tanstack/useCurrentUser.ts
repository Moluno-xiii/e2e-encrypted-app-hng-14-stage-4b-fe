import authServiceInstance from "@/services/AuthService";
import { queryOptions } from "@tanstack/react-query";

const queryCurrentUser = () => {
  return queryOptions({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data, success } = await authServiceInstance.getCurrentUser();
      return success ? data : null;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default queryCurrentUser;
