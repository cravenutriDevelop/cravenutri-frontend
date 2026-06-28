// ProductItem.jsx
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { ShopContext } from "../contexts/ShopContext";

// Skeleton version of the product card
export const ProductItemSkeleton = () => (
  <div className="h-full">
    <div className="group block bg-white rounded-2xl shadow-sm overflow-hidden h-full flex flex-col animate-pulse">
      <div className="aspect-square sm:aspect-[4/5] lg:aspect-square bg-gray-200" />
      <div className="p-4 flex-1 flex flex-col">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="mt-3 flex gap-2">
          <div className="h-8 bg-gray-200 rounded-full w-1/3" />
          <div className="h-8 bg-gray-200 rounded-full w-1/3" />
        </div>
      </div>
    </div>
  </div>
);

const ProductItem = ({ id, image, name, price, discountPrice, isLoading }) => {
  const { currency, addToCart, cartItems, updateQuantity } = useContext(ShopContext);
  const currentQty = cartItems?.[id] || 0;

  const imgSrc = image?.[0]?.url || "/placeholder.png";
  const discountPercentage =
    discountPrice && price > discountPrice
      ? Math.round(((price - discountPrice) / price) * 100)
      : null;

  // Handlers for quantity
  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(id);
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    updateQuantity(id, currentQty + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (currentQty > 0) {
      updateQuantity(id, currentQty - 1);
    }
  };

  // If loading, show skeleton
  if (isLoading) return <ProductItemSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.25}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="1rem"
        scale={1.02}
        perspective={1000}
        transitionSpeed={1500}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        gyroscope={true}
        className="h-full"
      >
        <Link
          to={`/product/${id}`}
          className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col"
        >
          {/* Image Section */}
          <div className="relative overflow-hidden aspect-square sm:aspect-[4/5] lg:aspect-square">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={imgSrc}
              alt={name}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Discount Badge */}
            {discountPercentage && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
                {discountPercentage}% OFF
              </div>
            )}
          </div>

          {/* Info & Actions */}
          <div className="p-4 flex-1 flex flex-col">
            <p
              className="text-sm sm:text-base font-medium text-gray-800 truncate group-hover:text-gray-900 transition"
              title={name}
            >
              {name}
            </p>

            {/* Price */}
            <div className="mt-2 flex items-baseline gap-2">
              {discountPrice ? (
                <>
                  <span className="text-lg font-bold text-orange-600">
                    {currency}
                    {discountPrice}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {currency}
                    {price}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  {currency}
                  {price}
                </span>
              )}
            </div>

            {/* Quantity Controls or Add Button */}
            <div className="mt-3">
              {currentQty === 0 ? (
                <motion.button
                  onClick={handleAdd}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 px-4 rounded-full text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </motion.button>
              ) : (
                <div className="flex items-center justify-between bg-gray-100 rounded-full p-1">
                  <motion.button
                    onClick={handleDecrement}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-700 font-bold"
                  >
                    −
                  </motion.button>
                  <span className="text-sm font-semibold text-gray-800 min-w-[24px] text-center">
                    {currentQty}
                  </span>
                  <motion.button
                    onClick={handleIncrement}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full bg-orange-500 text-white shadow flex items-center justify-center font-bold"
                  >
                    +
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </Link>
      </Tilt>
    </motion.div>
  );
};

export default ProductItem;