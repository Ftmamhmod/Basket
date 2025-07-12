import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = 'https://dummyjson.com/products';

export const fetchCategoriesProducts = createAsyncThunk(
  'categoryProducts/fetchCategoriesProducts',
  async (category, thunkAPI) => {
    try {
      if (category) {
     // fetch products for a specific category
        const res = await axios.get(`${BASE_URL}/category/${category}`);
        return res.data.products || [];
      } else {
      // fetch all products from all categories
        const res = await axios.get(`${BASE_URL}/categories`);
      const categories = res.data;
      const allProducts = [];
      for (let i = 0; i < categories.length; i++) {
        const url = categories[i].url;
        const res = await axios.get(url);
        // console.log("Products in url", res.data.products);
        const products = res.data.products.map(product => ({
          ...product,
        }));

        allProducts.push(...products);
      }
     
      return allProducts;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
