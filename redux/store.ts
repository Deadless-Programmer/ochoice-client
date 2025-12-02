// src/redux/store.ts

"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import productReducer from "./features/productSlice";

import { productApi } from "./features/productApi";
import { cartApi } from "./features/cartApi";
import { orderApi } from "./features/orderApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(productApi.middleware)
      .concat(cartApi.middleware)
      .concat(orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
