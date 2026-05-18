import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, loading } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartItems) {
        const quantity = cartItems[productId];
        if (quantity > 0) {
          const product = products.find((p) => p._id === productId);
          if (product) {
            tempData.push({
              _id: productId,
              quantity,
              productData: product,
            });
          }
        }
      }
      setCartData(tempData);
      setIsLoading(false);
    } else if (products.length === 0 && !loading) {
      setIsLoading(false);
    }
  }, [cartItems, products, loading]);

  const placeholderImage = assets.placeholder || "https://via.placeholder.com/80";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600"></div>
      </div>
    );
  }

  if (cartData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-t pt-14 px-4 sm:px-10 text-center py-20 bg-[#FFFBF7]"
      >
        <img
          src={assets.empty_cart || "https://via.placeholder.com/200?text=Empty+Cart"}
          alt="Empty cart"
          className="w-40 mx-auto mb-6 opacity-50"
        />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything yet.</p>
        <button
          onClick={() => navigate("/collection")}
          className="px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Continue Shopping
        </button>
      </motion.div>
    );
  }

  return (
    <>
    <SEO
        title="Your Shopping Cart | CraveNutri"
        description="Review your items, update quantities, and proceed to checkout at CraveNutri – healthy snacks delivered to your doorstep."
        url="https://cravenutri.com/cart"
         image="https://cravenutri.com/cravenutriicon.png"  // default banner image
        noindex={true}
      />
      {/* Extra robots noindex ke liye Helmet add kar do */}
      {/* <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet> */}

    <div className="border-t pt-14 px-4 sm:px-10 animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl mb-8 text-center sm:text-left"
      >
        <Title text1={"YOUR"} text2={"CART"} />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items - left column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 space-y-6"
        >
          <AnimatePresence>
            {cartData.map((item) => {
              const productData = item.productData;
              return (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                  layout
                  className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex gap-5 flex-1">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md">
                      <img
                        className="w-full h-full object-cover"
                        src={productData.images?.[0]?.url || placeholderImage}
                        alt={productData.name}
                      />
                    </div>
                    <div>
                      <p className="text-sm sm:text-lg font-semibold text-gray-800">
                        {productData.name}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <p className="font-medium text-emerald-600">
                          {currency}
                          {productData.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-xl overflow-hidden bg-white shadow-sm">
                      <button
                        onClick={() =>
                          item.quantity > 1 &&
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        className="px-3 py-2 text-lg font-bold text-gray-600 hover:bg-emerald-100 transition active:scale-95 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <motion.span
                        key={item.quantity}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-10 text-center font-semibold select-none"
                      >
                        {item.quantity}
                      </motion.span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="px-3 py-2 text-lg font-bold text-gray-600 hover:bg-emerald-100 transition active:scale-95"
                      >
                        +
                      </button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item._id, 0)}
                      className="p-2 rounded-full hover:bg-red-100 transition-all duration-300"
                    >
                      <img className="w-5" src={assets.bin_icon} alt="Delete" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Cart Total - right column (sticky on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:w-[380px] xl:w-[450px]"
        >
          <div className="sticky top-24 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 animate-slideUp">
            <CartTotal />
            <div className="w-full text-end">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/place-order")}
                className="mt-8 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold tracking-wide transition-all duration-300 hover:shadow-xl"
              >
                PROCEED TO CHECKOUT
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default Cart;