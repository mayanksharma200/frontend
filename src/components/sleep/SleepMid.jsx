import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-lg shadow-md p-4 flex flex-col">
    <div className="bg-indigo-200 h-48 rounded-lg mb-4" />
    <div className="h-6 bg-indigo-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-indigo-200 rounded w-1/2 mt-auto" />
  </div>
);

const SleepMid = () => {
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch(
          "https://fitness-backend-api-production.up.railway.app/api/posts/sleep-mid"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sleep tips");
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
      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-12 text-center">
            <div className="h-10 w-48 bg-indigo-300 rounded mx-auto mb-3 animate-pulse" />
            <div className="w-16 h-1 bg-indigo-400 mx-auto rounded animate-pulse"></div>
          </div>

          {/* Desktop Grid Skeleton */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>

          {/* Mobile Swiper Skeleton */}
          <div className="md:hidden">
            <div className="w-full max-w-5xl mb-2 md:mb-4 h-[400px]">
              <SkeletonCard />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center max-w-3xl mx-auto mt-8">
        Error: {error}
      </div>
    );
  }

  if (!tips.length) {
    return (
      <div className="text-center text-gray-500 py-8 max-w-3xl mx-auto">
        No sleep tips available
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-indigo-900 mb-3">
            SLEEP TIPS
          </h2>
          <div className="w-16 h-1 bg-indigo-600 mx-auto rounded"></div>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <motion.article
              key={tip._id}
              className="group bg-white rounded-lg shadow-md p-4 flex flex-col cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => handleTipClick(tip._id, tip.link)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleTipClick(tip._id, tip.link);
                }
              }}
            >
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-300 rounded"
                  onError={(e) => (e.target.src = "/vite.svg")}
                />
              </div>
              <h3 className="text-xl font-semibold text-indigo-900 mb-2 px-2">
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-[length:0%_2px] bg-left-bottom bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  {tip.title}
                </span>
              </h3>
              <div className="mt-auto px-2">
                <button
                  className="text-indigo-600 font-medium flex items-center group-hover:underline"
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
            </motion.article>
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="md:hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="w-full max-w-5xl mb-2 md:mb-4 h-[400px]"
          >
            {tips.map((tip, index) => (
              <SwiperSlide key={tip._id}>
                <motion.article
                  className="group relative rounded-lg overflow-hidden h-full cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => handleTipClick(tip._id, tip.link)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleTipClick(tip._id, tip.link);
                    }
                  }}
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src={tip.image}
                      alt={tip.title}
                      className="w-full h-full object-cover brightness-90"
                      onError={(e) => (e.target.src = "/vite.svg")}
                    />
                  </div>
                  <div className="relative z-10 h-full flex flex-col justify-end p-6 text-indigo-900 bg-gradient-to-t from-white/90 via-white/60 to-transparent rounded-lg">
                    <h3 className="text-2xl font-bold mb-3 drop-shadow-sm">
                      {tip.title}
                    </h3>
                    <button
                      className="self-start bg-indigo-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
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

export default SleepMid;
