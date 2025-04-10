import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ArticlesGrid = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://fitness-backend-api.vercel.app/api/posts/top-articles"
        );
        setArticles(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Could not load articles.");
        setRetryCount((prev) => prev + 1);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemLeft = {
    hidden: { opacity: 0, x: -80, rotate: -2 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        mass: 0.8,
      },
    },
  };

  const itemRight = {
    hidden: { opacity: 0, x: 80, rotate: 2 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        mass: 0.8,
      },
    },
  };

  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-gray-400">
          {retryCount > 0 ? "Retrying..." : "Loading articles..."}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <div className="text-red-400 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-600 rounded-md text-white hover:bg-purple-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto my-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 10,
            stiffness: 80,
            delay: 0.1,
          }}
        >
          <motion.h2
            className="text-2xl md:text-4xl font-bold text-white mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Latest Health Articles
          </motion.h2>
          <motion.p
            className="text-purple-400 text-base max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Discover wellness tips and research-backed insights
          </motion.p>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {articles.map((article, index) => (
            <motion.div
              key={article._id}
              variants={index % 2 === 0 ? itemLeft : itemRight}
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 300, damping: 10 },
              }}
            >
              <motion.article
                className="bg-gray-800 rounded-xl overflow-hidden shadow-xl cursor-pointer h-full flex flex-col"
                whileHover={{
                  boxShadow: "0 20px 40px -10px rgba(168, 85, 247, 0.25)",
                }}
                onClick={() => handleArticleClick(article._id)}
              >
                {/* Image */}
                <motion.div
                  className="h-56 sm:h-64 overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <img
                    src={
                      article.image ||
                      "https://via.placeholder.com/800x600.png?text=No+Image"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <motion.h3
                      className="text-lg sm:text-xl font-bold text-white flex-1"
                      whileHover={{ color: "#a78bfa" }}
                      transition={{ duration: 0.2 }}
                    >
                      {article.title}
                    </motion.h3>
                    <motion.span
                      className="text-xs text-purple-400 bg-purple-900 bg-opacity-50 px-2 py-1 rounded-full ml-3"
                      whileHover={{ scale: 1.05 }}
                    >
                      {article.meta?.readTime || "5 min read"}
                    </motion.span>
                  </div>

                  <motion.p
                    className="text-gray-300 mb-4 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {article.content?.summary?.[0]?.text ||
                      "No summary available."}
                  </motion.p>

                  <div className="mt-auto">
                    <motion.button
                      whileHover={{
                        scale: 1.03,
                        backgroundColor: "#7c3aed",
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full sm:w-auto px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-full font-medium shadow-md"
                      transition={{ type: "spring", stiffness: 400 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArticleClick(article._id);
                      }}
                    >
                      Read Full Article
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            whileHover={{
              scale: 1.03,
              backgroundColor: "rgba(124, 58, 237, 0.1)",
            }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-2 border-2 border-purple-400 text-purple-400 rounded-full font-bold shadow-lg text-base"
            transition={{ type: "spring", stiffness: 400 }}
            onClick={() => navigate("/articles")}
          >
            View All Articles
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesGrid;
