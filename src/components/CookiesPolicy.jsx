import React from "react";
import { motion } from "framer-motion";

const CookiesPolicy = () => {
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
          Cookies Policy
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
          Fitness Club uses cookies to enhance your browsing experience, analyze
          site traffic, and personalize content.
        </p>
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device that help us
          remember your preferences and improve site functionality.
        </p>
        <h2>How We Use Cookies</h2>
        <p>
          We use cookies to understand user behavior, provide relevant content,
          and ensure security.
        </p>
        <h2>Managing Cookies</h2>
        <p>
          You can control or disable cookies through your browser settings, but
          some features may not function properly without them.
        </p>
      </div>
    </motion.section>
  );
};

export default CookiesPolicy;
