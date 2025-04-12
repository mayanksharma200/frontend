import React, { useEffect, useState } from "react";

const NutritionTop = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://fitness-backend-api.vercel.app/api/posts/top-nutrition"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        No articles available
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-900 text-gray-100">
      {/* Featured Header */}
      <div className="mb-10">
        <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-800 text-purple-100 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
          FEATURED
        </span>
        <h2 className="text-3xl font-bold text-purple-500 mb-1">
          Healthy Eating Refresh:
        </h2>
        <p className="text-lg text-purple-200 font-medium mb-2">
          Letter from the Editor
        </p>
        <p className="text-gray-300 max-w-2xl">
          At Healthine Nutrition, we want to help you eat food that makes you
          feel good...
        </p>
      </div>

      {/* Main Articles Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Large featured article on left */}
        {articles.length > 0 && (
          <div className="md:w-1/2 bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors duration-300">
            <div className="h-64 md:h-80 bg-gray-700 overflow-hidden">
              <img
                src={articles[0].image}
                alt={articles[0].title}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 hover:text-purple-100 transition-colors duration-300">
                {articles[0].title}
              </h3>
              <p className="text-gray-300 mb-4">
                {articles[0].content.summary[0].text}
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <span>{articles[0].meta.date}</span>
                <span className="mx-2 text-purple-400">•</span>
                <span>{articles[0].meta.readTime}</span>
              </div>
            </div>
          </div>
        )}

        {/* Three smaller articles on right */}
        <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {articles.slice(1, 4).map((article) => (
            <div
              key={article._id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors duration-300"
            >
              <div className="h-40 bg-gray-700 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-purple-200 mb-2 hover:text-purple-100 transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {article.content.summary[0].text}
                </p>
                <div className="flex items-center text-xs text-gray-400">
                  <span>{article.meta.date}</span>
                  <span className="mx-1 text-purple-400">•</span>
                  <span>{article.meta.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional articles in a row below */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(4).map((article) => (
          <div
            key={article._id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors duration-300"
          >
            <div className="h-40 bg-gray-700 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-md font-bold text-purple-200 mb-2 hover:text-purple-100 transition-colors duration-300">
                {article.title}
              </h3>
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                {article.content.summary[0].text}
              </p>
              <div className="flex items-center text-xs text-gray-400">
                <span>{article.meta.date}</span>
                <span className="mx-1 text-purple-400">•</span>
                <span>{article.meta.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionTop;
