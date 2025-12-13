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
      className="w-full lg:ml-14 mx-auto py-20 px-6 md:px-16 lg:px-24 overflow-hidden mt-10"
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
              className="rounded-3xl w-full object-cover lg:h-[500px] md:h-[480px] h-[400px]"
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

          <h2 className="text-3xl md:text-5xl font-semibold mt-5 leading-tight mb-3">
            Empowering Smarter <br />{" "}
            <span className="pt-10 text-deepblue font-playfair italic">
              Financial Decisions
            </span>
          </h2>

          <p className="text-gray-600 font-medium mt-4 text-md md:text-base leading-relaxed max-w-lg">
            Established in 2024, Ennea Financial Services, our name is inspired by the Greek word 'Ennea,' meaning nine, a number symbolizing completeness, harmony, and spiritual awakening.
          </p>
          <p className="text-gray-600 mt-4 text-md md:text-base leading-relaxed max-w-lg">
            We embody these principles, striving for wholeness in our approach to wealth management. With a deep understanding of the complexities of financial markets, our multifaceted team brings wisdom, integrity, and expertise to help clients achieve their financial goals.We build lasting relationships on trust, delivering tailored investment solutions that align with our clients' goals for wealth creation, financial freedom, and legacy building.
          </p>


        </motion.div>
      </div>
    </section >
  );
};

export default AboutSection;
