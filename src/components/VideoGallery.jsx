import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("https://fitness-backend-api-production.up.railway.app/api/videos")
      .then((res) => setVideos(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Health & Wellness Videos
      </h2>

      {videos.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No videos found</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              <video
                className="w-full h-48 object-cover"
                src={`https://fitness-backend-api-production.up.railway.app/api/videos/${encodeURIComponent(
                  video.filename
                )}`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls={false}
                title={video.filename}
              />
              <div className="p-4 flex-grow flex flex-col justify-between">
                <h3
                  className="text-lg font-semibold text-gray-900 truncate"
                  title={video.filename}
                >
                  {video.filename}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Uploaded on {new Date(video.uploadDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default VideoGallery;
