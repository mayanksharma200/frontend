import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const LatestArticles = () => {
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
              key={article._id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex h-[120px] sm:h-[150px] cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => handleArticleClick(article._id, article.link)}
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
                  {article.content?.summary?.[0]?.text || article.excerpt}
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                    {article.meta?.readTime || "3 min read"}
                  </span>
                  <button
                    className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium transition-colors"
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
