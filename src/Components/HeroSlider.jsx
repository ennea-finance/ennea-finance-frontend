import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { scroller } from "react-scroll";
import { useNavigate } from "react-router-dom";
import HeroBg from "../images/landing-bg.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(false);

  // ✅ Fix: Small delay so animation is visible
  useEffect(() => {
    const timer = setTimeout(() => {
      setSlide(true);
    }, 150); // slight delay makes animation trigger properly

    return () => clearTimeout(timer);
  }, []);

  const scrollOrNavigateTo = (targetName) => {
    const offsetValue = -80;

    if (window.location.pathname === "/") {
      scroller.scrollTo(targetName, {
        duration: 600,
        smooth: true,
        offset: offsetValue,
      });
    } else {
      navigate("/", { state: { scrollTo: targetName } });
    }
  };

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      
      {/* 🔹 Background Image (Static) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${HeroBg})` }}
      />

      {/* 🔹 Smooth Gradient + Blur Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30 backdrop-blur-sm" />

      {/* 🔹 Content */}
      <div className="font-satoshi relative z-10 h-full flex items-center justify-center px-8">
        <div
          className={`max-w-4xl text-white mt-28 text-center px-10
          transform transition-all duration-1200 ease-out
          ${
            slide
              ? "translate-y-0 opacity-100"
              : "translate-y-32 opacity-0"
          }`}
        >

          <h1 className="text-4xl md:text-7xl font-bold leading-[1.4]">
            Welcome to Ennea Financial Services
          </h1>

          <p className="mt-6 text-white text-base md:text-lg leading-[1.9]">
            {/* Build a financial roadmap with trusted partners to realise your
            ambitious financial goals. */}
            Your Trusted Partner For Wealth Creation
          </p>

          <div className="mt-10 flex gap-10 justify-center w-full">
            <button
              onClick={() => scrollOrNavigateTo("contact")}
              className="flex text-lg items-center bg-white gap-2 text-deepblue font-semibold px-14 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Let's Connect <FiArrowUpRight />
            </button>

            <button
              onClick={() => scrollOrNavigateTo("services")}
              className="flex text-lg items-center gap-2 bg-deepblue text-white font-semibold px-14 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Explore Services <FiArrowUpRight />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;