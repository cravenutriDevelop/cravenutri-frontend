import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const ProductItem = ({ id, image, name, price, discountPrice }) => {
  const { currency, addToCart } = useContext(ShopContext);

  const imgSrc = image?.[0]?.url || "/placeholder.png";

  // Calculate discount percentage if both prices exist
  const discountPercentage =
    discountPrice && price > discountPrice
      ? Math.round(((price - discountPrice) / price) * 100)
      : null;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
    hover: {
      y: -8,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className="h-full bg-[#FFFBF7]"
    >
      <Link
        to={`/product/${id}`}
        className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col "
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-square sm:aspect-[4/5] lg:aspect-square">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={imgSrc}
            alt={name}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Sale Badge */}
          {discountPercentage && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              {discountPercentage}% OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          <p
            className="text-sm sm:text-base font-medium text-gray-800 truncate group-hover:text-gray-900 transition "
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

          {/* Add to Cart Button */}
          <motion.button
            onClick={(e) => {
              e.preventDefault(); // prevent navigating when clicking button
              addToCart(id);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-3 w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 px-4 rounded-full text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all"
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
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductItem;