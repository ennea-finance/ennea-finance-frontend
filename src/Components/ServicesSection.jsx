import React, { useEffect, useState } from "react";
import {
  FaChartPie,
  FaUserTie,
  FaUniversity,
  FaBalanceScale,
  FaLandmark,
  FaFileInvoiceDollar,
  FaChartLine,
  FaBuilding,
} from "react-icons/fa";
import { motion } from "framer-motion";

/* ================= ANIMATION ================= */

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
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

const cardAnimation = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/* ================= MAIN SERVICES ================= */

const services = [
  {
    icon: <FaChartPie className="text-deepblue text-4xl lg:text-5xl mb-4" />,
    title: "Mutual Funds",
    description:
      "Mutual funds can be a powerful tool for long-term wealth creation when guided by expertise and discipline. Our investment approach cuts through market noise, focusing on a structured, time-tested philosophy that prioritizes your goals, risk profile, and aspirations. We combine in-depth analysis with careful fund selection, seeking out managers with a proven track record of consistency and conviction. The result is a curated portfolio designed for stability, resilience, and sustainable growth – helping you build wealth with confidence",
  },
  {
    icon: <FaUserTie className="text-deepblue text-4xl lg:text-5xl mb-4" />,
    title: "Portfolio Management Services",
    description:
      "We offer exclusive access to top-tier Portfolio Management Services (PMS) through partnerships with seasoned investment managers. These experts employ disciplined, research-driven strategies that have consistently delivered results across market cycles. The PMS approach focuses on bottom-up stock selection, driven by in-depth analysis and prudent diversification. For ambitious investors, we cherry pick select PMS strategies which target emerging opportunities with strong fundamentals and governance. PMS is typically designed for discerning investors seeking concentration in stocks for long term wealth creation. ",
  },
  {
    icon: <FaUniversity className="text-deepblue text-4xl lg:text-5xl mb-4" />,
    title: "Alternative Investment Funds",
    description:
      "We provide access to select Alternative Investment Funds through exclusive partnerships with reputed fund managers. These strategies seek to enhance portfolio diversification and risk-adjusted returns by capitalising on opportunities across infrastructure, real assets, commodities, and market inefficiencies. Select offerings also follow structured, lower-volatility approaches aimed at delivering returns superior to traditional fixed-income solutions. Our chosen AIF strategies are curated for discerning investors seeking differentiated strategies, stability, and long-term value creation.",
  },
  {
    icon: <FaBalanceScale className="text-deepblue text-4xl lg:text-5xl mb-4" />,
    title: "Private Equity Funds",
    description:
      "We offer access to select Private Equity funds through exclusive partnerships with seasoned investment managers. These funds invest across early-stage technology ventures with high growth potential, as well as mature businesses raising growth capital to scale operations and expand market presence. Select investments may also benefit from planned value-unlocking events, including potential public market listings. With active involvement, strategic guidance, and institutional expertise, these Private Equity strategies are curated for investors seeking enhanced long-term returns through ownership in rapidly expanding businesses beyond listed markets.",
  },
];

/* ================= FIXED INCOME ================= */

const fixedIncome = [
  {
    icon: <FaLandmark className="text-deepblue text-4xl lg:text-5xl" />,
    title: "Corporate Bonds",
    description:
      "High-quality debt instruments issued by corporates, offering predictable income with defined maturities. Carefully selected to balance credit quality, yield, and stability within a diversified portfolio.",
  },
  {
    icon: <FaFileInvoiceDollar className="text-deepblue text-4xl lg:text-5xl" />,
    title: "Non-Convertible Debentures",
    description:
      "Structured debt securities providing regular income with fixed or floating returns. Suitable for investors seeking higher yields than traditional deposits while maintaining a defined risk framework.",
  },
  {
    icon: <FaChartLine className="text-deepblue text-4xl lg:text-5xl" />,
    title: "Market Linked Debentures",
    description:
      "Innovative instruments where returns are linked to underlying market indices or strategies. Designed for sophisticated investors aiming to enhance returns through structured exposure with controlled risk",
  },
  {
    icon: <FaBuilding className="text-deepblue text-4xl lg:text-5xl" />,
    title: "Corporate Fixed Deposits",
    description:
      "Term deposits offered by reputed corporates, providing stable returns higher than bank FDs. Selected with a focus on issuer strength, tenure alignment, and capital preservation.",
  },
];




/* ================= COMPONENT ================= */

const ServicesSection = () => {

  const [highlight, setHighlight] = useState(null);

  useEffect(() => {
    const handleHighlight = (event) => {
      const index = event.detail;

      setHighlight(index);

      setTimeout(() => {
        setHighlight(null);
      }, 2500);
    };

    window.addEventListener("highlightService", handleHighlight);

    return () => {
      window.removeEventListener("highlightService", handleHighlight);
    };
  }, []);



  return (
    <section className="py-20 px-5 md:px-12 lg:px-20 lg:mx-20 my-16 font-satoshi">

      {/* Heading */}
      <motion.div
        className="max-w-full mx-auto mb-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-deepblue">
          Our Services
        </h2>
      </motion.div>

      {/* ===== Main Services ===== */}

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full lg:mx-auto"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {services.map((service, index) => (
          <motion.div
            id={`service-${index}`}
            key={index}
            variants={cardAnimation}
            className={`border border-deepblue/10 rounded-3xl px-6 py-8 lg:p-10 bg-white transition-all duration-300
    ${highlight === index
                ? "bg-lightbeige -translate-y-1 shadow-lg"
                : "hover:bg-lightbeige"
              }`}
          >
            {service.icon}

            <h3 className="text-2xl lg:text-3xl font-semibold mb-3">
              {service.title}
            </h3>

            <p className="text-gray-600 text-md lg:text-xl leading-relaxed text-justify">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== Fixed Income ===== */}

      <motion.div
        id="service-4"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`bg-white max-w-full mx-auto mt-8 border border-deepblue/10 rounded-2xl px-5 py-8 lg:p-12 transition-all duration-300
  ${highlight === 4
            ? "bg-lightbeige -translate-y-1 shadow-lg"
            : "hover:bg-lightbeige hover:-translate-y-1 hover:shadow-lg"
          }`}
      >

        {/* Header */}

        <div className="lg:mb-12 w-full">
          <FaUniversity className="text-deepblue text-4xl lg:text-5xl mb-4" />

          <h3 className="text-2xl lg:text-2xl md:text-3xl font-semibold">
            Fixed Income Instruments
          </h3>
        </div>

        {/* Sub Services */}

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-14"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {fixedIncome.map((item, index) => (
            <motion.div key={index} variants={fadeUp} className="flex flex-col gap-4">

              <div className="flex flex-col">

                <div className="lg:min-h-[70px]">
                  <h4 className="font-semibold lg:text-2xl text-xl leading-snug">
                    {item.title}
                  </h4>
                </div>

                <div className="mt-2 h-[2px] lg:h-[3px] lg:w-72 w-64 bg-deepblue" />

                <p className="mt-6 text-gray-600 text-md lg:text-xl leading-relaxed text-justify">
                  {item.description}
                </p>

              </div>

            </motion.div>
          ))}
        </motion.div>

      </motion.div>

    </section>
  );
};

export default ServicesSection;
