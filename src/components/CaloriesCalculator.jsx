import { useState } from "react";

const sports = [
  { name: "Running", met: 9.8 },
  { name: "Cycling", met: 7.5 },
  { name: "Swimming", met: 8.0 },
  { name: "Tennis", met: 7.3 },
  { name: "Basketball", met: 6.5 },
  { name: "Yoga", met: 3.0 },
  { name: "Football", met: 8.3 },
];

const CaloriesCalculator = () => {
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [sport, setSport] = useState(sports[0]);
  const [calories, setCalories] = useState(null);

  const calculateCalories = () => {
    if (weight && duration && sport) {
      const cal =
        ((sport.met * 3.5 * parseFloat(weight)) / 200) * parseFloat(duration);
      setCalories(cal.toFixed(2));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-lg shadow-2xl border border-gray-700 p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Calories Calculator
        </h1>

        <div className="space-y-6">
          {/* Weight Input */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 text-sm">Your Weight (kg)</label>
            <input
              type="number"
              placeholder="e.g., 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white p-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Duration Input */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 text-sm">Duration (minutes)</label>
            <input
              type="number"
              placeholder="e.g., 30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white p-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>

          {/* Sport Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 text-sm">Select Sport</label>
            <div className="relative">
              <select
                value={sport.name}
                onChange={(e) =>
                  setSport(
                    sports.find((s) => s.name === e.target.value) || sports[0]
                  )
                }
                className="bg-gray-800 border border-gray-700 text-white p-3 rounded-lg w-full appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                {sports.map((s, idx) => (
                  <option key={idx} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                ▼
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateCalories}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Calculate
          </button>

          {/* Result */}
          {calories && (
            <div className="text-center mt-6">
              <h2 className="text-xl text-white font-semibold">
                🔥 You burned approximately {calories} calories!
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaloriesCalculator;
