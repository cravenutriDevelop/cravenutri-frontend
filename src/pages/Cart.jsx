// Cart.jsx
import React, { useContext, useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import SEO from "../components/SEO";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    loading,
    deliveryFee,
  } = useContext(ShopContext);

  const [isLoading, setIsLoading] = useState(true);

  // Build cart product list with effective price and discount info
  const cartProductList = useMemo(() => {
    const list = [];
    for (const productId in cartItems) {
      const quantity = cartItems[productId];
      if (quantity > 0) {
        const product = products.find((p) => p._id === productId);
        if (product) {
          list.push({
            ...product,
            quantity,
            effectivePrice: product.discountPrice ?? product.price,
            originalPrice: product.price,
            hasDiscount: product.discountPrice && product.discountPrice < product.price,
          });
        }
      }
    }
    return list;
  }, [cartItems, products]);

  // Compute totals
  const { subtotal, discountTotal } = useMemo(() => {
    let sub = 0;
    let disc = 0;
    cartProductList.forEach((item) => {
      sub += item.effectivePrice * item.quantity;
      if (item.hasDiscount) {
        disc += (item.originalPrice - item.effectivePrice) * item.quantity;
      }
    });
    return { subtotal: sub, discountTotal: disc };
  }, [cartProductList]);

  const total = subtotal === 0 ? 0 : subtotal + deliveryFee;
  const totalItems = cartProductList.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (products.length > 0 || !loading) {
      setIsLoading(false);
    }
  }, [products, loading]);

  const placeholderImage = assets.placeholder || "https://via.placeholder.com/80";

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  // Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600" />
      </div>
    );
  }

  // Empty cart
  if (cartProductList.length === 0) {
    return (
      <>
        <SEO
          title="Your Shopping Cart | CraveNutri"
          description="Review your items, update quantities, and proceed to checkout at CraveNutri – healthy snacks delivered to your doorstep."
          url="https://cravenutri.com/cart"
          image="https://cravenutri.com/cravenutriicon.png"
          noindex={true}
        />
        <div className="border-t pt-14 px-4 sm:px-10 text-center py-20 bg-gradient-to-b from-orange-50 to-white min-h-[70vh] flex flex-col items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-6xl">🛒</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-sm">
            Looks like you haven&apos;t added anything yet. Explore our high‑protein snacks!
          </p>
          <button
            onClick={() => navigate("/collection")}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Shopping
          </button>
        </div>
      </>
    );
  }

  // Cart with items – two‑column layout
  return (
    <>
      <SEO
        title="Your Shopping Cart | CraveNutri"
        description="Review your items, update quantities, and proceed to checkout at CraveNutri – healthy snacks delivered to your doorstep."
        url="https://cravenutri.com/cart"
        image="https://cravenutri.com/cravenutriicon.png"
        noindex={true}
      />

      <div className="border-t pt-14 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-orange-50/30 to-white min-h-screen">
        {/* Header */}
        <div className="relative mb-10 max-w-7xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-3xl -z-10" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-orange-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
                <p className="text-sm text-gray-500">{totalItems} items</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-bold">
                {totalItems} ITEMS
              </span>
            </div>
          </div>
        </div>

        {/* Two‑column layout: items left, summary right */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left column – Cart Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 min-w-0"
          >
            <div className="flex flex-col gap-5">
              <AnimatePresence>
                {cartProductList.map((item) => (
                  <motion.div
                    key={item._id}
                    variants={itemVariants}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                    layout
                    className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col sm:flex-row sm:items-center gap-5 border border-gray-100"
                  >
                    {/* Image & Info */}
                    <div className="flex gap-5 flex-1 min-w-0">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md flex-shrink-0 bg-gray-100">
                        <img
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          src={item.images?.[0]?.url || placeholderImage}
                          alt={item.name}
                        />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <p className="text-base font-semibold text-gray-800 truncate">
                          {item.name}
                        </p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="font-bold text-orange-600 text-lg">
                            {currency}
                            {item.effectivePrice.toFixed(2)}
                          </span>
                          {item.hasDiscount && (
                            <span className="text-sm text-gray-400 line-through">
                              {currency}
                              {item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                          <span>Qty: {item.quantity}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span>
                            Total: {currency}
                            {(item.effectivePrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls & Delete */}
                    <div className="flex items-center gap-4 sm:ml-auto">
                      <div className="flex items-center border-2 rounded-2xl overflow-hidden bg-gray-50 shadow-inner">
                        <button
                          onClick={() =>
                            item.quantity > 1 && updateQuantity(item._id, item.quantity - 1)
                          }
                          className="px-4 py-2 text-xl font-bold text-gray-600 hover:bg-orange-100 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <motion.span
                          key={item.quantity}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="w-12 text-center font-bold text-gray-800 select-none text-lg"
                        >
                          {item.quantity}
                        </motion.span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-4 py-2 text-xl font-bold text-gray-600 hover:bg-orange-100 transition active:scale-95"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => updateQuantity(item._id, 0)}
                        className="p-3 rounded-full hover:bg-red-50 transition-colors group"
                        aria-label="Remove item"
                      >
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right column – Summary (sticky) – visible only on lg+ */}
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
                  onClick={() => navigate("/place-order")}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl font-bold text-lg tracking-wide shadow-lg hover:shadow-xl transition-all"
                >
                  Proceed to Checkout →
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            onClick={() => navigate("/place-order")}
            className="w-full mt-2 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl font-bold text-base tracking-wide shadow-lg hover:shadow-xl transition-all"
          >
            Proceed to Checkout →
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default Cart;