import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "https://res.cloudinary.com/di0o3lpqn/image/upload/v1781256500/cokkie_wzfydo.png",
    category: "CRAVENUTRI COOKIES",
    title: "Healthy Cookies That Taste Incredible",
    desc: "Fresh baked cookies made with premium ingredients and natural nutrition.",
  },
  {
    image: "https://res.cloudinary.com/di0o3lpqn/image/upload/v1781256501/without_coated_full_bar_image_xmgcav.png",
    category: "ENERGY BARS",
    title: "Fuel Your Day Naturally", 
    desc: "Delicious energy bars packed with almonds, protein, and natural goodness.",
  },
  {
    image: "https://res.cloudinary.com/di0o3lpqn/image/upload/v1781256501/without_coated_full_bar_image_xmgcav.png",
    category: "PROTEIN BARS",
    title: "Power Packed Nutrition",
    desc: "Perfect snack for gym lovers and active lifestyles.",
  },
  {
    image: "https://res.cloudinary.com/di0o3lpqn/image/upload/v1781256495/badam_ragda_lable_cardamom_flvr_jthmmq.jpg",
    category: "BADAM DRINKS",
    title: "Refresh Your Energy",
    desc: "Traditional badam drinks blended with modern nutrition.",
  },
  {
    image: "https://res.cloudinary.com/di0o3lpqn/image/upload/v1781256495/badam_ragda_coco_herx67.png",
    category: "CHOCOLATE BADAM DRINK",
    title: "Healthy Meets Chocolate",
    desc: "Creamy chocolate badam drink with natural ingredients.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto slide with progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 1.5; // 5s total (100 / 1.5 ≈ 66.6 steps * 75ms ≈ 5s)
      });
    }, 75);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setProgress(0);
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl group" style={{ aspectRatio: "16/9", maxHeight: "85vh" }}>
      
      {/* Background Image with Zoom Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Premium Gradient Overlay (dark + vibrant edge) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Animated floating particles / patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Glassmorphism Card for Text */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="backdrop-blur-md bg-white/10 rounded-2xl p-6 sm:p-10 border border-white/20 shadow-2xl"
            >
              <p className="text-orange-400 font-semibold mb-3 tracking-widest text-sm sm:text-base">
                {slides[current].category}
              </p>
              <h2 className="text-4xl sm:text-7xl font-bold mb-4 leading-tight text-white drop-shadow-lg">
                {slides[current].title}
              </h2>
              <p className="max-w-xl text-gray-100 mb-8 text-base sm:text-lg drop-shadow">
                {slides[current].desc}
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="relative px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full font-semibold text-white shadow-lg overflow-hidden group/btn"
              >
                <span className="relative z-10">Shop Now →</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons - Modern Round */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-md hover:bg-black/50 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-md hover:bg-black/50 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-400 to-amber-500"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      {/* Premium Dots with Thumbnail Preview */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index);
              setProgress(0);
            }}
            className="relative group/dot"
          >
            <div
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-orange-500 scale-125 shadow-lg shadow-orange-500/50"
                  : "bg-white/60 hover:bg-white/90"
              }`}
            />
            {/* Thumbnail preview on hover */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/dot:opacity-100 transition-opacity duration-300 pointer-events-none">
              <img
                src={slide.image}
                alt=""
                className="w-16 h-12 rounded-md object-cover shadow-xl border-2 border-white/50"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Slide counter (minimal) */}
      <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-mono">
        {current + 1} / {slides.length}
      </div>

    </div>
  );
};

export default Hero;