import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const CartTotal = () => {
  const { currency, deliveryFee, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + deliveryFee;

  return (
    <motion.div
      className="w-full max-w-md bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Section Title */}
      <div className="text-center mb-4">
        <Title text1="CART" text2="TOTALS" />
        <p className="text-gray-500 text-sm mt-1">
          Review your order before checkout. Healthy treats, delivered fresh!
        </p>
      </div>

      {/* Totals */}
      <div className="flex flex-col gap-4 text-sm">
        {/* Subtotal */}
        <motion.div
          className="flex justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p>Subtotal</p>
          <p className="font-medium text-green-700">
            {currency}
            <CountUp end={subtotal} decimals={2} duration={0.8} />
          </p>
        </motion.div>
        <hr />

        {/* Shipping */}
        <motion.div
          className="flex justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p>Shipping Fee</p>
          <p className="font-medium text-orange-600">
            {currency}
            <CountUp end={deliveryFee} decimals={2} duration={0.8} />
          </p>
        </motion.div>
        <hr />

        {/* Total */}
        <motion.div
          className="flex justify-between mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <b className="text-lg">Total</b>
          <b className="text-lg text-green-800">
            {currency}
            <CountUp end={total} decimals={2} duration={1} />
          </b>
        </motion.div>

        {/* Checkout Button */}
        {/* <motion.button
          className="mt-6 bg-green-600 text-white rounded-lg py-2 font-semibold hover:bg-green-700 transition-colors shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Proceed to Checkout
        </motion.button> */}
      </div>
    </motion.div>
  );
};

export default CartTotal;