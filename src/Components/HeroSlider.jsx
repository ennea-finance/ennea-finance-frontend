import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { scroller } from "react-scroll";
import { useNavigate } from "react-router-dom";

// ✅ NEW IMAGE
import HeroBg from "../images/landing-bg.jpg";

const Hero = () => {
  const navigate = useNavigate();

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
      {/* 🔹 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroBg})` }}
      />

      g{/* 🔹 Soft Focus Zone (RIGHT SIDE) */}
      {/* <div
        className="absolute inset-y-0 right-0 w-[40%]
        b-gradient-to-l
        from-[#0A1E3C]/70
        via-[#0A1E3C]/45
        to-transparent
        backdrop-blur-sm"
      /> */}

      {/* 🔹 Content */}
      <div className="relative z-10 h-full flex items-center justify-end px-8">
        <div className="max-w-2xl text-white mt-28 text-left px-10">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Your Trusted Partners in Generational Wealth
          </h1>

          <p className="mt-6 text-white/90 text-base md:text-lg leading-relaxed">
            Build a financial roadmap with trusted partners to realise your
            ambitious financial goals.
          </p>

          <div className="mt-10 flex justify-start">
            <button
              onClick={() => scrollOrNavigateTo("contact")}
              className="flex items-center gap-2 bg-deepblue text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
            >
              Start Your Investment Journey <FiArrowUpRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
