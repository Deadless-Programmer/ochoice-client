"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { getUserProfile } from "@/redux/features/authSlice";

const AuthInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(getUserProfile());
    }
  }, [dispatch]);

  return null; // কিছু UI দরকার নেই, শুধু কাজ করবে
};

export default AuthInitializer;