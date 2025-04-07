import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
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

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="max-w-10xl mx-auto h-auto overflow-x-hidden">
        <Hero />
        <WorkoutSessions />
        <Gallery />
        <Pricing />
        <Contact />
        <BMICalculator />
        {/* <Footer /> */}
        <ToastContainer theme="dark" position="top-center" />
      </div>
    </Router>
  );
};

export default App;
