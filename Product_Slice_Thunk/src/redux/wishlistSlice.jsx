import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlist: [],
    },
    reducers: {
        addToWishlist: (state, action) => {
            const product = action.payload;
            // Check if product already exists in wishlist
            const existingProduct = state.wishlist.find((p) => p.id === product.id);

            if (!existingProduct) {
                state.wishlist.push(product);
            }
        },

        removeFromWishlist: (state, action) => {
            const productId = action.payload;
            state.wishlist = state.wishlist.filter((p) => p.id !== productId);
        },

        clearWishlist: (state) => {
            state.wishlist = [];
        },
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
