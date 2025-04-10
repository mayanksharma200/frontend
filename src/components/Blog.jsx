import React from "react";
import { motion } from "framer-motion";

export default function FitnessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-16 flex flex-col items-center font-sans">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-6xl mb-20"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Elevate Your Fitness at{" "}
          <span className="text-purple-400">FitLife Club</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl">
          Where science meets dedication to transform your body and mind through
          optimal nutrition and strategic training.
        </p>
      </motion.div>

      {/* Nutrition Section */}
      <section className="w-full max-w-6xl mb-28">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative overflow-hidden rounded-3xl shadow-2xl mb-16 h-96"
        >
          <img
            src="https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=1200&q=80"
            alt="Healthy Nutrition"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-10">
            <h2 className="text-4xl font-semibold text-white">
              Nutrition for Peak Performance
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <p className="text-xl text-gray-300 leading-relaxed">
              Nutrition is the foundation of physical transformation. Whether
              your goal is muscle gain, fat loss, or sustained vitality, proper
              fueling determines 80% of your results.
            </p>
            <div className="border-l-4 border-purple-500 pl-6">
              <p className="text-xl italic text-gray-400">
                "You can't out-train a bad diet. Nutrition isn't a short-term
                fix—it's the bedrock of lifelong health."
              </p>
            </div>
          </div>

          {/* Essentials Section */}
          <div>
            <h3 className="text-3xl font-semibold mb-8 text-purple-400 border-b border-gray-700 pb-4">
              The Essentials of Performance Nutrition
            </h3>

            {/* Macronutrients Card */}
            <div className="bg-gray-800 rounded-xl p-8 mb-10 shadow-lg">
              <h4 className="text-2xl font-semibold mb-6 text-purple-300">
                Macronutrient Balance
              </h4>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-700 p-6 rounded-lg">
                  <div className="text-4xl mb-4">🍗</div>
                  <h5 className="font-bold text-lg mb-2">Protein</h5>
                  <p className="text-gray-400 text-sm">
                    Essential for muscle repair and growth
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-300">
                    {["Chicken", "Fish", "Eggs", "Tofu", "Greek yogurt"].map(
                      (item) => (
                        <li key={item}>• {item}</li>
                      )
                    )}
                  </ul>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <div className="text-4xl mb-4">🍚</div>
                  <h5 className="font-bold text-lg mb-2">Carbohydrates</h5>
                  <p className="text-gray-400 text-sm">
                    Primary energy source for training
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-300">
                    {[
                      "Oats",
                      "Quinoa",
                      "Sweet potatoes",
                      "Fruits",
                      "Vegetables",
                    ].map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <div className="text-4xl mb-4">🥑</div>
                  <h5 className="font-bold text-lg mb-2">Healthy Fats</h5>
                  <p className="text-gray-400 text-sm">
                    For hormone production and joint health
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-300">
                    {[
                      "Avocados",
                      "Nuts",
                      "Seeds",
                      "Olive oil",
                      "Fatty fish",
                    ].map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-6 text-gray-400 text-center italic">
                Optimal ratio varies by individual, but aim for balance across
                all three.
              </p>
            </div>

            {/* Micronutrients & Hydration */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <h4 className="text-2xl font-semibold mb-4 text-purple-300">
                  Micronutrients
                </h4>
                <p className="text-gray-300 mb-4">
                  Vitamins and minerals that power every metabolic process:
                </p>
                <ul className="space-y-2 text-gray-400">
                  {[
                    "Leafy greens (iron, calcium)",
                    "Colorful vegetables (antioxidants)",
                    "Nuts & seeds (magnesium, zinc)",
                    "Berries (vitamin C)",
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <h4 className="text-2xl font-semibold mb-4 text-purple-300">
                  Hydration Protocol
                </h4>
                <p className="text-gray-300 mb-4">
                  Water intake directly impacts performance and recovery:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span> 2-3 liters
                    daily minimum
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span> +500ml per
                    hour of intense training
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span> Electrolytes
                    during prolonged sessions
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pre/Post Workout */}
          <div>
            <h3 className="text-3xl font-semibold mb-8 text-purple-400 border-b border-gray-700 pb-4">
              Strategic Fueling: Pre & Post Workout
            </h3>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <span className="text-xl">⏱️</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-purple-300">
                    Pre-Workout
                  </h4>
                </div>
                <p className="text-gray-300 mb-4">
                  Consume 60-90 minutes before training for sustained energy:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-400 font-bold mr-2">•</span>
                    <div>
                      <p className="font-medium">Quick Energy + Protein</p>
                      <p className="text-gray-400 text-sm">
                        Oats with banana & whey protein
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 font-bold mr-2">•</span>
                    <div>
                      <p className="font-medium">Sustained Release</p>
                      <p className="text-gray-400 text-sm">
                        Whole grain toast with almond butter
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    <span className="text-xl">🔄</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-purple-300">
                    Post-Workout
                  </h4>
                </div>
                <p className="text-gray-300 mb-4">
                  Within 30-60 minutes after training for optimal recovery:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-400 font-bold mr-2">•</span>
                    <div>
                      <p className="font-medium">Muscle Repair</p>
                      <p className="text-gray-400 text-sm">
                        Grilled salmon with quinoa
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 font-bold mr-2">•</span>
                    <div>
                      <p className="font-medium">Quick Recovery</p>
                      <p className="text-gray-400 text-sm">
                        Whey protein with banana
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Goals Specific */}
          <div>
            <h3 className="text-3xl font-semibold mb-8 text-purple-400 border-b border-gray-700 pb-4">
              Nutrition Strategies by Goal
            </h3>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg border-t-4 border-purple-500">
                <h4 className="text-2xl font-semibold mb-4 text-purple-300">
                  Muscle Gain Protocol
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-purple-400 font-bold mr-2">•</span>
                    Caloric surplus (300-500kcal above maintenance)
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 font-bold mr-2">•</span>
                    1.6-2.2g protein per kg body weight
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 font-bold mr-2">•</span>
                    Prioritize compound lifts with progressive overload
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 font-bold mr-2">•</span>
                    Post-workout nutrition window is critical
                  </li>
                </ul>
              </div>
              <div className="bg-gray-800 p-8 rounded-xl shadow-lg border-t-4 border-blue-400">
                <h4 className="text-2xl font-semibold mb-4 text-blue-300">
                  Fat Loss Protocol
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 font-bold mr-2">•</span>
                    Caloric deficit (300-500kcal below maintenance)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 font-bold mr-2">•</span>
                    Maintain high protein to preserve muscle
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 font-bold mr-2">•</span>
                    Focus on nutrient density and satiety
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 font-bold mr-2">•</span>
                    Incorporate resistance training to maintain metabolism
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Supplements */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-3xl font-semibold mb-6 text-purple-400">
              Supplementation Strategy
            </h3>
            <p className="text-gray-300 mb-6">
              While whole foods should form the foundation, these supplements
              can enhance results when used strategically:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: "💪",
                  name: "Whey Protein",
                  desc: "Convenient protein source",
                },
                {
                  icon: "⚡",
                  name: "Creatine",
                  desc: "Strength & power output",
                },
                {
                  icon: "🧠",
                  name: "Omega-3s",
                  desc: "Cognitive & joint health",
                },
                {
                  icon: "🌿",
                  name: "Multivitamin",
                  desc: "Nutritional insurance",
                },
              ].map((supp, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-5 rounded-lg text-center"
                >
                  <div className="text-3xl mb-3">{supp.icon}</div>
                  <h5 className="font-bold mb-1">{supp.name}</h5>
                  <p className="text-gray-400 text-sm">{supp.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-gray-400 italic text-center">
              Note: Supplements complement—but don't replace—a balanced diet.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Workout Section */}
      <section className="w-full max-w-6xl mb-28">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative overflow-hidden rounded-3xl shadow-2xl mb-16 h-96"
        >
          <img
            src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1200&q=80"
            alt="Gym Workout"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-10">
            <h2 className="text-4xl font-semibold text-white">
              Scientific Training Methodology
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <p className="text-xl text-gray-300 leading-relaxed">
              Our training philosophy combines evidence-based programming with
              individualized adaptation to ensure continuous progress while
              minimizing injury risk.
            </p>
          </div>

          {/* Training Modalities */}
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-semibold mb-8 text-purple-400 border-b border-gray-700 pb-4">
              Training Modalities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Strength Training",
                  icon: "🏋️",
                  desc: "Progressive overload to build lean muscle mass and increase metabolic rate",
                  benefits: [
                    "3-5 sets of 5-8 reps",
                    "2-4 min rest",
                    "Compound movements",
                  ],
                },
                {
                  title: "Metabolic Conditioning",
                  icon: "🔥",
                  desc: "High-intensity intervals to improve cardiovascular capacity and fat utilization",
                  benefits: [
                    "30s-2min work intervals",
                    "1:1 work:rest ratio",
                    "Full-body movements",
                  ],
                },
                {
                  title: "Mobility Training",
                  icon: "🧘",
                  desc: "Improve joint range of motion and movement quality to enhance performance",
                  benefits: [
                    "Daily 10-15min",
                    "Dynamic & static stretches",
                    "Foam rolling",
                  ],
                },
                {
                  title: "Hypertrophy Focus",
                  icon: "💪",
                  desc: "Muscle growth through targeted volume and metabolic stress",
                  benefits: [
                    "3-5 sets of 8-12 reps",
                    "60-90s rest",
                    "Mind-muscle connection",
                  ],
                },
                {
                  title: "Power Development",
                  icon: "⚡",
                  desc: "Explosive movements to improve rate of force development",
                  benefits: [
                    "3-5 sets of 3-5 reps",
                    "3-5 min rest",
                    "Olympic lift variations",
                  ],
                },
                {
                  title: "Recovery Protocols",
                  icon: "🔄",
                  desc: "Active recovery to enhance adaptation between intense sessions",
                  benefits: [
                    "Low-intensity cardio",
                    "Mobility work",
                    "Contrast showers",
                  ],
                },
              ].map((modality, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">{modality.icon}</div>
                    <h4 className="text-xl font-semibold text-purple-300">
                      {modality.title}
                    </h4>
                  </div>
                  <p className="text-gray-300 mb-4 text-sm">{modality.desc}</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {modality.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Program */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-3xl font-semibold mb-6 text-purple-400">
              4-Week Foundational Program
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="pb-4 font-semibold">Day</th>
                    <th className="pb-4 font-semibold">Focus</th>
                    <th className="pb-4 font-semibold">Workout</th>
                    <th className="pb-4 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {[
                    {
                      day: "Monday",
                      focus: "Strength",
                      workout: "Squat, Bench, Rows",
                      duration: "60min",
                    },
                    {
                      day: "Tuesday",
                      focus: "Conditioning",
                      workout: "HIIT Circuit",
                      duration: "30min",
                    },
                    {
                      day: "Wednesday",
                      focus: "Recovery",
                      workout: "Mobility & Core",
                      duration: "45min",
                    },
                    {
                      day: "Thursday",
                      focus: "Strength",
                      workout: "Deadlift, Press, Pull-ups",
                      duration: "60min",
                    },
                    {
                      day: "Friday",
                      focus: "Hypertrophy",
                      workout: "Accessory Work",
                      duration: "50min",
                    },
                    {
                      day: "Saturday",
                      focus: "Active Recovery",
                      workout: "Walking/Yoga",
                      duration: "30-60min",
                    },
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-gray-700/50">
                      <td className="py-4 font-medium">{row.day}</td>
                      <td className="py-4 text-purple-300">{row.focus}</td>
                      <td className="py-4 text-gray-300">{row.workout}</td>
                      <td className="py-4 text-gray-400">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-gray-400 italic">
              Note: Program should be adjusted based on individual progress and
              recovery.
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="w-full max-w-6xl text-center mb-20"
      >
        <h2 className="text-4xl font-bold mb-8">Ready for Transformation?</h2>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Join FitLife Club today and gain access to personalized training
          programs, nutrition coaching, and a community dedicated to excellence.
        </p>
        <button className="px-12 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-full text-lg font-bold shadow-xl tracking-wide transition-all duration-300 transform hover:scale-105">
          Begin Your Journey
        </button>
      </motion.div>
    </div>
  );
}
