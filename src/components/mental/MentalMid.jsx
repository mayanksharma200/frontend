import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const MentalMid = () => {
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch(
          "https://fitness-backend-api-production.up.railway.app/api/posts/mental-mid"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch mental tips");
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
        window.open(tipLink, "_blank");
      }
    } else {
      navigate(`/article/${tipId}`, { state: { from: location.pathname } });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center max-w-5xl mx-auto my-8">
        Error: {error}
      </div>
    );
  }

  if (!tips.length) {
    return (
      <div className="text-center text-gray-500 py-8 max-w-5xl mx-auto px-4">
        No mental tips available
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 bg-white text-black max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-black mb-3">Mental TIPS</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 mx-auto rounded"></div>
      </motion.div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip, index) => (
          <motion.article
            key={tip._id}
            className="group bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => handleTipClick(tip._id, tip.link)}
          >
            <div className="mb-4 overflow-hidden rounded-t-xl">
              <img
                src={tip.image}
                alt={tip.title}
                className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-300"
                onError={(e) => (e.target.src = "/vite.svg")}
              />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2 px-4">
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-[length:0%_2px] bg-left-bottom bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                {tip.title}
              </span>
            </h3>
            <div className="mt-auto px-4 pb-4">
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
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          className="w-full max-w-5xl mb-4 h-[400px]"
        >
          {tips.map((tip, index) => (
            <SwiperSlide key={tip._id}>
              <motion.article
                className="relative rounded-xl overflow-hidden h-full cursor-pointer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => handleTipClick(tip._id, tip.link)}
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-full object-cover brightness-90"
                    onError={(e) => (e.target.src = "/vite.svg")}
                  />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 to-transparent rounded-xl text-white">
                  <h3 className="text-2xl font-bold mb-3 drop-shadow-md">
                    {tip.title}
                  </h3>
                  <button
                    className="self-start bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
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
    </section>
  );
};

export default MentalMid;
