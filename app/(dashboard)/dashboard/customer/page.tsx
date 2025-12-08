"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { useGetUserOrdersQuery } from "@/redux/features/orderApi";
import { Loader2, ShoppingBag, Package, Truck, CheckCircle, Clock } from "lucide-react";


interface Order {
  _id: string;
  total: number;
  status: string;
  createdAt: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

const CustomerDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id;

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetUserOrdersQuery(userId!, {
    skip: !userId,
  });
console.log(orders)
  // Calculate stats from real orders
  const stats = {
    totalOrders: orders.length,
    pending: orders.filter((o: Order) => o.status === "pending").length,
    processing: orders.filter((o: Order) => o.status === "processing").length,
    shipped: orders.filter((o: Order) => o.status === "shipped").length,
    completed: orders.filter((o: Order) => o.status === "completed").length,
    canceled: orders.filter((o: Order) => o.status === "canceled").length,
     totalSpent: orders.reduce((acc: number, order: Order) => {
  const orderTotal = order.items.reduce((sum: number, item: any) => sum + (item.price || 0), 0);
  return acc + orderTotal;
}, 0),
  };

  // Recent 5 orders
const recentOrders = [...orders]
    .sort((a: Order, b: Order) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "sbg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "completed": return "bg-green-100 text-green-800";
      case "canceled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "processing": return <Package className="w-4 h-4" />;
      case "shipped": return <Truck className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 text-lg">Failed to load your orders. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.username?.split(" ")[0] || "Customer"}!
          </h1>
          <p className="text-gray-600 mt-2">Heres an overview of your shopping activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-10">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalOrders}</p>
              </div>
              <ShoppingBag className="w-12 h-12 text-indigo-600 opacity-80" />
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700">Pending</p>
                <p className="text-3xl font-bold text-yellow-900 mt-1">{stats.pending}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-600" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Processing</p>
                <p className="text-3xl font-bold text-blue-900 mt-1">{stats.processing}</p>
              </div>
              <Package className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Shipped</p>
                <p className="text-3xl font-bold text-purple-900 mt-1">{stats.shipped}</p>
              </div>
              <Truck className="w-12 h-12 text-purple-600" />
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Completed</p>
                <p className="text-3xl font-bold text-green-900 mt-1">{stats.completed}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Spent</p>
                <p className="text-2xl font-bold mt-1 flex items-center">$ {stats?.totalSpent.toLocaleString()}</p>
              </div>
              {/* <DollarSign className="w-12 h-12 opacity-90" /> */}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-10">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No orders yet. Start shopping!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order: Order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-5 text-sm font-medium text-gray-900">#{order._id.slice(-8)}</td>
                      <td className="px-6 py-5 text-sm text-gray-600">{formatDate(order.createdAt)}</td>
                      <td className="px-6 py-5 text-sm text-gray-600">{order.items.length} item{order.items.length > 1 ? "s" : ""}</td>
                      <td className="px-6 py-5 text-sm font-bold text-gray-900">  {order.items?.map((p: any) => (
                    <div key={p.price} className="text-sm mb-1">
                      $ {p.price}
                    </div>
                  ))} </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="p-4 bg-gray-50 border-t text-center">
            <button className="text-indigo-600 font-medium hover:text-indigo-800 transition">
              View All Orders →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <ShoppingBag className="w-12 h-12 mb-4" />
            <h3 className="text-lg font-semibold">Continue Shopping</h3>
            <p className="text-sm mt-2 opacity-90">Explore thousands of products</p>
            <button className="mt-4 bg-white text-indigo-600 px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-50 transition">
              Shop Now
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
            <Package className="w-12 h-12 mb-4 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Track Orders</h3>
            <p className="text-sm text-gray-600 mt-2">See where your package is</p>
            <button className="mt-4 text-indigo-600 font-medium hover:text-indigo-800 transition">
              Track Package →
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="w-12 h-12 mb-4 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">My Profile</h3>
            <p className="text-sm text-gray-600 mt-2">Manage address & preferences</p>
            <button className="mt-4 text-indigo-600 font-medium hover:text-indigo-800 transition">
              Edit Profile →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;