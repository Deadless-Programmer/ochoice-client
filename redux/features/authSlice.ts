// src/redux/slices/authSlice.ts
import axios from "axios";
import { privateAxios } from "@/lib/api/privateAxios";
import { publicAxios } from "@/lib/api/publicAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

// ✅ Register User thunk
export const register = createAsyncThunk(
  "auth/register",
  async (credentials: {
    username: string;
    email: string;
    password: string;
  }) => {
    const res = await publicAxios.post("/auth/register", credentials);
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  }
);
export const createAUser = createAsyncThunk(
  "auth/create-user",
  async (credentials: {
    username: string;
    email: string;
    role: string;
    password: string;
  }) => {
    const res = await privateAxios.post("/auth/create-user", credentials);
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const res = await publicAxios.post("/auth/login", credentials);
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUser",
  async (_, thunkAPI) => {
    try {
      const res = await privateAxios.get("/auth/me");
      return res.data.user;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message || "Failed to fetch user"
        );
      }
      return thunkAPI.rejectWithValue("Failed to fetch user");
    }
  }
);

// ✅ Logout thunk
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    // localStorage থেকে access token মুছে ফেলো
    localStorage.removeItem("accessToken");

    // server logout endpoint hit করো (refreshToken cookie clear করতে)
    await publicAxios.post("/auth/logout");

    // Success হলে true return করো
    return { success: true };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch user"
      );
    }
    return thunkAPI.rejectWithValue("Failed to fetch user");
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
      .addCase(createAUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
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
        state.user = action.payload; // ✅ শুধু payload-ই user object
        state.loading = false;
        state.isAuthenticated = true; // ✅ এটা যোগ করো
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
        state.loading = false;
      });
  },
});


export const { markInitialized } = authSlice.actions;
export default authSlice.reducer;
