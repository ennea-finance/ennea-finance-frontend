import React from "react";
import { motion } from "framer-motion";

// 🧑‍💼 Team Data
const teamMembers = [
  {
    name: "Sarah Williams",
    title: "Chief Investment Officer",
    desc: "15+ years in portfolio management with expertise in global markets.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80",
    color: "bg-yellow-200",
  },
  {
    name: "Michael Chen",
    title: "Senior Financial Advisor",
    desc: "Certified Financial Planner specializing in retirement.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=60",
    color: "bg-blue-100",
  },
  {
    name: "Craig Lubin",
    title: "Tax Strategy Director",
    desc: "CPA with extensive experience in tax optimization and wealth.",
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=600&q=60",
    color: "bg-blue-200",
  },
  {
    name: "David Rodriguez",
    title: "Senior Portfolio Manager",
    desc: "Expert in market analysis and risk assessment for optimal portfolio.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=60",
    color: "bg-lightblue",
  },
];

// ✨ Animation Variants
const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const TeamSection = () => {
  return (
    <section className="w-full bg py-16 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* 🔹 Header Section */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
      >
        <button className="border border-deepblue px-8 py-2 rounded-full text-base font-medium hover:shadow transition">
          Our Team
        </button>
        <h2 className="text-3xl md:text-5xl font-bold mt-4">
          Dedicated Expert{" "}
          <span className="text-deepblue font-playfair italic font-semibold">Consultants</span>
        </h2>
        <p className="text-gray-600 mt-4 text-sm md:text-base max-w-2xl mx-auto">
          We combine expertise, technology, and a personalized approach to guide
          clients.
        </p>
      </motion.div>

      {/* 👥 Team Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto mt-16"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="text-center"
            variants={fadeUpVariant}
          >
            {/* Image Card with Offset BG */}
            <div className="relative flex justify-center mb-6 h-64">
              <img
                src={member.image}
                alt={member.name}
                className="w-48 h-64 md:w-48 md:h-64 rounded-3xl object-cover "
              />
            </div>

            {/* Name + Title + Desc */}
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-deepblue font-playfair italic font-bold text-sm">
              {member.title}
            </p>
            <p className="text-sm mt-2 max-w-xs mx-auto">
              {member.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
};

export default TeamSection;
