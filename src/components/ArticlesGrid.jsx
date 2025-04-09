import React, { useState } from "react";
import { motion } from "framer-motion";
import ArticleDetail from "./ArticleDetails";

const ArticlesGrid = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: "I Work from Home — How Microbreaks Improved My Health",
      excerpt:
        "Here's what to consider to make sure a microbreak is actually impactful.",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      title:
        "1 Hour of Screen Time at Bedtime Reduces Sleep by 24 Minutes, Study...",
      excerpt:
        "If you can't resist your phone, there are settings you can activate to minimize these effects.",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        mass: 0.5,
      },
    },
  };

  const itemRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        mass: 0.5,
      },
    },
  };

  return (
    <>
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 100,
              mass: 0.5,
              delay: 0.2,
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Latest Health Articles
            </h2>
            <motion.p
              className="text-purple-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Discover wellness tips and research-backed insights
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
                variants={index % 2 === 0 ? itemLeft : itemRight}
                whileHover={{
                  scale: 1.02,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                  },
                }}
                onClick={() => setSelectedArticle(article)}
              >
                <motion.div
                  className="h-60 overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <motion.h3
                      className="text-xl font-bold text-white"
                      whileHover={{ color: "#a78bfa" }}
                      transition={{ duration: 0.3 }}
                    >
                      {article.title}
                    </motion.h3>
                    <motion.span
                      className="text-xs text-purple-400 bg-purple-900 bg-opacity-50 px-2 py-1 rounded-full"
                      whileHover={{ scale: 1.1 }}
                    >
                      {article.readTime}
                    </motion.span>
                  </div>

                  <motion.p
                    className="text-gray-300 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {article.excerpt}
                  </motion.p>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#7c3aed",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2 bg-purple-600 rounded-full text-sm font-medium shadow-md"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArticle(article);
                    }}
                  >
                    Read Full Article
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(124, 58, 237, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 border-2 border-purple-400 text-purple-400 rounded-full font-bold shadow-lg"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              Browse All Articles
            </motion.button>
          </motion.div>
        </div>
      </section>

      {selectedArticle && (
        <ArticleDetail onClose={() => setSelectedArticle(null)} />
      )}
    </>
  );
};

export default ArticlesGrid;
