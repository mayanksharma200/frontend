export function sendPageView(url) {
  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
    });
  }
}
