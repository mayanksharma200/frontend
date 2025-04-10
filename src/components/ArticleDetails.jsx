import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://fitness-backend-api.vercel.app/api/posts/${id}`
        );

        if (!response.data) {
          throw new Error("Article data is empty");
        }

        setArticle(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load article. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading article...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 max-w-md text-center">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-purple-400 hover:text-purple-300"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Article not found</div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Changed mx-auto to ml-0 to align left */}
      <div className="max-w-4/5 max-h-full ml-0 md:ml-15 px-4 sm:px-6 lg:px-8 py-12 w-full">
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center text-purple-400 mb-8 hover:text-purple-300 transition-colors"
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
          Back to Articles
        </motion.button>

        <motion.article
          className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {article.image && (
            <div className="h-64 md:h-80 w-full overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/800x400?text=Image+Not+Available";
                }}
              />
            </div>
          )}

          <div className="p-6 md:p-8 lg:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
              <div className="max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center text-gray-400 text-sm gap-2">
                  {article.meta?.reviewer && (
                    <>
                      <span>Medically reviewed by {article.meta.reviewer}</span>
                      <span>•</span>
                    </>
                  )}
                  <span>
                    Written by {article.meta?.author || "Unknown author"} on{" "}
                    {article.meta?.date || "unknown date"}
                  </span>
                </div>
              </div>
              {article.meta?.readTime && (
                <span className="text-xs text-purple-400 bg-purple-900 bg-opacity-50 px-3 py-2 rounded-full">
                  {article.meta.readTime}
                </span>
              )}
            </div>

            {article.content?.summary && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 w-full">
                {article.content.summary.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-700/50 p-4 rounded-lg"
                    whileHover={{ y: -3 }}
                  >
                    <h3 className="text-purple-400 text-sm font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="max-w-4xl">
              {article.content?.body?.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-gray-300 mb-6 text-lg leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <div className="mt-16 w-full bg-gray-700/30 rounded-xl p-8 border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-3">
                HEALTHLINE NEWSLETTER
              </h3>
              <h4 className="text-xl text-purple-400 mb-4">
                Get our Anxiety & Depression newsletter
              </h4>
              <p className="text-gray-300 mb-6 text-lg">
                We'll send self-care tips and coping techniques from our experts
                straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow bg-gray-800 border border-gray-600 rounded-lg px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                />
                <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors text-lg">
                  JOIN NOW
                </button>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
};

export default ArticleDetail;