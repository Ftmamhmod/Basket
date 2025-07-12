import { createSlice } from "@reduxjs/toolkit";
import {fetchCategoriesProducts} from "./actGetCategoryProducts";

const initialState = {
  categoriesProducts: [],
  loading: "idle",
  error: null,
};

const categoriesProductsSlice = createSlice({
  name: "categoriesProducts",
  initialState,
  reducers: {
    getCategories(state, action) {
      state.loading = "succeeded";
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesProducts.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchCategoriesProducts.fulfilled, (state, action) => {
      state.loading = "success";
      state.categories = action.payload;
    });
    builder.addCase(fetchCategoriesProducts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
  },
});
export default categoriesProductsSlice.reducer;