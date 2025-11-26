import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify"; // for notifications
import "react-toastify/dist/ReactToastify.css";
import { FiArrowRight, FiArrowRightCircle, FiLoader } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.firstName || !formData.message || !formData.phone || !formData.lastName) {
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
      console.error(error);
      toast.error(error.response?.data?.message || "Error sending message!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full mt-20 py-28 px-6 md:px-16 lg:px-24 overflow-hidden bg-lightblue">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Contact Form */}
        <motion.div
          className="bg-white rounded-2xl p-8 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Schedule A Free Consultation
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="firstName"
                type="text"
                placeholder="First Name*"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-md px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name*"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-md px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="email"
                type="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-md px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <input
                name="phone"
                type="text"
                placeholder="Phone Number*"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-md px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {/* Message */}
            <textarea
              name="message"
              placeholder="Message Here..."
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded-md px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-2 bg-gradient-to-r from-deepblue to-blue-900 text-white font-medium py-3 rounded-full flex items-center justify-center gap-2 transition-all ${isSubmitting ? "opacity-80 cursor-not-allowed" : "hover:opacity-90"
                }`}
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin text-lg" />
                  Processing...
                </>
              ) : (
                <>
                  Submit <FiArrowRight className="text-lg" />
                </>
              )}
            </button>
          </form>

        </motion.div>

        {/* Right Side: Contact Info */}
        <motion.div
          className="space-y-6 ml-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <button className="border border-deepblue px-6 py-2 rounded-full text-sm font-medium">
            Contact Us
          </button>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Get In Touch{" "}
            <span className="text-deepblue italic font-playfair">With Us</span>
          </h2>
          <p className="text-sm md:text-base max-w-md">
            At Ennea Financial Services, we help individuals and businesses make
            confident financial decisions through expert consultation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-deepblue text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 text-base">
                  Our Location
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  No. 9A, East Madison Street, Baltimore, MD, USA 4508
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-deepblue text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 text-base">
                  Contact Us
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  +111 234 567 678 <br /> +222 234 567 078
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaClock className="text-deepblue text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 text-base">
                  Working Time
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Mon to Sat: 8:00am - 4:00pm <br /> Sunday: Closed
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelope className="text-deepblue text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 text-base">Email</h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  ennea@gmail.com <br /> info@ennea.com
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
