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
import SpotlightSection from "./components/Spotlightsection";
import SponsoredTopics from "./components/SponsoredTopics";
import WellnessFooter from "./components/WellnessFooter";

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

// ScrollToTop component remains the same
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="max-w-10xl mx-auto h-auto overflow-x-hidden bg-white-900">
        <ScrollToTop />
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ArticlesGrid />
                  <CategoryFilter />
                  <TopReads />
                  {/* <SpotlightSection /> */}
                  {/* <SponsoredTopics /> */}
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
              path="/Mental-health"
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
