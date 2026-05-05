const BASE = import.meta.env.VITE_BASE_API_URL;

const endpoints = {
  auth: {
    login: `${BASE}/auth/login`,
    register: `${BASE}/auth/register`,
    logout: `${BASE}/auth/logout`,
    refresh: `${BASE}/auth/refresh`,
    getCurrentUser: `${BASE}/auth/me`,
  },
  users: {
    search: (q: string) => `${BASE}/users/search?q=${encodeURIComponent(q)}`,
    publicKey: (userId: string) => `${BASE}/users/${userId}/public-key`,
  },
  conversations: {
    list: `${BASE}/conversations`,
    messages: (userId: string, params?: { limit?: number; before?: string }) => {
      const qs = new URLSearchParams();
      if (params?.limit !== undefined) qs.set("limit", String(params.limit));
      if (params?.before) qs.set("before", params.before);
      const suffix = qs.toString() ? `?${qs.toString()}` : "";
      return `${BASE}/conversations/${userId}/messages${suffix}`;
    },
  },
  messages: {
    send: `${BASE}/messages`,
  },
  ws: `${BASE.replace(/^http/, "ws")}/ws`,
};

export default endpoints;
