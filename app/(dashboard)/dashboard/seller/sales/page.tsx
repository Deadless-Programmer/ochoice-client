"use client";

import React, { useState } from "react";
import { useGetSellerOrdersQuery, useUpdateOrderStatusMutation } from "@/redux/features/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const SalesPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const sellerId = user?.id;

 
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useGetSellerOrdersQuery(sellerId!, {
    skip: !sellerId, 
  });

  

  const [updateStatus, { isLoading: updating }] = useUpdateOrderStatusMutation();

  
  const [selectedStatus, setSelectedStatus] = useState<Record<string, string>>({});

  const handleStatusChange = async (orderId: string) => {
    const status = selectedStatus[orderId];
    if (!status || status === orders.find((o: any) => o._id === orderId)?.status) {
      return toast.error("Please select a different status!");
    }

    try {
      await updateStatus({ id: orderId, status }).unwrap();
      toast.success("Order status updated successfully!");
      // status reset করা (optional)
      setSelectedStatus((prev) => ({ ...prev, [orderId]: "" }));
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update status!");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Error loading orders: {(error as any)?.data?.message || "Something went wrong"}
      </div>
    );
  }

  // No orders
  if (!orders || orders.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-5">Sales / Orders</h1>
        <p className="text-gray-600">No orders found for your shop yet.</p>
      </div>
    );
  }

// console.log("seller orders:", orders)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sales / Orders</h1>

      <div className="overflow-x-auto bg-white shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="p-4 border-b">Order ID</th>
              <th className="p-4 border-b">Products</th>
              <th className="p-4 border-b">Qty</th>
              <th className="p-4 border-b">Total Amount</th>
              <th className="p-4 border-b">Current Status</th>
              <th className="p-4 border-b">Update Status</th>
              <th className="p-4 border-b">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order: any) => (
              <tr key={order._id} className="hover:bg-gray-50 transition">
                <td className="p-4 border-b text-sm">{order._id}</td>

                {/* Products */}
                <td className="p-4 border-b">
                  {order.items?.map((p: any) => (
                    <div key={p.productId} className="text-sm mb-1">
                      {p.name}
                    </div>
                  ))}
                </td>

                {/* Quantity */}
                <td className="p-4 border-b">
                  {order.items?.map((p: any) => (
                    <div key={p.productId} className="text-sm mb-1">
                      {p.quantity}
                    </div>
                  ))}
                </td>
                <td className="p-4 border-b font-semibold">
                  {order.items?.map((p: any) => (
                    <div key={p.price} className="text-sm mb-1">
                      {p.price}
                    </div>
                  ))}
                </td>
                       
                {/* Total  ৳*/}
                {/* <td className="p-4 border-b font-semibold"> ${order.items.total}</td> */}

                {/* Current Status Badge */}
                <td className="p-4 border-b">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "canceled"
                        ? "bg-red-100 text-red-800"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Status Select */}
                <td className="p-4 border-b">
                  <select
                    value={selectedStatus[order._id] || ""}
                    onChange={(e) =>
                      setSelectedStatus((prev) => ({
                        ...prev,
                        [order._id]: e.target.value,
                      }))
                    }
                    className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Change status...</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>

                {/* Update Button */}
                <td className="p-4 border-b">
                  <button
                    onClick={() => handleStatusChange(order._id)}
                    disabled={updating || !selectedStatus[order._id]}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center gap-2"
                  >
                    {updating ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesPage;