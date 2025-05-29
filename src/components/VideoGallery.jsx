import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Module-level cache: persists for the session/tab
let cachedVideos = null;

const SkeletonCard = () => (
  <div className="bg-gray-100 rounded-xl shadow-xl animate-pulse flex flex-col overflow-hidden">
    <div className="w-full h-48 bg-gray-200" />
  </div>
);

const VideoGallery = () => {
  const [videos, setVideos] = useState(cachedVideos || []);
  const [loading, setLoading] = useState(!cachedVideos);
  const [active, setActive] = useState(null); // Active video for modal
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (cachedVideos) return; // If cached, don't load again
    setLoading(true);
    axios
      .get("https://fitness-backend-api-production.up.railway.app/api/videos")
      .then((res) => {
        setVideos(res.data);
        cachedVideos = res.data; // Cache for the session/tab
      })
      .catch(() => {
        setVideos([]);
        cachedVideos = [];
      })
      .finally(() => setLoading(false));
  }, []);

  // Modal keyboard close support
  useEffect(() => {
    if (!active) return;
    const handleKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active]);

  // Go back to home page
  const handleBack = () => {
    navigate("/");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back to Home Button */}
      <motion.button
        onClick={handleBack}
        className="flex items-center text-indigo-600 mb-10 hover:text-indigo-800 transition-colors"
        whileHover={{ x: -5 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Home
      </motion.button>

      {loading ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <svg
            className="w-16 h-16 text-gray-300 mb-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            viewBox="0 0 24 24"
          >
            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
          </svg>
          <p className="text-gray-500 text-lg">No videos found</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <button
              key={video._id}
              className="bg-white rounded-xl shadow-xl group overflow-hidden focus:outline-none hover:ring-4 hover:ring-blue-300/30 transition-all flex flex-col"
              onClick={() => setActive(video)}
              aria-label="Preview video"
              tabIndex={0}
            >
              <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                <video
                  className="w-full h-full object-cover"
                  src={`https://fitness-backend-api-production.up.railway.app/api/videos/${encodeURIComponent(
                    video.filename
                  )}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  controls={false}
                  poster="/video-placeholder.webp"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/30">
                  <svg
                    className="w-14 h-14 text-white/80 drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Video Modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-w-2xl w-full mx-4 bg-black rounded-xl shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActive(null);
              }}
              className="absolute top-2 right-2 text-white/70 hover:text-white bg-black/30 rounded-full p-1 transition z-10"
              aria-label="Close preview"
            >
              <svg width={28} height={28} fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 6L6 18M6 6l12 12"
                />
              </svg>
            </button>
            <video
              className="w-full h-[50vw] max-h-[75vh] bg-black rounded-xl"
              src={`https://fitness-backend-api-production.up.railway.app/api/videos/${encodeURIComponent(
                active.filename
              )}`}
              controls
              autoPlay
              playsInline
              preload="auto"
              style={{ background: "#222" }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoGallery;
