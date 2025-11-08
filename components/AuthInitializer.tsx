"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { getUserProfile, markInitialized } from "@/redux/features/authSlice";

const AuthInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(getUserProfile());
    } else {
      // ✅ যদি কোনো token না থাকে, তবুও initialized করে দাও
      dispatch(markInitialized());
    }
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
