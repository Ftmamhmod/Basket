import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetProductById = createAsyncThunk(
  "popup/getProducts",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      return response.data.product || response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);
export default actGetProductById;
