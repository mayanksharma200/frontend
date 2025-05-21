import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WellnessFooter = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Content Row */}
        <div className="flex flex-col lg:flex-row gap-12 mb-12">
          {/* Left Column - Newsletter */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 font-serif">
              Fitness Club
            </h2>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-3">
              Get our wellness newsletter
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Filter out the noise and nurture your inbox with health and
              wellness advice that's inclusive and rooted in medical expertise.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Enter your email address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800"
                />
              </div>
              <motion.button
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors mt-6 sm:mt-0 sm:self-end"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                SIGN UP
              </motion.button>
            </div>

            <p className="mt-3 text-sm text-gray-400 dark:text-gray-500">
              Your privacy is important to us
            </p>
          </div>

          {/* Right Column - Navigation Links */}
          <div className="lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="min-w-[160px]">
              <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-4 text-base uppercase tracking-wider">
                ABOUT
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/about"
                    className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="min-w-[160px]">
              <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-4 text-base uppercase tracking-wider">
                POLICIES
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/terms"
                    className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Terms and Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Cookies Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="min-w-[160px]">
              <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-4 text-base uppercase tracking-wider">
                HEALTH
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/nutrition"
                    className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Health Topics
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
            © 2025 Fitness Club Media LLC. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Fitness Club Media is an RVO Health Company.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default WellnessFooter;
