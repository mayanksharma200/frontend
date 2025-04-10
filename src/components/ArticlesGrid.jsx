import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ArticlesGrid = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: "microbreaks-health",
      title: "I Work from Home — How Microbreaks Improved My Health",
      excerpt: "Here's what to consider to make sure a microbreak is actually impactful.",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "screen-time-sleep",
      title: "1 Hour of Screen Time at Bedtime Reduces Sleep by 24 Minutes, Study...",
      excerpt: "If you can't resist your phone, there are settings you can activate to minimize these effects.",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
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
        velocity: 0
      }
    }
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
        velocity: 0
      }
    }
  };

  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <section className="py-12 px-4 sm:px-6 bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto"> 
        {/* Header with enhanced motion */}
        <motion.div 
          className="text-center mb-12" // Changed mb-16 to mb-12 */
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            damping: 10,
            stiffness: 80,
            delay: 0.1
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

        {/* 2-Column Grid with enhanced motion */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6" 
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              variants={index % 2 === 0 ? itemLeft : itemRight}
              whileHover={{ 
                y: -6, // Reduced from -8 to -6
                transition: { 
                  type: "spring", 
                  stiffness: 300,
                  damping: 10
                } 
              }}
            >
              <motion.article
                className="bg-gray-800 rounded-xl overflow-hidden shadow-xl cursor-pointer h-full flex flex-col" 
                whileHover={{
                  boxShadow: "0 20px 40px -10px rgba(168, 85, 247, 0.25)" // Reduced shadow intensity
                }}
                onClick={() => handleArticleClick(article.id)}
              >
                {/* Image with parallax effect */}
                <motion.div 
                  className="h-56 sm:h-64 overflow-hidden" 
                  whileHover={{ scale: 1.03 }} 
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col"> {/* Reduced padding from p-6 sm:p-8 */}
                  <div className="flex justify-between items-start mb-3"> {/* Reduced mb-4 to mb-3 */}
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
                      {article.readTime}
                    </motion.span>
                  </div>
                  
                  <motion.p
                    className="text-gray-300 mb-4 text-sm" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {article.excerpt}
                  </motion.p>
                  
                  <div className="mt-auto">
                    <motion.button
                      whileHover={{ 
                        scale: 1.03, // Reduced from 1.05
                        backgroundColor: "#7c3aed"
                      }}
                      whileTap={{ scale: 0.97 }} // Reduced from 0.95
                      className="w-full sm:w-auto px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-full font-medium shadow-md" 
                      transition={{ 
                        type: "spring", 
                        stiffness: 400 
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArticleClick(article.id);
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
              scale: 1.03, // Reduced from 1.05
              backgroundColor: "rgba(124, 58, 237, 0.1)"
            }}
            whileTap={{ scale: 0.97 }} // Reduced from 0.95
            className="px-6 py-2 border-2 border-purple-400 text-purple-400 rounded-full font-bold shadow-lg text-base" 
            transition={{ 
              type: "spring", 
              stiffness: 400 
            }}
          >
            View All Articles
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesGrid;