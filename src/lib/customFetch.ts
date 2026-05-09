import authServiceInstance from "@/services/AuthService";

type FetchMethods = "POST" | "DELETE" | "PUT" | "PATCH" | "GET";

type CustomTryCatchDTO = {
  url: string;
  method: FetchMethods;
  options?: Partial<RequestInit>;
};

type SuccessResponse<T = null> = {
  data: T;
  success: true;
  error: null;
};

type ErrorResponse = {
  success: false;
  error: string;
  data: null;
};

const customTryCatch = async <T>({
  url,
  method,
  options,
}: CustomTryCatchDTO): Promise<SuccessResponse<T> | ErrorResponse> => {
  try {
    const request = await fetch(url, { method, ...options });
    if (!request.ok) {
      const errorText = await request.text();
      if (request.status === 401) {
        const parsed = JSON.parse(errorText) as { detail: string };
        throw new Error(parsed.detail);
      }
      throw new Error(`Error ${request.status}: ${errorText}`);
    }
    const response = (await request.json()) as T;
    return { success: true, error: null, data: response };
  } catch (e) {
    const message = e instanceof Error ? e.message : "unexpected error";
    console.error("Request failed:", message);
    return { error: message, success: false, data: null };
  }
};

type RefreshResult = { success: true } | { success: false; error: string };

let refreshPromise: Promise<RefreshResult> | null = null;

const refreshTokenOnce = (): Promise<RefreshResult> => {
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async (): Promise<RefreshResult> => {
    try {
      const refresh = await authServiceInstance.refreshToken();
      if (!refresh.success) {
        authServiceInstance.removeAuthTokens();
        return { success: false, error: refresh.error };
      }
      authServiceInstance.setAuthTokens({
        access_token: refresh.data.access_token,
        refresh_token: authServiceInstance.getTokens().refresh_token,
      });
      return { success: true };
    } finally {
      refreshPromise = null;
    }
  })();
  return refreshPromise;
};

const buildAuthInit = (
  method: FetchMethods,
  options: Partial<RequestInit> | undefined,
): RequestInit => ({
  method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authServiceInstance.getTokens().access_token}`,
  },
  ...options,
});

const authTryCatch = async <T>({
  url,
  method,
  options,
}: CustomTryCatchDTO): Promise<SuccessResponse<T> | ErrorResponse> => {
  try {
    const { access_token, refresh_token } = authServiceInstance.getTokens();
    if (!access_token || !refresh_token)
      throw new Error("No tokens, user not authenticated");
    const request = await fetch(url, buildAuthInit(method, options));

    if (request.status === 401) {
      const refresh = await refreshTokenOnce();
      if (!refresh.success) throw new Error(refresh.error);
      const retry = await fetch(url, buildAuthInit(method, options));
      if (!retry.ok) {
        const errorText = await retry.text();
        throw new Error(`Error ${retry.status}: ${errorText}`);
      }
      const response = (await retry.json()) as T;
      return { success: true, error: null, data: response };
    }

    if (!request.ok) {
      const errorText = await request.text();
      throw new Error(`Error ${request.status}: ${errorText}`);
    }
    const response = (await request.json()) as T;
    return { success: true, error: null, data: response };
  } catch (e) {
    const message = e instanceof Error ? e.message : "unexpected error";
    console.error("Authenticated request failed:", message);
    return { error: message, success: false, data: null };
  }
};

export { customTryCatch, authTryCatch };
