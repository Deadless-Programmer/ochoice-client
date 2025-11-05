import React from 'react';

export default function ViewLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 animate-pulse">
      {/* Loading Spinner */}
      <div className="w-16 h-16 border-4 border-orange-500 border-dashed rounded-full animate-spin mb-8"></div>
      
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Loading Products...</h2>
      
      {/* Optional: Skeleton Grid for products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {[...Array(8)].map((_, index) => ( // 8টি স্কেলেটন কার্ড
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <div className="h-48 bg-gray-200 rounded-md mb-4"></div> {/* Image skeleton */}
            <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2"></div> {/* Title skeleton */}
            <div className="h-4 bg-gray-200 rounded-md w-1/2"></div> {/* Price skeleton */}
          </div>
        ))}
      </div>

      <p className="mt-10 text-gray-500 text-sm">Please wait while we fetch the latest products for you.</p>
    </div>
  );
}