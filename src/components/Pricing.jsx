import { Check } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Pricing = () => {
  const pricing = [
    {
      imgUrl: "/pricing.jpg",
      title: "QUARTERLY",
      price: 18000,
      length: 3,
    },
    {
      imgUrl: "/pricing.jpg",
      title: "HALF_YEARLY",
      price: 34000,
      length: 6,
    },
    {
      imgUrl: "/pricing.jpg",
      title: "YEARLY",
      price: 67000,
      length: 12,
    },
  ];

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768; // 👈 detect mobile screens

  return (
    <section id="Pricing" className="pricing py-20 bg-gray-950 text-white">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }} // 👈 Animate once
        transition={{ duration: 0.6 }}
      >
        ELITE EDGE FITNESS PLANS
      </motion.h1>

      <div className="wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {pricing.map((element, index) => (
          <motion.div
            key={element.title}
            className="card bg-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition transform duration-300"
            initial={isMobile ? false : { opacity: 0, y: 50 }}
            whileInView={isMobile ? false : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} // 👈 Animate only once
            transition={{ delay: index * 0.2 }}
          >
            <img
              src={element.imgUrl}
              alt={element.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 space-y-4">
              <div className="title text-center">
                <h1 className="text-2xl font-bold">{element.title}</h1>
                <h2 className="text-lg text-purple-400 font-semibold mt-1">
                  PACKAGE
                </h2>
                <h3 className="text-3xl font-bold text-purple-500 mt-4">
                  Rs {element.price}
                </h3>
                <p className="text-gray-400">For {element.length} Months</p>
              </div>

              <div className="description mt-6 space-y-3 text-gray-300">
                <div className="flex items-center gap-3">
                  <Check className="text-purple-400" /> Equipment
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-purple-400" /> All Day Free Training
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-purple-400" /> Free Restroom
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-purple-400" /> 24/7 Skilled Support
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-purple-400" /> 20 Days Freezing Option
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Link
                  to={"/"}
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
