import React from "react";
import { motion } from "framer-motion";

const SponsoredTopics = () => {
  const topics = [
    "Taking the Next Step with Severe Asthma",
    "Knowledge Is Power with Early Breast Cancer",
    "Cold, Flu, and You",
    "The Insider's Guide to Multiple Sclerosis",
  ];

  return (
    <section className="py-12 px-4 sm:px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header with View All button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              EXPLORE OUR SPONSORED TOPICS
            </h2>
            <div className="w-20 h-1 bg-purple-600 dark:bg-purple-400 mt-2"></div>
          </div>
          <motion.button
            className="text-purple-600 dark:text-purple-400 font-bold hover:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW ALL
          </motion.button>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {topic}
              </h3>
              <div className="mt-4 text-xs text-purple-600 dark:text-purple-400 font-medium uppercase tracking-wider">
                SPONSORED
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsoredTopics;
