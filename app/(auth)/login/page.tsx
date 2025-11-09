// app/login/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

import { ArrowRight } from "lucide-react";
import { IoLogoFacebook } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { login } from "@/redux/features/authSlice";
import { toast } from "react-toastify";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ email, password }));

      console.log("Login action result:", resultAction);
      // resultAction.payload এ login thunk এর return data থাকবে
      if (login.fulfilled.match(resultAction)) {
        const user = resultAction.payload.user;
        console.log("✅ Login successful:", user);

        toast.success(resultAction.payload.message || `${user.username} ${resultAction.payload.message} ✅`);

        if (user.role === "admin") {router.push("/dashboard/admin");}
        else if (user.role === "seller"){ router.push("/dashboard/seller");}
        else if (user.role === "superAdmin"){router.push("/dashboard/superAdmin");}
        else router.push("/dashboard/customer");
      } else {
        // Safely derive a displayable error message from the unknown payload
        let errorMessage = "❌ Login failed";
        if (resultAction.payload) {
          if (typeof resultAction.payload === "string") {
            errorMessage = resultAction.payload;
          } else if (typeof resultAction.payload === "object" && "message" in resultAction.payload) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            errorMessage = (resultAction.payload as any).message ?? errorMessage;
          } else {
            errorMessage = String(resultAction.payload);
          }
        }
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    // ⭐️ Height: min-h-screen/2 or min-h-full can be used if you have a wrapper layout
    // I'm keeping min-h-screen for full page center alignment, but reducing component padding
    <div className="flex items-center justify-center min-h-screen  bg-gray-50 p-4 sm:p-6">
      {/* ⭐️ Reduced vertical padding (p-8 -> p-6) */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8 border border-gray-100">
        {/* Header/Tab Navigation */}
        <div className="flex justify-around border-b border-gray-200 mb-6">
          {" "}
          {/* ⭐️ mb-8 -> mb-6 */}
          <h1 className="flex-1 text-center py-3 text-2xl font-semibold text-gray-900 border-b-2 border-orange-400">
            Sign In
          </h1>
          <Link
            href="/register"
            className="flex-1 text-center py-3 text-xl font-semibold text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Register
          </Link>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          {" "}
          {/* ⭐️ space-y-6 -> space-y-4 for tighter spacing */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username or email address *
            </label>
            {/* ⭐️ Input Padding p-3 -> p-2.5 */}
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-orange-400 focus:border-orange-400 transition duration-150"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password *
            </label>
            {/* ⭐️ Input Padding p-3 -> p-2.5 */}
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-orange-400 focus:border-orange-400 transition duration-150"
            />
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-400"
              />
              <label htmlFor="remember-me" className="ml-2 text-gray-700">
                Remember Me
              </label>
            </div>
            <Link
              href="/forgotPassword"
              className="text-gray-500 hover:text-orange-400 transition duration-150"
            >
              Forgot Your Password?
            </Link>
          </div>
          {/* Login Button - Reduced Vertical Padding */}
          <button
            type="submit"
            className="flex items-center justify-center w-full px-6 py-2.5 border border-orange-400 text-orange-400 font-semibold rounded-lg hover:bg-orange-50 transition duration-200 mt-4"
          >
            LOG IN <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>

        {/* Social Sign In - Reduced Top Padding (pt-6 -> pt-4) and reduced gap */}
        <div className="mt-6 text-center text-gray-500 text-sm border-t pt-4">
          <p className="mb-3">or sign in with</p> {/* ⭐️ mb-4 -> mb-3 */}
          <div className="flex flex-col sm:flex-row gap-3">
            {" "}
            {/* ⭐️ gap-4 -> gap-3 */}
            <button className="flex items-center justify-center flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
              <FaGoogle className="w-5 h-5 mr-2 text-red-500" />
              Login With Google
            </button>
            <button className="flex items-center justify-center flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
              <IoLogoFacebook className="w-5 h-5 mr-2 text-blue-600" />
              Login With Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
