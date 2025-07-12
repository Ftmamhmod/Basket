import {
  useStripe,
  useElements,
  CardElement,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import ToastNotification from "@/components/toastify";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { cleanUpCart } from "@/store/cart/cartSlice";

export default function CheckoutForm() {
  const dispatch = useDispatch();

  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: {
      line1: "",
      city: "",
      postal_code: "",
      country: "US",
    },
  });
  const [activePaymentMethod, setActivePaymentMethod] = useState("card");

  const showToast = (type, message) => {
    setNotification({ type, message });
  };

  const cartItems = useSelector((state) => state.cart.products);

  const total = useMemo(() => {
    let totalNumbers = 0;
    cartItems.forEach((object) => {
      totalNumbers += object.totalPrice;
    });
    return totalNumbers;
  }, [cartItems]);

  useEffect(() => {
    if (total <= 0) return;

    let mounted = true;

    axios
      .post("http://localhost:4242/create-payment-intent", {
        amount: total * 100,
      })
      .then((res) => {
        if (mounted) {
          setClientSecret(res.data.clientSecret);
          initializePaymentRequest(res.data.clientSecret);
        }
      })
      .catch(() => {
        showToast("error", "Failed to initialize payment");
      });

    return () => {
      mounted = false;
    };
  }, [total]);

  const initializePaymentRequest = (clientSecret) => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Total",
        amount: 1000,
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestShipping: true,
      shippingOptions: [
        {
          id: "free-shipping",
          label: "Free shipping",
          detail: "Arrives in 5 to 7 days",
          amount: 0,
        },
      ],
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });

    pr.on("paymentmethod", async (ev) => {
      const { error: confirmError } = await stripe.confirmPayment({
        clientSecret,
        paymentMethod: ev.paymentMethod,
        confirmParams: {
          return_url: window.location.origin,
          receipt_email: ev.payerEmail,
          shipping: {
            name: ev.payerName,
            address: {
              line1: ev.shippingAddress.addressLine[0],
              city: ev.shippingAddress.city,
              postal_code: ev.shippingAddress.postalCode,
              country: ev.shippingAddress.country,
            },
          },
        },
      });

      if (confirmError) {
        showToast("error", confirmError.message);
        ev.complete("fail");
      } else {
        showToast("success", "Payment succeeded!");
        ev.complete("success");
        setTimeout(() => {
          window.location.href = "/success";
        }, 1000);
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret || loading) return;

    // Basic validation
    if (activePaymentMethod === "card" && (!formData.name || !formData.email)) {
      showToast("error", "Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      if (activePaymentMethod === "card") {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: formData.name,
                email: formData.email,
                address: formData.address,
              },
            },
            shipping: {
              name: formData.name,
              address: formData.address,
            },
          }
        );

        if (error) {
          showToast("error", error.message);
        } else if (paymentIntent.status === "succeeded") {
          showToast("success", "Payment succeeded!");
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
          dispatch(cleanUpCart());
        }
      }
    } catch (err) {
      console.error("[Payment Error]", err);
      showToast("error", "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <p className="mt-2 text-gray-600">Total: ${total.toFixed(2)}</p>
          </div>

          <ToastNotification {...notification} />

          <div className="mb-6">
            <div className="flex border-b">
              <button
                type="button"
                className={`py-2 px-4 font-medium ${
                  activePaymentMethod === "card"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActivePaymentMethod("card")}
              >
                Credit Card
              </button>

              {/* <button
                type="button"
                className={`py-2 px-4 font-medium ${
                  activePaymentMethod === "paypal"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActivePaymentMethod("paypal")}
              >
                PayPal
              </button> */}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {activePaymentMethod === "card" ? (
              <>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Details <span className="text-red-500">*</span>
                  </label>
                  <div className="p-3 border border-gray-300 rounded-md">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="address.line1"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address.line1"
                    name="address.line1"
                    value={formData.address.line1}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label
                      htmlFor="address.city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address.city"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address.postal_code"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ZIP Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address.postal_code"
                      name="address.postal_code"
                      value={formData.address.postal_code}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="mb-6">
                <div className="p-4 border border-gray-300 rounded-md">
                  <PaymentRequestButtonElement className="w-full" />
                </div>
              </div>
            )}

            {activePaymentMethod === "card" && (
              <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Pay $${total.toFixed(2)}`
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
