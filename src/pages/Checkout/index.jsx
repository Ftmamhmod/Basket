import React from "react";
import styles from "./Checkout.module.css";
import iconPayment from "../../assets/checkout-img/Container.png";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.products);

  const user = useSelector((state) => state.auth.token);

  const items = useMemo(() => {
    let totalNumbers = 0;
    cartItems.forEach((object) => {
      totalNumbers += object.count;
    });
    return totalNumbers;
  }, [cartItems]);

  const total = useMemo(() => {
    let totalNumbers = 0;
    cartItems.forEach((object) => {
      totalNumbers += object.totalPrice;
    });
    return totalNumbers;
  }, [cartItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    window.location.href = "/pay";
  };

  return (
    <section className="my-20 ">
      <div className="container mx-auto px-10">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 border-r border-[#DEDEDE] pr-6">
            <div className="flex justify-between items-center ">
              <h2 className="font-semibold text-xl pb-2 text-black">Contact</h2>
              {!user && (
                <p className={styles.editLink}>
                  <Link to="/login">Login</Link>
                </p>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="my-4">
                <input
                  class="shadow appearance-none border-[#DEDEDE] border-[1px] rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1773B0] focus:border-[#1773B0]"
                  id="email"
                  type="email"
                  placeholder="Email or mobile phone number"
                  required
                />
              </div>
              <div className="my-4">
                <label class="flex items-center space-x-2 text-sm text-black-700">
                  <input
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-[#1773B0] border-[#DEDEDE] border-[1px] rounded focus:ring-[#1773B0]"
                  />
                  <span>Email me with news and offers</span>
                </label>
              </div>
              <div className="mt-14">
                <h2 className="font-semibold text-xl pb-2 text-black">
                  Delivery
                </h2>
              </div>
              <div className="my-4 flex flex-wrap gap-4 md:flex-nowrap">
                <div className="w-full md:w-1/2">
                  <input
                    className="shadow appearance-none border-[#DEDEDE] border-[1px] rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1773B0] focus:border-[#1773B0]"
                    id="firstName"
                    type="text"
                    placeholder="First Name (Optional)"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <input
                    className="shadow appearance-none border-[#DEDEDE] border-[1px] rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1773B0] focus:border-[#1773B0]"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="my-4">
                <input
                  class="shadow appearance-none border-[#DEDEDE] border-[1px] rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1773B0] focus:border-[#1773B0]"
                  id="address"
                  type="text"
                  placeholder="Address"
                />
              </div>
              <div className="my-4">
                <input
                  class="shadow appearance-none border-[#DEDEDE] border-[1px] rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1773B0] focus:border-[#1773B0]"
                  id="apartment"
                  type="text"
                  placeholder="Apartment, suite, etc. (Optional)"
                />
              </div>
              <div className="my-4 flex flex-wrap gap-4 md:flex-nowrap">
                <div className="w-full md:w-1/2">
                  <input
                    className="shadow appearance-none border-[#DEDEDE] border-[1px] rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1773B0] focus:border-[#1773B0]"
                    id="postalCode"
                    type="text"
                    placeholder="Postal Code (Optional)"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <input
                    className="shadow appearance-none border-[#DEDEDE] border-[1px] rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1773B0] focus:border-[#1773B0]"
                    id="city"
                    type="text"
                    placeholder="City"
                  />
                </div>
              </div>

              <div className="my-4">
                <label class="flex items-center space-x-2 text-sm text-black-700">
                  <input
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-[#1773B0] border-[#DEDEDE] border-[1px] rounded focus:ring-[#1773B0]"
                  />
                  <span>Save this information for next time</span>
                </label>
              </div>
              <div className="my-7">
                <h2 className="font-semibold text-xl pb-2 text-black">
                  Shipping method
                </h2>
                <div className="flex justify-between items-center my-2 border-[3px] border-[#1773B0] rounded p-4">
                  <span>Standard</span>
                  <span className={styles["shipping-cost"]}>free</span>
                </div>
              </div>
              <div className="my-7 ">
                <div>
                  <h2 className="font-semibold text-xl pb-2 text-black">
                    Payment
                  </h2>
                  <p className=" text-sm text-[#707070]">
                    All transactions are secure and encrypted.
                  </p>
                </div>
                <div className="my-4 p-4 bg-[#F5F5F5] flex justify-center flex-col items-center text-center rounded">
                  <div className="mb-2">
                    <img
                      loading="lazy"
                      src={iconPayment}
                      alt="Payment Icon"
                      className="w-20 h-20 "
                    />
                  </div>
                  <p className=" text-sm text-[#707070]">
                    This store can’t accept payments right now.
                  </p>
                </div>
              </div>
              <div className="my-7">
                <button
                  type="submit"
                  className="w-full bg-[#F5F5F5] text-gray-700 text-sm font-bold py-4 px-6 rounded cursor-pointer border border-[#DEDEDE] hover:bg-[#e0e0e0] transition duration-200"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
          <div className="w-full md:w-1/2 info-order">
            <ul>
              {cartItems.map((item) => (
                <li className="flex justify-between items-center  py-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 border border-[#DEDEDE] rounded shadow-md ${styles["product-image"]}`}
                    >
                      <img
                        loading="lazy"
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                      <span
                        className={`bg-[#4B4B4B] text-white flex justify-center items-center ${styles["product-count"]}`}
                      >
                        {item.count}
                      </span>
                    </div>
                    <p className="font-semibold text-base">
                      {item.product.title}
                    </p>
                  </div>
                  <span className="font-medium">
                    ${item.totalPrice.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            .
            <div>
              <div className="flex justify-between items-center pt-4">
                <p className="text-base">
                  Subtotal · <span className="font-medium">{items} items</span>
                </p>
                <span className="text-base font-semibold">${total}</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-base">Shipping</span>
                <span className="text-base">FREE</span>
              </div>
              <div className="flex justify-between items-center py-7">
                <span className="text-2xl font-bold">Total</span>
                <span className="text-base font-semibold">
                  <span className="font-light text-[#666666]">USD</span> $
                  {total}
                </span>
              </div>
              <p className="text-sm text-[#707070]">Including $2.46 in taxes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
