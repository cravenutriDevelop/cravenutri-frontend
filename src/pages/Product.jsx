import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ShopContext } from "../contexts/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import axios from "axios";
import SEO from "../components/SEO";
import BreadcrumbSchema from "../components/BreadcrumbSchema";

const Product = () => {
  const { productId } = useParams();
  const { currency, addToCart, backendUrl } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendUrl}/api/product/${productId}`);
        if (res.data.success) {
          const product = res.data.product;
          setProductData(product);
          setMainImage(product.images?.[0]?.url || "/placeholder.png");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, backendUrl]);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
  };

  const imageContainerVariants = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { delay: 0.2, duration: 0.6 } },
  };

  const infoContainerVariants = {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { delay: 0.3, duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.4 + i * 0.1, duration: 0.5 },
    }),
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600"></div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="text-center py-20 text-gray-500">Product not found</div>
    );
  }

  const isOutOfStock = productData.stock <= 0;

  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    try {
      setAdding(true);
      await addToCart(productData._id);
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <SEO
        title={`${productData?.name} | CraveNutri`}
        description={
          productData?.description?.slice(0, 150) ||
          "Premium healthy nutrition product from CraveNutri."
        }
        url={`https://cravenutri.com/product/${productId}`}
        image={mainImage}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://cravenutri.com/" },
          { name: "Collection", url: "https://cravenutri.com/collection" },
          { name: productData.name, url: window.location.href }
        ]}
      />

      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
      >
        {/* Main product section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left column - Images with 3D Tilt on main image */}
          <motion.div variants={imageContainerVariants} className="space-y-4">
            {/* 3D Tilt Wrapper for main image */}
            <Tilt
              glareEnable={false}
              scale={1.02}
              perspective={1200}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              transitionSpeed={1500}
              gyroscope={true}
              className="relative group overflow-hidden rounded-2xl bg-gray-50 shadow-lg"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={mainImage}
                    src={mainImage}
                    alt={productData.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-full aspect-square object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-500"
                  />
                </AnimatePresence>
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span className="bg-red-600 text-white font-bold px-6 py-3 rounded-full text-lg uppercase tracking-wider shadow-lg rotate-[-10deg]">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>
            </Tilt>

            {/* Thumbnails */}
            {productData.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {productData.images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMainImage(img.url)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${mainImage === img.url
                        ? "border-emerald-500 shadow-md"
                        : "border-transparent hover:border-gray-300"
                      }`}
                  >
                    <img
                      src={img.url}
                      alt={`${productData.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right column - Product Info (unchanged) */}
          <motion.div variants={infoContainerVariants} className="space-y-6">
            {/* Title and SKU */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {productData.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                SKU: {productData._id.slice(-8).toUpperCase()}
              </p>
            </div>

            {/* Category & Stock badges */}
            <div className="flex flex-wrap gap-4">
              {productData.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                  {productData.category}
                </span>
              )}
              {isOutOfStock && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <motion.p
                key={productData.price}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-gray-900"
              >
                {currency}
                {productData.price?.toFixed(2)}
              </motion.p>

              {productData.discountPrice && (
                <>
                  <p className="text-xl text-gray-400 line-through">
                    {currency}
                    {productData.discountPrice.toFixed(2)}
                  </p>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Sale
                  </span>
                </>
              )}
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={!isOutOfStock && !adding ? { scale: 1.02 } : {}}
              whileTap={!isOutOfStock && !adding ? { scale: 0.98 } : {}}
              onClick={handleAddToCart}
              disabled={adding || isOutOfStock}
              className={`w-full sm:w-auto px-8 py-4 font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${isOutOfStock
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:shadow-xl"
                }`}
            >
              {adding ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>ADDING...</span>
                </>
              ) : isOutOfStock ? (
                "OUT OF STOCK"
              ) : (
                "ADD TO CART"
              )}
            </motion.button>

            {/* Free Shipping Badge */}
            {!isOutOfStock && (
              <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-4 py-2 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Free shipping on orders over ₹500</span>
              </div>
            )}

            {/* Nutrition Info */}
            {productData.nutritionInfo && (
              <motion.div
                custom={0}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  Nutrition Facts (per serving)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {Object.entries(productData.nutritionInfo).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="bg-gray-50 px-3 py-2 rounded-lg text-center border border-gray-200"
                      >
                        <span className="block text-xs text-gray-500 uppercase">
                          {key}
                        </span>
                        <span className="block text-sm font-semibold text-gray-800">
                          {value || "-"}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            )}

            {/* Extra Info with Icons */}
            <motion.div
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="border-t pt-4 space-y-2 text-sm text-gray-500"
            >
              <p className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                100% Original product
              </p>
              <p className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Cash on delivery available
              </p>
              <p className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0v8m0-8l-8 4-8-4m8 4v8m0-8l8 4-8 4-8-4 8-4z"
                  />
                </svg>
                Easy return & exchange within 3 days
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Description & Additional Details (unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="border-t pt-8 space-y-6"
        >
          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Description
            </h2>
            <div className="prose prose-emerald max-w-none text-gray-600 whitespace-pre-line">
              {productData.description || "No description available."}
            </div>
          </div>

          {/* Ingredients */}
          {productData.ingredients?.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Ingredients
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {productData.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Why You'll Love It */}
          {productData.whyYouWillLoveIt?.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Why You&apos;ll Love It
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {productData.whyYouWillLoveIt.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Product Specifications */}
          {(productData.flavor ||
            productData.netWeight ||
            productData.servingSize ||
            productData.servingsPerContainer) && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                  {productData.flavor && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium">Flavor:</span>{" "}
                      {productData.flavor}
                    </div>
                  )}
                  {productData.netWeight && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium">Net Weight:</span>{" "}
                      {productData.netWeight}
                    </div>
                  )}
                  {productData.servingSize && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium">Serving Size:</span>{" "}
                      {productData.servingSize}
                    </div>
                  )}
                  {productData.servingsPerContainer && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium">Servings Per Container:</span>{" "}
                      {productData.servingsPerContainer}
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* Storage & Shelf Life */}
          {(productData.storageInstructions || productData.shelfLife) && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Storage & Shelf Life
              </h3>
              <div className="space-y-2 text-gray-700">
                {productData.storageInstructions && (
                  <p>
                    <span className="font-medium">Storage:</span>{" "}
                    {productData.storageInstructions}
                  </p>
                )}
                {productData.shelfLife && (
                  <p>
                    <span className="font-medium">Shelf Life:</span>{" "}
                    {productData.shelfLife}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          {productData.disclaimer && (
            <div className="mt-4 text-xs text-gray-400 italic border-t pt-4">
              {productData.disclaimer}
            </div>
          )}
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <RelatedProducts
            category={productData.category}
            subCategory={productData.subCategory}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Product;