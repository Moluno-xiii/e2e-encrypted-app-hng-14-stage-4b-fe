import encryptionServiceInstance from "@/services/EncryptionService";
import userServiceInstance from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";

const fetchAndImport = async (userId: string): Promise<CryptoKey> => {
  const result = await userServiceInstance.getPublicKey(userId);
  if (!result.success) throw new Error(result.error);
  return encryptionServiceInstance.importPublicKey(result.data.public_key);
};

const usePublicKey = (userId: string | undefined) =>
  useQuery({
    queryKey: ["pubkey", userId],
    queryFn: () => fetchAndImport(userId!),
    enabled: !!userId,
    staleTime: Infinity,
    gcTime: Infinity,
  });

export default usePublicKey;
