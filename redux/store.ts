// src/redux/store.ts

"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import productReducer from "./features/productSlice";
import { productApi } from "./features/productApi"; // ← এইটা ইম্পোর্ট করো

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    [productApi.reducerPath]: productApi.reducer, // ← RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productApi.middleware), // ← RTK Query middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;