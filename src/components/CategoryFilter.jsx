import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CategoryFilter = () => {
  const navigate = useNavigate();
  const categories = [
    {
      name: "Nutrition",
      image: "/apple.webp",
      link: "/nutrition",
    },
    {
      name: "Sleep",
      image: "/sleep.webp",
      link: "/sleep",
    },
    {
      name: "Mental Health",
      image: "/mentalhealth.webp",
      link: "/mental-health",
    },
    {
      name: "Fitness",
      image: "/fitness.webp",
      link: "/fitness",
    },
    {
      name: "Product Reviews",
      image: "/productreviews.webp",
      link: "/product-reviews",
    },
    {
      name: "VIEW ALL",
      image: "/view4.png",
      link: "/all-categories",
    },
  ];

  const [activeCategory, setActiveCategory] = React.useState("VIEW ALL");

  const handleCategoryClick = (category) => {
    setActiveCategory(category.name);
    if (category.link) {
      navigate(category.link);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col space-y-8">
        {/* Title */}
        <motion.h3
          className="text-2xl font-bold text-center text-white-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          EXPLORE BY CATEGORY
        </motion.h3>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              className="flex flex-col items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleCategoryClick(category)}
            >
              {/* Image Container */}
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full mb-3 flex items-center justify-center p-2 transition-all ${
                  activeCategory === category.name
                    ? "bg-purple-100 border-2 border-purple-600"
                    : "bg-gray-100 border-2 border-transparent"
                }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = "/vite.svg";
                  }}
                />
              </div>

              {/* Category Name */}
              <span
                className={`text-sm md:text-base font-medium ${
                  activeCategory === category.name
                    ? "text-purple-600 font-semibold"
                    : "text-white-700"
                }`}
              >
                {category.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
