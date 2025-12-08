import axios from "axios";
import { privateAxios } from "@/lib/api/privateAxios";
import { publicAxios } from "@/lib/api/publicAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// টাইপ ডেফিনিশন (আগের মতোই)
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
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  isAuthenticated: false,
  loading: false,
  initialized: false,
};

// --- Helper Function: Cookie Set করার জন্য ---
const setAuthCookie = (token: string) => {
  // টোকেনটি ১ দিনের জন্য কুকিতে সেট করছি (মিডলওয়্যারের জন্য)
  document.cookie = `accessToken=${token}; path=/; max-age=86400; samesite=lax`;
};

// --- Helper Function: Cookie Remove করার জন্য ---
const removeAuthCookie = () => {
  document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

// ✅ 1. Register User
export const register = createAsyncThunk(
  "auth/register",
  async (credentials: { username: string; email: string; password: string }) => {
    const res = await publicAxios.post("/auth/register", credentials);
    
    // ১. লোকাল স্টোরেজ (Axios এর জন্য)
    localStorage.setItem("accessToken", res.data.accessToken);

    // ২. কুকি সেট (Middleware এর জন্য) - আমরা accessToken কেই কুকিতে রাখছি
    setAuthCookie(res.data.accessToken);

    return res.data;
  }
);

// ✅ 2. Login User
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const res = await publicAxios.post("/auth/login", credentials);

    // ১. লোকাল স্টোরেজ
    localStorage.setItem("accessToken", res.data.accessToken);

    // ২. কুকি সেট (Middleware এর জন্য)
    setAuthCookie(res.data.accessToken);

    return res.data;
  }
);

// ✅ 3. Create User (Admin Only) - নো চেঞ্জ
export const createAUser = createAsyncThunk(
  "auth/create-user",
  async (credentials: { username: string; email: string; role: string; password: string }) => {
    const res = await privateAxios.post("/auth/create-user", credentials);
    return res.data;
  }
);

// ✅ 4. Get User Profile
export const getUserProfile = createAsyncThunk(
  "auth/getUser",
  async (_, thunkAPI) => {
    try {
      const res = await privateAxios.get("/auth/me");
      return res.data.user;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed");
      }
      return thunkAPI.rejectWithValue("Failed");
    }
  }
);

// ✅ 5. Logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      removeAuthCookie(); // কুকি ডিলিট
    }
    await publicAxios.post("/auth/logout");
    return { success: true };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
       // এরর হলেও আমরা ক্লায়েন্ট সাইড ক্লিন করব
       localStorage.removeItem("accessToken");
       removeAuthCookie();
       return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
    return thunkAPI.rejectWithValue("Logout failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    markInitialized: (state) => {
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
        state.initialized = true;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.user = null;
        state.loading = false;
        state.isAuthenticated = false;
        state.initialized = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { markInitialized } = authSlice.actions;
export default authSlice.reducer;