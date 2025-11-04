// src/lib/api/privateAxios.ts
import axios from "axios";

export const privateAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // ✅ send cookies with every request (important!)
});

// Request Interceptor → add access token to headers
privateAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor → handle expired access token
privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized and not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔄 Call refresh-token endpoint (cookie is automatically sent)
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          { withCredentials: true } // send cookies
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Re-attach new token & retry the failed request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return privateAxios(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
        // optional: logout user or redirect to login
        localStorage.removeItem("accessToken");
      }
    }

    return Promise.reject(error);
  }
);
