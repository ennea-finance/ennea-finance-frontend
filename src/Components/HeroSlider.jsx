import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { scroller } from "react-scroll";
import { useNavigate } from "react-router-dom";
// import HeroBg from "../images/landing-bg.jpg";
import HeroBg from "../images/landing-demo.jpg";


const Hero = () => {
  const navigate = useNavigate();
  // const [slide, setSlide] = useState(false);
  const texts = [
    "Empowering smarter financial Decisions",
    "Building Long-Term Wealth Creation",
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const typingSpeed = isDeleting ? 40 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length + 1));

        if (displayText === currentText) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length - 1));

        if (displayText === "") {
          setIsDeleting(false);
          setTextIndex((prev) =>
            prev === texts.length - 1 ? 0 : prev + 1
          );
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

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
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30 backdrop-blur-sm isolate" />

      {/* 🔹 Content */}
      <div className="font-satoshi relative z-10 h-full flex items-center justify-center px-8">
        <div
          className="max-w-5xl text-white mt-28 text-center px-10
          transform transition-all duration-1200 ease-out"

        >

          <h1 className="text-4xl md:text-7xl font-bold leading-[1.4]">
            Your Trusted Partner For Wealth Creation          </h1>

          <div className="min-h-16">
            <p className="my-6 text-white italic font-semibold text-base md:text-3xl leading-[1.9]">
            {displayText}
            <span className="animate-pulse"></span>
          </p>
          </div>

          <div className="mt-6 flex gap-10 justify-center w-full">
            <button
              onClick={() => scrollOrNavigateTo("contact")}
              className="flex text-lg items-center bg-white gap-2 text-deepblue font-semibold px-14 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Let's Connect <FiArrowUpRight />
            </button>

            <button
              onClick={() => scrollOrNavigateTo("services")}
              className="bg-white/20 backdrop-blur-md flex text-lg items-center gap-2 text-white font-semibold px-14 py-3 rounded-lg transition-all duration-300 hover:scale-105"
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