import React from "react";
import { motion } from "framer-motion";

const TopReads = () => {
  const articles = [
    {
      id: "insurance-therapy",
      title: "How to Know If Your Insurance Covers Therapy",
      image: "/insuranceThink.png", // Replace with your image path
    },
    {
      id: "high-cortisol",
      title: "What Are the Symptoms and Causes of High Cortisol Levels?",
      image: "/cortison.png",
    },
    {
      id: "comforting-recipes",
      title: "Comforting Recipes for a Cozy Dinner",
      image: "/family.png",
    },
    {
      id: "toxic-work",
      title: "How to Deal With a Toxic Work Environment",
      image: "/environment.png",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            MORE TOP READS
          </h2>
          <div className="w-16 h-1 bg-purple-600 dark:bg-purple-500 mx-auto"></div>
        </motion.div>

        {/* Articles Grid - Minimalist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="h-full flex flex-col">
                {/* Image with subtle hover effect */}
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-300"
                    onError={(e) => (e.target.src = "/vite.svg")}
                  />
                </div>

                {/* Title with hover underline effect */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 px-2">
                  <span className="bg-gradient-to-r from-purple-600 to-purple-600 bg-[length:0%_2px] bg-left-bottom bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    {article.title}
                  </span>
                </h3>

                {/* Read link */}
                <div className="mt-auto px-2">
                  <button className="text-purple-600 dark:text-purple-400 font-medium flex items-center group-hover:underline">
                    Read Article
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button - Centered */}
        <div className="text-center mt-12">
          <motion.button
            className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 shadow-sm"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Top Reads
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TopReads;
