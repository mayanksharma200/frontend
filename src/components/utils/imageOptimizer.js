// utils/imageOptimizer.js
export function getOptimizedUnsplashUrl(url, width = 800) {
  if (!url || !url.includes("unsplash.com")) return url;
  return url.split("?")[0] + `?fm=webp&w=${width}&q=80`;
}
