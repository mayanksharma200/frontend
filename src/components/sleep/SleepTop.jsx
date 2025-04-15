import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";

const SleepTop = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://fitness-backend-api.vercel.app/api/posts/sleep-top"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (articleId, articleLink) => {
    if (articleLink) {
      if (!articleLink.startsWith("http")) {
        navigate(articleLink, { state: { from: location.pathname } });
      } else {
        window.location.href = articleLink;
      }
    } else {
      navigate(`/article/${articleId}`, { state: { from: location.pathname } });
    }
  };

  // Always navigate to home when back button is clicked
  const handleBack = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        No articles available
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-900 text-gray-100">
      <ScrollToTop />
      <motion.button
        onClick={handleBack}
        className="flex items-center text-purple-400 mb-10 hover:text-purple-500 transition-colors"
        whileHover={{ x: -5 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Home
      </motion.button>

      {/* Featured Header */}
      <div className="mb-10">
        <span className=" bg-gradient-to-r from-blue-500 to-purple-800 text-purple-100 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 text-center">
          FEATURED
        </span>
        <motion.div
          className="mb-7 text-left my-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Healthy Eating Refresh
          </h2>
          <div className="w-16 h-1 bg-purple-500 dark:bg-purple-400 mx-0"></div>
        </motion.div>
        <p className="text-lg text-white-200 font-medium mb-2">
          Letter from the Editor
        </p>
        <p className="text-gray-300 max-w-2xl">
          At Fitness Club Nutrition, we want to help you eat food that makes you
          feel good...
        </p>
      </div>

      {/* Main Articles Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Large featured article on left */}
        <motion.div
          className="lg:w-2/3 cursor-pointer"
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div
            className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700  transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20"
            onClick={() =>
              handleArticleClick(articles[0]._id, articles[0].link)
            }
          >
            <motion.div
              className="h-64 md:h-96 bg-gray-700 overflow-hidden relative"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <img
                src={articles[0].image}
                alt={articles[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/3"></div>
            </motion.div>
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <motion.h3
                  className="text-xl md:text-2xl font-bold text-white mb-2"
                  whileHover={{ color: "#a78bfa" }}
                >
                  {articles[0].title}
                </motion.h3>
                <motion.span
                  className="text-xs text-purple-400 bg-purple-900 bg-opacity-50 px-3 py-1 rounded-full ml-3 whitespace-nowrap flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                >
                  {articles[0].meta.readTime}
                </motion.span>
              </div>
              <p className="text-gray-300 mb-6 text-sm md:text-base">
                {articles[0].content.summary[0].text}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {articles[0].meta.date}
                </span>
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    backgroundColor: "#7c3aed",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2 bg-purple-600 rounded-lg font-medium shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArticleClick(articles[0]._id, articles[0].link);
                  }}
                >
                  Read Full Article
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vertical stack of small articles on right */}
        <div className="lg:w-1/3 space-y-6">
          {articles.slice(1, 4).map((article) => (
            <motion.div
              key={article._id}
              className="cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20"
                onClick={() => handleArticleClick(article._id, article.link)}
              >
                <motion.div
                  className="h-40 bg-gray-700 overflow-hidden relative"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/3"></div>
                </motion.div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <motion.h3
                      className="text-lg font-bold text-white line-clamp-2"
                      whileHover={{ color: "#a78bfa" }}
                    >
                      {article.title}
                    </motion.h3>
                    <motion.span
                      className="text-xs text-purple-400 bg-purple-900 bg-opacity-50 px-3 py-1 rounded-full ml-2 whitespace-nowrap flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                    >
                      {article.meta.readTime}
                    </motion.span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {article.content.summary[0].text}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {article.meta.date}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-4 py-1.5 text-sm bg-purple-600 rounded-lg font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArticleClick(article._id, article.link);
                      }}
                    >
                      Read More
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional articles grid below */}
      {/* <h3 className="text-xl font-bold text-purple-400 mb-6">
        More Nutrition Articles
      </h3> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(4).map((article) => (
          <motion.div
            key={article._id}
            className="cursor-pointer"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20"
              onClick={() => handleArticleClick(article._id, article.link)}
            >
              <motion.div
                className="h-48 bg-gray-700 overflow-hidden relative"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/3"></div>
              </motion.div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <motion.h3
                    className="text-md font-bold text-white line-clamp-2"
                    whileHover={{ color: "#a78bfa" }}
                  >
                    {article.title}
                  </motion.h3>
                  <motion.span
                    className="text-xs text-purple-400 bg-purple-900 bg-opacity-50 px-3 py-1 rounded-full ml-2 whitespace-nowrap flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                  >
                    {article.meta.readTime}
                  </motion.span>
                </div>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {article.content.summary[0].text}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {article.meta.date}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-1.5 text-sm bg-purple-600 rounded-lg font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArticleClick(article._id, article.link);
                    }}
                  >
                    Read More
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SleepTop;
