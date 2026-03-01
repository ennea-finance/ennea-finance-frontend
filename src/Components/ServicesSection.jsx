import React from "react";
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

/* ================= MAIN SERVICES ================= */

const services = [
  {
    icon: <FaChartPie className="text-deepblue text-4xl mb-4" />,
    title: "Mutual Funds",
    description:
      "Mutual funds can be a powerful tool for long-term wealth creation when guided by expertise and discipline. Our investment approach cuts through market noise, focusing on a structured, time-tested philosophy that prioritizes your goals, risk profile, and aspirations. We combine in-depth analysis with careful fund selection, seeking out managers with a proven track record of consistency and conviction. The result is a curated portfolio designed for stability, resilience, and sustainable growth – helping you build wealth with confidence",
  },
  {
    icon: <FaUserTie className="text-deepblue text-4xl mb-4" />,
    title: "Portfolio Management Services",
    description:
      "We offer exclusive access to top-tier Portfolio Management Services (PMS) through partnerships with seasoned investment managers. These experts employ disciplined, research-driven strategies that have consistently delivered results across market cycles. The PMS approach focuses on bottom-up stock selection, driven by in-depth analysis and prudent diversification. For ambitious investors, we cherry pick select PMS strategies which target emerging opportunities with strong fundamentals and governance. PMS is typically designed for discerning investors seeking concentration in stocks for long term wealth creation. ",
  },
  {
    icon: <FaUniversity className="text-deepblue text-4xl mb-4" />,
    title: "Alternative Investment Funds",
    description:
      "We provide access to select Alternative Investment Funds through exclusive partnerships with reputed fund managers. These strategies seek to enhance portfolio diversification and risk-adjusted returns by capitalising on opportunities across infrastructure, real assets, commodities, and market inefficiencies. Select offerings also follow structured, lower-volatility approaches aimed at delivering returns superior to traditional fixed-income solutions. Our chosen AIF strategies are curated for discerning investors seeking differentiated strategies, stability, and long-term value creation.",
  },
  {
    icon: <FaBalanceScale className="text-deepblue text-4xl mb-4" />,
    title: "Private Equity Funds",
    description:
      "We offer access to select Private Equity funds through exclusive partnerships with seasoned investment managers. These funds invest across early-stage technology ventures with high growth potential, as well as mature businesses raising growth capital to scale operations and expand market presence. Select investments may also benefit from planned value-unlocking events, including potential public market listings. With active involvement, strategic guidance, and institutional expertise, these Private Equity strategies are curated for investors seeking enhanced long-term returns through ownership in rapidly expanding businesses beyond listed markets.",
  },
];

/* ================= FIXED INCOME SUB-SERVICES ================= */

const fixedIncome = [
  {
    icon: <FaLandmark className="text-deepblue text-4xl" />,
    title: "Corporate Bonds",
    description:
      "High-quality corporate debt instruments offering predictable income with defined maturities and strong credit profiles.",
  },
  {
    icon: <FaFileInvoiceDollar className="text-deepblue text-4xl" />,
    title: "Non-Convertible Debentures",
    description:
      "Fixed or floating return instruments providing higher yields than traditional deposits within a defined risk framework.",
  },
  {
    icon: <FaChartLine className="text-deepblue text-4xl" />,
    title: "Market Linked Debentures",
    description:
      "Structured products with returns linked to market indices, designed for sophisticated investors seeking enhanced outcomes.",
  },
  {
    icon: <FaBuilding className="text-deepblue text-4xl" />,
    title: "Corporate Fixed Deposits",
    description:
      "Carefully selected corporate FDs offering stable returns, issuer strength, and capital preservation.",
  },
];

/* ================= ANIMATION ================= */

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ================= COMPONENT ================= */

const ServicesSection = () => {
  return (
    <section className="py-20 px-7 md:px-12 lg:px-20 mx-20 my-16 font-satoshi">
      {/* ===== Heading ===== */}
      <motion.div
        className="max-w-full mx-auto mb-16"
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* <button className="border border-deepblue px-6 py-2 rounded-full text-xl mb-6 font-medium">
          Our Services
        </button> */}

        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          Our Services
        </h2>
      </motion.div>

      {/* ===== Main Services ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border border-deepblue/10 rounded-2xl py-10 px-10 bg-white hover:bg-lightblue transition-all duration-300"
          >
            <div className="">{service.icon}</div>
            <h3 className="text-3xl font-semibold mb-3">
              {service.title}
            </h3>
            <p className="text-gray-600 text-xl leading-relaxed text-justify font-normal">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ===== Fixed Income Section ===== */}
      <motion.div
        className="bg-white max-w-full mx-auto mt-8 border border-deepblue/10 rounded-2xl px-10 py-10 hover:bg-lightblue transition-all duration-300"
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <div className="mb-12">
          <FaUniversity className="text-deepblue text-4xl mb-4" />
          <h3 className="text-2xl md:text-3xl font-semibold">
            Fixed Income Instruments
          </h3>

        </div>

        {/* ===== Sub-services layout (Image-based UI) ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-14">
          {fixedIncome.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col">
                {/* Title + underline block */}
                <div className="flex flex-col justify-start">
                  <div className="min-h-[70px]">
                    <h4 className="font-semibold text-2xl leading-snug">
                    {item.title}
                  </h4>
                  </div>

                  {/* Underline – SAME LEVEL FOR ALL */}
                  <div className="mt-2 h-[3px] w-72 bg-deepblue" />
                </div>

                {/* Description */}
                <p className="mt-6 text-gray-600 text-xl leading-relaxed text-justify">
                  {item.description}
                </p>
              </div>



            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
