import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// use middleware with redux [ createSlice with createAsyncThunk ]

const API_URL = "http://localhost:3000/products"

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts", async () => {
    const res = await fetch(API_URL)
    return await res.json()
  }
)

const addProductAsunc = createAsyncThunk(
  "products/addProductAsunc", async (product) => {

    const res = await fetch(API_URL, {
      method: POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })

    return await res.json()
  }
)

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    cart: [],
    totalAmount: 0,
    loading: false,
    error: null
  },
  reducers: {
    // addProduct

    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    // updateProduct

    updateProduct: (state, action) => {
      const index = state.products.findByIndex(
        (p) => p.id === action.payload.id,
      );

      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    // deleteProduct

    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },

    addToCart: (state, action) => {

      const product = action.payload
      // existing product
      const existingProduct = state.cart.find((p) => p.id === product.id)

      if (existingProduct) {
        existingProduct.quentity += 1;
      } else {
        state.cart.push({ ...product, quentity: 1 })
      }

      state.totalAmount += product.price
    },

    removeToCart: (state, action) => {
      const productId = action.payload
      const item = state.cart.filter((p) => p.id === productId)

      if (item) {
        state.cart = state.cart.filter((p) => p.id != productId)
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },

    increseQuentity: (state, action) => {
      const item = state.cart.find((p) => p.id === action.payload)
      if (item) {
        item.quentity += 1;
        state.totalAmount += item.price
      }
    },

    decreseQuentity: (state, action) => {
      const item = state.cart.find((p) => p.id === action.payload)
      if (item && item.quentity > 1) {
        item.quentity -= 1;
        state.totalAmount -= item.price
      }
    },
  },
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
        state.loading = false,
          state.error = action.error.message
      })

  }
});

export const { addProduct, updateProduct, deleteProduct, addToCart, removeToCart, clearCart, increseQuentity, decreseQuentity } =
  productSlice.actions;

export default productSlice.reducer;