import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

/* Animation Variants */

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const quoteAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const AboutSection = () => {
  return (
    <section className="mb-20 my-20 md:my-36 font-satoshi relative">

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="max-w-full mx-6 md:mx-40 text-left relative"
      >

        {/* Left Quote */}
        <motion.div variants={quoteAnimation}>
          <FaQuoteLeft className="text-2xl md:text-4xl mb-6 opacity-80 text-deepblue" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          <span className="text-deepblue">About Us</span>
        </motion.h2>

        {/* Paragraphs */}

        <motion.p
          variants={fadeUp}
          className="text-gray-800 font-normal mt-6 sm:text-2xl leading-relaxed text-justify"
        >
          Established in 2024, ennea financial services, our name is inspired by
          the greek word <span className="italic">“ennea”</span>, meaning nine —
          A number symbolizing completeness, harmony, and spiritual awakening.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="text-gray-800 sm:text-2xl leading-relaxed text-justify font-normal mt-4"
        >
          We embody these principles, striving for wholeness in our approach to wealth 
          management and fostering long term relationship built on trust. Our bespoke 
          investment solutions are designed to help clients achieve their unique goals, 
          whether that's building wealth, securing financial freedom, or creating a 
          lasting legacy. Our open-architecture platform allows us to curate the best 
          investment opportunities based on individual risk profiles and investment horizons.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="text-gray-800 font-normal mt-4 sm:text-2xl leading-relaxed text-justify"
        >
          With a deep understanding of the complexities of financial markets, 
          our multifaceted team brings wisdom, integrity, and expertise to help 
          clients achieve their financial goals. Our team boasts over 40 years of 
          combined financial experience. We adhere to global best practices in wealth 
          management, offering tailored advice that balances global perspectives 
          with Indian market insights.
          We adhere to global best practices in wealth management, offering
          tailored advice that balances global perspectives with Indian market
          insights.
        </motion.p>

        {/* <motion.p
          variants={fadeUp}
          className="text-gray-800 font-normal mt-4 sm:text-2xl leading-relaxed text-justify"
        >
          We adhere to global best practices in wealth management, offering
          tailored advice that balances global perspectives with Indian market
          insights.
        </motion.p> */}

        {/* Right Quote */}
        <motion.div
          variants={quoteAnimation}
          className="flex justify-end mt-10"
        >
          <FaQuoteRight className="text-2xl md:text-4xl opacity-80 text-deepblue" />
        </motion.div>

      </motion.div>

    </section>
  );
};

export default AboutSection;