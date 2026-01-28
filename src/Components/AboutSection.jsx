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

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section ref={ref} className="mx-auto my-20 md:my-32 px-7 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-8xl mx-auto items-center">

        {/* 🧾 TEXT CONTENT (FIRST ON MOBILE) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariant}
          className="flex flex-col justify-center order-1 lg:order-2"
        >
          <button className="mb-4 border border-deepblue px-5 py-1.5 rounded-full text-sm hover:shadow transition w-fit">
            About Us
          </button>

          <h2 className="text-3xl md:text-5xl font-semibold mt-4 leading-tight">
            Empowering Smarter <br />
            <span className="text-deepblue font-playfair">
              Financial Decisions
            </span>
          </h2>

          <p className="text-gray-600 mt-4 text-md sm:text-base leading-relaxed max-w-xl">
            Established in 2024, Ennea Financial Services, our name is inspired by the Greek word 'Ennea,' meaning nine, a number symbolizing completeness, harmony, and spiritual awakening.
          </p>

          <p className="text-gray-600 mt-4 text-md sm:text-base leading-relaxed max-w-xl">
            We embody these principles, striving for wholeness in our approach to wealth management and fostering long term relationship built on trust. Our bespoke investment solutions are designed to help clients achieve their unique goals, whether that's building wealth, securing financial freedom, or creating a lasting legacy. Our open-architecture platform allows us to curate the best investment opportunities based on individual risk profiles and investment horizons.
          </p>

          <p className="text-gray-600 mt-4 text-md sm:text-base leading-relaxed max-w-xl">
            With a deep understanding of the complexities of financial markets, our multifaceted team brings wisdom, integrity, and expertise to help clients achieve their financial goals. Our team boasts over 40 years of combined financial experience. We adhere to global best practices in wealth management, offering tailored advice that balances global perspectives with Indian market insights.
          </p>

          <p className="text-gray-600 mt-4 text-md sm:text-base leading-relaxed max-w-xl">
            Our open-architecture platform allows us to curate the best investment opportunities based on individual risk profiles and investment horizons.
          </p>
        </motion.div>

        {/* 🖼️ IMAGE (SECOND ON MOBILE) */}
        <motion.div
          className="flex justify-center lg:justify-end order-2 lg:order-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariant}
        >
          <div className="relative w-full max-w-lg lg:max-w-xl">
            <img
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800&q=80"
              alt="Financial Consultation"
              className="rounded-3xl w-full object-cover h-[360px] sm:h-[420px] md:h-[490px] lg:h-[660px]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
