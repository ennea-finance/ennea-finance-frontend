import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiArrowRight, FiLoader } from "react-icons/fi";

/* ================= ANIMATION ================= */

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
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const formAnimation = {
  hidden: { opacity: 0, scale: 0.97, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.message
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        `${process.env.REACT_APP_ADMIN_BACKEND_URL}/auth/admin/sendEmail`,
        formData
      );

      if (response.data.message) {
        toast.success("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending message!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-20 sm:py-20 md:py-28 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden">

      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-12 items-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >

        {/* Contact Form */}

        <motion.div
          variants={formAnimation}
          className="mx-2 order-2 lg:order-1 bg-white rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border border-deepblue/10 shadow-sm"
        >
          <h3 className="font-satoshi text-xl sm:text-2xl font-semibold mb-6">
            Schedule a Free Consultation
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5 font-satoshi">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="firstName"
                type="text"
                placeholder="First Name*"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-md px-4 py-2 text-base w-full focus:ring-2 focus:ring-deepblue focus:outline-none transition"
              />

              <input
                name="lastName"
                type="text"
                placeholder="Last Name*"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-md px-4 py-2 text-base w-full focus:ring-2 focus:ring-deepblue focus:outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="email"
                type="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-md px-4 py-2 text-base w-full focus:ring-2 focus:ring-deepblue focus:outline-none transition"
              />

              <input
                name="phone"
                type="text"
                placeholder="Phone Number*"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-md px-4 py-2 text-base w-full focus:ring-2 focus:ring-deepblue focus:outline-none transition"
              />
            </div>

            <textarea
              name="message"
              placeholder="Message Here..."
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded-md px-4 py-2 text-base w-full focus:ring-2 focus:ring-deepblue focus:outline-none resize-none transition"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-2 bg-deepblue text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 transition-all ${
                isSubmitting
                  ? "opacity-80 cursor-not-allowed"
                  : "hover:opacity-90 hover:-translate-y-[2px]"
              }`}
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin text-xl" />
                  Processing...
                </>
              ) : (
                <>
                  Submit <FiArrowRight className="text-xl" />
                </>
              )}
            </button>

          </form>
        </motion.div>

        {/* Right Content */}

        <motion.div
          variants={fadeUp}
          className="order-1 lg:order-2 space-y-6 text-center lg:text-left lg:flex-col lg:justify-center"
        >
          <h2 className="font-satoshi text-3xl sm:text-4xl md:text-5xl font-bold text-deepblue lg:text-center">
            Get In Touch With Us
          </h2>

          <div className="px-4 lg:flex lg:justify-center">
            <p className="font-satoshi text-base sm:text-lg md:text-xl lg:text-xl max-w-lg mx-auto lg:mx-0 lg:text-center">
              At Ennea Financial Services, we help individuals and businesses
              make confident financial decisions.
            </p>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default ContactSection;
