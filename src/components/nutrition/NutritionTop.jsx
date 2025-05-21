import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";

const NutritionTop = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://fitness-backend-api-production.up.railway.app/api/posts/top-nutrition"
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

  // Skeleton Loading Components
  const FeaturedArticleSkeleton = () => (
    <div className="lg:w-2/3">
      <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
        <div className="h-64 md:h-96 bg-gray-200 animate-pulse"></div>
        <div className="p-6 md:p-8">
          <div className="flex justify-between mb-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2 mb-6">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const SmallArticleSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div className="h-40 bg-gray-200 animate-pulse"></div>
      <div className="p-5">
        <div className="flex justify-between mb-3">
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  const GridArticleSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div className="h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-5">
        <div className="flex justify-between mb-3">
          <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  const handleArticleClick = (articleId, articleLink) => {
    if (articleLink) {
      if (!articleLink.startsWith("http")) {
        navigate(articleLink, { state: { from: location.pathname } });
      } else {
        window.open(articleLink, "_blank");
      }
    } else {
      navigate(`/article/${articleId}`, { state: { from: location.pathname } });
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-2 text-indigo-600 hover:text-indigo-800"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!articles.length && !isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center text-gray-500 py-8">
          No articles available
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-white text-gray-800">
      <ScrollToTop />
      <motion.button
        onClick={handleBack}
        className="flex items-center text-indigo-600 mb-10 hover:text-indigo-800 transition-colors"
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
        {isLoading ? (
          <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse mb-2"></div>
        ) : (
          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 inline-block">
            FEATURED
          </span>
        )}

        <motion.div
          className="mb-7 text-left my-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {isLoading ? (
            <>
              <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="w-16 h-1 bg-gray-200 rounded-full animate-pulse"></div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Healthy Eating Refresh
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
            </>
          )}
        </motion.div>

        {isLoading ? (
          <div className="space-y-2 max-w-2xl">
            <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : (
          <>
            <p className="text-lg text-gray-700 font-medium mb-2">
              Letter from the Editor
            </p>
            <p className="text-gray-600 max-w-2xl">
              At Fitness Club Nutrition, we want to help you eat food that makes
              you feel good...
            </p>
          </>
        )}
      </div>

      {/* Main Articles Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Large featured article */}
        {isLoading ? (
          <FeaturedArticleSkeleton />
        ) : (
          <motion.div
            className="lg:w-2/3 cursor-pointer"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-indigo-200"
              onClick={() =>
                handleArticleClick(articles[0]._id, articles[0].link)
              }
            >
              <motion.div
                className="h-64 md:h-96 bg-gray-100 overflow-hidden relative"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <img
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/30 to-transparent h-1/3"></div>
              </motion.div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <motion.h3
                    className="text-xl md:text-2xl font-bold text-gray-900 mb-2"
                    whileHover={{ color: "#4f46e5" }}
                  >
                    {articles[0].title}
                  </motion.h3>
                  <motion.span
                    className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full ml-3 whitespace-nowrap flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                  >
                    {articles[0].meta.readTime}
                  </motion.span>
                </div>
                <p className="text-gray-600 mb-6 text-sm md:text-base">
                  {articles[0].content.summary[0].text}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {articles[0].meta.date}
                  </span>
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      background: "linear-gradient(to right, #4f46e5, #6366f1)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-medium shadow-sm"
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
        )}

        {/* Vertical stack of small articles */}
        <div className="lg:w-1/3 space-y-6">
          {isLoading
            ? [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SmallArticleSkeleton />
                </motion.div>
              ))
            : articles.slice(1, 4).map((article) => (
                <motion.div
                  key={article._id}
                  className="cursor-pointer"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-indigo-200"
                    onClick={() =>
                      handleArticleClick(article._id, article.link)
                    }
                  >
                    <motion.div
                      className="h-40 bg-gray-100 overflow-hidden relative"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/30 to-transparent h-1/3"></div>
                    </motion.div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <motion.h3
                          className="text-lg font-bold text-gray-900 line-clamp-2"
                          whileHover={{ color: "#4f46e5" }}
                        >
                          {article.title}
                        </motion.h3>
                        <motion.span
                          className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full ml-2 whitespace-nowrap flex-shrink-0"
                          whileHover={{ scale: 1.05 }}
                        >
                          {article.meta.readTime}
                        </motion.span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {article.content.summary[0].text}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {article.meta.date}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="px-4 py-1.5 text-sm bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-medium"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.15 }}
              >
                <GridArticleSkeleton />
              </motion.div>
            ))
          : articles.slice(4).map((article) => (
              <motion.div
                key={article._id}
                className="cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-md"
                  onClick={() => handleArticleClick(article._id, article.link)}
                >
                  <motion.div
                    className="h-48 bg-gray-100 overflow-hidden relative"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/30 to-transparent h-1/3"></div>
                  </motion.div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <motion.h3
                        className="text-md font-bold text-gray-900 line-clamp-2"
                        whileHover={{ color: "#4f46e5" }}
                      >
                        {article.title}
                      </motion.h3>
                      <motion.span
                        className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full ml-2 whitespace-nowrap flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                      >
                        {article.meta.readTime}
                      </motion.span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.content.summary[0].text}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {article.meta.date}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-4 py-1.5 text-sm bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-medium"
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

export default NutritionTop;
