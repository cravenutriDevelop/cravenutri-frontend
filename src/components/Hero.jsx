import React, { useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: assets.cookieHero,
    category: "CRAVENUTRI COOKIES",
    title: "Healthy Cookies That Taste Incredible",
    desc: "Fresh baked cookies made with premium ingredients and natural nutrition.",
  },
  {
    image: assets.barsHero,
    category: "ENERGY BARS",
    title: "Fuel Your Day Naturally",
    desc: "Delicious energy bars packed with almonds, protein, and natural goodness.",
  },
  {
    image: assets.proteinBarHero,
    category: "PROTEIN BARS",
    title: "Power Packed Nutrition",
    desc: "Perfect snack for gym lovers and active lifestyles.",
  },
  {
    image: assets.drinkHero,
    category: "BADAM DRINKS",
    title: "Refresh Your Energy",
    desc: "Traditional badam drinks blended with modern nutrition.",
  },
  {
    image: assets.drinkChoco,
    category: "CHOCOLATE BADAM DRINK",
    title: "Healthy Meets Chocolate",
    desc: "Creamy chocolate badam drink with natural ingredients.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slider);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: "16/9", maxHeight: "85vh" }}>
      
      {/* BACKGROUND SLIDE */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={slides[current].image}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* ANIMATED OVERLAY SHAPES */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute bg-orange-500/20 rounded-full w-72 h-72 top-10 left-10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bg-yellow-400/20 rounded-full w-96 h-96 bottom-0 right-0 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        />
      </motion.div>

      {/* OVERLAY TEXT */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto px-6 text-white"
        >
          <p className="text-orange-400 font-semibold mb-3 tracking-widest text-sm sm:text-base">
            {slides[current].category}
          </p>

          <h1 className="text-4xl sm:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
            {slides[current].title}
          </h1>

          <p className="max-w-xl text-gray-200 mb-6 text-sm sm:text-base drop-shadow">
            {slides[current].desc}
          </p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold shadow-lg"
          >
            Shop Now
          </motion.button>
        </motion.div>
      </div>

      {/* NAVIGATION BUTTONS */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 px-4 py-2 rounded-full text-white backdrop-blur transition"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 px-4 py-2 rounded-full text-white backdrop-blur transition"
      >
        ❯
      </button>

      {/* DOTS NAVIGATION */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === current
                ? "bg-orange-500 scale-125"
                : "bg-white/40"
            }`}
            whileHover={{ scale: 1.3 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;