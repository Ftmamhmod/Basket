import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetProducts = createAsyncThunk(
  "products/getProducts",
  async (category, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const URL = category
      ? `https://dummyjson.com/products/category/${category}`
      : "https://dummyjson.com/products";
    try {
      const response = await axios.get(URL);
      return response.data.products || response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);
export default actGetProducts;
