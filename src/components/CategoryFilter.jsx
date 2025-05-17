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
    <div className="max-w-5xl mx-auto px-6 py-16 bg-white">
      <div className="flex flex-col space-y-12">
        {/* Title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h3
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 tracking-tight"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            Explore By Category
          </motion.h3>
          <motion.div
            className="h-[2px] bg-gradient-to-r from-indigo-100 to-rose-100 rounded-full mt-4 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ maxWidth: "180px" }}
          />
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="flex flex-col items-center cursor-pointer group"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handleCategoryClick(category)}
            >
              {/* Image Container */}
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-xl mb-3 flex items-center justify-center p-3 transition-all duration-300 ${
                  activeCategory === category.name
                    ? "bg-gradient-to-br from-indigo-50 to-pink-50 border border-indigo-100 shadow-md shadow-indigo-50"
                    : "bg-gray-50 border border-gray-100 group-hover:border-indigo-100 group-hover:shadow-sm group-hover:shadow-indigo-50"
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
                className={`text-sm md:text-base font-medium transition-colors ${
                  activeCategory === category.name
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-600 group-hover:text-indigo-500"
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
