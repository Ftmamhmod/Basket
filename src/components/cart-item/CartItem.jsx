import { decrease, increase, removeItem } from "@/store/cart/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";

export default function CartItem({ data }) {
  const dispatch = useDispatch();

  const increasee = () => dispatch(increase(data));
  const decreseItems = () => dispatch(decrease(data));
  const remooveItem = () => dispatch(removeItem(data));

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b">
      <div className="flex items-center gap-4 w-full sm:w-1/4">
        <img
          src={data.product.images[0]}
          alt={data.product.brand}
          className="w-16 h-16 object-cover rounded"
        />
        <p className="text-gray-800 font-medium">{data.product.brand}</p>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-1/4 justify-center">
        <button
          onClick={decreseItems}
          className="w-8 h-8 border rounded-full text-gray-600"
        >
          −
        </button>
        <span className="min-w-[32px] text-center text-sm text-gray-700">
          {data.count}
        </span>
        <button
          onClick={increasee}
          className="w-8 h-8 border rounded-full text-gray-600"
        >
          +
        </button>
      </div>

      <div className="text-gray-800 font-semibold w-full sm:w-1/4 text-center sm:text-left">
        ${data.totalPrice.toFixed(2)}
      </div>

      <div className="w-full sm:w-1/4 text-center sm:text-right">
        <button
          onClick={remooveItem}
          className="text-red-500 text-sm hover:underline cursor-pointer"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
