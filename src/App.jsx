// App.jsx
import React, { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import CategoryFilter from "./components/CategoryFilter";
import TopReads from "./TopReads";
import WellnessFooter from "./components/WellnessFooter";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import TermsAndPolicy from "./components/TermsAndPolicy";
import CookiesPolicy from "./components/CookiesPolicy";
import VideoGallery from "./components/VideoGallery";
import AdminVideoUpload from "./components/AdminVideoUpload";
import AdminCus from "./components/admin/AdminCus";
import { sendPageView } from "./analytics"; // Add this import
import AdSlot from "./components/AdSlot";


// Lazy load route components
const ArticlesGrid = lazy(() => import("./components/ArticlesGrid"));
const ArticleDetail = lazy(() => import("./components/ArticleDetails"));
const Admin = lazy(() => import("./components/Admin"));
const NutritionTop = lazy(() => import("./components/nutrition/NutritionTop"));
const NutritionMid = lazy(() => import("./components/nutrition/NutritionMid"));
const SleepTop = lazy(() => import("./components/sleep/SleepTop"));
const SleepMid = lazy(() => import("./components/sleep/SleepMid"));
const MentalTop = lazy(() => import("./components/mental/MentalTop"));
const MentalMid = lazy(() => import("./components/mental/MentalMid"));
const FitnessTop = lazy(() => import("./components/fitness/FitnessTop"));
const FitnessMid = lazy(() => import("./components/fitness/FitnessMid"));
const ProductTop = lazy(() => import("./components/productreviews/ProductTop"));
const ProductMid = lazy(() => import("./components/productreviews/ProductMid"));
const ViewAllTop = lazy(() => import("./components/viewall/ViewAllTop"));
const ViewAllMid = lazy(() => import("./components/viewall/ViewAllMid"));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Track page view on route change (Google Analytics)
const PageViewTracker = () => {
  const location = useLocation();
  React.useEffect(() => {
    sendPageView(location.pathname + location.search);
  }, [location]);
  return null;
};

const SuspenseFallback = () => (
  <section className="py-6 px-4 sm:px-6 bg-gray-50 min-h-screen h-[1200px] sm:h-[700px]">
    <div className="max-w-6xl lg:max-w-5xl mx-auto">
      <div className="mb-6 lg:mb-8 text-center">
        <div className="inline-block w-full">
          <h2 className="mt-3 text-sm lg:text-lg text-gray-600 max-w-2xl lg:max-w-lg mx-auto font-light md:text-6xl">
            Your premier destination for expert health guidance and
            transformative wellness strategies.
          </h2>
          <div
            className="mx-auto w-full h-[220px] object-cover rounded-lg mt-4 mb-2 bg-gray-200 animate-pulse"
            style={{ maxWidth: 800, minHeight: 180, background: "#e5e7eb" }}
          />
        </div>
      </div>
      {/* Optionally: Add grid/card skeletons below if needed */}
    </div>
  </section>
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="max-w-10xl mx-auto h-auto overflow-x-hidden bg-white">
        <ScrollToTop />
        <PageViewTracker />
        <Suspense fallback={<SuspenseFallback />}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ArticlesGrid />
                  <AdSlot
                    url="https://lms.pixeltrack.co.in/perf/lms/click?campaign_id=944&publisher_id=VA-667&sub_publisher_id=1"
                    alt="Amazing Dell offer! Click to learn more"
                  />

                  {/* <AdSlot
                    size="300x250"
                    url="https://lms.pixeltrack.co.in/perf/lms/click?campaign_id=944&publisher_id=VA-667&sub_publisher_id=1"
                    alt="Amazing Dell offer! Click to learn more"
                  /> */}

                  <CategoryFilter />
                  <TopReads />
                  <WellnessFooter />
                </>
              }
            />
            <Route
              path="/articles"
              element={
                <>
                  <ArticlesGrid />
                  <WellnessFooter />
                </>
              }
            />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admincus" element={<AdminCus />} />
            <Route
              path="/nutrition"
              element={
                <>
                  <NutritionTop />
                  <NutritionMid />
                  <WellnessFooter />
                </>
              }
            />
            <Route
              path="/sleep"
              element={
                <>
                  <SleepTop />
                  <SleepMid />
                  <WellnessFooter />
                </>
              }
            />
            <Route
              path="/mental-health"
              element={
                <>
                  <MentalTop />
                  <MentalMid />
                  <WellnessFooter />
                </>
              }
            />
            <Route
              path="/fitness"
              element={
                <>
                  <FitnessTop />
                  <FitnessMid />
                  <WellnessFooter />
                </>
              }
            />
            <Route
              path="/product-reviews"
              element={
                <>
                  <ProductTop />
                  <ProductMid />
                  <WellnessFooter />
                </>
              }
            />
            <Route
              path="/all-categories"
              element={
                <>
                  <ViewAllTop />
                  <ViewAllMid />
                  <WellnessFooter />
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/terms" element={<TermsAndPolicy />} />
            <Route path="/cookies" element={<CookiesPolicy />} />
            <Route path="/videos" element={<VideoGallery />} />
            <Route path="/adminvideos" element={<AdminVideoUpload />} />
          </Routes>
        </Suspense>
        <ToastContainer
          theme="light"
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
};

export default App;
