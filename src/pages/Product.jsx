import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  ShoppingCart,
  Search,
  ArrowLeft,
  CheckCircle,
  Package,
  Clock,
  Heart,
  List,
  FileText,
  Apple,
  Sliders,
  Archive,
  Plus,
  Minus,
} from "lucide-react";
import { ShopContext } from "../contexts/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import axios from "axios";
import SEO from "../components/SEO";
import BreadcrumbSchema from "../components/BreadcrumbSchema";

const Product = () => {
  const { productId } = useParams();
  const {
    currency,
    addToCart,
    updateQuantity,
    cartItems,
    getCartCount,
    backendUrl,
  } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentQuantity = productData ? cartItems[productData._id] || 0 : 0;
  const cartCount = getCartCount();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendUrl}/api/product/${productId}`);
        if (res.data.success) {
          const product = res.data.product;
          setProductData(product);
          setMainImage(
            product.images?.[0]?.url || "/placeholder.png"
          );
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, backendUrl]);

  const imageUrl = (url) =>
    url?.startsWith("http") ? url : `https://cravenutri-backend.onrender.com${url}`;

  const isOutOfStock = productData?.stock <= 0;

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

  const handleUpdateQuantity = (newQuantity) => {
    if (!productData) return;
    updateQuantity(productData._id, newQuantity);
  };

  // Price logic
  const displayPrice = productData?.discountPrice
    ? productData.discountPrice
    : productData?.price;
  const originalPrice = productData?.discountPrice ? productData.price : null;

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

  // Helper components for sections
  const SectionTitle = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-5 h-5 text-emerald-600" />
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
  );

  const InfoCard = ({ children }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      {children}
    </div>
  );

  const BulletItem = ({ text }) => (
    <div className="flex items-start gap-2 mb-2">
      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
      <span className="text-gray-600">{text}</span>
    </div>
  );

  const SpecTag = ({ label, value }) => (
    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex-1 min-w-[45%]">
      <span className="block text-xs uppercase text-gray-400 font-medium tracking-wide">
        {label}
      </span>
      <span className="block text-sm font-semibold text-gray-800 mt-1">
        {value}
      </span>
    </div>
  );

  return (
    <>
      <SEO
        title={`${productData.name} | CraveNutri`}
        description={
          productData.description?.slice(0, 150) ||
          "Premium healthy nutrition product from CraveNutri."
        }
        url={`https://cravenutri.com/product/${productId}`}
        image={mainImage}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://cravenutri.com/" },
          { name: "Collection", url: "https://cravenutri.com/collection" },
          { name: productData.name, url: window.location.href },
        ]}
      />

      {/* Header (if you have a global header, you can remove this part) */}
      {/* <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <button
          onClick={() => window.history.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 mx-4 max-w-md">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent border-none outline-none ml-2 w-full text-sm"
            onFocus={() => (window.location.href = "/search")}
          />
        </div>
        <button
          onClick={() => (window.location.href = "/cart")}
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </button>
      </div> */}

      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10"
      >
        {/* Main product section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left column - Images with 3D Tilt */}
          <motion.div variants={imageContainerVariants} className="space-y-4">
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
                    src={imageUrl(mainImage)}
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
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      mainImage === img.url
                        ? "border-emerald-500 shadow-md"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={imageUrl(img.url)}
                      alt={`${productData.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right column - Product Info */}
          <motion.div variants={infoContainerVariants} className="space-y-6">
            {/* Title and SKU */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {productData.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                SKU: #{productData._id.slice(-8).toUpperCase()}
              </p>
            </div>

            {/* Category & Stock badges */}
            <div className="flex flex-wrap gap-3">
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
                key={displayPrice}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-gray-900"
              >
                {currency}
                {displayPrice?.toFixed(2)}
              </motion.p>
              {originalPrice && (
                <p className="text-xl text-gray-400 line-through">
                  {currency}
                  {originalPrice.toFixed(2)}
                </p>
              )}
            </div>

            {/* Quantity / Add to Cart */}
            {!isOutOfStock && (
              <div className="min-h-[60px]">
                {currentQuantity === 0 ? (
                  <AnimatePresence mode="wait">
                    <motion.button
                      key="add"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      disabled={adding}
                      className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                    >
                      {adding ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>ADDING...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          <span>ADD TO CART</span>
                        </>
                      )}
                    </motion.button>
                  </AnimatePresence>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key="quantity"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-full p-2 shadow-inner"
                    >
                      <button
                        onClick={() => handleUpdateQuantity(currentQuantity - 1)}
                        className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                      >
                        <Minus className="w-6 h-6" />
                      </button>
                      <span className="text-2xl font-bold text-gray-800 min-w-[50px] text-center">
                        {currentQuantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(currentQuantity + 1)}
                        className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                      >
                        <Plus className="w-6 h-6" />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            )}

            {/* Free Shipping */}
            {!isOutOfStock && (
              <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
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
                <SectionTitle icon={Apple} title="Nutrition Facts" />
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
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                100% Original product
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Cash on delivery available
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Easy return & exchange within 3 days
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Description & Additional Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="border-t pt-8 space-y-8"
        >
          {/* Description */}
          {productData.description && (
            <div>
              <SectionTitle icon={FileText} title="Description" />
              <InfoCard>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {productData.description}
                </p>
              </InfoCard>
            </div>
          )}

          {/* Ingredients */}
          {productData.ingredients?.length > 0 && (
            <div>
              <SectionTitle icon={List} title="Ingredients" />
              <InfoCard>
                {productData.ingredients.map((item, i) => (
                  <BulletItem key={i} text={item} />
                ))}
              </InfoCard>
            </div>
          )}

          {/* Why You'll Love It */}
          {productData.whyYouWillLoveIt?.length > 0 && (
            <div>
              <SectionTitle icon={Heart} title="Why You'll Love It" />
              <InfoCard>
                {productData.whyYouWillLoveIt.map((item, i) => (
                  <BulletItem key={i} text={item} />
                ))}
              </InfoCard>
            </div>
          )}

          {/* Specifications */}
          {(productData.flavor ||
            productData.netWeight ||
            productData.servingSize ||
            productData.servingsPerContainer) && (
            <div>
              <SectionTitle icon={Sliders} title="Specifications" />
              <div className="flex flex-wrap gap-3">
                {productData.flavor && (
                  <SpecTag label="Flavor" value={productData.flavor} />
                )}
                {productData.netWeight && (
                  <SpecTag label="Net Weight" value={productData.netWeight} />
                )}
                {productData.servingSize && (
                  <SpecTag label="Serving Size" value={productData.servingSize} />
                )}
                {productData.servingsPerContainer && (
                  <SpecTag
                    label="Servings"
                    value={productData.servingsPerContainer}
                  />
                )}
              </div>
            </div>
          )}

          {/* Storage & Shelf Life */}
          {(productData.storageInstructions || productData.shelfLife) && (
            <div>
              <SectionTitle icon={Archive} title="Storage & Shelf Life" />
              <InfoCard>
                {productData.storageInstructions && (
                  <div className="flex items-start gap-3 mb-3">
                    <Package className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">
                      {productData.storageInstructions}
                    </span>
                  </div>
                )}
                {productData.shelfLife && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">
                      {productData.shelfLife}
                    </span>
                  </div>
                )}
              </InfoCard>
            </div>
          )}

          {/* Disclaimer */}
          {productData.disclaimer && (
            <div className="text-xs text-gray-400 italic border-t pt-4">
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