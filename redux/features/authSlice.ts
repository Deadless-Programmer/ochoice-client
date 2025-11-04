// src/redux/slices/authSlice.ts
import axios from "axios";
import { privateAxios } from "@/lib/api/privateAxios";
import { publicAxios } from "@/lib/api/publicAxios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { privateAxios, publicAxios } from "@/lib/api";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  isAuthenticated: false,
  loading: false,
};

// ✅ Login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const res = await publicAxios.post("/auth/login", credentials);
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  }
);

export const getUserProfile = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const res = await privateAxios.get("/auth/me");
    return res.data.user;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch user");
    }
    return thunkAPI.rejectWithValue("Failed to fetch user");
  }
});


// ✅ Logout thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      // localStorage থেকে access token মুছে ফেলো
      localStorage.removeItem("accessToken");

      // server logout endpoint hit করো (refreshToken cookie clear করতে)
      await publicAxios.post("/auth/logout");

      // Success হলে true return করো
      return { success: true };
    } catch (err:unknown) {
    if (axios.isAxiosError(err)) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch user");
    }
    return thunkAPI.rejectWithValue("Failed to fetch user");
  }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
     .addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.isAuthenticated = false;
    })
    .addCase(logout.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
