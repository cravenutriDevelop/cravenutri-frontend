import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(true);
      // Filter products by category
      const filtered = products.filter(
        (item) => item.category === category
      );
      // Take first 5 related products
      setRelated(filtered.slice(0, 5));
      setLoading(false);
    }
  }, [products, category]);

  // Animation variants for the cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  if (loading) {
    return (
      <div className="my-24">
        <div className="text-center mb-8">
          <Title text1={"RELATED"} text2={"PRODUCTS"} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-4 animate-pulse"
            >
              <div className="w-full h-40 bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (related.length === 0) {
    return null; // Don't show anything if no related products
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="my-24"
    >
      {/* Section Header */}
      <div className="text-center mb-8">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
        <p className="text-gray-500 text-sm mt-2">
          You might also like these
        </p>
      </div>

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
      >
        {related.map((item, index) => (
          <motion.div
            key={item._id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="transition-all duration-300"
          >
            <ProductItem
              id={item._id}
              name={item.name}
              price={item.price}
              discountPrice={item.discountPrice}
              image={item.images}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* View All Link (optional) */}
      {related.length >= 5 && (
        <div className="text-center mt-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-orange-500 hover:text-orange-600 font-medium underline underline-offset-4 transition-colors"
          >
            View All Products
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default RelatedProducts;