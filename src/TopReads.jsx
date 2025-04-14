import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const TopReads = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://fitness-backend-api.vercel.app/api/posts/top-nutrition"
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded text-center">
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
              key={article._id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => handleArticleClick(article._id, article.link)}
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
                  <button
                    className="text-purple-600 dark:text-purple-400 font-medium flex items-center group-hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArticleClick(article._id, article.link);
                    }}
                  >
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
