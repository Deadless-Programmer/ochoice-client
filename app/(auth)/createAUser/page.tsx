// app/register/page.tsx
"use client";

import React, { useState } from "react";

// Lucide Icons are used as a standard React Icon library
import { ArrowRight } from "lucide-react";

const CreateAUserPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    setIsChecked(e.target.checked);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // ⚠️ Replace this alert with your actual registration logic (API call, state update, routing)
    alert("Registration attempt. (Replace with actual API call)");
  };

  return (
    // ⭐️ Reduced vertical padding (p-4 -> p-6)
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* ⭐️ Reduced vertical padding (p-8 -> p-6) */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8 border border-gray-100">
        {/* Header/Tab Navigation */}
        <div className="flex justify-around border-b border-gray-200 mb-6">
          {" "}
          {/* ⭐️ mb-8 -> mb-6 */}
          <h1 className="flex-1 text-center py-3 text-2xl font-semibold text-gray-900 border-b ">
            Create A User{" "}
          </h1>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {" "}
          {/* ⭐️ space-y-6 -> space-y-4 for tighter spacing */}
          {/* User Name */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              User Name *
            </label>
            {/* ⭐️ Input Padding p-3 -> p-2.5 */}
            <input
              type="text"
              id="username"
              required
              className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-orange-400 focus:border-orange-400 transition duration-150"
            />
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your email address *
            </label>
            {/* ⭐️ Input Padding p-3 -> p-2.5 */}
            <input
              type="email"
              id="email"
              required
              className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-orange-400 focus:border-orange-400 transition duration-150"
            />
          </div>
          {/* Define a Role */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select a role *
            </label>
            {/* ⭐️ Input Padding p-3 -> p-2.5 */}
            {/* <input
              type="text"
              id="role"
              required
              className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-orange-400 focus:border-orange-400 transition duration-150"
            /> */}
            <select  defaultValue="" className="w-full border border-gray-300 rounded-md py-3.5 px-1 focus:ring-orange-400 focus:border-orange-400 transition duration-150">
              <option className="rounded-md" value=""  disabled>
                Selected Role
              </option>
              <option className="rounded-md" value="admin">
                Admin
              </option>
              <option className="rounded-md" value="seller">
                Seller
              </option>
            </select>
          </div>
          {/* Password */}
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
              className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-orange-400 focus:border-orange-400 transition duration-150"
            />
          </div>
          {/* Privacy Policy Checkbox - Reduced Top Padding */}
          <div className="flex items-center justify-start text-xs sm:text-sm pt-1">
            <input
              onChange={handleCheckbox}
              type="checkbox"
              id="privacy-policy"
              required
              className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-400"
            />
            <label htmlFor="privacy-policy" className="ml-2 text-gray-700">
              I agree to the{" "}
              <a href="/privacy" className="text-orange-400 hover:underline">
                privacy policy
              </a>{" "}
              *
            </label>
          </div>
          {/* Sign Up Button - Reduced Vertical Padding */}
          <button
            disabled={!isChecked}
            type="submit"
            className={`flex items-center justify-center w-full px-6 py-2.5 font-semibold rounded-lg shadow-md transition duration-200 mt-4
    ${
      isChecked
        ? "bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
          >
            SIGN UP <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>

        {/* Social Sign In - Reduced Top Padding (pt-6 -> pt-4) and reduced gap */}
      </div>
    </div>
  );
};

export default CreateAUserPage;
