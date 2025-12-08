import { publicAxios } from "@/lib/api/publicAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// -------- Product Interface --------
export interface Product {
  _id: string;
  seller: string;
  sellerEmail?: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number | null;
  image: string;
  label?: string | null;
  colors: string[];
  rating: number;
  reviews: number;
  stock: number;
  brand: string;
  size: string[];
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

// -------- State Interface --------
interface ProductState {
  products: Product[];
  allProducts: Product[];
  singleProduct: Product | null;
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
    hasPrev: boolean;
    hasNext: boolean;
  } | null;
  loading: boolean;
  singleProductLoading?: boolean;
  error: string | null;
}

// -------- Initial State --------
const initialState: ProductState = {
  products: [],
  allProducts: [],
  singleProduct: null,
  pagination: null,
  singleProductLoading: true,
  loading: false,
  error: null,
};

// -------- Async Thunks --------

// Fetch products (with optional filters/sorting/pagination)
export const fetchProducts = createAsyncThunk<
  { products: Product[]; pagination: any },
  { [key: string]: any } | undefined
>(
  "products/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();

      // Helper to append if value exists
      const appendIf = (key: string, value: any) => {
        if (value) query.append(key, value);
      };

      // Categories, brands, sizes as comma-separated
      if (params.category && params.category.length) {
        appendIf("category", params.category.join(","));
      }
      if (params.brand && params.brand.length) {
        appendIf("brand", params.brand.join(","));
      }
      if (params.size && params.size.length) {
        appendIf("size", params.size.join(","));
      }

      // Colors: strip # and join
      if (params.color && params.color.length) {
        const cleanedColors = params.color.map((c: string) => c.replace(/^#/, ""));
        appendIf("color", cleanedColors.join(","));
      }

      // Price: minPrice fixed to 0, maxPrice if set
      appendIf("minPrice", params.minPrice || 0);
      if (params.maxPrice !== undefined && params.maxPrice < 950) {  // Assuming 950 is max, only send if filtered
        appendIf("maxPrice", params.maxPrice);
      }

      // Sort
      appendIf("sort", params.sort);

      // Pagination
      appendIf("page", params.page || 1);
      appendIf("limit", params.limit || 20);

      // Search q if added later
      if (params.q) appendIf("q", params.q);

      const url = `/products${query.toString() ? `?${query.toString()}` : ""}`;
      const response = await publicAxios.get(url);

      return {
        products: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// Fetch single product by ID (unchanged)
export const fetchSingleProduct = createAsyncThunk<Product, string>(
  "products/fetchSingle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await publicAxios.get(`/products/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.data.message || "Failed to fetch product");
    }
  }
);

// -------- Slice --------
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ---- Fetch All/Filtered ----
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     
      .addCase(fetchProducts.fulfilled, (state, action: any) => {
        state.loading = false;
        
        // If no params (initial fetch i.e. arg is undefined), set allProducts
        if (!action.meta.arg || Object.keys(action.meta.arg || {}).length === 0) {
          state.allProducts = action.payload.products;
        }
        
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---- Fetch Single ----
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleProductLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProductLoading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action: any) => {
        state.singleProductLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;