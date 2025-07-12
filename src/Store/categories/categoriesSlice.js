import { createSlice } from "@reduxjs/toolkit";
import {fetchCategories} from "./actGetCategories";

const initialState = {
  categories: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getCategories(state, action) {
      state.loading = "succeeded";
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = "success";
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
  },
});
export default categoriesSlice.reducer;