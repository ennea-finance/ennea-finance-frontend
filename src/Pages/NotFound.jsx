import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import logo from "../images/logo.png"; // use your actual logo path

const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#F8F7FF] via-white to-[#F8F7FF] text-center px-4">
      
      {/* Logo + Navbar-like top section */}
      <div className="absolute top-6 left-6 flex items-center space-x-2">
        <img src={logo} alt="Ennea Logo" className="w-14 h-auto" />
        <span className="font-medium text-gray-700 text-sm hidden sm:block">
          AMFI Registered Mutual Fund Distributor
        </span>
      </div>

      {/* Main 404 content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center mt-10"
      >
        <h1 className="text-[8rem] sm:text-[10rem] font-bold text-deepblue leading-none">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 max-w-md mt-3 text-sm md:text-base">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-8 flex items-center gap-2 bg-gradient-to-r from-deepblue to-blue-900 text-white font-medium px-6 py-3 rounded-full hover:shadow-[0_5px_20px_rgba(21,0,158,0.3)] transition"
        >
          <FiArrowLeft className="text-lg" /> Go Back Home
        </Link>
      </motion.div>

      {/* Decorative Blur Glow */}
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-deepblue/10 blur-3xl rounded-full -z-10"></div>
    </section>
  );
};

export default NotFound;
