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
    <section className="py-12 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 tracking-tight uppercase">
            SPOTLIGHT
          </h2>
          <motion.div
            className="h-[2px] bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full mt-3 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ maxWidth: "180px" }}
          />
          <p className="mt-3 text-gray-600 max-w-lg mx-auto">
            Featured health topics and important discussions
          </p>
        </motion.div>

        {/* Spotlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spotlightItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -4,
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.15)",
              }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                  {item.subtitle}
                </p>
              )}
              {item.sponsored && (
                <div className="text-xs text-indigo-600 font-medium uppercase tracking-wider">
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
