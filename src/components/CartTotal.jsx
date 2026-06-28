// CartTotal.jsx
import React, { useContext, useMemo } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const CartTotal = () => {
  const { currency, deliveryFee, cartItems, products } = useContext(ShopContext);

  // Compute subtotal (using effective price) and total discount
  const { subtotal, discountTotal } = useMemo(() => {
    let sub = 0;
    let disc = 0;
    for (const productId in cartItems) {
      const quantity = cartItems[productId];
      if (quantity > 0) {
        const product = products.find((p) => p._id === productId);
        if (product) {
          const effective = product.discountPrice ?? product.price;
          sub += effective * quantity;
          if (product.discountPrice && product.discountPrice < product.price) {
            disc += (product.price - product.discountPrice) * quantity;
          }
        }
      }
    }
    return { subtotal: sub, discountTotal: disc };
  }, [cartItems, products]);

  const total = subtotal === 0 ? 0 : subtotal + deliveryFee;

  return (
    <motion.div
      className="w-full max-w-md bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="text-center mb-4">
        <Title text1="CART" text2="TOTALS" />
        <p className="text-gray-500 text-sm mt-1">
          Review your order before checkout. Healthy treats, delivered fresh!
        </p>
      </div>

      <div className="flex flex-col gap-4 text-sm">
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

        {discountTotal > 0 && (
          <motion.div
            className="flex justify-between text-green-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p>Discount</p>
            <p className="font-medium">
              -{currency}
              <CountUp end={discountTotal} decimals={2} duration={0.8} />
            </p>
          </motion.div>
        )}

        <hr />

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
      </div>
    </motion.div>
  );
};

export default CartTotal;