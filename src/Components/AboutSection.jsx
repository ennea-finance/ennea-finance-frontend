import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const AboutSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
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
    <section ref={ref} className="mb-20 md:my-36 font-satoshi relative">
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
        className="max-w-full mx-40 text-left relative"
      >

        {/* 🔹 Left Large Quote (Before Heading) */}
        <FaQuoteLeft className=" text-6xl md:text-4xl mb-6 opacity-80" />

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
          <span className="text-deepblue mt-6">
            About Us
          </span>
        </h2>

        {/* Content */}
        <p className="text-gray-800 font-normal mt-6 sm:text-2xl leading-relaxed text-justify">
          Established in 2024, ennea financial services, our name is inspired by
          the greek word <span className="italic">“ennea”</span>, meaning nine —
          A number symbolizing completeness, harmony, and spiritual awakening.
        </p>

        <p className="text-gray-800 sm:text-2xl leading-relaxed text-justify font-normal mt-4">
          We embody these principles, striving for wholeness in our approach to wealth management
          and fostering long-term relationships built on trust. Our bespoke investment solutions are
          designed to help clients achieve their unique goals — whether that’s building wealth,
          securing financial freedom, or creating a lasting legacy.
        </p>

        <p className="text-gray-800 font-normal mt-4 sm:text-2xl leading-relaxed text-justify">
          With a deep understanding of the complexities of financial markets,
          our multifaceted team brings wisdom, integrity, and expertise to help
          clients achieve their financial goals. Our team boasts over 40 years of
          combined financial experience.
        </p>

        <p className="text-gray-800 font-normal mt-4 sm:text-2xl leading-relaxed text-justify">
          We adhere to global best practices in wealth management, offering tailored
          advice that balances global perspectives with Indian market insights.
          Our open-architecture platform allows us to curate the best investment
          opportunities based on individual risk profiles and investment horizons.
        </p>

        {/* 🔹 Right Large Quote (After Content - Right Side) */}
        <div className="flex justify-end mt-10">
          <FaQuoteRight className="text-6xl md:text-4xl opacity-80" />
        </div>

      </motion.div>
    </section>
  );
};

export default AboutSection;