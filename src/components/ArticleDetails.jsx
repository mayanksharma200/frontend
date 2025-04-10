import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const articles = {
      "microbreaks-health": {
        title: "I Work from Home — How Microbreaks Improved My Health",
        content: {
          summary: [
            {
              title: "What are microbreaks?",
              text: "Short breaks lasting up to 5 minutes every 20-30 minutes",
            },
            {
              title: "Benefits",
              text: "Physical and mental health improvements",
            },
            { title: "Downsides", text: "Can disrupt flow if not timed well" },
            { title: "Tips", text: "Set reminders, stretch, hydrate" },
          ],
          body: [
            "When I made the switch to working from home full-time several years ago, I relished the newfound freedoms that remote work offered me. But it didn't take long to realize that I wasn't really taking advantage of them. For the most part, I was still sitting at my desk for most of the day.",
            "And I wasn't alone in this. A 2022 study showed that working from home tends to lead to more sedentary behavior than office work. The lack of natural movement like walking to meetings or the break room means we have to be more intentional about our activity.",
            "I decided to try incorporating microbreaks into my routine after reading about their potential benefits. At first, it felt counterintuitive to step away from my work so frequently, but within a week I noticed significant improvements in my focus and energy levels.",
          ],
        },
        meta: {
          author: "A. L. Heywood",
          date: "March 31, 2025",
          reviewer: "Tiffany Taft, PsyD",
          readTime: "5 min read",
        },
        image:
          "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      },
    };

    setArticle(articles[id]);
  }, [id]);

  if (!article) return <div className="min-h-screen bg-gray-900"></div>;

  return (
    <motion.div
      className="min-h-screen bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left-aligned container with max-w-7xl */}
      <div className="max-w-7xl ml-4 py-12 px-4 sm:px-6 lg:pl-12 xl:pl-24">
        {/* Back button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center text-purple-400 mb-8"
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

        {/* Full-width article content */}
        <motion.article
          className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Full-width image */}
          <div className="h-100 w-full overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content area - full width but text doesn't span full width */}
          <div className="p-6 md:p-8 lg:p-12">
            <div className="flex justify-between items-start mb-8">
              <div className="max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center text-gray-400 text-sm gap-2">
                  <span>Medically reviewed by {article.meta.reviewer}</span>
                  <span>•</span>
                  <span>
                    Written by {article.meta.author} on {article.meta.date}
                  </span>
                </div>
              </div>
              <span className="text-xs text-purple-400 bg-purple-900 bg-opacity-50 px-3 py-2 rounded-full">
                {article.meta.readTime}
              </span>
            </div>

            {/* Summary boxes - full width */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full">
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

            {/* Article body - constrained text width for readability */}
            <div className="max-w-4xl">
              {article.content.body.map((paragraph, index) => (
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

            {/* Newsletter signup - full width */}
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
