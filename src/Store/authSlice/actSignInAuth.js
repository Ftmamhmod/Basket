import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const actSignInAuth = createAsyncThunk(
  "signUp/actSignInAuth",
  async (formData) => {
    try {
      const res = await axios.post(
        "https://dummyjson.com/auth/login",
        formData
      );
      toast.success("Login successful!");
      return res.data;
    } catch (error) {
      toast.error("Login failed.");
    }
  }
);

export default actSignInAuth;
