import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  withCredentials: true, // cookie পাঠানোর জন্য দরকার
});

export default axiosInstance;