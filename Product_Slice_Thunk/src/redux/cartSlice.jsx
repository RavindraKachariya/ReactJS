import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        totalAmount: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            // existing product
            const existingProduct = state.cart.find((p) => p.id === product.id);

            if (existingProduct) {
                existingProduct.quentity += 1;
            } else {
                state.cart.push({ ...product, quentity: 1 });
            }

            state.totalAmount += product.price;
        },

        removeToCart: (state, action) => {
            const productId = action.payload;
            const item = state.cart.find((p) => p.id === productId);

            if (item) {
                // Subtract the item's total price from totalAmount
                state.totalAmount -= item.price * item.quentity;
                state.cart = state.cart.filter((p) => p.id != productId);
            }
        },

        clearCart: (state) => {
            state.cart = [];
        },

        increseQuentity: (state, action) => {
            const item = state.cart.find((p) => p.id === action.payload);
            if (item) {
                item.quentity += 1;
                state.totalAmount += item.price;
            }
        },

        decreseQuentity: (state, action) => {
            const item = state.cart.find((p) => p.id === action.payload);
            if (item && item.quentity > 1) {
                item.quentity -= 1;
                state.totalAmount -= item.price;
            }
        },
    },
});

export const { addToCart, removeToCart, clearCart, increseQuentity, decreseQuentity } = cartSlice.actions

export default cartSlice.reducer