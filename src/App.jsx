import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";

// Components
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
import NutritionTop from "./components/NutritionTop";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="max-w-10xl mx-auto h-auto overflow-x-hidden bg-gray-900">
        <Routes>
          <Route
            path="/"
            element={
              <>
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
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/nutrition"
            element={
              <>
                <NutritionTop />
                <WellnessFooter />
              </>
            }
          />
        </Routes>
        <ToastContainer theme="dark" position="top-center" />
      </div>
    </Router>
  );
};

export default App;
