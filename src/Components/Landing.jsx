import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { scroller } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeroBg from "../images/landing-demo.jpg";
import HeroMobile from "../images/landing-demo.jpg";

const texts = [
  "Empowering smarter financial Decisions",
  "Building Long-Term Wealth Creation",
];

/* Animation Variants */

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const imageAnimation = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Landing = () => {
  const navigate = useNavigate();

  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  /* Typewriter */
  useEffect(() => {
    const currentText = texts[textIndex];
    const typingSpeed = isDeleting ? 40 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentText.substring(0, displayText.length + 1);
        setDisplayText(nextText);

        if (nextText === currentText) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        const nextText = currentText.substring(0, displayText.length - 1);
        setDisplayText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setTextIndex((prev) =>
            prev === texts.length - 1 ? 0 : prev + 1
          );
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

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
    <section className="relative w-full font-satoshi">

      {/* ================= MOBILE HERO ================= */}

      <motion.div
        className="h-full block md:hidden px-6 pt-40 pb-10 text-center bg-gradient-to-b from-[#c5aa88] to-[#f8deb7]"
        variants={container}
        initial="hidden"
        animate="visible"
      >

        <motion.h1
          variants={fadeUp}
          className="text-3xl font-bold leading-tight text-white"
        >
          Your Trusted Partner For Wealth Creation
        </motion.h1>

        <motion.div variants={fadeUp} className="min-h-[40px] mt-4">
          <p className="italic font-semibold text-white text-base">
            {displayText}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-6 flex flex-row gap-4 justify-center"
        >

          <button
            onClick={() => scrollOrNavigateTo("contact")}
            className="text-sm flex items-center gap-2 bg-white text-deepblue font-semibold py-2 px-4 rounded-lg hover:scale-105 transition"
          >
            Let's Connect <FiArrowUpRight />
          </button>

          <button
            onClick={() => scrollOrNavigateTo("services")}
            className="text-sm flex items-center gap-2 bg-white text-deepblue font-semibold py-2 px-4 rounded-lg hover:scale-105 transition"
          >
            Explore Services <FiArrowUpRight />
          </button>

        </motion.div>

        <motion.img
          variants={imageAnimation}
          src={HeroMobile}
          alt="Wealth Planning"
          className="mt-12 rounded-xl w-full h-60 object-cover"
        />

      </motion.div>


      {/* ================= DESKTOP HERO ================= */}

      <div className="hidden md:block relative h-screen overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center md:bg-fixed"
          style={{ backgroundImage: `url(${HeroBg})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30 backdrop-blur-sm" />

        <motion.div
          className="relative z-10 flex items-center justify-center h-full px-6 md:px-12 lg:px-20"
          variants={container}
          initial="hidden"
          animate="visible"
        >

          <div className="max-w-5xl text-center text-white">

            <motion.h1
              variants={fadeUp}
              className="font-bold leading-tight text-5xl lg:text-6xl xl:text-7xl"
            >
              Your Trusted Partner For Wealth Creation
            </motion.h1>

            <motion.div variants={fadeUp} className="min-h-[70px]">
              <p className="mt-6 italic font-semibold text-2xl lg:text-3xl">
                {displayText}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex justify-center gap-10"
            >

              <button
                onClick={() => scrollOrNavigateTo("contact")}
                className="flex items-center gap-2 text-lg bg-white text-deepblue font-semibold px-14 py-3 rounded-lg hover:scale-105 transition"
              >
                Let's Connect <FiArrowUpRight />
              </button>

              <button
                onClick={() => scrollOrNavigateTo("services")}
                className="flex items-center gap-2 text-lg bg-white text-deepblue font-semibold px-14 py-3 rounded-lg hover:scale-105 transition"
              >
                Explore Services <FiArrowUpRight />
              </button>

            </motion.div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default Landing;