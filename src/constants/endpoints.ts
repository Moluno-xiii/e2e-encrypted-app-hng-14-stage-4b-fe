const endpoints = {
  auth: {
    login: `${import.meta.env.VITE_BASE_API_URL}/auth/login`,
    register: `${import.meta.env.VITE_BASE_API_URL}/auth/register`,
    logout: `${import.meta.env.VITE_BASE_API_URL}/auth/logout`,
    refresh: `${import.meta.env.VITE_BASE_API_URL}/auth/refresh`,
    getCurrentUser: `${import.meta.env.VITE_BASE_API_URL}/auth/me`,
  },
};

export default endpoints;
