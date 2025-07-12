import { createSlice } from "@reduxjs/toolkit";
import actGetProductById from "./actGetProductById";

const initialState = {
  product: [],
  open: false,
  selectedProductId: null,
  loading: "idle",
  error: null,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup: (state, action) => {
      state.open = true;
      state.selectedProductId = action.payload;
    },
    closePopup: (state) => {
      state.open = false;
      state.selectedProductId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductById.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(actGetProductById.fulfilled, (state, action) => {
      state.loading = "success";
      state.product = action.payload;
    });
    builder.addCase(actGetProductById.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
