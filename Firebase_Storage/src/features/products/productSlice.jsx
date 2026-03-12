import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchProductAPI,
    addProductAPI,
    updateProductAPI,
    deleteProductAPI,
} from "./productAPI";

const initialState = {
    list: [],
    status: "idle",
};

export const fetchProduct = createAsyncThunk(
    "products/fetchProduct",
    async () => {
        return await fetchProductAPI();
    },
);

export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (product) => {
        return await addProductAPI(product);
    },
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async (id) => {
        return await updateProductAPI(id);
    },
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id) => {
        return await deleteProductAPI(id);
    },
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchProduct.pending, (state) => {
                state.status = "loading";
            })

            .addCase(fetchProduct.fulfilled, (state, action) => {
                ((state.list = action.payload), (state.status = "success"));
            })

            .addCase(fetchProduct.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(addProduct.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })

            .addCase(addProduct.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.list = state.list.filter((p) => p.id !== action.payload);
            })

            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.list.findIndex((p) => p.id === action.payload);

                if (index !== -1) {
                    state.list[index] = {
                        ...state.list[index],
                        ...action.payload.data,
                    };
                }
            });
    },
});

export default productSlice.reducer;