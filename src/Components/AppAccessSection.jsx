import React from "react";
import { motion } from "framer-motion";
import phoneMockup from "../images/app.png";
import googlePlay from "../images/apple-store.png";
import appStore from "../images/google-play.png";
import appBg from "../images/app-demo.png";

/* Animation Variants */

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageAnimation = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const AppAccessSection = () => {
  return (
    <section
      className="relative w-full px-6 sm:px-8 md:px-16 lg:px-24 py-24 md:py-24 bg-black bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${appBg})` }}
    >
      <motion.div
        className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-12"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >

        {/* LEFT CONTENT */}

        <div className="lg:max-w-2xl max-w-xl text-white text-center lg:text-left">

          <motion.h2
            variants={fadeUp}
            className="font-satoshi text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-5 md:mb-6"
          >
            Access your portfolio <br className="hidden sm:block" />
            anytime, anywhere.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-satoshi text-base sm:text-base md:text-lg lg:text-xl font-medium mb-6 md:mb-10"
          >
            Download The My Planner - Finance Solved App Today
          </motion.p>

          {/* STORE BUTTONS */}

          <motion.div
            variants={fadeUp}
            className="flex justify-center lg:justify-start gap-3 sm:gap-4 items-center"
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.ifa.now.app&hl=en&gl=US"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={googlePlay}
                alt="Get it on Google Play"
                className="h-14 sm:h-12 md:h-16 lg:h-24 cursor-pointer hover:scale-105 transition-transform duration-300 rounded-md"
                loading="lazy"
              />
            </a>

            <a
              href="https://apps.apple.com/in/app/my-planner-finance-solved/id6446684872"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={appStore}
                alt="Download on the App Store"
                className="h-10 sm:h-10 md:h-12 lg:h-16 cursor-pointer hover:scale-105 transition-transform duration-300 rounded-md"
                loading="lazy"
              />
            </a>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}

        <motion.div
          variants={imageAnimation}
          className="flex justify-center items-center w-full lg:w-auto"
        >
          <img
            src={phoneMockup}
            alt="App preview"
            className="w-[220px] sm:w-[220px] md:w-[260px] lg:w-[300px]"
            loading="lazy"
          />
        </motion.div>

      </motion.div>
    </section>
  );
};

export default AppAccessSection;
