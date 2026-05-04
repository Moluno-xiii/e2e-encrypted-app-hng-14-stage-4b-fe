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
      console.log("request no okay", errorText);
      if (request.status === 401) {
        const parsed = JSON.parse(errorText) as { detail: string };
        throw new Error(parsed.detail);
      }
      throw new Error(`Error ${request.status}: ${errorText}`);
    }
    const response = (await request.json()) as T;
    return { success: true, error: null, data: response };
  } catch (e) {
    console.error("request fail", e);
    const message = e instanceof Error ? e.message : "unexpected error";
    console.error("An error occured, " + message);
    return { error: message, success: false, data: null };
  }
};

const authTryCatch = async <T>({
  url,
  method,
  options,
}: CustomTryCatchDTO): Promise<SuccessResponse<T> | ErrorResponse> => {
  try {
    const request = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authServiceInstance.getTokens().access_token}`,
      },
      ...options,
    });
    if (!request.ok) {
      const errorText = await request.text();
      throw new Error(`Error ${request.status}: ${errorText}`);
    }
    const response = (await request.json()) as T;
    return { success: true, error: null, data: response };
  } catch (e) {
    const message = e instanceof Error ? e.message : "unexpected error";
    console.error("An error occured, " + message);
    return { error: message, success: false, data: null };
  }
};

export { customTryCatch, authTryCatch };
