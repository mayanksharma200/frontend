import React from "react";
import { motion } from "framer-motion";

const ArticleDetail = ({ onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="min-h-screen py-12 px-4 sm:px-6 flex items-center justify-center">
        <motion.article
          className="bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
            duration: 0.5,
          }}
        >
          {/* Article Header */}
          <div className="relative h-80 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Work from home"
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-gray-900/50 hover:bg-gray-900/80 rounded-full p-2 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Article Content */}
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  I Work from Home — How Microbreaks Improved My Health
                </h1>
                <div className="flex items-center text-gray-400 text-sm">
                  <span>Medically reviewed by Tiffany Taft, PsyD</span>
                  <span className="mx-2">•</span>
                  <span>Written by A. L. Heywood on March 31, 2025</span>
                </div>
              </div>
              <span className="text-xs text-purple-400 bg-purple-900 bg-opacity-50 px-2 py-1 rounded-full">
                5 min read
              </span>
            </div>

            {/* Article Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <h3 className="text-purple-400 text-sm font-bold mb-1">
                  What are microbreaks?
                </h3>
                <p className="text-gray-300 text-sm">
                  Short breaks lasting up to 5 minutes every 20-30 minutes
                </p>
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <h3 className="text-purple-400 text-sm font-bold mb-1">
                  Benefits
                </h3>
                <p className="text-gray-300 text-sm">
                  Physical and mental health improvements
                </p>
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <h3 className="text-purple-400 text-sm font-bold mb-1">
                  Downsides
                </h3>
                <p className="text-gray-300 text-sm">
                  Can disrupt flow if not timed well
                </p>
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <h3 className="text-purple-400 text-sm font-bold mb-1">Tips</h3>
                <p className="text-gray-300 text-sm">
                  Set reminders, stretch, hydrate
                </p>
              </div>
            </div>

            {/* Main Article Content */}
            <div className="prose prose-invert max-w-none text-gray-300">
              <p className="text-lg mb-6">
                When I made the switch to working from home full-time several
                years ago, I relished the newfound freedoms that remote work
                offered me. But it didn't take long to realize that I wasn't
                really taking advantage of them. For the most part, I was still
                sitting at my desk for most of the day.
              </p>

              <p className="mb-6">
                And I wasn't alone in this. A 2022 study showed that working
                from home tends to lead to more sedentary behavior than office
                work. The lack of natural movement like walking to meetings or
                the break room means we have to be more intentional about our
                activity.
              </p>

              <h2 className="text-xl font-bold text-white mt-8 mb-4">
                The Microbreak Experiment
              </h2>

              <p className="mb-6">
                I decided to try incorporating microbreaks into my routine after
                reading about their potential benefits. At first, it felt
                counterintuitive to step away from my work so frequently, but
                within a week I noticed significant improvements in my focus and
                energy levels.
              </p>

              <h2 className="text-xl font-bold text-white mt-8 mb-4">
                Key Findings
              </h2>

              <ul className="mb-6 list-disc pl-5 space-y-2">
                <li>Reduced eye strain from screen time</li>
                <li>Improved posture from regular stretching</li>
                <li>Better hydration from more frequent water breaks</li>
                <li>Increased productivity from refreshed mental state</li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-12 bg-gray-700/30 rounded-xl p-6 border border-gray-600">
              <h3 className="text-xl font-bold text-white mb-2">
                HEALTHLINE NEWSLETTER
              </h3>
              <h4 className="text-lg text-purple-400 mb-4">
                Get our Anxiety & Depression newsletter
              </h4>
              <p className="text-gray-300 mb-4">
                We'll send self-care tips and coping techniques from our experts
                straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors">
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
