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
    <section className="py-12 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header with View All button */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 tracking-tight">
              EXPLORE OUR SPONSORED TOPICS
            </h2>
            <motion.div
              className="h-[2px] bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full mt-3 mx-auto md:mx-0"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ maxWidth: "240px" }}
            />
          </div>
          <motion.button
            className="px-4 py-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            VIEW ALL
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </motion.div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
              whileHover={{
                y: -4,
                boxShadow: "0 10px 20px rgba(99, 102, 241, 0.1)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {topic}
              </h3>
              <div className="text-xs text-indigo-600 font-medium uppercase tracking-wider">
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
