import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiTrendingUp, FiBarChart2 } from "react-icons/fi";
import { FaPiggyBank, FaStar } from "react-icons/fa";
import Slider1 from "../images/slider1.jpg";
import Slider2 from "../images/slider2.jpg";
import Slider3 from "../images/slider3.jpg";

const slides = [
  {
    title: "Build a Smarter Financial Future With",
    highlight: "Ennea",
    desc: "At Ennea Financial Services, we help individuals and businesses make confident financial decisions through modern advisory, tailored solutions, and real-time insights.",
    image: Slider1,
  },
  {
    title: "Your Trusted Partner for Wealth Growth at",
    highlight: "Ennea",
    desc: "Strategize, plan, and grow with expert financial consulting designed to secure your future with confidence and precision.",
    image: Slider2,
  },
  {
    title: "Empowering Smarter Financial Decisions With",
    highlight: "Ennea",
    desc: "Our experts combine technology and experience to deliver personalized financial solutions that work for you.",
    image: Slider3,
  },
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  // ⏱️ Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 🎞️ Framer Motion Variants
  const slideVariants = {
    hidden: { opacity: 0, x: 80, scale: 0.98 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -80, scale: 0.98, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#F8F7FF] via-white to-[#F8F7FF] py-24 px-8 md:px-16 lg:px-28 pt-52">
      {/* 💠 Glowing Gradient Accent */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-deepblue/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10">
        {/* 🧾 Left Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col justify-center h-full"
          >
            {/* Tag */}
            <button className="border border-deepblue/40 text-gray-800 text-sm font-medium px-6 py-2 rounded-full hover:shadow-[0_0_12px_rgba(21,0,158,0.15)] transition w-fit bg-white/80 backdrop-blur">
              Welcome to Ennea
            </button>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-6 leading-tight">
              {slides[index].title}{" "}
              <span className="text-deepblue font-playfair italic">
                {slides[index].highlight}
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 mt-5 text-sm md:text-base leading-relaxed max-w-lg">
              {slides[index].desc}
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button className="flex items-center bg-gradient-to-r from-deepblue to-blue-900 hover:shadow-[0_0_20px_rgba(21,0,158,0.3)] text-white font-medium px-6 py-2 rounded-full text-sm transition-all duration-300">
                Let’s Connect <FiArrowUpRight className="ml-2" />
              </button>
              <button className="flex items-center border border-deepblue/40 bg-white/60 backdrop-blur-sm text-deepblue hover:bg-deepblue hover:text-white font-medium px-6 py-2 rounded-full text-sm transition-all duration-300">
                Explore Services
              </button>
            </div>

            {/* ⭐ Reviews + Trust */}
            {/* <div className="flex items-center mt-8 space-x-4">
              <div className="flex items-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-700 text-sm font-medium">From 600+ Happy Clients</p>
              <div className="flex -space-x-2">
                <img
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="client"
                />
                <img
                  src="https://randomuser.me/api/portraits/women/46.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="client"
                />
                <img
                  src="https://randomuser.me/api/portraits/men/47.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="client"
                />
              </div>
            </div> */}
          </motion.div>
        </AnimatePresence>

        {/* 🖼️ Right Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index + "_img"}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative flex justify-center h-full"
          >
            {/* Decorative Shape */}
            <div className="absolute -top-6 -left-6 w-80 h-80 bg-deepblue/5 rounded-[2rem]"></div>

            <img
              src={slides[index].image}
              alt="hero"
              className="relative rounded-3xl w-full max-w-xl h-[400px] object-cover shadow-[0_10px_50px_rgba(21,0,158,0.1)]"
            />

            {/* Floating Rating Badge */}
            {/* <div className="absolute bottom-6 right-6 bg-white shadow-[0_5px_20px_rgba(21,0,158,0.15)] rounded-2xl px-4 py-2 flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <p className="text-sm font-semibold text-gray-800">4.9+ Rating</p>
            </div> */}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ⭕ Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              i === index ? "bg-deepblue scale-110" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
