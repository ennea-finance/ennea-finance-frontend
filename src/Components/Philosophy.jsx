import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import philosophyBg from "../images/philosopy.png";
import { TbUserStar } from "react-icons/tb";
import { PiChartLineUpBold } from "react-icons/pi";
import { PiUserCircleCheck } from "react-icons/pi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

/* ------------------ ANIMATION VARIANTS ------------------ */

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
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

const cardAnimation = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

/* ------------------ DATA ------------------ */

const steps = [
  {
    id: 1,
    label: "Client-Centric Approach",
    title:
      "Our clients are at the core of everything we do. We operate with complete autonomy, enabling us to deliver unbiased advice and objective recommendations that serve only one purpose — your best interest. Every strategy we design is guided by clarity and open communication, ensuring that you are fully informed and confident at every step of your financial journey. We take the time to understand your goals, risk appetite, and long-term vision, crafting solutions that are both strategic and adaptive to market dynamics. Through regular review, meticulous research, and disciplined execution, we help you navigate the complexities of wealth creation and preservation.",
    icon: <TbUserStar className="text-deepblue text-3xl md:text-6xl" />,
  },
  {
    id: 2,
    label: "Growth Through Value Creation",
    title:
      "We provide high-quality, personalized service that meets your' evolving needs. We have an open architecture platform where we collaborate with leading industry experts to give you access to best-in-class products and services. We Stay up-to-date with market trends, research, and best practices to offer innovative solutions. We do not manufacture any products to ensure that we offer unbiased investment services. We Prioritize sustainable, long-term growth over short-term gains.",
    icon: <PiChartLineUpBold className="text-deepblue text-3xl md:text-6xl" />,
  },
  {
    id: 3,
    label: "Client Empowerment",
    title:
      "We empower clients with timely market insights and knowledge to inform their financial decisions. Through collaborative partnerships, we craft customized solutions that align with their unique goals. With a commitment to client success, we continually refine our approach to try deliver exceptional outcomes.",
    icon: <PiUserCircleCheck className="text-deepblue text-3xl md:text-6xl" />,
  },
  {
    id: 4,
    label: "Confidentiality",
    title:
      "We develop relationships based on trust, transparency, and honesty that ensure complete alignment of interests. We ensure client information is accessible only to authorized individuals. Trust and confidence can only be built upon the assurance that their information remains confidential.",
    icon: <IoShieldCheckmarkOutline className="text-deepblue text-3xl md:text-6xl" />,
  },
];

/* ------------------ RESPONSIVE HOOK ------------------ */

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

/* ------------------ TRANSLATE LOGIC ------------------ */

const getTranslateX = (active, isMobile) => {
  if (isMobile) return `-${active * 100}%`;

  switch (active) {
    case 0:
      return "0vw";
    case 1:
      return "-56vw";
    case 2:
      return "-118vw";
    case 3:
      return "-174vw";
    default:
      return "0vw";
  }
};

/* ------------------ COMPONENT ------------------ */

const Philosophy = () => {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();

  const next = () => {
    if (active < steps.length - 1) setActive((p) => p + 1);
  };

  const prev = () => {
    if (active > 0) setActive((p) => p - 1);
  };

  const handleDragEnd = (_, info) => {
    const threshold = 80;
    if (info.offset.x < -threshold) next();
    if (info.offset.x > threshold) prev();
  };

  return (
    <section className="relative w-full py-20 md:py-32 px-6 md:px-16 lg:px-28 overflow-hidden text-white">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url(${philosophyBg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 backdrop-blur-sm" />

      <motion.div
        className="relative z-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          className="mx-auto mb-12 md:mb-16 w-full lg:w-[80vw]"
        >
          <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-satoshi">
            Our Philosophy
          </h2>
        </motion.div>

        {/* Slider */}
        <div className={`relative mx-auto overflow-hidden ${isMobile ? "w-full" : "w-[80vw]"}`}>
          <motion.div
            className={`flex ${isMobile ? "gap-0" : "gap-[2vw]"} cursor-grab active:cursor-grabbing`}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={isMobile ? 0.05 : 0.2}
            onDragEnd={handleDragEnd}
            animate={{ x: getTranslateX(active, isMobile) }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            {steps.map((step) => (
              <div
                key={step.id}
                className="shrink-0"
                style={{ width: isMobile ? "100%" : "62vw" }}
              >
                <motion.div
                  variants={cardAnimation}
                  className="rounded-3xl p-6 sm:p-8 md:p-12 lg:p-14 flex flex-col gap-5 border border-white/80 backdrop-blur-sm min-h-[650px] md:min-h-[560px] lg:min-h-[540px]"
                >
                  <div className="w-fit bg-white p-3 rounded-lg">
                    {step.icon}
                  </div>

                  <h3 className="font-satoshi font-bold text-2xl md:text-3xl">
                    {step.label}
                  </h3>

                  <p className="font-satoshi text-md sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-justify">
                    {step.title}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Controls */}
        <motion.div
          variants={fadeUp}
          className="mx-auto flex gap-4 mt-8 md:mt-10 w-full lg:w-[80vw]"
        >
          <button
            onClick={prev}
            disabled={active === 0}
            className={`p-3 rounded-full border transition ${
              active === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-white hover:text-black"
            }`}
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            disabled={active === steps.length - 1}
            className={`p-3 rounded-full border transition ${
              active === steps.length - 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-white hover:text-black"
            }`}
          >
            <ChevronRight />
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Philosophy;