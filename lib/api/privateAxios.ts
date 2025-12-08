import axios from "axios";

export const privateAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // ✅ এটা জরুরি, যাতে ব্যাকএন্ডের রিফ্রেশ টোকেন কুকি পাঠানো হয়
});

// Request Interceptor → Headers এ টোকেন যুক্ত করা
privateAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor → Token Expired হলে হ্যান্ডেল করা
privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // যদি 401 (Unauthorized) আসে এবং আমরা এখনো রিট্রাই না করে থাকি
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔄 ১. রিফ্রেশ টোকেন এন্ডপয়েন্টে কল (Browser অটোমেটিক HttpOnly কুকি পাঠাবে)
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        // 🔄 ২. LocalStorage আপডেট
        localStorage.setItem("accessToken", newAccessToken);

        // ✅ ৩. CRITICAL FIX: Middleware-এর কুকি আপডেট করা
        // যাতে পেজ রিফ্রেশ করলে Middleware আপনাকে লগআউট না করে দেয়
        document.cookie = `accessToken=${newAccessToken}; path=/; max-age=86400; samesite=lax`;

        // ৪. ফেইল হওয়া রিকোয়েস্টটি নতুন টোকেন দিয়ে আবার পাঠানো
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return privateAxios(originalRequest);
        
      } catch (err) {
        console.error("Refresh token failed:", err);
        
        // রিফ্রেশ টোকেনও যদি এক্সপায়ার হয়, তাহলে লগআউট করিয়ে দিন
        localStorage.removeItem("accessToken");
        document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        
        // অপশনাল: লগইন পেজে রিডাইরেক্ট (window.location ব্যবহার করে)
        // window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);