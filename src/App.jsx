import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ArticlesGrid from "./components/ArticlesGrid";
import ArticleDetail from "./components/ArticleDetails";
import CategoryFilter from "./components/CategoryFilter";
import LatestArticles from "./components/LatestArticles";
import TopReads from "./TopReads";
import SpotlightSection from "./components/Spotlightsection";
import SponsoredTopics from "./components/SponsoredTopics";
import WellnessFooter from "./components/WellnessFooter";
import Admin from "./components/Admin";
import NutritionTop from "./components/nutrition/NutritionTop";
import NutritionMid from "./components/nutrition/NutritionMid";
import SleepTop from "./components/sleep/SleepTop";
import SleepMid from "./components/sleep/SleepMid";
import MentalTop from "./components/mental/MentalTop";
import FitnessTop from "./components/fitness/FitnessTop";
import FitnessMid from "./components/fitness/FitnessMid";
import ProductTop from "./components/productreviews/ProductTop";
import ProductMid from "./components/productreviews/ProductMid";
import ViewAllTop from "./components/viewall/ViewAllTop";
import ViewAllMid from "./components/viewall/ViewAllMid";
import MentalMid from "./components/mental/MentalMid";

// ScrollToTop component to handle scroll restoration
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
      <div className="max-w-10xl mx-auto h-auto overflow-x-hidden bg-gray-900">
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ArticlesGrid />
                <CategoryFilter />
                <LatestArticles />
                <TopReads />
                <SpotlightSection />
                <SponsoredTopics />
                <WellnessFooter />
              </>
            }
          />

          {/* Articles listing page */}
          <Route
            path="/articles"
            element={
              <>
                <ArticlesGrid />
                <WellnessFooter />
              </>
            }
          />

          {/* Article detail page */}
          <Route path="/article/:id" element={<ArticleDetail />} />

          {/* Admin page */}
          <Route path="/admin" element={<Admin />} />

          {/* Nutrition page */}
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

          {/* Sleep page */}
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

          {/* Mental page */}
          <Route
            path="/Mental-health"
            element={
              <>
                <MentalTop />
                <MentalMid/>
                <WellnessFooter />
              </>
            }
          />

          {/* Fitness page */}
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

          {/* Product reviews page */}
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
          {/* viewall page */}
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
        <ToastContainer
          theme="dark"
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
