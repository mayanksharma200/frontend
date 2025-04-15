import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const NutritionMid = () => {
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch(
          "https://fitness-backend-api.vercel.app/api/posts/mid-nutrition"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch nutrition tips");
        }
        const data = await response.json();
        setTips(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTips();
  }, []);

  const handleTipClick = (tipId, tipLink) => {
    if (tipLink) {
      if (!tipLink.startsWith("http")) {
        navigate(tipLink, { state: { from: location.pathname } });
      } else {
        window.location.href = tipLink;
      }
    } else {
      navigate(`/article/${tipId}`, { state: { from: location.pathname } });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded text-center">
        Error: {error}
      </div>
    );
  }

  if (!tips.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        No nutrition tips available
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            NUTRITION TIPS
          </h2>
          <div className="w-16 h-1 bg-purple-500 dark:bg-purple-400 mx-auto"></div>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <motion.article
              key={tip._id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="h-full flex flex-col">
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-300"
                    onError={(e) => (e.target.src = "/vite.svg")}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 px-2">
                  <span className="bg-gradient-to-r from-purple-500 to-purple-500 bg-[length:0%_2px] bg-left-bottom bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    {tip.title}
                  </span>
                </h3>
                <div className="mt-auto px-2">
                  <button
                    className="text-purple-600 dark:text-purple-400 font-medium flex items-center group-hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTipClick(tip._id, tip.link);
                    }}
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="md:hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            className="w-full max-w-5xl mb-2 md:mb-4 h-100"
          >
            {tips.map((tip, index) => (
              <SwiperSlide key={tip._id}>
                <motion.article
                  className="group relative rounded-lg overflow-hidden h-[400px]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => handleTipClick(tip._id, tip.link)}
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src={tip.image}
                      alt={tip.title}
                      className="w-full h-full object-cover brightness-75"
                      onError={(e) => (e.target.src = "/vite.svg")}
                    />
                  </div>
                  <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                    <h3 className="text-2xl font-bold mb-3 drop-shadow-md">
                      {tip.title}
                    </h3>
                    <button
                      className="self-start bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTipClick(tip._id, tip.link);
                      }}
                    >
                      Read More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default NutritionMid;
