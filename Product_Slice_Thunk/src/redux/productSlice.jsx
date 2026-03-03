import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// use middleware with redux [ createSlice with createAsyncThunk ]

const API_URL = "http://localhost:3000/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch(API_URL);
    return await res.json();
  },
);

const addProductAsync = createAsyncThunk(
  "products/addProductAsync",
  async (product) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    return await res.json();
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.error.message));
      })

      .addCase(addProductAsync.fulfilled, (state, action) => {
        ((state.loading = false), (state.products = action.payload));
      })

      .addCase(addProductAsync.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.error.message));
      });
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;