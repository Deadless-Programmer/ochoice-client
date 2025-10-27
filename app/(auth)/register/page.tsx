// app/register/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
// Lucide Icons are used as a standard React Icon library
import { ArrowRight} from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { IoLogoFacebook } from "react-icons/io5";

const RegisterPage: React.FC = () => {
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // ⚠️ Replace this alert with your actual registration logic (API call, state update, routing)
    alert('Registration attempt. (Replace with actual API call)');
  };

  return (
    // ⭐️ Reduced vertical padding (p-4 -> p-6)
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6"> 
      {/* ⭐️ Reduced vertical padding (p-8 -> p-6) */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8 border border-gray-100">
        
        {/* Header/Tab Navigation */}
        <div className="flex justify-around border-b border-gray-200 mb-6"> {/* ⭐️ mb-8 -> mb-6 */}
            <Link href="/login" className="flex-1 text-center py-3 text-xl font-semibold text-gray-500 hover:text-gray-700 transition-colors duration-200">
                Sign In
            </Link>
            <h1 className="flex-1 text-center py-3 text-2xl font-semibold text-gray-900 border-b-2 border-orange-400">
                Register
            </h1>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4"> {/* ⭐️ space-y-6 -> space-y-4 for tighter spacing */}
          
          {/* User Name */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
          
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
              type="checkbox" 
              id="privacy-policy" 
              required 
              className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-400" 
            />
            <label htmlFor="privacy-policy" className="ml-2 text-gray-700">
                I agree to the <a href="/privacy" className="text-orange-400 hover:underline">privacy policy</a> *
            </label>
          </div>

          {/* Sign Up Button - Reduced Vertical Padding */}
          <button
            type="submit"
            className="flex items-center justify-center w-full px-6 py-2.5 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-200 mt-4"
          >
            SIGN UP <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>

        {/* Social Sign In - Reduced Top Padding (pt-6 -> pt-4) and reduced gap */}
        <div className="mt-6 text-center text-gray-500 text-sm border-t pt-4">
          <p className="mb-3">or sign up with</p> {/* ⭐️ mb-4 -> mb-3 */}
          <div className="flex flex-col sm:flex-row gap-3"> {/* ⭐️ gap-4 -> gap-3 */}
            <button className="flex items-center justify-center flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
              
              <FaGoogle className="w-5 h-5 mr-2 text-red-500" /> 
              Sign Up With Google
            </button>
            <button className="flex items-center justify-center flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
             
              <IoLogoFacebook className="w-5 h-5 mr-2 text-blue-600" />
              Sign Up With Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;