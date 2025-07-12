import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const actGetcarouselProducts = createAsyncThunk(
  "actGetcarouselProducts/getProducts",
  async (category, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      if (category) {
        const response = await axios.get(
          `https://dummyjson.com/products/category/${category}`
        );

        return response.data.products || response.data;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);
export default actGetcarouselProducts;
