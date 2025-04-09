import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Import Routes, Route
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WorkoutSessions from "./components/WorkoutSessions";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import BMICalculator from "./components/BMICalculator";
import Footer from "./components/Footer";
import CaloriesCalculator from "./components/CaloriesCalculator";
import Journey from "./components/Journey"; // ✅ Your new page
import Blog from "./components/Blog";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="max-w-10xl mx-auto h-auto overflow-x-hidden">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <WorkoutSessions />
                <Gallery />
                <CaloriesCalculator />
                <BMICalculator />
                <Pricing />
                <Contact />
                {/* <Footer /> */}
              </>
            }
          />
          <Route path="/journey" element={<Journey />} />{" "}
          <Route path="/Blog" element={<Blog />} />{" "}
          {/* ✅ Route to your new page */}
        </Routes>
        <ToastContainer theme="dark" position="top-center" />
      </div>
    </Router>
  );
};

export default App;
