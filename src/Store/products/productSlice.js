// Create the slice and pass in the initial state

import { createSlice } from "@reduxjs/toolkit";
import actGetProducts from "./actGetProduct";

const initialState = {
  products: [],
  loading: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts(state, action) {
      state.loading = "succeeded";
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProducts.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(actGetProducts.fulfilled, (state, action) => {
      state.loading = "success";
      state.products = action.payload;
    });
    builder.addCase(actGetProducts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
  },
});

export const { getProducts } = productSlice.actions;
// Export the generated reducer function
export default productSlice.reducer;
