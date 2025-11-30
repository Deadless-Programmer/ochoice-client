// app/not-found.tsx

import Link from "next/link";
import { Construction, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* Icon */}
        <div className="mx-auto w-32 h-32 mb-8 bg-yellow-100 rounded-full flex items-center justify-center">
          <Construction size={64} className="text-yellow-600 animate-pulse" />
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          Under Construction
        </h1>

        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          Oops! This page is still being built with love and coffee.
          <br />
          We are working hard to bring it to you soon!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium text-lg shadow-lg"
          >
            <ArrowLeft size={20} />
            Go Home
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition font-medium text-lg"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Funny Footer */}
        <p className="mt-16 text-gray-500 text-sm">
          If you are seeing this, it means we are still coding like crazy
        </p>
      </div>
    </div>
  );
}