// components/SkeletonCard.tsx
const SkeletonCard = () => (
  <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-4 bg-white animate-pulse">
    {/* Image Skeleton */}
    <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-gray-100 to-transparent animate-shimmer"></div>
    </div>

    <div className="mt-4 space-y-4">
      {/* Category */}
      <div className="h-4 w-24 bg-gray-200 rounded mx-auto"></div>

      {/* Product Name */}
      <div className="space-y-2">
        <div className="h-5 w-40 bg-gray-300 rounded mx-auto"></div>
        <div className="h-5 w-32 bg-gray-200 rounded mx-auto"></div>
      </div>

      {/* Rating */}
      <div className="flex justify-center items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
        ))}
        <div className="h-3 w-16 bg-gray-200 rounded ml-2"></div>
      </div>

      {/* Price */}
      <div className="flex justify-center items-center gap-3">
        <div className="h-7 w-20 bg-gray-300 rounded"></div>
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
      </div>

      {/* Colors */}
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-5 h-5 bg-gray-200 rounded-full"></div>
        ))}
      </div>

      {/* Button */}
      <div className="h-10 w-full bg-yellow-400 rounded-lg mt-4"></div>
    </div>
  </div>
);

export default SkeletonCard;