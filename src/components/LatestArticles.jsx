import React from "react";
import { motion } from "framer-motion";

const LatestArticles = () => {
  const articles = [
    {
      id: "cold-shower-benefits",
      title: "Cold Shower Benefits for Your Health",
      excerpt: "You'll want the water to be below a certain temperature.",
      readTime: "3 min read",
      image: "/img1.webp",
    },
    {
      id: "healthy-dinner-recipes",
      title: "5 Healthy Dinner Recipes in 15 Minutes or Less",
      excerpt: "Cook, eat, and move on with the rest of your evening.",
      readTime: "4 min read",
      image: "/img2.jpg",
    },
    {
      id: "mouth-taping-experiment",
      title: "We Tried It: My 5-Night Experiment With Mouth Taping",
      excerpt:
        "Mouth taping isn't suitable for everyone — just ask this Healthline editor.",
      readTime: "6 min read",
      image: "/img3.jpg",
    },
    {
      id: "tuberculosis-warning",
      title:
        "WHO Warns of Rising Tuberculosis Cases Amid Cuts to Funding From US",
      excerpt:
        "Experts say the European situation should concern people in the U.S.",
      readTime: "5 min read",
      image: "/img4.jpg",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            THIS JUST IN
          </h2>
          <div className="w-20 h-1 bg-purple-600 dark:bg-purple-500"></div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex h-[120px] sm:h-[150px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Small Image on Left - Responsive sizing */}
              <div className="w-[100px] sm:w-[120px] h-full overflow-hidden flex-shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => (e.target.src = "/vite.svg")}
                />
              </div>

              {/* Content on Right */}
              <div className="flex-1 p-3 sm:p-4 flex flex-col">
                <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                    {article.readTime}
                  </span>
                  <button className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <motion.button
            className="px-6 py-3 border border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 rounded-md font-medium hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Articles
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
