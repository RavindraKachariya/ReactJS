import { createSlice } from "@reduxjs/toolkit";

const initialState = 
  {
    products: [
      {
        id: 1,
        name: "Laptop",
        price: 999,
        category: "Electronics",
        image:
          "https://sellzy-preview.netlify.app/assets/images/home-5/tablet.png",
        stock: "",
      },
      {
        id: 2,
        name: "Phone",
        price: 699,
        category: "Electronics",
        image:
          "https://sellzy-preview.netlify.app/assets/images/home-5/iphone.png",
        stock: "",
      },
      {
        id: 3,
        name: "Shirt",
        price: 499,
        category: "Clothing",
        image:
          "https://sellzy-preview.netlify.app/assets/images/home-4/outfit-person-1.png",
        stock: "",
      },
      {
        id: 4,
        name: "Shoes",
        price: 199,
        category: "Clothing",
        image:
          "https://m2.portotheme.com/media/catalog/product/cache/205747453be7be2aa4b422c28337f21f/p/r/product-34.jpg",
        stock: "",
      },
      {
        id: 5,
        name: "Table",
        price: 299,
        category: "Furniture",
        image:
          "https://tfamerce.vercel.app/assets/images/product/office/product-9_2.jpg",
        stock: "",
      },
    ],
    cart: [],
    totalAmount: 0,
  }


const productSlice = createSlice({
  name: "product",
  initialState,
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

    addToCart: (state , action) => {

      const product = action.payload
      // existing product
      const existingProduct = state.cart.find((p) => p.id === product.id)

      if(existingProduct){
        existingProduct.quentity += 1;
      }else{
        state.cart.push({...product , quentity : 1})
      }

      state.totalAmount += product.price
    },

    removeToCart: () => {},

    clearCart: () => {},

    increseQuentity: () => {},

    decreseQuentity: () => {},
  },
});

export const { addProduct, updateProduct, deleteProduct , addToCart } =
  productSlice.actions;

export default productSlice.reducer;
