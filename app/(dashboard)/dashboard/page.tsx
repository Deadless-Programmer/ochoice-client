"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";

export default function DashboardHome() {
  const { user } = useAppSelector((s) => s.auth);

  // If user not available (should be handled by layout) show fallback
  if (!user) return <div className="min-h-screen flex items-center justify-center">Please login...</div>;

  // Example cards/statistics — replace with real API-driven numbers
  const stats = {
    users: 2534,
    bookings: 1289,
    pendingReviews: 76,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Welcome back, {user.username} 👋</h1>
        <p className="text-sm text-gray-500">Role: <span className="font-medium">{user.role}</span></p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-5 border">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-orange-500">{stats.users}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5 border">
          <p className="text-sm text-gray-500">Bookings</p>
          <p className="text-2xl font-bold text-orange-500">{stats.bookings}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5 border">
          <p className="text-sm text-gray-500">Pending Reviews</p>
          <p className="text-2xl font-bold text-orange-500">{stats.pendingReviews}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-5 border shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Recent Activities</h2>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• User <strong>Arafat</strong> booked Dubai Tour.</li>
          <li>• Admin approved 3 reviews.</li>
          <li>• Seller `X` added new package.</li>
        </ul>
      </div>
    </div>
  );
}