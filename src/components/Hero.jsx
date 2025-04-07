import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="hero relative h-[100vh] md:h-[110vh] flex items-center justify-center text-white px-6 overflow-hidden"
      style={{
        backgroundImage: `url('/img3.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay with slight gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="title space-y-4">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-2xl leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            LET'S
          </motion.h1>
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-2xl leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            GET
          </motion.h1>
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-purple-400 drop-shadow-2xl leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            MOVING
          </motion.h1>
        </div>

        <div className="sub-title space-y-4">
          <motion.p
            className="text-gray-300 text-lg md:text-1xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Your Journey to Fitness Starts Here
          </motion.p>
          <motion.p
            className="text-gray-400 text-md md:text-1xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Unleash Your Potential
          </motion.p>
        </div>

        <div className="buttons flex flex-col md:flex-row gap-6 justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-purple-600 hover:bg-purple-700 transition-all rounded-full font-bold text-lg shadow-xl tracking-wide"
          >
            Start Your Journey
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 border-2 border-purple-400 text-purple-400 hover:bg-purple-500 hover:text-white transition-all rounded-full font-bold text-lg shadow-xl tracking-wide"
          >
            Discover Your Plan
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
