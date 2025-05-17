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
        setIsLoading(true);
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

  // Skeleton Loading Components
  const DesktopSkeletonCard = () => (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
        <div className="mt-auto">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  const MobileSkeletonSlide = () => (
    <div className="relative rounded-lg overflow-hidden h-[400px] bg-gray-200 animate-pulse">
      <div className="absolute inset-0 flex items-end p-6">
        <div className="w-full">
          <div className="h-8 w-3/4 bg-gray-300 rounded animate-pulse mb-3"></div>
          <div className="h-10 w-24 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  const handleTipClick = (tipId, tipLink) => {
    if (tipLink) {
      if (!tipLink.startsWith("http")) {
        navigate(tipLink, { state: { from: location.pathname } });
      } else {
        window.open(tipLink, "_blank");
      }
    } else {
      navigate(`/article/${tipId}`, { state: { from: location.pathname } });
    }
  };

  if (error) {
    return (
      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
            Error: {error}
            <button
              onClick={() => window.location.reload()}
              className="ml-2 text-indigo-600 hover:text-indigo-800"
            >
              Try again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!tips.length && !isLoading) {
    return (
      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center text-gray-500">
          No nutrition tips available
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mb-3">
            NUTRITION TIPS
          </h2>
          <motion.div
            className="h-[2px] bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ maxWidth: "180px" }}
          />
        </motion.div>

        {/* Desktop Grid - Loading State */}
        {isLoading && (
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <DesktopSkeletonCard />
              </motion.div>
            ))}
          </div>
        )}

        {/* Desktop Grid - Loaded State */}
        {!isLoading && (
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, index) => (
              <motion.article
                key={tip._id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => handleTipClick(tip._id, tip.link)}
              >
                <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
                  <div className="mb-4 overflow-hidden rounded-t-lg">
                    <img
                      src={tip.image}
                      alt={tip.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => (e.target.src = "/vite.svg")}
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <span className="bg-gradient-to-r from-indigo-600 to-indigo-600 bg-[length:0%_2px] bg-left-bottom bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                        {tip.title}
                      </span>
                    </h3>
                    <div className="mt-auto">
                      <button
                        className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center transition-colors"
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
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Mobile Swiper - Loading State */}
        {isLoading && (
          <div className="md:hidden">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              loop={true}
            >
              {[...Array(3)].map((_, index) => (
                <SwiperSlide key={index}>
                  <MobileSkeletonSlide />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Mobile Swiper - Loaded State */}
        {!isLoading && (
          <div className="md:hidden h-100">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              loop={true}
            >
              {tips.map((tip, index) => (
                <SwiperSlide key={tip._id}>
                  <motion.article
                    className="group relative rounded-lg overflow-hidden h-[400px] cursor-pointer"
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
                        className="self-start bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
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
        )}
      </div>
    </section>
  );
};

export default NutritionMid;
