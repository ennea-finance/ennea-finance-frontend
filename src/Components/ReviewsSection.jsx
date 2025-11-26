import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    text: `"WealthPro transformed our financial strategy. Their expertise in portfolio management helped us achieve a 25% increase in returns while reducing risk."`,
    name: "Jennifer Thompson",
    title: "CEO, Tech Innovations",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    text: `"Finorix advisors provided clear and actionable insights. Their financial guidance has been invaluable to our company's long-term success."`,
    name: "Michael Patel",
    title: "Founder, MarketWave",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    text: `"Their commitment and transparency have built great trust. We’ve seen consistent performance and reliable returns."`,
    name: "Sarah Williams",
    title: "Investor & Entrepreneur",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ReviewsSection = () => {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-6xl w-full items-center">
        {/* 🧾 Left Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariant}
          className="flex flex-col justify-center pr-0 lg:pr-4"
        >
          <button className="border border-deepblue px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition self-start">
            Testimonials
          </button>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-5 leading-tight">
            Client Feedback & <br />{" "}
            <span className="font-playfair italic text-deepblue">
              Reviews
            </span>
          </h2>

          <p className="text-gray-600 mt-4 text-sm md:text-base leading-relaxed max-w-xl">
            We combine expertise, technology, and a personalized approach to
            guide clients toward financial stability and growth. Finorix
            supports every step of the journey.
          </p>

          <motion.div
            key={reviews[currentReview].id}
            className="border-l-4 border-deepblue rounded-2xl bg-white shadow-sm mt-8 p-6 relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <p className="italic text-gray-700 mb-4">
              {reviews[currentReview].text}
            </p>

            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-sm mr-1" />
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <img
                src={reviews[currentReview].image}
                alt={reviews[currentReview].name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">
                  {reviews[currentReview].name}
                </p>
                <p className="text-deepblue font-playfair font-medium text-sm italic">
                  {reviews[currentReview].title}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 🖼️ Right Section */}
        <motion.div
          className="relative flex justify-center lg:justify-start pl-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariant}
        >
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80"
            alt="Team Discussion"
            className="rounded-3xl w-full h-[480px] object-cover shadow-md"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
