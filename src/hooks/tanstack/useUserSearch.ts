import userServiceInstance from "@/services/UserService";
import type { UserSearchResult } from "@/types/messages";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async (q: string): Promise<UserSearchResult[]> => {
  const result = await userServiceInstance.searchUsers(q);
  if (!result.success) throw new Error(result.error);
  return result.data;
};

const useUserSearch = (query: string) =>
  useQuery({
    queryKey: ["user-search", query],
    queryFn: () => fetchUsers(query),
    enabled: query.trim().length > 0,
    staleTime: 30_000,
  });

export default useUserSearch;
