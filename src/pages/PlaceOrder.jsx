import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const PlaceOrder = () => {
  // const [method, setMethod] = useState("cod");

  const [method, setMethod] = useState("razorpay");

  const [loading, setLoading] = useState(false);
  const { token, navigate, backendUrl, cartItems, setCartItems, getCartAmount, deliveryFee, products } =
    useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to place order");
      return;
    }

    setLoading(true);

    try {
      // Build order items from cart
      const orderItems = [];
      for (const productId in cartItems) {
        const quantity = cartItems[productId];
        if (quantity > 0) {
          const product = products.find((p) => p._id === productId);
          if (product) {
            orderItems.push({
              _id: product._id,
              name: product.name,
              price: product.price,
              quantity,
            });
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        setLoading(false);
        return;
      }

      // const orderData = {
      //   items: orderItems,
      //   amount: getCartAmount() + deliveryFee,
      //   address: formData, // will be transformed in backend
      // };
      const orderData = {
        items: orderItems,
        address: formData,
      };

      let response;

      if (method === "cod") {
        const response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          { headers: { token } }
        );

        if (response.data.success) {
          setCartItems({});
          toast.success("Order placed successfully!");
          navigate("/orders");
        } else {
          toast.error(response.data.message || "Failed to place order");
        }
      }

      if (method === "razorpay") {
        const response = await axios.post(
          `${backendUrl}/api/order/razorpay`,
          {
            items: orderItems,
            address: formData,
            amount: getCartAmount() + deliveryFee,
          },
          { headers: { token } }
        );

        if (!response.data.success) {
          toast.error("Failed to initiate payment");
          setLoading(false);
          return;
        }

        const { razorpayOrder, orderId, key } = response.data;

        const options = {
          key,
          amount: razorpayOrder.amount,
          currency: "INR",
          name: "CraveNutri",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: true,
          },

          handler: async function (paymentResponse) {
            try {
              const verifyRes = await axios.post(
                `${backendUrl}/api/order/verifyRazorpay`,
                {
                  ...paymentResponse,
                  orderId,
                },
                { headers: { token } }
              );
              toast.success("Payment Processing...")

              if (verifyRes.data.success) {
                toast.success("Payment Successful 🎉");
                setCartItems({});
                navigate("/orders");
              } else {
                toast.error("Payment verification failed");
              }

            } catch (error) {
              toast.error("Verification failed");
            }
          },

          modal: {
            ondismiss: function () {
              setLoading(false);
              toast.info("Payment cancelled");
            },
          },

          prefill: {
            name: formData.firstName + " " + formData.lastName,
            email: formData.email,
            contact: formData.phone,
          },

          theme: { color: "#10b981" },
        };

        if (!window.Razorpay) {
          toast.error("Payment gateway failed to load");
          setLoading(false);
          return;
        }

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", async function () {
          await axios.post(
            `${backendUrl}/api/order/payment-failed`,
            { orderId },
            { headers: { token } }
          );
          toast.error("Payment Failed ❌");
        });

        setLoading(false);
        rzp.open();
        return;
      }

      if (response?.data.success) {
        setCartItems({});
        toast.success("Order placed successfully!");
        navigate("/orders");
      } else {
        toast.error(response?.data.message || "Failed to place order");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onSubmit={onSubmitHandler}
        className="flex flex-col lg:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-8 lg:px-12"
      >
        {/* Delivery Information */}
        <div className="flex flex-col gap-4 w-full lg:max-w-[500px]">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <div className="flex gap-3">
            <input
              required
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-emerald-300 outline-none"
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
            />
            <input
              required
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-emerald-300 outline-none"
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
            />
          </div>

          <input
            required
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-emerald-300 outline-none"
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
          />

          <input
            required
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-emerald-300 outline-none"
            type="text"
            placeholder="Street Address"
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
          />

          <div className="flex gap-3">
            <input
              required
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-emerald-300 outline-none"
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
            />
            <input
              required
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-emerald-300 outline-none"
              type="text"
              placeholder="State"
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
            />
          </div>

          <div className="flex gap-3">
            <input
              required
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-emerald-300 outline-none"
              type="text"
              placeholder="Zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={onChangeHandler}
            />
            <input
              required
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-emerald-300 outline-none"
              type="text"
              placeholder="Country"
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
            />
          </div>

          <input
            required
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-emerald-300 outline-none"
            type="tel"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
          />
        </div>

        {/* Right side - Cart total & Payment */}
        <div className="mt-8 lg:mt-0 lg:min-w-[400px]">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <CartTotal />

            <div className="mt-8">
              <Title text1={"PAYMENT"} text2={"METHOD"} />

              <div className="flex flex-col gap-3 mt-4">
                {/* <label
                className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition ${method === "stripe" ? "border-emerald-500 bg-emerald-50" : "border-gray-200"
                  }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  checked={method === "stripe"}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-4 h-4 accent-emerald-600"
                />
                <img className="h-6" src={assets.stripe_logo} alt="Stripe" />
              </label> */}

                <label
                  className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition ${method === "cod" ? "border-emerald-500 bg-emerald-50" : "border-gray-200"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={method === "cod"}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-4 h-4 accent-emerald-600"
                  />
                  <span className="text-gray-700 font-medium">Cash on Delivery</span>
                </label>

                <label
                  className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition ${method === "razorpay"
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={method === "razorpay"}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-4 h-4 accent-emerald-600"
                  />
                  <span className="text-gray-700 font-medium">
                    Pay with Razorpay
                  </span>
                </label>
              </div>

              <div className="mt-8 text-right">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-10 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "PLACING ORDER..." : "PLACE ORDER"}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.form>
    </>

  );
};

export default PlaceOrder;