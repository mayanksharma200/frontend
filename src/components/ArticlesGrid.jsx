import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getOptimizedUnsplashUrl } from "./utils/imageOptimizer";

const ArticlesGrid = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [topArticlesRes, latestArticlesRes] = await Promise.all([
          axios.get(
            "https://fitness-backend-api-production.up.railway.app/api/posts/top-articles"
          ),
          axios.get(
            "https://fitness-backend-api-production.up.railway.app/api/posts/just-in"
          ),
        ]);
        setArticles(topArticlesRes.data);
        setLatestArticles(latestArticlesRes.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Could not load articles.");
        setRetryCount((prev) => prev + 1);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [retryCount]);

  const handleArticleClick = (articleId, articleLink) => {
    if (articleLink) {
      if (!articleLink.startsWith("http")) {
        navigate(articleLink);
      } else {
        window.open(articleLink, "_blank");
      }
    } else {
      navigate(`/article/${articleId}`);
    }
  };

  // Skeleton Loading Components
  const SkeletonCard = ({ isLarge = false }) => {
    if (isLarge) {
      return (
        <div
          className="bg-gray-100 rounded-lg flex flex-col lg:h-[400px] h-[480px]"
          style={{ gridColumn: "span 2", gridRow: "span 2" }}
        >
          <img
            src="https://images.unsplash.com/photo-1737625854730-56e11fcaff17?fm=webp&w=400&q=50"
            srcSet="
              https://images.unsplash.com/photo-1737625854730-56e11fcaff17?fm=webp&w=300&q=50 300w,
              https://images.unsplash.com/photo-1737625854730-56e11fcaff17?fm=webp&w=400&q=50 400w,
              https://images.unsplash.com/photo-1737625854730-56e11fcaff17?fm=webp&w=800&q=70 800w
            "
            sizes="(max-width: 600px) 300px, (max-width: 900px) 400px, 800px"
            alt="Fitness Club"
            className="h-[300px] lg:h-[250px] w-full object-cover rounded-t-lg"
            style={{ minHeight: 180, background: "#e5e7eb" }}
            loading="eager"
          />
          <div className="flex-1"></div>
        </div>
      );
    }
    return (
      <div className="bg-gray-100 h-[150px] lg:h-[180px]">
        <div className="h-[120px] lg:h-[120px] w-full bg-gray-200 animate-pulse"></div>
        <div className="p-4 lg:p-3">
          <div className="h-5 lg:h-6 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  };

  const SkeletonSmallCard = () => (
    <div className="bg-gray-100 h-[150px] lg:h-[180px]">
      <div className="h-[120px] lg:h-[120px] w-full bg-gray-200 animate-pulse"></div>
      <div className="p-4 lg:p-3">
        <div className="h-5 lg:h-6 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );

  const SkeletonLatestArticle = () => (
    <div className="py-4">
      <div className="h-2 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => setRetryCount((prev) => prev + 1)}
          className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="py-2 px-4 sm:px-6 bg-gray-50">
      {/* --- Helmet for LCP image preloading --- */}
      {articles[0]?.image && (
        <Helmet>
          <link
            rel="preload"
            as="image"
            href={getOptimizedUnsplashUrl(articles[0].image, 400)}
            imagesrcset={`
              ${getOptimizedUnsplashUrl(articles[0].image, 400)} 400w,
              ${getOptimizedUnsplashUrl(articles[0].image, 800)} 800w
            `}
            imagesizes="(max-width: 600px) 400px, 800px"
          />
        </Helmet>
      )}

      <div className="max-w-6xl lg:max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-6 lg:mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 15,
            delay: 0.2,
          }}
        >
          <motion.h2
            className="mt-3 text-sm lg:text-lg text-gray-600 max-w-2xl lg:max-w-lg mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your premier destination for expert health guidance and
            transformative wellness strategies.
          </motion.h2>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row-reverse gap-8">
          {/* Articles Grid */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 pb-6 lg:pb-4"
                initial="hidden"
                animate="visible"
              >
                <SkeletonCard isLarge={true} />
                <div className="lg:hidden">
                  <SkeletonSmallCard />
                </div>
                <div className="lg:hidden">
                  <SkeletonSmallCard />
                </div>
                <div className="hidden lg:block">
                  <SkeletonSmallCard />
                </div>
                <div className="hidden lg:block">
                  <SkeletonSmallCard />
                </div>
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 pb-6 lg:pb-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
                    },
                  }}
                >
                  {/* Main featured article */}
                  {articles[0] && (
                    <motion.article
                      className="bg-gray-50 cursor-pointer flex flex-col h-[480px] md:h-[680px] lg:h-[400px]"
                      style={{
                        gridColumn: "span 2",
                        gridRow: "span 2",
                      }}
                      whileHover={{
                        y: -6,
                      }}
                      onClick={() =>
                        handleArticleClick(articles[0]._id, articles[0].link)
                      }
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="h-[300px] lg:h-[250px] overflow-hidden">
                        <img
                          src={getOptimizedUnsplashUrl(articles[0].image, 400)}
                          srcSet={`
                            ${getOptimizedUnsplashUrl(
                              articles[0].image,
                              400
                            )} 400w,
                            ${getOptimizedUnsplashUrl(
                              articles[0].image,
                              800
                            )} 800w
                          `}
                          sizes="(max-width: 600px) 400px, 800px"
                          alt={articles[0].title}
                          loading="eager"
                        />
                      </div>
                      <div className="p-6 lg:p-4 flex flex-col flex-1">
                        <h3 className="text-2xl lg:text-xl font-extrabold text-gray-900 mb-2 line-clamp-2">
                          {articles[0].title}
                        </h3>
                        <p className="text-gray-700 mb-3 text-sm lg:text-xs line-clamp-3">
                          {articles[0].content?.summary?.[0]?.text ||
                            articles[0].excerpt}
                        </p>
                        <div className="mt-auto flex justify-between items-center">
                          <span className="text-indigo-600 font-semibold text-sm lg:text-xs">
                            {articles[0].meta?.readTime || "5 min read"}
                          </span>
                          <button
                            className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors text-sm lg:text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleArticleClick(
                                articles[0]._id,
                                articles[0].link
                              );
                            }}
                          >
                            Read More →
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  )}

                  {/* Mobile secondary articles */}
                  <div className="lg:hidden space-y-6 col-span-1">
                    {articles[1] && (
                      <motion.article
                        className="bg-gray-50 hover:bg-gray-100 transition-all duration-300 flex h-[120px] sm:h-[150px] cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        whileHover={{ y: -5 }}
                        onClick={() =>
                          handleArticleClick(articles[1]._id, articles[1].link)
                        }
                      >
                        <div className="w-[100px] sm:w-[120px] h-full overflow-hidden flex-shrink-0">
                          <img
                            src={
                              articles[1].image
                                ? getOptimizedUnsplashUrl(
                                    articles[1].image,
                                    400
                                  )
                                : "https://via.placeholder.com/800x600.png?text=No+Image"
                            }
                            alt={articles[1].title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 p-3 sm:p-4 flex flex-col">
                          <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2">
                            {articles[1].title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                            {articles[1].content?.summary?.[0]?.text ||
                              articles[1].excerpt}
                          </p>
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-xs text-indigo-600 font-medium">
                              {articles[1].meta?.readTime || "3 min read"}
                            </span>
                            <button
                              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleArticleClick(
                                  articles[1]._id,
                                  articles[1].link
                                );
                              }}
                            >
                              Read More →
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    )}

                    {articles[2] && (
                      <motion.article
                        className="bg-gray-50 hover:bg-gray-100 transition-all duration-300 flex h-[120px] sm:h-[150px] cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        whileHover={{ y: -5 }}
                        onClick={() =>
                          handleArticleClick(articles[2]._id, articles[2].link)
                        }
                      >
                        <div className="w-[100px] sm:w-[120px] h-full overflow-hidden flex-shrink-0">
                          <img
                            src={
                              articles[2].image
                                ? getOptimizedUnsplashUrl(
                                    articles[2].image,
                                    400
                                  )
                                : "https://via.placeholder.com/800x600.png?text=No+Image"
                            }
                            alt={articles[2].title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 p-3 sm:p-4 flex flex-col">
                          <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2">
                            {articles[2].title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                            {articles[2].content?.summary?.[0]?.text ||
                              articles[2].excerpt}
                          </p>
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-xs text-indigo-600 font-medium">
                              {articles[2].meta?.readTime || "3 min read"}
                            </span>
                            <button
                              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleArticleClick(
                                  articles[2]._id,
                                  articles[2].link
                                );
                              }}
                            >
                              Read More →
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    )}
                  </div>

                  {/* Desktop secondary articles */}
                  <div className="hidden lg:flex flex-col gap-4 col-span-1">
                    {articles[1] && (
                      <motion.article
                        className="bg-gray-50 cursor-pointer overflow-hidden lg:h-[190px]"
                        whileHover={{
                          y: -4,
                          backgroundColor: "rgba(249, 250, 251, 1)",
                        }}
                        onClick={() =>
                          handleArticleClick(articles[1]._id, articles[1].link)
                        }
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <div className="h-[120px] w-full overflow-hidden">
                          <img
                            src={
                              articles[1].image
                                ? getOptimizedUnsplashUrl(
                                    articles[1].image,
                                    400
                                  )
                                : "https://via.placeholder.com/800x600.png?text=No+Image"
                            }
                            alt={articles[1].title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-3">
                          <h3
                            className="text-base font-bold text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleArticleClick(
                                articles[1]._id,
                                articles[1].link
                              );
                            }}
                          >
                            {articles[1].title}
                          </h3>
                        </div>
                      </motion.article>
                    )}

                    {articles[2] && (
                      <motion.article
                        className="bg-gray-50 cursor-pointer overflow-hidden lg:h-[192px]"
                        whileHover={{
                          y: -4,
                          backgroundColor: "rgba(249, 250, 251, 1)",
                        }}
                        onClick={() =>
                          handleArticleClick(articles[2]._id, articles[2].link)
                        }
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <div className="h-[120px] w-full overflow-hidden">
                          <img
                            src={
                              articles[2].image
                                ? getOptimizedUnsplashUrl(
                                    articles[2].image,
                                    400
                                  )
                                : "https://via.placeholder.com/800x600.png?text=No+Image"
                            }
                            alt={articles[2].title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-3">
                          <h3
                            className="text-base font-bold text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleArticleClick(
                                articles[2]._id,
                                articles[2].link
                              );
                            }}
                          >
                            {articles[2].title}
                          </h3>
                        </div>
                      </motion.article>
                    )}
                  </div>
                </motion.div>

                {/* Remaining articles */}
                {articles.length > 3 && (
                  <div className="mt-12 lg:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4">
                    {articles.slice(3).map((article, index) => (
                      <motion.article
                        key={article._id}
                        className="bg-gray-50 cursor-pointer overflow-hidden h-[150px] lg:h-[180px]"
                        whileHover={{
                          y: -4,
                          backgroundColor: "rgba(249, 250, 251, 1)",
                        }}
                        onClick={() =>
                          handleArticleClick(article._id, article.link)
                        }
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                      >
                        <div className="h-[100px] lg:h-[120px] w-full overflow-hidden">
                          <img
                            src={
                              article.image
                                ? getOptimizedUnsplashUrl(article.image, 400)
                                : "https://via.placeholder.com/800x600.png?text=No+Image"
                            }
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-3 lg:p-3">
                          <h3
                            className="text-sm lg:text-base font-bold text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleArticleClick(article._id, article.link);
                            }}
                          >
                            {article.title}
                          </h3>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Latest Articles Sidebar */}
          <div className="w-full lg:w-1/4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-gray-50 p-6 lg:sticky lg:top-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Latest Articles
              </h2>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <SkeletonLatestArticle key={i} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {latestArticles.map((article) => (
                    <motion.div
                      key={article._id}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="py-3 cursor-pointer"
                      onClick={() =>
                        handleArticleClick(article._id, article.link)
                      }
                    >
                      <h3 className="font-medium text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-indigo-600 mt-1">
                        {article.meta?.readTime || "3 min read"}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesGrid;
