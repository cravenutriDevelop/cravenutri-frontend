import React from "react";
import { motion } from "framer-motion";

const NewsLetter = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    alert("Thanks for subscribing! 🎉"); // simple feedback
  };

  return (
    <motion.div
      className="text-center bg-green-50 rounded-xl p-8 my-12 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.p
        className="text-2xl sm:text-3xl font-bold text-green-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Subscribe now & get 20% off!
      </motion.p>
      <motion.p
        className="text-gray-600 mt-3 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Stay updated with our latest healthy snacks, drinks, and exclusive offers.
      </motion.p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex flex-col sm:flex-row items-center gap-3 mx-auto mt-6 border border-green-200 rounded-full overflow-hidden"
      >
        <input
          className="w-full sm:flex-1 px-4 py-3 sm:py-4 outline-none text-gray-700 placeholder-gray-400"
          type="email"
          placeholder="Enter your email"
          required
        />
        <motion.button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 sm:py-4 font-semibold transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          SUBSCRIBE
        </motion.button>
      </form>
    </motion.div>
  );
};

export default NewsLetter;