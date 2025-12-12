// src/Components/FloatingContactButtons.jsx
import React from "react";
import { FaWhatsapp, FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";

const FloatingContactButtons = () => {
    const whatsappNumber = "7666045526"; // <-- Put your WhatsApp number here
    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">

            {/* WhatsApp */}
            <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    "Hello, I would like to schedule a free consultation."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition transform hover:scale-110"
            >
                <FaWhatsapp size={24} />
            </a>

            {/* Call */}
            <a
                href="tel:+917666045526" // <-- Put your phone number
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-xl transition transform hover:scale-110"
            >
                <FaPhoneAlt size={22} />
            </a>

            {/* Schedule CTA */}
            {/* <a
                href="#contact" // scroll to Contact section or open popup
                className="bg-deepblue hover:bg-blue-900 text-white px-5 py-3 rounded-full shadow-lg font-medium text-sm whitespace-nowrap transition transform hover:scale-105"
            >
                Schedule Free Consultation
            </a> */}
        </div>
    );
};

export default FloatingContactButtons;
