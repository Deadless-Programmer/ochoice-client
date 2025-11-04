import axios from "axios";

export const publicAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // ✅ important since refresh cookie may be set from backend
});