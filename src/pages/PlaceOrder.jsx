// PlaceOrder.jsx
import React, { useContext, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Title from "../components/Title";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import SEO from "../components/SEO";

const PlaceOrder = () => {
  const [method, setMethod] = useState("razorpay");
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [fetchingAddresses, setFetchingAddresses] = useState(true);
  const [showAddressPicker, setShowAddressPicker] = useState(false);
  const [fetchingLocation, setFetchingLocation] = useState(false);

  const {
    token,
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    products,
    deliveryFee,
    currency,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    landmark: "",
    city: "",
    district: "",
    state: "",
    zipcode: "",
    country: "India",
    phone: "",
    addressType: "Home",
  });

  const updateForm = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  // ---- Address fetching ----
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!token) {
        setFetchingAddresses(false);
        return;
      }
      try {
        const res = await axios.get(`${backendUrl}/api/address`, {
          headers: { token },
        });
        if (res.data.success) {
          setAddresses(res.data.addresses);
          const defaultAddr = res.data.addresses.find((a) => a.isDefault);
          if (defaultAddr) {
            setSelectedAddressId(defaultAddr._id);
            fillFormFromAddress(defaultAddr);
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Could not load addresses");
      } finally {
        setFetchingAddresses(false);
      }
    };
    fetchAddresses();
  }, [token]);

  const fillFormFromAddress = (address) => {
    setFormData({
      firstName: address.firstName || "",
      lastName: address.lastName || "",
      email: address.email || "",
      street: address.addressLine1 || "",
      landmark: address.landmark || "",
      city: address.city || "",
      district: address.district || "",
      state: address.state || "",
      zipcode: address.pincode || "",
      country: address.country || "India",
      phone: address.mobile || "",
      addressType: address.addressType || "Home",
    });
  };

  const selectAddress = (address) => {
    setSelectedAddressId(address._id);
    fillFormFromAddress(address);
    setShowAddressPicker(false);
  };

  // ---- Current Location (browser) ----
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }
    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=18&addressdetails=1`
          );
          const data = await res.json();
          const addr = data.address || {};
          updateForm("street", addr.road || addr.pedestrian || "");
          updateForm("city", addr.city || addr.town || addr.village || "");
          updateForm("district", addr.district || addr.suburb || "");
          updateForm("state", addr.state || addr.region || "");
          updateForm("zipcode", addr.postcode || "");
          updateForm("country", addr.country || "India");
          updateForm("landmark", addr.neighbourhood || addr.suburb || "");
          toast.success("Location filled! Please verify.");
        } catch (error) {
          toast.error("Failed to reverse geocode location");
        } finally {
          setFetchingLocation(false);
        }
      },
      (err) => {
        toast.error("Location access denied or error");
        setFetchingLocation(false);
      }
    );
  };

  // ---- Order calculations (with discounts) ----
  const orderItems = useMemo(() => {
    const items = [];
    for (const productId in cartItems) {
      const quantity = cartItems[productId];
      if (quantity > 0) {
        const product = products.find((p) => p._id === productId);
        if (product) {
          const price = product.discountPrice ?? product.price;
          items.push({ _id: product._id, name: product.name, price, quantity });
        }
      }
    }
    return items;
  }, [cartItems, products]);

  const subtotal = useMemo(
    () => orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [orderItems]
  );

  const discountTotal = useMemo(() => {
    let totalDiscount = 0;
    for (const productId in cartItems) {
      const quantity = cartItems[productId];
      if (quantity > 0) {
        const product = products.find((p) => p._id === productId);
        if (product && product.discountPrice) {
          totalDiscount += (product.price - product.discountPrice) * quantity;
        }
      }
    }
    return totalDiscount;
  }, [cartItems, products]);

  const total = subtotal + deliveryFee;

  // ---- Place order ----
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to place order");
      return;
    }

    const required = [
      "firstName",
      "lastName",
      "email",
      "street",
      "city",
      "district",
      "state",
      "zipcode",
      "country",
      "phone",
    ];
    for (const field of required) {
      if (!formData[field]) {
        toast.error(`Please fill ${field}`);
        return;
      }
    }

    if (orderItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    const address = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      street: formData.street,
      landmark: formData.landmark,
      city: formData.city,
      district: formData.district,
      state: formData.state,
      zipcode: formData.zipcode,
      country: formData.country,
      phone: formData.phone,
      addressType: formData.addressType,
    };

    const payload = {
      items: orderItems,
      address,
      deliveryFee,
    };

    try {
      let response;
      if (method === "cod") {
        response = await axios.post(`${backendUrl}/api/order/place`, payload, {
          headers: { token },
        });
        if (response.data.success) {
          setCartItems({});
          toast.success("Order placed successfully!");
          navigate("/orders");
        } else {
          toast.error(response.data.message || "Failed to place order");
        }
      } else if (method === "razorpay") {
        const initRes = await axios.post(
          `${backendUrl}/api/order/razorpay`,
          payload,
          { headers: { token } }
        );
        if (!initRes.data.success) {
          toast.error(initRes.data.message || "Failed to initiate payment");
          setLoading(false);
          return;
        }

        const { razorpayOrder, orderId, key } = initRes.data;

        const handler = async (paymentResponse) => {
          try {
            const verifyRes = await axios.post(
              `${backendUrl}/api/order/verifyRazorpay`,
              { ...paymentResponse, orderId },
              { headers: { token } }
            );
            if (verifyRes.data.success) {
              toast.success("Payment Successful 🎉");
              setCartItems({});
              navigate("/orders");
            } else {
              toast.error(verifyRes.data.message || "Verification failed");
            }
          } catch (error) {
            toast.error("Verification failed");
          } finally {
            setLoading(false);
          }
        };

        const options = {
          key,
          amount: razorpayOrder.amount,
          currency: "INR",
          name: "CraveNutri",
          description: `Order #${orderId.slice(-6)}`,
          order_id: razorpayOrder.id,
          handler,
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            contact: formData.phone,
          },
          theme: { color: "#FF6B00" },
          modal: {
            ondismiss: () => {
              setLoading(false);
              toast.info("Payment cancelled");
            },
          },
        };

        if (!window.Razorpay) {
          toast.error("Razorpay SDK not loaded");
          setLoading(false);
          return;
        }

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", async () => {
          await axios.post(
            `${backendUrl}/api/order/payment-failed`,
            { orderId },
            { headers: { token } }
          );
          toast.error("Payment Failed ❌");
          setLoading(false);
        });
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

  // ---- Animation variants ----
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  // ---- Check if cart is empty ----
  if (orderItems.length === 0) {
    return (
      <div className="border-t pt-14 px-4 sm:px-10 text-center py-20 bg-gradient-to-b from-orange-50 to-white min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-6xl">🛒</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm">
          Add some items to your cart before placing an order.
        </p>
        <button
          onClick={() => navigate("/collection")}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Place Order | CraveNutri"
        description="Complete your purchase securely. Review address and payment method."
        url="https://cravenutri.com/place-order"
        image="https://cravenutri.com/og-order.jpg"
        noindex={true}
      />

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onSubmit={onSubmitHandler}
        className="border-t pt-14 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-orange-50/30 to-white min-h-screen"
      >
        {/* Header */}
        <div className="relative mb-10 max-w-7xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-3xl -z-10" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-orange-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
                <p className="text-sm text-gray-500">Complete your order</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-bold">
                {orderItems.length} ITEMS
              </span>
            </div>
          </div>
        </div>

        {/* Two‑column layout: address left, summary right */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left column – Delivery Address & Payment Method */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 min-w-0"
          >
            {/* Address Section */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-lg p-6 mb-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>📍</span> Delivery Address
              </h2>

              {/* Saved Addresses */}
              {!fetchingAddresses && addresses.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Saved Addresses</span>
                    <button
                      type="button"
                      onClick={() => setShowAddressPicker(!showAddressPicker)}
                      className="text-sm text-orange-600 flex items-center gap-1 hover:text-orange-700 transition"
                    >
                      {showAddressPicker ? "Hide" : "Change"}
                      <svg
                        className={`w-4 h-4 transition-transform ${showAddressPicker ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  {selectedAddressId && (
                    <div className="mt-2 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                      {addresses.find((a) => a._id === selectedAddressId)?.fullName},{" "}
                      {addresses.find((a) => a._id === selectedAddressId)?.addressLine1},{" "}
                      {addresses.find((a) => a._id === selectedAddressId)?.city}
                    </div>
                  )}
                  <AnimatePresence>
                    {showAddressPicker && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-2 max-h-48 overflow-y-auto border rounded-xl divide-y"
                      >
                        {addresses.map((addr) => (
                          <button
                            key={addr._id}
                            type="button"
                            onClick={() => selectAddress(addr)}
                            className={`w-full text-left px-4 py-3 hover:bg-orange-50 flex items-center justify-between transition ${
                              selectedAddressId === addr._id
                                ? "bg-orange-50 border-l-4 border-orange-500"
                                : ""
                            }`}
                          >
                            <span className="text-sm">
                              {addr.fullName}, {addr.addressLine1}, {addr.city}
                            </span>
                            {selectedAddressId === addr._id && (
                              <span className="text-orange-600 font-bold">✓</span>
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="mt-3 text-xs text-gray-400">
                    Or enter address manually below
                  </div>
                </div>
              )}

              {/* Manual Address Form */}
              <div className="space-y-4">
                {/* Location Button */}
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={fetchingLocation}
                  className="w-full mb-4 py-3 border-2 border-orange-500 text-orange-600 rounded-2xl flex items-center justify-center gap-2 hover:bg-orange-50 transition disabled:opacity-50"
                >
                  {fetchingLocation ? (
                    <span className="animate-spin">⏳</span>
                  ) : (
                    <>
                      <span>📍</span> Use Current Location
                    </>
                  )}
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    className="border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-orange-300 outline-none transition"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateForm("firstName", e.target.value)}
                  />
                  <input
                    required
                    className="border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-orange-300 outline-none transition"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateForm("lastName", e.target.value)}
                  />
                </div>
                <input
                  required
                  className="border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-orange-300 outline-none transition"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                />
                <input
                  required
                  className="border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-orange-300 outline-none transition"
                  type="text"
                  placeholder="Street Address"
                  name="street"
                  value={formData.street}
                  onChange={(e) => updateForm("street", e.target.value)}
                />
                <input
                  className="border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-orange-300 outline-none transition"
                  type="text"
                  placeholder="Landmark (Optional)"
                  name="landmark"
                  value={formData.landmark}
                  onChange={(e) => updateForm("landmark", e.target.value)}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    className="border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-orange-300 outline-none transition"
                    type="text"
                    placeholder="City / Village"
                    name="city"
                    value={formData.city}
                    onChange={(e) => updateForm("city", e.target.value)}
                  />
                  <input
                    required
                    className="border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-orange-300 outline-none transition"
                    type="text"
                    placeholder="District"
                    name="district"
                    value={formData.district}
                    onChange={(e) => updateForm("district", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    className="border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-orange-300 outline-none transition"
                    type="text"
                    placeholder="State"
                    name="state"
                    value={formData.state}
                    onChange={(e) => updateForm("state", e.target.value)}
                  />
                  <input
                    required
                    className="border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-orange-300 outline-none transition"
                    type="text"
                    placeholder="Zipcode"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={(e) => updateForm("zipcode", e.target.value)}
                  />
                </div>
                <input
                  required
                  className="border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-orange-300 outline-none transition"
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formData.country}
                  onChange={(e) => updateForm("country", e.target.value)}
                />
                <input
                  required
                  className="border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-orange-300 outline-none transition"
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                />
                {/* Address Type */}
                <div className="flex gap-3 flex-wrap">
                  {["Home", "Office", "Other"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateForm("addressType", type)}
                      className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                        formData.addressType === type
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>💳</span> Payment Method
              </h2>
              <div className="space-y-4">
                <label
                  className={`flex items-center gap-4 border-2 p-4 rounded-2xl cursor-pointer transition ${
                    method === "razorpay"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={method === "razorpay"}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-4 h-4 accent-orange-600"
                  />
                  <span className="flex items-center gap-2 text-gray-700 font-medium">
                    <span>💳</span> Razorpay (UPI, Cards, Netbanking)
                  </span>
                </label>

                <label
                  className={`flex items-center gap-4 border-2 p-4 rounded-2xl cursor-pointer transition ${
                    method === "cod"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={method === "cod"}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-4 h-4 accent-orange-600"
                  />
                  <span className="flex items-center gap-2 text-gray-700 font-medium">
                    <span>💵</span> Cash on Delivery
                  </span>
                </label>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column – Order Summary (sticky) – visible only on lg+ */}
          <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      {currency}
                      {subtotal.toFixed(2)}
                    </span>
                  </div>

                  {discountTotal > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-semibold">
                        -{currency}
                        {discountTotal.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Fee</span>
                    <span className="font-semibold">
                      {currency}
                      {deliveryFee.toFixed(2)}
                    </span>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-orange-600">
                      {currency}
                      {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl font-bold text-lg tracking-wide shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "PLACING ORDER..."
                    : method === "razorpay"
                    ? `PAY ${currency}${total.toFixed(2)}`
                    : `PLACE ORDER • ${currency}${total.toFixed(2)}`}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.form>

      {/* Fixed Bottom Footer – visible only on mobile/tablet, hidden on lg+ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl rounded-t-3xl p-6 z-50">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">
              {currency}
              {subtotal.toFixed(2)}
            </span>
          </div>

          {discountTotal > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span className="font-semibold">
                -{currency}
                {discountTotal.toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping Fee</span>
            <span className="font-semibold">
              {currency}
              {deliveryFee.toFixed(2)}
            </span>
          </div>

          <hr className="border-gray-200" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-orange-600">
              {currency}
              {total.toFixed(2)}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            onClick={onSubmitHandler}
            className="w-full mt-2 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl font-bold text-base tracking-wide shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "PLACING ORDER..."
              : method === "razorpay"
              ? `PAY ${currency}${total.toFixed(2)}`
              : `PLACE ORDER • ${currency}${total.toFixed(2)}`}
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;