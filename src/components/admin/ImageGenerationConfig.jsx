import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ImageGenerationConfig({
  image,
  setImage,
  title,
  sectionsCount,
  setSectionsCount,
  generateAIContent,
  isGenerating,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  // ImagePicker internal states
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const scrollRef = useRef(null);

  // Fetch images only when picker is shown and searchQuery is set
  useEffect(() => {
    if (!showPicker || !searchQuery.trim()) {
      setImages([]);
      setPage(1);
      setHasMore(false);
      setPreviewUrl(null);
      return;
    }

    setLoading(true);
    setError("");

    axios
      .get(
        "https://fitness-backend-api-production.up.railway.app/api/posts/fluximg",
        {
          params: { query: searchQuery, per_page: showPicker ? 6 : 12, page },
        }
      )
      .then((res) => {
        if (page === 1) {
          setImages(res.data.results || []);
        } else {
          setImages((prev) => [...prev, ...(res.data.results || [])]);
        }
        setHasMore(page < res.data.total_pages);
        if (scrollRef.current && page === 1) scrollRef.current.scrollTop = 0;
      })
      .catch(() => setError("Failed to fetch images"))
      .finally(() => setLoading(false));
  }, [showPicker, searchQuery, page]);

  const handleSearchClick = () => {
    if (!searchQuery.trim()) return;
    setPage(1);
    setShowPicker(true);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const closePicker = () => {
    setShowPicker(false);
    setPreviewUrl(null);
  };

  // Modal preview for selected image
  const PreviewModal = () => (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
      onClick={() => setPreviewUrl(null)}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onKeyDown={(e) => e.key === "Escape" && setPreviewUrl(null)}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-4xl max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setPreviewUrl(null)}
          aria-label="Close preview"
          className="absolute top-3 right-3 text-gray-500 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-full transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full max-h-[70vh] object-contain rounded"
          />
          <button
            onClick={() => {
              setImage(previewUrl);
              setPreviewUrl(null);
              closePicker();
            }}
            className="absolute top-2 left-2 bg-pink-600 bg-opacity-90 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:bg-pink-700 transition focus:outline-none focus:ring-2 focus:ring-pink-400 whitespace-nowrap"
          >
            Select this image
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="my-4 p-4 border rounded bg-gray-50">
      <h3 className="font-semibold mb-2">Image & AI Content Generation</h3>

      <div className="mb-3">
        <label className="block mb-1 font-medium">
          Number of Sections to Generate
        </label>
        <select
          value={sectionsCount}
          onChange={(e) => setSectionsCount(Number(e.target.value))}
          className="border p-2 rounded w-full"
        >
          {[3, 5, 7, 10].map((num) => (
            <option key={num} value={num}>
              {num} Sections
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-medium">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter or generate image URL"
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Search input and button */}
      <div className="mb-3">
        <label className="block mb-1 font-medium">Search Images</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Unsplash images"
            className="border p-2 rounded flex-grow"
            onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
          />
          <button
            type="button"
            onClick={handleSearchClick}
            disabled={loading || !searchQuery.trim()}
            className={`px-4 py-2 rounded text-white ${
              loading || !searchQuery.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
      </div>

      {/* Button to open picker if closed */}
      {!showPicker && (
        <button
          type="button"
          onClick={() => setShowPicker(true)}
          disabled={!searchQuery.trim()}
          className={`mb-3 px-4 py-2 rounded text-white ${
            !searchQuery.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          Open Image Picker
        </button>
      )}

      {/* Image Picker Modal */}
      {showPicker && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black bg-opacity-40"
          onClick={closePicker}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-lg text-gray-700">
                Images for "{searchQuery}"
              </div>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
                onClick={closePicker}
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {loading && <div className="mb-2">Loading images...</div>}
            {error && <div className="text-red-500 mb-2">{error}</div>}

            <div
              ref={scrollRef}
              className="overflow-y-auto"
              style={{ maxHeight: "60vh" }}
            >
              <div className="grid grid-cols-3 gap-4">
                {images.map((img) => (
                  <button
                    key={img.id}
                    type="button"
                    className="focus:outline-none border-2 border-transparent hover:border-pink-500 rounded transition"
                    onClick={() => setPreviewUrl(img.urls.regular)}
                    title="Click to preview this image"
                  >
                    <img
                      src={img.urls.small}
                      alt={img.alt_description || "Unsplash"}
                      className="w-full h-32 object-cover rounded bg-gray-100"
                    />
                  </button>
                ))}
              </div>
              {hasMore && (
                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-pink-500 text-white rounded shadow"
                    onClick={loadMore}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Preview modal */}
          {previewUrl && <PreviewModal />}
        </div>
      )}

      <button
        type="button"
        onClick={generateAIContent}
        disabled={isGenerating || !title}
        className={`w-full py-2 rounded text-white ${
          isGenerating || !title
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
        title={!title ? "Enter a title to generate content" : ""}
      >
        {isGenerating ? "Generating AI Content..." : "Generate AI Content"}
      </button>
    </div>
  );
}
