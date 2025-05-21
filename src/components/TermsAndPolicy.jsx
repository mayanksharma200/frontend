import React from "react";
import { motion } from "framer-motion";

const TermsAndPolicy = () => {
  return (
    <motion.section
      className="min-h-screen bg-gray-50 text-gray-700 px-6 py-12 sm:px-12 max-w-6xl lg:max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 0.5,
      }}
    >
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
        <motion.h1
          className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 tracking-tight leading-tight md:text-6xl font-serif"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.3 }}
        >
          Terms and Policy
        </motion.h1>
        <motion.div
          className="h-1 bg-gradient-to-r from-indigo-400 to-blue-300 rounded-full mt-2 mx-auto"
          initial={{ width: 0 }}
          animate={{ width: "80%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ maxWidth: "320px" }}
        />
      </motion.div>

      {/* Content */}
      <div className="prose prose-indigo max-w-none text-center lg:text-left">
        <p>
          By using Fitness Club, you agree to our terms and policies designed to
          protect your privacy and ensure a safe experience.
        </p>
        <h2>Use of Content</h2>
        <p>
          All content provided is for informational purposes only and should not
          replace professional medical advice.
        </p>
        <h2>User Responsibilities</h2>
        <p>
          Users agree to use the site responsibly and not engage in harmful or
          illegal activities.
        </p>
        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to update these terms at any time. Continued use
          of the site constitutes acceptance of changes.
        </p>
      </div>
    </motion.section>
  );
};

export default TermsAndPolicy;
