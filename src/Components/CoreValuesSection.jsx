import React from "react";
import { FaChartPie, FaChartLine, FaBalanceScale } from "react-icons/fa";
import { motion } from "framer-motion";
import blog_bg from "../images/blog-bg.png";

// Core Values Data
const values = [
  {
    icon: <FaChartPie className="text-deepblue text-3xl" />,
    title: "Personalized Planning",
    description:
      "Explore financial strategies that match your goals. Our planning services guide your financial journey confidently.",
  },
  {
    icon: <FaChartLine className="text-deepblue text-3xl" />,
    title: "Smart Investment",
    description:
      "Get tailored financial strategies that align with your goals. Our expert services will navigate your investment journey.",
    highlight: true,
  },
  {
    icon: <FaBalanceScale className="text-deepblue text-3xl" />,
    title: "Tax Optimization",
    description:
      "Discover tax optimization strategies tailored to your needs. Our tracking services help you minimize liabilities",
  },
];

// Animation Variants
const containerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const CoreValuesSection = () => {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -mx-[50vw] bg-cover bg-center bg-no-repeat rounded-tl-3xl rounded-tr-3xl py-24 px-6 md:px-12 my-6"
    style={{
          backgroundImage: `url(${blog_bg})`,
        }}>
      {/* Header */}
      <motion.div
        className="text-center mb-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          Our <span className="text-white font-playfair italic">Core Values</span>
        </h2>
      </motion.div>

      {/* Core Values Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {values.map((value, index) => (
          <motion.div
            key={index}
            variants={fadeUpVariant}
            className={`rounded-2xl px-10 py-14 text-left transition duration-300 bg-white ${
              value.highlight
                ? "bg-white"
                : "border border-light"
            }`}
          >
           <div className="bg-lightblue w-fit p-3 border rounded-xl border-deepblue mb-3"> {value.icon}</div>
            <h3 className="font-semibold text-2xl text-gray-900 mb-2">
              {value.title}
            </h3>
            <p className="text-gray-500 text-lg leading-relaxed">
              {value.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CoreValuesSection;
