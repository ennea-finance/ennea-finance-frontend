import React from "react";
import { FaChartPie, FaChartLine, FaBalanceScale } from "react-icons/fa";
import { motion } from "framer-motion";
import blog_bg from "../images/blog-bg.png";

// Core Values Data
const values = [
  {
    icon: <FaChartPie className="text-deepblue text-3xl" />,
    title: "Client-Centric Approach",
    description:
      "Our clients are at the core of everything we do. We operate with complete autonomy, enabling us to deliver unbiased advice and objective recommendations that serve only one purpose — your best interest. Every strategy we design is guided by clarity and open communication, ensuring that you are fully informed and confident at every step of your financial journey. We take the time to understand your goals, risk appetite, and long-term vision, crafting solutions that are both strategic and adaptive to market dynamics. Through regular review, meticulous research, and disciplined execution, we help you navigate the complexities of wealth creation and preservation.",
  },
  {
    icon: <FaChartLine className="text-deepblue text-3xl" />,
    title: "Growth Through Value Creation ",
    description:
      "We provide high-quality, personalized service that meets your' evolving needs. We have an open architecture platform where we collaborate with leading industry experts to give you access to best-in-class products and services. We stay up-to-date with market trends, research, and best practices to offer innovative solutions. We do not manufacture any products to ensure that we offer unbiased investment services. We prioritize sustainable, long-term growth over short-term gains.",
    highlight: true,
  },
  {
    icon: <FaBalanceScale className="text-deepblue text-3xl" />,
    title: "Client Empowerment ",
    description:
      "We empower clients with timely market insights and knowledge to inform their financial decisions. Through collaborative partnerships, we craft customized solutions that align with their unique goals. With a commitment to client success, we continually refine our approach to try deliver exceptional outcomes.",
  },
  {
    icon: <FaBalanceScale className="text-deepblue text-3xl" />,
    title: "Confidentiality",
    description:
      "We develop a relationship with their clients based on trust, transparency and honesty that goes beyond the usual relationship and ensures a total alignment of interests. We make sure that the client information is only to those authorized to have access. A relationship of trust and confidence with our clients can only be built upon the understanding that their information will remain confidential"
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {values.map((value, index) => (
          <motion.div
            key={index}
            variants={fadeUpVariant}
            className={`rounded-2xl px-10 py-14 text-left transition duration-300 bg-white ${value.highlight
              ? "bg-white"
              : "border border-light"
              }`}
          >
            <div className="bg-lightblue w-fit p-3 border rounded-xl border-deepblue mb-3"> {value.icon}</div>
            <h3 className="font-semibold text-xl text-gray-900 mb-2">
              {value.title}
            </h3>
            <p className="text-gray-500 text-md leading-relaxed">
              {value.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CoreValuesSection;
