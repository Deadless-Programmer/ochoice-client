// src/redux/features/cartApi.ts

import { createApi } from "@reduxjs/toolkit/query/react";
import { privateAxios } from "@/lib/api/privateAxios";

const baseQuery = async (args: any) => {
  try {
    const result = await privateAxios(args);
    return { data: result.data };
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

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({

    // 🟢 Add to Cart
    addToCart: builder.mutation<any, any>({
      query: (body) => ({
        url: "/cart/add",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🟡 Get User Cart
    getUserCart: builder.query<any, string>({
      query: (userId) => ({
        url: `/cart/${userId}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    // 🔴 Delete Cart Item
    deleteCartItem: builder.mutation<any, { id: string; userId: string }>({
      query: ({ id, userId }) => ({
        url: `/cart/${id}`,
        method: "DELETE",
        data: { userId },
      }),
      invalidatesTags: ["Cart"],
    }),

  }),
});

export const {
  useAddToCartMutation,
  useGetUserCartQuery,
  useDeleteCartItemMutation,
} = cartApi;
