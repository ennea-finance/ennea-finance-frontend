import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCircle } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const AboutSection = () => {
  const [clients, setClients] = useState(0);
  const [consultations, setConsultations] = useState(0);
  const [experience, setExperience] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Counter animation logic
  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);

      const animateValue = (setter, end, duration) => {
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          setter(Math.floor(start));
        }, 16);
      };

      animateValue(setClients, 500, 1200);
      animateValue(setConsultations, 1000, 1200);
      animateValue(setExperience, 7, 1000);
    }
  }, [inView, hasAnimated]);

  // Animation variant
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="w-full bg-white lg:ml-14 mx-auto py-20 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 max-w-7xl mx-auto items-center">
        {/* 🖼️ Left Side Image */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariant}
        >
          <div className="relative w-full max-w-xl">
            <img
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800&q=80"
              alt="Financial Consultation"
              className="rounded-3xl w-full object-cover lg:h-[520px] md:h-[480px] h-[400px]"
            />
          </div>
        </motion.div>

        {/* 🧾 Right Side Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariant}
          className="flex flex-col justify-center h-full"
        >
          <button className="mb-6 border border-deepblue px-5 py-1.5 rounded-full text-sm font-normal hover:shadow transition w-fit">
            About Us
          </button>

          <h2 className="text-3xl md:text-5xl font-semibold mt-5 leading-tight">
            Empowering Smarter <br />{" "}
            <span className="pt-10 text-deepblue font-playfair italic">
              Financial Decisions
            </span>
          </h2>

          <p className="text-gray-600 mt-4 text-sm md:text-base leading-relaxed max-w-lg">
            We combine expertise, technology, and a personalized approach to
            guide clients toward financial stability and growth. Finorix
            supports every step of your financial journey.
          </p>

          {/* Bullet Points */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-6 max-w-md">
            {Array(4)
              .fill("Licensed Financial Consultants")
              .map((text, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <FaCircle className="text-deepblue text-[10px]" />
                  <span className="text-gray-700 text-sm">{text}</span>
                </div>
              ))}
          </div>

          {/* 📊 Stats Box */}
          <motion.div
            className="flex flex-col sm:flex-row bg-gradient-to-r from-deepblue to-blue-500 rounded-2xl mt-10 px-8 py-6 max-w-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
          >
            <div className="flex flex-col flex-1 items-center justify-center">
              <h3 className="text-3xl font-bold text-white">{clients}+</h3>
              <p className="text-sm mt-1 text-white">Happy Clients</p>
            </div>

            <div className="flex flex-col flex-1 items-center justify-center">
              <h3 className="text-3xl font-bold text-white">
                {consultations >= 1000 ? "1K" : consultations}
              </h3>
              <p className="text-sm mt-1 text-white">Consultations Done</p>
            </div>

            <div className="flex flex-col flex-1 items-center justify-center">
              <h3 className="text-3xl font-bold text-white">{experience}+</h3>
              <p className="text-sm mt-1 text-white">Years Of Expertise</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
