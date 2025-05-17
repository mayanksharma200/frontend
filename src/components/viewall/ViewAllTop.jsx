import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
    <div className="bg-gray-200 h-48 rounded-lg mb-4" />
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-300 rounded w-full mb-2" />
    <div className="h-4 bg-gray-300 rounded w-5/6 mb-4" />
    <div className="flex justify-between items-center mt-auto">
      <div className="h-4 w-20 bg-gray-300 rounded"></div>
      <div className="h-6 w-24 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const ViewAllTop = () => {
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
          "https://fitness-backend-api.vercel.app/api/posts/viewall-top"
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
        window.open(articleLink, "_blank");
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
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-6xl mx-auto my-8 text-center">
        Error: {error}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="text-center text-gray-500 py-8 max-w-6xl mx-auto px-4">
        No articles available
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white text-black">
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
        <span className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 text-center inline-block">
          FEATURED
        </span>
        <motion.div
          className="mb-7 text-left my-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-black mb-3">
            Explore All Featured Articles
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded"></div>
        </motion.div>
        <p className="text-lg text-gray-700 font-medium mb-2">
          Letter from the Editor
        </p>
        <p className="text-gray-600 max-w-2xl">
          At Fitness Club Nutrition, we want to help you eat food that makes you
          feel good...
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <motion.article
            key={article._id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            onClick={() => handleArticleClick(article._id, article.link)}
          >
            {/* Image */}
            <div className="w-full h-48 sm:h-56 overflow-hidden rounded-t-lg">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-4 sm:p-5 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-black line-clamp-2">
                  {article.title}
                </h3>
                <span className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full ml-2 whitespace-nowrap flex-shrink-0">
                  {article.meta.readTime}
                </span>
              </div>

              <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                {article.content?.summary?.[0]?.text || article.excerpt}
              </p>

              <div className="mt-auto flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {article.meta.date}
                </span>
                <button
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArticleClick(article._id, article.link);
                  }}
                >
                  Read More →
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default ViewAllTop;
