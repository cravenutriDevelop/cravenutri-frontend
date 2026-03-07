import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="relative inline-flex items-center gap-4 group perspective">
      {/* Main text with floating 3D effect */}
      <h2 className="relative text-4xl md:text-5xl font-light tracking-tight transform-gpu transition-all duration-500 group-hover:translate-y-[-2px] group-hover:scale-105 group-hover:rotate-x-2 group-hover:rotate-y-2">
        <span className="relative inline-block bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">
          {text1}{" "}
        </span>
        <span className="relative inline-block bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">
          {}{" "}
        </span>
        <span className="relative inline-block font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">
          {" "}{text2}
        </span>

        {/* Floating glow effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></span>
      </h2>

      {/* Animated decorative line with particle effect */}
      <div className="relative h-1 w-16 md:w-24 overflow-hidden rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 shadow-lg group-hover:shadow-indigo-500/50 transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
      </div>

      {/* Pulsing dot with ripple */}
      <div className="relative">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 animate-pulse"></div>
        <div className="absolute inset-0 w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 animate-ping opacity-75"></div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
        .perspective {
          perspective: 1000px;
        }
        .group-hover\:rotate-x-2:hover {
          transform: rotateX(2deg);
        }
        .group-hover\:rotate-y-2:hover {
          transform: rotateY(2deg);
        }
      `}</style>
    </div>
  );
};

export default Title;