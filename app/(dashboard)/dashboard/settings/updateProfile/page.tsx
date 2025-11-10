// app/login/page.tsx
"use client";

import React, { useState } from "react";

// Lucide Icons are used as a standard React Icon library
import { ArrowRight } from "lucide-react";
import { privateAxios } from "@/lib/api/privateAxios";
import { toast } from "react-toastify";

const UpdateProfilePage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await privateAxios.put("/auth/update-profile", {
        username,
        email,
      });
      toast.success(res.data.message || "Profile update successfully ✅");
    } catch (error) {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Failed to update profile ❌");
  }
}
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-50 p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8 border border-gray-100">
        <div className="flex justify-around border-b border-gray-200 mb-6">
          {" "}
          {/* ⭐️ mb-8 -> mb-6 */}
          <h1 className="flex-1 text-center py-3 text-xl font-semibold text-gray-500 hover:text-gray-700 transition-colors duration-200">
            Upadte Your Profile
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {" "}
          {/* ⭐️ space-y-6 -> space-y-4 for tighter spacing */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type your username *
            </label>

            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-orange-400 focus:border-orange-400 transition duration-150"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type your email *
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-orange-400 focus:border-orange-400 transition duration-150"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full px-6 py-2.5 border border-orange-400 text-orange-400 font-semibold rounded-lg hover:bg-orange-50 transition duration-200 mt-4"
          >
            Submit <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
