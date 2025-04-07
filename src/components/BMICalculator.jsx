import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();

    if (!height || !weight || !gender) {
      toast.error("Please enter valid height, weight and gender.");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      toast.warning(
        "You are underweight. Consider seeking advice from a healthcare provider."
      );
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      toast.success(
        "You have normal weight. Keep maintaining a healthy lifestyle."
      );
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      toast.warning(
        "You are overweight. Consider seeking advice from a healthcare provider."
      );
    } else {
      toast.error(
        "You are in the obese range. It is recommended to seek advice from a healthcare specialist."
      );
    }
  };

  return (
    <section
      id="bmicalculator"
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-10"
    >
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Form Section */}
        <motion.div
          className="p-10 flex flex-col justify-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-purple-700 text-center">
            BMI CALCULATOR
          </h1>

          <form onSubmit={calculateBMI} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black bg-white"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Calculate BMI
            </button>

            {bmi && (
              <div className="mt-4 text-center text-lg font-bold text-indigo-700">
                Your BMI: {bmi}
              </div>
            )}
          </form>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="hidden md:flex items-center justify-center p-10 bg-purple-100"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/bmi.jpg"
            alt="BMI Illustration"
            className="w-full h-auto object-cover rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BMICalculator;
