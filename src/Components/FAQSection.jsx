import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaArrowRight } from "react-icons/fa";

const faqs = [
  {
    question: "What is the minimum investment required?",
    answer:
      "Our minimum investment requirement is $100,000 for comprehensive portfolio management services. However, we offer consultation services for smaller portfolios.",
  },
  {
    question: "How do you charge for your services?",
    answer:
      "We charge based on a percentage of assets under management (AUM). This ensures our interests are aligned with yours — as your portfolio grows, so does our partnership.",
  },
  {
    question: "What makes WealthPro different from other firms?",
    answer:
      "We combine expert financial planning with cutting-edge analytics and a personalized approach to maximize client returns and minimize risks.",
  },
  {
    question: "How often will I receive portfolio updates?",
    answer:
      "Clients receive quarterly reports and can access their portfolio dashboard anytime for real-time insights.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <button className="border border-deepblue px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition">
            FAQ
          </button>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Still Have Questions? <br />
            <span className="text-deepblue italic font-playfair">We’ve Got Answers.</span>
          </h2>

          <p className="text-gray-600 text-sm md:text-base max-w-lg">
            At Ennea Financial Services, we help individuals and businesses make
            confident financial decisions through personalized strategies.
          </p>

          <button className="flex items-center gap-2 bg-deepblue text-white px-8 py-2.5 rounded-full font-medium hover:bg-blue-800 transition">
            Get Started <FaArrowRight />
          </button>
        </motion.div>

        {/* Right Column - FAQ List */}
        <motion.div
          className="space-y-6 divide-y divide-lightblue"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <div key={index} className="pt-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="font-semibold text-lg md:text-lg">
                  <span className="text-deepblue font-bold mr-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {faq.question}
                </span>
                <span className="text-deepblue text-lg">
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-800 text-base mt-3 pl-7 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
