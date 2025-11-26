import React from "react";
import {
  FaChartPie,
  FaUserTie,
  FaUniversity,
  FaBalanceScale,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";

// Service data
const services = [
  {
    icon: <FaChartPie className="text-deepblue text-4xl mb-3" />,
    title: "Financial Planning",
    description:
      "Customized investment portfolios tailored to your risk tolerance and financial objectives.",
  },
  {
    icon: <FaUserTie className="text-deepblue text-4xl mb-3" />,
    title: "Investment Advisory",
    description:
      "Strategic planning to ensure a comfortable and secure retirement lifestyle.",
  },
  {
    icon: <FaUniversity className="text-deepblue text-4xl mb-3" />,
    title: "Finance Consulting",
    description:
      "Comprehensive estate planning to preserve and transfer wealth efficiently.",
  },
  {
    icon: <FaBalanceScale className="text-deepblue text-4xl mb-3" />,
    title: "Tax Strategy",
    description:
      "Strategic tax planning to minimize liabilities and maximize after-tax returns.",
  },
  {
    icon: <FaBriefcase className="text-deepblue text-4xl mb-3" />,
    title: "Asset Management",
    description:
      "Corporate financial planning and employee benefit programs for businesses.",
  },
  {
    icon: <FaGraduationCap className="text-deepblue text-4xl mb-3" />,
    title: "Debt Management",
    description:
      "Strategic savings plans to fund your children's education expenses.",
  },
];

// Animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ServicesSection = () => {
  return (
    <section className="w-full py-16 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Heading Section */}
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUpVariant}
      >
        {/* Left Content */}
        <div>
          <button className="bg-white border border-deepblue text-gray-800 text-sm font-medium px-7 py-2 rounded-full shadow-sm hover:shadow-md transition">
            Our Services
          </button>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-8 leading-tight">
            Financial Services <br />
            <span className="text-deepblue font-playfair italic">
              Designed for Impact
            </span>
          </h2>
        </div>

        {/* Right Button */}
        <div className="mt-6 md:mt-0">
          <button className="flex items-center justify-center bg-deepblue text-white font-medium px-6 py-4 rounded-full text-sm transition">
            View all Services
            <FiArrowUpRight className="ml-2 text-lg" />
          </button>
        </div>
      </motion.div>


      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-16">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="border border-deepblue bg-white hover:bg-lightblue hover:border-lightblue rounded-2xl p-8 text-center md:text-left hover:shadow-[0_0_20px_4px_rgba(29,78,216,0.15)] 
             transition-all duration-300 ease-out"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.1 }}
          >
            {service.icon}
            <h3 className="font-semibold text-xl mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
