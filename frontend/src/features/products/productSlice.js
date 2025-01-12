import { createSlice } from "@reduxjs/toolkit";

// Initial state for the product slice
const initialState = {
  items: [],
  cartItemCount: 0,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setToCart: (state, action) => {
      state.cartItemCount = action.payload;
    },
    addToCart: (state, action) => {
      state.cartItemCount += 1;
    },
    removeFromCart: (state, action) => {
      state.cartItemCount -= 1;
    },
    clearFromCart: (state, action) => {
      state.cartItemCount = 0;
    },
  },
});

// Export actions for dispatching
export const {
  setProducts,
  addToCart,
  removeFromCart,
  clearFromCart,
  setToCart,
} = productSlice.actions;

// Export reducer to be used in the store
export default productSlice.reducer;
