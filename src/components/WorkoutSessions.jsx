import React from "react";
import { motion } from "framer-motion";

const WorkoutSessions = () => {
  // Animation variants with smoother right fade
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const leftItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const rightItemVariants = {
    hidden: { opacity: 0, x: 50 }, // Reduced distance for smoother entry
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.section
      className="workout_session py-12 px-4 md:px-8 lg:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }} // Adjusted margin
      variants={containerVariants}
      id="WorkoutSessions"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Image Section */}
        <div className="flex flex-col">
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4 text-purple-500"
            variants={leftItemVariants}
          >
            TOP WORKOUT SESSION
          </motion.h1>

          <motion.p className="text-gray-300 mb-8" variants={leftItemVariants}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur, quisquam. Eaque alias, blanditiis quidem maiores illo
            unde ipsam!
          </motion.p>

          <motion.img
            src="/img5.jpg"
            alt="workout session"
            className="w-full h-auto max-h-[1000px] object-cover rounded-lg shadow-lg"
            variants={leftItemVariants}
          />
        </div>

        {/* Right Column - Bootcamps Section */}
        <div className="flex flex-col">
          <motion.h1
            className="text-2xl md:text-2xl mt-5 font-bold mb-4 text-purple-500"
            variants={rightItemVariants}
          >
            FEATURED BOOTCAMPS
          </motion.h1>

          <motion.p className="text-gray-300 mb-8" variants={rightItemVariants}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            impedit quasi sunt amet rerum accusamus odio eveniet unde?
          </motion.p>

          <motion.div
            className="bootcamps grid grid-cols-1 gap-6"
            variants={rightItemVariants}
          >
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition"
                variants={rightItemVariants}
              >
                <h4 className="text-xl font-semibold mb-3 text-white">
                  Bootcamp Program {item}
                </h4>
                <p className="text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                  saepe repellendus nemo sit facere ipsam!
                </p>
                <motion.button
                  className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default WorkoutSessions;
