import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'https://dummyjson.com/products';

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/categories`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);