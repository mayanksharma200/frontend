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
        setIsLoading(true);
        const response = await fetch(
          "https://fitness-backend-api.vercel.app/api/posts/more-top-reads"
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

  // Skeleton Loading
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-full">
      <div className="h-48 bg-gray-100 animate-pulse rounded-t-lg"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-100 rounded mb-3 w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div>
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
        <div className="text-gray-500">No top reads available</div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 tracking-tight">
            More Top Reads
          </h2>
          <motion.div
            className="h-[2px] bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full mt-3 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ maxWidth: "180px" }}
          />
          <p className="mt-3 text-gray-600 max-w-lg mx-auto">
            Discover the most popular articles in our fitness community
          </p>
        </motion.div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {articles.map((article, index) => (
                <motion.article
                  key={article._id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleArticleClick(article._id, article.link)}
                >
                  <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    {/* Image */}
                    <div className="h-48 overflow-hidden">
                      <img
                        src={
                          article.image ||
                          "https://via.placeholder.com/400x300.png?text=No+Image"
                        }
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 px-2">
                        <span className="bg-gradient-to-r from-indigo-600 to-indigo-600 bg-[length:0%_2px] bg-left-bottom bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                          {article.title}
                        </span>
                      </h3>
                      <div className="mt-auto pt-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArticleClick(article._id, article.link);
                          }}
                        >
                          Read Now
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
                  </div>
                </motion.article>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-10">
              <motion.button
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-md text-sm font-medium hover:from-indigo-700 hover:to-blue-700 transition-colors shadow-sm"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/top-reads")}
              >
                View All Top Reads
              </motion.button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TopReads;
