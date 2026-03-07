import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { motion } from "framer-motion";

const policies = [
  {
    icon: assets.exchange_icon,
    title: "Easy Exchange Policy",
    desc: "We offer hassle-free exchanges on all healthy products.",
  },
  {
    icon: assets.quality_icon,
    title: "7 Days Return Policy",
    desc: "Return any product within 2-3 days if you’re not satisfied.",
  },
  {
    icon: assets.support_img,
    title: "24/7 Customer Support",
    desc: "Our friendly team is here to help anytime.",
  },
];

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-8 sm:gap-6 text-center py-20 px-4">
      {policies.map((policy, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <img className="w-14 h-14 mb-4" src={policy.icon} alt={policy.title} />
          <p className="font-semibold text-green-700 mb-2">{policy.title}</p>
          <p className="text-gray-500 text-sm">{policy.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default OurPolicy;