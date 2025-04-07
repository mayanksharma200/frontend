import React from "react";
import { motion } from "framer-motion";

const WorkoutSessions = () => {
  return (
    <section
      className="workout_session py-12 px-4 md:px-8 lg:px-12"
      id="WorkoutSessions"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Image Section */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-purple-500">
            TOP WORKOUT SESSION
          </h1>

          <p className="text-gray-300 mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur, quisquam. Eaque alias, blanditiis quidem maiores illo
            unde ipsam!
          </p>

          <motion.img
            src="/img5.jpg"
            alt="workout session"
            className="w-full h-auto max-h-[1000px] object-cover rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -50 }} // <-- start from left (-50px)
            whileInView={{ opacity: 1, x: 0 }} // <-- move to center (0px)
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Right Column - Bootcamps Section */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl md:text-2xl mt-5 font-bold mb-4 text-purple-500">
            FEATURED BOOTCAMPS
          </h1>

          <p className="text-gray-300 mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            impedit quasi sunt amet rerum accusamus odio eveniet unde?
          </p>

          {/* Bootcamps without motion */}
          <div className="bootcamps grid grid-cols-1 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition"
              >
                <h4 className="text-xl font-semibold mb-3 text-white">
                  Bootcamp Program {item}
                </h4>
                <p className="text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                  saepe repellendus nemo sit facere ipsam!
                </p>
                <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkoutSessions;
