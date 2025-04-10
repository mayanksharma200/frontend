import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // import useNavigate

const Hero = () => {
  const navigate = useNavigate(); // initialize navigate

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
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center space-y-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 1.2,
              ease: "easeInOut",
              delayChildren: 0.3,
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {/* Title */}
        <div className="title space-y-4">
          {["LET'S", "GET", "MOVING"].map((word, index) => (
            <motion.h1
              key={index}
              className={`text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-2xl leading-tight ${
                word === "MOVING" ? "text-purple-400" : ""
              }`}
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
            >
              {word}
            </motion.h1>
          ))}
        </div>

        {/* Sub-title */}
        <div className="sub-title space-y-4">
          <motion.p
            className="text-gray-300 text-lg md:text-1xl"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            Your Journey to Fitness Starts Here
          </motion.p>
          <motion.p
            className="text-gray-400 text-md md:text-1xl"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            Unleash Your Potential
          </motion.p>
        </div>

        {/* Buttons */}
        <div className="buttons flex flex-col md:flex-row gap-6 justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-purple-600 hover:bg-purple-700 transition-all rounded-full font-bold text-lg shadow-xl tracking-wide"
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => navigate("/journey")} // <-- navigate on click
          >
            Start Your Journey
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 border-2 border-purple-400 text-purple-400 hover:bg-purple-500 hover:text-white transition-all rounded-full font-bold text-lg shadow-xl tracking-wide"
            transition={{ type: "spring", stiffness: 300 }}
          >
            Discover Your Plan
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
