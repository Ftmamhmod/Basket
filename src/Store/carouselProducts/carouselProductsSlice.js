// Create the slice and pass in the initial state

import { createSlice } from "@reduxjs/toolkit";
import actGetProducts from "./actGetcarouselProducts";

const initialState = {
  products: [],
  loading: "idle",
  error: null,
};

const carouselProductsSlice = createSlice({
  name: "carouselProducts",
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

export const { getProducts } = carouselProductsSlice.actions;
// Export the generated reducer function
export default carouselProductsSlice.reducer;
