import CartItem from "@/components/cart-item/CartItem";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const items = useSelector((state) => state.cart.products);

  const totalPrice = useMemo(() => {
    let totalNumbers = 0;
    items.forEach((object) => {
      totalNumbers += object.totalPrice;
    });
    return totalNumbers;
  }, [items]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      {items.length < 1 ? (
        <div className="flex justify-center items-center py-40 text-mainColor text-center">
          <h1 className="text-2xl sm:text-3xl">Cart Is Empty</h1>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto w-full text-sm text-left text-gray-500 dark:text-gray-400 space-y-4">
          {items?.map((item) => (
            <CartItem key={item.product.id} data={item} />
          ))}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/checkout"
                className="w-full sm:w-auto px-4 py-2 rounded-md bg-[#35AFA0] text-white text-center"
              >
                Checkout
              </Link>
              <Link
                to="/shop"
                className="w-full sm:w-auto px-4 py-2 rounded-md bg-[#35AFA0] text-white text-center"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              <div className="text-lg sm:text-2xl font-medium">
                Total Price:
              </div>
              <div className="text-lg sm:text-2xl text-mainColor font-semibold">
                ${totalPrice.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
