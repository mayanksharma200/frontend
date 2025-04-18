import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";

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
        <span className="bg-gradient-to-r from-blue-500 to-purple-800 text-purple-100 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 text-center">
          FEATURED
        </span>
        <motion.div
          className="mb-7 text-left my-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-3">
            Healthy Eating Refresh
          </h2>
          <div className="w-16 h-1 bg-purple-400 mx-0"></div>
        </motion.div>
        <p className="text-lg text-gray-200 font-medium mb-2">
          Letter from the Editor
        </p>
        <p className="text-gray-300 max-w-2xl">
          At Fitness Club Nutrition, we want to help you eat food that makes you
          feel good...
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <motion.article
            key={article._id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            onClick={() => handleArticleClick(article._id, article.link)}
          >
            {/* Image */}
            <div className="w-full h-48 sm:h-56 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-4 sm:p-5 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white line-clamp-2">
                  {article.title}
                </h3>
                <span className="text-xs text-purple-400 bg-purple-900 bg-opacity-50 px-2 py-1 rounded-full ml-2 whitespace-nowrap flex-shrink-0">
                  {article.meta.readTime}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-3 line-clamp-3">
                {article.content?.summary?.[0]?.text || article.excerpt}
              </p>

              <div className="mt-auto flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  {article.meta.date}
                </span>
                <button
                  className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
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
