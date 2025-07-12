import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  increase,
  decrease,
  removeItem,
} from "@/store/cart/cartSlice";

function ButtonQuantityCounter({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.products);
  const cartItem = cartItems.find((item) => item.product.id === product.id);

  const quantity = cartItem?.count || 0;

  const handleIncrement = () => {
    if (cartItem) {
      dispatch(increase({ product }));
    } else {
      dispatch(addCart({ ...product, quantity: 1 }));
    }
  };

  const handleDecrement = () => {
    if (cartItem) {
      if (quantity > 1) {
        dispatch(decrease({ product }));
      } else {
        dispatch(removeItem({ product }));
      }
    }
  };

  return (
    <div className="flex justify-center items-center rounded-5xl py-2">
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-l-lg cursor-pointer disabled:opacity-50"
        onClick={handleDecrement}
        disabled={quantity === 0}
      >
        -
      </button>
      <span className="bg-white px-4 py-1 text-gray-800 ps-8 pe-8">
        {quantity}
      </span>
      <button
        className="bg-amber-400 hover:bg-amber-500 text-gray-800 px-3 py-1 rounded-r-lg cursor-pointer"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}

export default ButtonQuantityCounter;
