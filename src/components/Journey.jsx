import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Blog from "./Blog";

const sports = [
  { name: "Running", met: 9.8 },
  { name: "Cycling", met: 7.5 },
  { name: "Swimming", met: 8.0 },
  { name: "Tennis", met: 7.3 },
  { name: "Basketball", met: 6.5 },
  { name: "Yoga", met: 3.0 },
  { name: "Football", met: 8.3 },
];

const JourneyUI = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [period, setPeriod] = useState("");
  const [hydrationGoal, setHydrationGoal] = useState("");
  const [workoutFrequency, setWorkoutFrequency] = useState("");
  const [sessionDuration, setSessionDuration] = useState("");

  const [sport, setSport] = useState(sports[0]);
  const [duration, setDuration] = useState("");

  const [bmi, setBmi] = useState(null);
  const [calories, setCalories] = useState(null);

  const handleNext = () => {
    if (step === 1) {
      if (!height || !weight || !gender) {
        toast.error("Please complete all required fields.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/");
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handleCalculate = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    const totalDuration =
      parseFloat(workoutFrequency) * parseFloat(sessionDuration); // total minutes per week
    const caloriesBurned =
      ((sport.met * 3.5 * parseFloat(weight)) / 200) * totalDuration;

    setCalories(caloriesBurned.toFixed(2));

    setStep(4);
  };

  return (
    <>
      {/* Step 1 & 2: Centered card */}
      {(step === 1 || step === 2) && (
        <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6">
          <div className="w-full max-w-3xl rounded-2xl bg-white/5 backdrop-blur-lg border border-gray-700 shadow-2xl p-8">
            <button
              onClick={handleBack}
              className="mb-4 text-gray-400 hover:text-white transition flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back
            </button>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                  Let's Start Your Journey
                </h2>
                <div className="space-y-4">
                  <InputField label="Name" value={name} onChange={setName} />
                  <InputField
                    label="Age"
                    value={age}
                    onChange={setAge}
                    type="number"
                  />
                  <InputField
                    label="Height (cm)"
                    value={height}
                    onChange={setHeight}
                    type="number"
                  />
                  <InputField
                    label="Weight (kg)"
                    value={weight}
                    onChange={setWeight}
                    type="number"
                  />
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  {gender === "Female" && (
                    <InputField
                      label="Period Cycle Length (days)"
                      value={period}
                      onChange={setPeriod}
                      type="number"
                    />
                  )}
                  <InputField
                    label="Hydration Goal (liters/day)"
                    value={hydrationGoal}
                    onChange={setHydrationGoal}
                    type="number"
                  />
                </div>
                <button
                  onClick={handleNext}
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Next
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                  Tell us about your Activity
                </h2>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm">Sport</label>
                    <select
                      value={sport.name}
                      onChange={(e) =>
                        setSport(sports.find((s) => s.name === e.target.value))
                      }
                      className="bg-gray-800 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      {sports.map((s, idx) => (
                        <option key={idx} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <InputField
                    label="How many times do you workout per week?"
                    value={workoutFrequency}
                    onChange={setWorkoutFrequency}
                    type="number"
                  />

                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm">
                      How long is each workout session?
                    </label>
                    <select
                      value={sessionDuration}
                      onChange={(e) => setSessionDuration(e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="">Select Duration</option>
                      <option value="30">30 Minutes</option>
                      <option value="60">1 Hour</option>
                      <option value="120">2 Hours</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Calculate
                </button>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Step 4: FULLSCREEN RESULTS */}
      {step === 4 && (
        <>
          <section className="w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-7xl mx-auto space-y-10"
            >
              <button
                onClick={() => navigate("/")}
                className="mb-6 text-gray-400 hover:text-white transition flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Home
              </button>

              <div className="w-full bg-white/5 backdrop-blur-lg border border-gray-700 p-8 rounded-2xl text-white space-y-4 shadow-xl">
                <ResultItem label="BMI" value={bmi} />
                <ResultItem
                  label="Calories Burned"
                  value={`${calories} kcal`}
                />
                <ResultItem
                  label="Hydration Target"
                  value={`${hydrationGoal} liters/day`}
                />
                {gender === "Female" && period && (
                  <ResultItem
                    label="Period Cycle Length"
                    value={`${period} days`}
                  />
                )}
              </div>

              <div className="w-full bg-white/5 backdrop-blur-lg border border-gray-700 p-8 rounded-2xl text-white space-y-4 shadow-xl">
                <h3 className="text-2xl font-semibold mb-4">
                  Recommended Meal Plan
                </h3>
                {bmi < 18.5 ? (
                  <p>
                    High-protein meals, calorie surplus. Focus on nutrient-dense
                    foods like nuts, avocados, and lean meats.
                  </p>
                ) : bmi >= 18.5 && bmi < 24.9 ? (
                  <p>
                    Balanced diet with fruits, vegetables, proteins, and carbs.
                    Maintain your healthy lifestyle!
                  </p>
                ) : (
                  <p>
                    Low-carb, high-protein meals. Focus on veggies, lean
                    protein, and healthy fats to lose weight.
                  </p>
                )}
              </div>
            </motion.div>
          </section>

          <Blog />
        </>
      )}
    </>
  );
};

// Reusable Input
const InputField = ({ label, value, onChange, type = "text" }) => (
  <div className="flex flex-col gap-2">
    <label className="text-gray-300 text-sm">{label}</label>
    <input
      type={type}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-800 border border-gray-700 text-white p-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
    />
  </div>
);

// Reusable Result
const ResultItem = ({ label, value }) => (
  <p>
    <strong>{label}:</strong> {value}
  </p>
);

export default JourneyUI;