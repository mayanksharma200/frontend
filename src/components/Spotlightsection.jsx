import React from "react";
import { motion } from "framer-motion";

const SpotlightSection = () => {
  const spotlightItems = [
    {
      id: 1,
      title: "A COPD ROADMAP",
      sponsored: false,
    },
    {
      id: 2,
      title: "Diabetes Skin Care",
      subtitle: "FOR EVERYDAY CONFIDENCE",
      sponsored: true,
    },
    {
      id: 3,
      title: "Abortion Care",
      sponsored: false,
    },
    {
      id: 4,
      title: "Taking Charge of Chronic Kidney Disease",
      sponsored: true,
    },
    {
      id: 5,
      title: "Beddittline",
      sponsored: false,
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white uppercase tracking-widest">
            SPOTLIGHT
          </h2>
          <div className="w-20 h-1 bg-purple-600 dark:bg-purple-400 mt-2"></div>
        </div>

        {/* Spotlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spotlightItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 uppercase tracking-wider">
                  {item.subtitle}
                </p>
              )}
              {item.sponsored && (
                <div className="text-xs text-purple-600 dark:text-purple-400 font-medium uppercase tracking-wider">
                  SPONSORED
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;
