import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      const product = action.payload;
      const quantity = product.quantity || 1;
      const exItem = state.products.find(
        (item) =>
          item.product.id === product.id && item.product.size === product.size
      );

      if (exItem) {
        exItem.count += quantity;
        exItem.totalPrice += product.price * quantity;
      } else {
        state.products.push({
          product,
          count: quantity,
          totalPrice: Number(product.price * quantity),
        });
      }
    },
    increase(state, action) {
      const exItem = state.products.find(
        (item) => item.product.id === action.payload.product.id
      );

      if (exItem) {
        exItem.count += 1;
        exItem.totalPrice += action.payload.product.price;
      } else {
        console.warn("Item not found in cart for increase operation.");
      }
    },

    decrease(state, action) {
      const exItem = state.products.find(
        (item) => item.product.id === action.payload.product.id
      );

      if (exItem && exItem.count > 1) {
        exItem.count -= 1;
        exItem.totalPrice -= action.payload.product.price;
      } else if (exItem) {
        console.warn("Cannot decrease count below 1.");
      } else {
        console.warn("Item not found in cart for decrease operation.");
      }
    },

    removeItem(state, action) {
      state.products = state.products.filter(
        (item) => item.product.id !== action.payload.product.id
      );
    },
    cleanUpCart(state) {
      state.products = [];
    },
  },
});

export const { addCart, removeItem, increase, decrease, cleanUpCart } =
  cartSlice.actions;
export default cartSlice.reducer;
