"use client";

import React from "react";
import { useGetUserOrdersQuery } from "@/redux/features/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { Loader2 } from "lucide-react";

const OrderPage = () => {
  const { user, loading: authLoading } = useAppSelector((state) => state.auth);
  const userId = user?.id;

  const { data: orders, isLoading, isError } = useGetUserOrdersQuery(userId!, {
    skip: !userId,
  });

  if (authLoading || isLoading || !userId) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 mr-2" />
        <span>Loading your orders...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load your orders. Please try again.
      </p>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold">No Orders Found 😔</h2>
        <p>Your order history will appear here.</p>
      </div>
    );
  }



  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order: any) => {
          // const total = order.items.reduce(
          //   (acc: number, item: any) => acc + item.price * item.quantity,
          //   0
          // );

          return (
            <div
              key={order._id}
              className="border rounded-lg p-5 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">
                  Order ID: #{order._id.slice(-6)}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items */}
              {order.items.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × ${item.price}
                    </p>
                  </div>
                  <p className="font-semibold">
                  Total :  ${(item.price).toFixed(2)}
                  </p>
                </div>
              ))}
{/* 
              <div className="flex justify-between mt-4 text-lg font-bold">
                <span>Total Amount:</span>
                <span>${(item.price).toFixed(2)}</span>
              </div> */}

              <p className="text-right text-gray-500 text-sm mt-1">
                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
