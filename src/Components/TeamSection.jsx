import React from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn } from "react-icons/fa";

// ===== TEAM DATA =====
const teamMembers = [
  {
    name: "Krishna Loya",
    role: "Operations",
    ex: "Ex Anand Rathi",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80",
    linkedin: "#",
  },
  {
    name: "Kavita Khatri",
    role: "Compliance",
    ex: "Ex Nuvama",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    linkedin: "#",
  },
  {
    name: "Neil Mendonca",
    role: "Customer Experience",
    ex: "Ex Swiss International Airlines",
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=600&q=80",
    linkedin: "#",
  },
  {
    name: "Adil Siddiqui",
    role: "Design",
    ex: "Ex PhonePe",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=600&q=80",
    linkedin: "#",
  },
];

// ===== ANIMATION =====
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const TeamSection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-16 lg:px-24">
      
      {/* ===== HEADER ===== */}
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <button className="border border-deepblue px-8 py-2 rounded-full text-base font-medium">
          Our Team
        </button>

        <h2 className="text-3xl md:text-5xl font-bold mt-4">
          Dedicated Expert{" "}
          <span className="text-deepblue font-playfair italic font-semibold">
            Consultants
          </span>
        </h2>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Professionals who bring discipline, integrity, and experience to every client relationship.
        </p>
      </motion.div>

      {/* ===== TEAM GRID ===== */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            transition={{ delay: index * 0.08 }}
            className="rounded-2xl overflow-hidden  border border-deepblue/10 "
          >
            {/* IMAGE */}
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-[360px] object-cover"
            />

            {/* TEXT SECTION (SEPARATE) */}
            <div className="relative p-6 bg-white shadow-lg">
               <h3 className="text-black text-2xl font-semibold">
                {member.name}
              </h3>
              <p className="text-gray-400 text-md mb-1">
                {member.role}
              </p>

              <h3 className="text-white text-xl font-semibold">
                {member.name}
              </h3>

        

              {/* LINKEDIN ICON */}
              <a
                href={member.linkedin}
                className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-deepblue flex items-center justify-center hover:scale-95 transition"
              >
                <FaLinkedinIn className="text-white bg-deepblue/60 text-lg" />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TeamSection;
