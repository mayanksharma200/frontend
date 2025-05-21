import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fromPath = location.state?.from || "/";

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://fitness-backend-api-production.up.railway.app/api/posts/${id}`
        );
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

  const handleBackClick = () => {
    navigate(fromPath);
  };

  // Custom link renderer to handle internal SPA navigation and external links
  const renderLink = ({ href, children }) => {
    if (!href) return <>{children}</>;

    const isInternal =
      href.startsWith("/article/") ||
      href.startsWith(window.location.origin + "/article/");

    if (isInternal) {
      // Extract article ID from URL
      const articleId = href.split("/").pop();
      return (
        <span
          className="text-indigo-400 hover:text-indigo-300 cursor-pointer underline underline-offset-4 decoration-1"
          onClick={() =>
            navigate(`/article/${articleId}`, { state: { from: fromPath } })
          }
          role="link"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate(`/article/${articleId}`, { state: { from: fromPath } });
            }
          }}
        >
          {children}
        </span>
      );
    }

    // External link
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 decoration-1"
      >
        {children}
      </a>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
        <p className="text-gray-600">Loading content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-500 max-w-md text-center">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-800">Article not found</div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-white w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full px-4 py-12 md:ml-15 md:max-w-[78%] lg:px-8 mx-auto">
        <motion.button
          onClick={handleBackClick}
          className="flex items-center text-indigo-600 mb-8 hover:text-indigo-800 transition-colors"
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
          Back to{" "}
          {fromPath === "/"
            ? "Home"
            : fromPath.includes("nutrition")
            ? "Nutrition"
            : "Articles"}
        </motion.button>

        <motion.article
          className="bg-white rounded-xl shadow-lg overflow-hidden w-full border border-gray-100"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {article.image && (
            <div className="h-64 md:h-96 w-full overflow-hidden relative">
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
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
            </div>
          )}

          <div className="p-6 md:p-8 lg:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
              <div className="w-full">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center text-gray-500 text-sm gap-2">
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
                <span className="text-xs text-indigo-600 bg-indigo-50 px-3 py-2 rounded-full md:min-w-[100px] text-center">
                  {article.meta.readTime}
                </span>
              )}
            </div>

            {article.content?.summary && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 w-full">
                {article.content.summary.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-indigo-50 p-4 rounded-lg border border-indigo-100"
                    whileHover={{ y: -3 }}
                  >
                    <h3 className="text-indigo-600 text-sm font-bold mb-2 uppercase tracking-wider">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 text-sm">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="w-full">
              {article.content?.body?.map((section, index) => (
                <motion.div
                  key={index}
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                    {section.headline}
                  </h2>
                  <div className="text-gray-700 text-lg leading-relaxed mb-6 space-y-4">
                    <ReactMarkdown
                      children={section.content}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{ a: renderLink }}
                    />
                  </div>

                  {/* Render subsections */}
                  {section.subsections &&
                    section.subsections.map((subsection, subIndex) => (
                      <div
                        key={subIndex}
                        className="mb-6 pl-4 border-l-2 border-indigo-200"
                      >
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                          {subsection.subheading?.trim() ||
                            subsection.subheadline ||
                            ""}
                        </h3>
                        <div className="text-gray-700 text-lg leading-relaxed space-y-4">
                          <ReactMarkdown
                            children={subsection.content}
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{ a: renderLink }}
                          />
                        </div>
                      </div>
                    ))}

                  {/* Keywords */}
                  {section.keywords && section.keywords.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {section.keywords.map((keyword, k) => (
                        <span
                          key={k}
                          className="bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full select-none"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {article.related_studies && article.related_studies.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                  Related Studies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {article.related_studies.map((study, index) => {
                    const isInternal = /^\/article\//.test(study.link);
                    return (
                      <motion.div
                        key={index}
                        className="bg-indigo-50 p-4 rounded-lg border border-indigo-100"
                        whileHover={{ y: -3 }}
                      >
                        <h4 className="text-indigo-600 font-medium mb-2">
                          {study.title}
                        </h4>
                        {isInternal ? (
                          <button
                            onClick={() => {
                              const articleId = study.link.split("/").pop();
                              navigate(`/article/${articleId}`, {
                                state: { from: fromPath },
                              });
                            }}
                            className="text-gray-700 hover:text-indigo-600 text-sm flex items-center"
                          >
                            Read more
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1"
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
                        ) : (
                          <a
                            href={study.link}
                            className="text-gray-700 hover:text-indigo-600 text-sm flex items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read more
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1"
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
                          </a>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-16 w-full bg-indigo-50 rounded-xl p-8 border border-indigo-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                FITNESS CLUB NEWSLETTER
              </h3>
              <h4 className="text-xl text-indigo-600 mb-4">
                Get our Health & Wellness newsletter
              </h4>
              <p className="text-gray-700 mb-6 text-lg">
                We'll send self-care tips and coping techniques from our experts
                straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow bg-white border border-gray-300 rounded-lg px-5 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                />
                <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg font-medium transition-colors text-lg">
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
