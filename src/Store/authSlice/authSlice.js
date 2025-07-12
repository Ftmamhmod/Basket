import { createSlice } from "@reduxjs/toolkit";
import actSignInAuth from "./actSignInAuth";

const initialState = {
  token: null,
  loading: "idel",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = "idle";
      state.error = null;
    },
    logOut(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actSignInAuth.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(actSignInAuth.fulfilled, (state, action) => {
      state.loading = "success";
      state.token = action.payload;
    });
    builder.addCase(actSignInAuth.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
  },
});

export const { resetUI, logOut } = authSlice.actions;
export default authSlice.reducer;
