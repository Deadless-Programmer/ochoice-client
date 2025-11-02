// app/login/page.tsx
'use client';

import React from 'react';

// Lucide Icons are used as a standard React Icon library
import { ArrowRight, } from 'lucide-react';


const changePasswordPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ⚠️ Replace this alert with your actual sign-in logic (API call, state update, routing)
    alert('Sign In attempt. (Replace with actual API call)');
  };

  return (
    // ⭐️ Height: min-h-screen/2 or min-h-full can be used if you have a wrapper layout
    // I'm keeping min-h-screen for full page center alignment, but reducing component padding
    <div className="flex items-center justify-center min-h-screen  bg-gray-50 p-4 sm:p-6"> 
      {/* ⭐️ Reduced vertical padding (p-8 -> p-6) */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8 border border-gray-100">
        
        {/* Header/Tab Navigation */}
        <div className="flex justify-around border-b border-gray-200 mb-6"> {/* ⭐️ mb-8 -> mb-6 */}
           
            <h1  className="flex-1 text-center py-3 text-xl font-semibold text-gray-500 hover:text-gray-700 transition-colors duration-200">
                Change Your Password
            </h1>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4"> {/* ⭐️ space-y-6 -> space-y-4 for tighter spacing */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
             Old Password *
            </label>
            {/* ⭐️ Input Padding p-3 -> p-2.5 */}
            <input
              type="password"
              id="password"
              required
              className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-orange-400 focus:border-orange-400 transition duration-150"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password *
            </label>
             {/* ⭐️ Input Padding p-3 -> p-2.5 */}
            <input
              type="password"
              id="password"
              required
              className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-orange-400 focus:border-orange-400 transition duration-150"
            />
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
           
            <a href="/forgot-password" className="text-gray-500 hover:text-orange-400 transition duration-150">Forgot Your Password?</a>
          </div>

          {/* Submit Button - Reduced Vertical Padding */}
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

export default changePasswordPage;