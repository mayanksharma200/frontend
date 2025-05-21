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
        setIsLoading(true);
        const response = await fetch(
          "https://fitness-backend-api-production.up.railway.app/api/posts/just-in"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchArticles();
    }, 800); // Reduced loading simulation time

    return () => clearTimeout(timer);
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

  // Compact Skeleton Loading
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-sm h-[120px] flex border border-gray-100">
      <div className="w-[100px] h-full bg-gray-100 animate-pulse"></div>
      <div className="flex-1 p-3 flex flex-col">
        <div className="h-5 w-full bg-gray-100 rounded mb-2 animate-pulse"></div>
        <div className="h-4 w-3/4 bg-gray-100 rounded mb-2 animate-pulse"></div>
        <div className="space-y-1 mt-auto">
          <div className="h-3 w-16 bg-gray-100 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-white p-6">
        <div className="text-red-500 mb-4 text-center">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!articles.length && !isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-white p-6">
        <div className="text-gray-500">No articles available</div>
      </div>
    );
  }

  return (
    <section className="py-8 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        >
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 tracking-tight">
            Latest Articles
          </h1>
          <motion.div
            className="h-[2px] bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full mt-3 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ maxWidth: "180px" }}
          />
          <p className="mt-3 text-gray-600 max-w-lg mx-auto">
            Fresh content to keep you updated with the latest in fitness and
            health.
          </p>
        </motion.div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((article, index) => (
                <motion.article
                  key={article._id}
                  className="bg-white rounded-lg shadow-sm cursor-pointer flex overflow-hidden h-[120px] border border-gray-100 hover:border-indigo-100 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.15)",
                  }}
                  onClick={() => handleArticleClick(article._id, article.link)}
                >
                  {/* Image */}
                  <div className="w-[100px] h-full overflow-hidden flex-shrink-0">
                    <img
                      src={
                        article.image ||
                        "https://via.placeholder.com/400x300.png?text=No+Image"
                      }
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-3 flex flex-col">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                      {article.content?.summary?.[0]?.text ||
                        article.excerpt ||
                        ""}
                    </p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-xs text-indigo-600 font-medium">
                        {article.meta?.readTime || "3 min read"}
                      </span>
                      <button
                        className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArticleClick(article._id, article.link);
                        }}
                      >
                        Read →
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* View All Button */}
            {articles.length > 0 && (
              <div className="text-center mt-8">
                <motion.button
                  className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-md text-sm font-medium hover:from-indigo-700 hover:to-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/all-categories")}
                >
                  View All Articles
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default LatestArticles;
