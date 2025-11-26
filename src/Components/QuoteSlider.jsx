import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  {
    title: "Building Wealth Through",
    highlight: "Strategic Investment",
    quote:
      "“The stock market is filled with individuals who know the price of everything, but the value of nothing.” - Philip Fisher",
  },
  {
    title: "Empowering Smarter",
    highlight: "Financial Decisions",
    quote:
      "“An investment in knowledge pays the best interest.” - Benjamin Franklin",
  },
  {
    title: "Creating Long-Term",
    highlight: "Financial Freedom",
    quote:
      "“Do not save what is left after spending, but spend what is left after saving.” - Warren Buffett",
  },
];

const slideVariants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.6, ease: "easeInOut" } },
};

const QuoteSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-5"
          >
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900">
              {quotes[current].title}{" "}
              <span className="italic text-blue-700 font-semibold">
                {quotes[current].highlight}
              </span>
            </h1>

            {/* Quote */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              {quotes[current].quote}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <button className="bg-blue-700 text-white px-8 py-2 rounded-md font-medium shadow-md hover:bg-blue-800 transition">
                Start Your Journey
              </button>
              <button className="border border-blue-700 text-gray-900 px-8 py-2 rounded-md font-medium hover:bg-blue-50 transition">
                Learn More
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {quotes.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              i === current ? "bg-blue-700" : "bg-gray-300"
            } transition-all duration-500`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default QuoteSlider;
