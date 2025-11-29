// src/redux/features/productApi.ts

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

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery,
  tagTypes: ["MyProducts", "DeletedProducts"], 
  endpoints: (builder) => ({

createProduct: builder.mutation<any, any>({
  query: (data) => ({
    url: "/products",
    method: "POST",
    data,
  }),
  invalidatesTags: ["MyProducts", "DeletedProducts"],
}),




    // Active Products
    getMyProducts: builder.query<any, void>({
      query: () => ({
        url: "/products/my-products",
        method: "GET",
      }),
      providesTags: ["MyProducts"],
    }),

    // Deleted Products
    getDeletedProducts: builder.query<any, void>({
      query: () => ({
        url: "/products/my-products/deleted",
        method: "GET",
      }),
      providesTags: ["DeletedProducts"],
    }),

    // Update Product
    updateProduct: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["MyProducts", "DeletedProducts"],
    }),

    // Soft Delete
    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyProducts", "DeletedProducts"], 
    }),

    // Restore Product
    restoreProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: `/products/${id}/restore`,
        method: "PATCH",
      }),
      invalidatesTags: ["MyProducts", "DeletedProducts"], 
    }),
  }),
});

// Export all hooks
export const {
  useGetMyProductsQuery,
  useGetDeletedProductsQuery,     
  useUpdateProductMutation,
  useDeleteProductMutation,
  useRestoreProductMutation,
  useCreateProductMutation,
} = productApi;