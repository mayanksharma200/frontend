import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center px-6 overflow-hidden"
      style={{
        backgroundImage: `url('/img3.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      <motion.div
        className="text-center max-w-3xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3,
            },
          },
        }}
      >
        {/* Main Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 100 },
            },
          }}
        >
          Welcome to <span className="text-purple-300">Fitness Club</span>
        </motion.h1>

        {/* Description */}
        <motion.div
          className="text-gray-200 space-y-4"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delay: 0.2 },
            },
          }}
        >
          <motion.p
            className="text-lg"
            variants={{
              hidden: { x: -10, opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
          >
            Your go-to source for reliable health information
          </motion.p>
          <motion.p
            className="text-lg"
            variants={{
              hidden: { x: -10, opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
          >
            and practical wellness tips
          </motion.p>
          <motion.p
            className="text-purple-300 text-xl mt-6"
            variants={{
              hidden: { scale: 0.95, opacity: 0 },
              visible: { scale: 1, opacity: 1, transition: { delay: 0.4 } },
            }}
          >
            Let's build a healthier you—one step at a time!
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
