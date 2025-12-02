// src/redux/features/orderApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { privateAxios } from "@/lib/api/privateAxios";

const baseQuery = async (args: any) => {
  try {
    const result = await privateAxios(args);
    return { data: result.data.data };
  } catch (axiosError: any) {
    const err = axiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery,
  tagTypes: ["Order"],
  endpoints: (builder) => ({

    // 🟢 CREATE ORDER (Customer)
    createOrder: builder.mutation<any, any>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Order"],
    }),

    // 🟡 GET USER ORDERS (Customer Dashboard)
    getUserOrders: builder.query<any, string>({
      query: (userId) => ({
        url: `/orders/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    // 🟣 GET SELLER ORDERS (Seller Dashboard)
    getSellerOrders: builder.query<any, string>({
      query: (sellerId) => ({
        url: `/orders/seller/${sellerId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    // 🔵 UPDATE STATUS (Seller Only)
    updateOrderStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["Order"],
    }),

    // 🔴 DELETE ORDER (Optional, Admin Only) – ekhane frontend e lagbe na, delete code remove kora jete pare
    // deleteOrder: builder.mutation<any, string>({
    //   query: (id) => ({
    //     url: `/orders/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Order"],
    // }),

  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetSellerOrdersQuery,
  useUpdateOrderStatusMutation,
  // useDeleteOrderMutation, // optional
} = orderApi;
