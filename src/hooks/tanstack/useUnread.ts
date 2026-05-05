import { useQuery } from "@tanstack/react-query";

const useUnread = () =>
  useQuery<Map<string, number>>({
    queryKey: ["unread"],
    queryFn: () => new Map(),
    initialData: () => new Map(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export default useUnread;
