// app/shop/error.tsx
'use client'; // ⚠️ Error Boundaries অবশ্যই Client Components হতে হবে

import { useEffect } from 'react';
 import Link from 'next/link';
 
export default function ShopError({
  error, // Next.js এই error object টি দেবে
  reset, // এই ফাংশনটি দিয়ে আপনি রিকভারি করার চেষ্টা করতে পারেন
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  
  // 1. Error Logging (গুরুত্বপূর্ণ)
  useEffect(() => {
    // এইখানে আপনি আপনার error reporting service-এ (Sentry, LogRocket, ইত্যাদি) error টি লগ করতে পারেন
    console.error("Shop Segment Error:", error);
  }, [error]);
 
  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto justify-center min-h-[60vh] text-center p-6 bg-white  border border-red-200  shadow-lg m-4">
      
      {/* Icon */}
      <div className="text-red-500 text-6xl mb-4">
        ⚠️
      </div>

      {/* Main Message */}
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Oops! Something Went Wrong in the Shop.
      </h2>
      
      {/* Detailed Message */}
      <p className="text-gray-600 mb-6 max-w-lg">
        We encountered a problem while trying to load the products. It might be a temporary issue.
      </p>

      {/* Optional: Technical Detail */}
      <p className="text-sm text-red-400 mb-8">
        **Error Details (for developers):** {error.message}
      </p>
 
      {/* Recovery Button */}
      <button
        onClick={
          // reset() ফাংশনটিErrorBoundary-এর ভেতরের কম্পোনেন্টগুলোকে আবার রেন্ডার করার চেষ্টা করে।
          () => reset()
        }
        className="px-6 py-3 bg-orange-400 text-white font-semibold rounded-full shadow-md hover:bg-orange-500 transition duration-300"
      >
        🔄 Try Loading Products Again
      </button>

      {/* Alternate Action */}
      <Link href="/" className="mt-4 text-blue-500 hover:text-blue-700 transition duration-300 text-sm">
        Go to Homepage
      </Link>
    </div>
  );
}