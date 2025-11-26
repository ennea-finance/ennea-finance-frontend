import React from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ import this
import logo from "../images/logo.png";

const Footer = () => {
  const navigate = useNavigate(); // ✅ initialize

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">
        {/* Logo & Socials */}
        <div>
          <div className="flex items-center gap-2 mb-10">
            <img src={logo} alt="Ennea Logo" className="w-52 h-24" />
          </div>
          <p className="text-xl font-normal mb-4">Follow Us</p>
          <div className="flex gap-3 text-blue-700">
            <a
              href="#"
              className="text-pink-600 hover:scale-110 transition-transform text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-blue-700 hover:scale-110 transition-transform text-2xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              className="hover:text-blue-700 hover:scale-110 transition-transform text-2xl"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="hover:text-blue-700 hover:scale-110 transition-transform text-2xl"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="mt-10">
          <h4 className="text-deepblue text-xl font-bold mb-4">Services</h4>
          <ul className="space-y-2 text-gray-600 text-base">
            <li>
              <a href="#" className="hover:text-deepblue transition">
                Portfolio Management
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-deepblue transition">
                Retirement Planning
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-deepblue transition">
                Estate Planning
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-deepblue transition"
                onClick={() => navigate("/disclosure")} // ✅ Navigate to Disclosure
              >
                Tax Optimization
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="mt-10">
          <h4 className="text-deepblue text-xl font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-600 text-base">
            <li>
              <a href="#" className="hover:text-deepblue transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-deepblue transition">
                Our Team
              </a>
            </li>
            <li>
              {/* ✅ Proper navigation for Disclosure */}
              <button
                onClick={() => navigate("/disclosure")}
                className="hover:text-deepblue transition text-left"
              >
                Disclosure
              </button>
            </li>
            <li>
              <a href="#" className="hover:text-deepblue transition">
                News & Insights
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="mt-10">
          <h4 className="text-deepblue text-xl font-bold mb-4">Contact</h4>
          <ul className="space-y-3 text-gray-600 text-base">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-deepblue" /> +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-deepblue" /> info@wealthpro.com
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-deepblue" /> 123 Financial District, NY 10004
            </li>
          </ul>
        </div>
      </div>

      {/* Registration Info */}
      <div className="text-center text-base text-white py-3 mb-10 bg-deepblue p-0 rounded-2xl">
        <p>
          AMFI Registration Number - ARN-76122 | Initial Registration date: 11 September 2009 | Validity of ARN: 06 August 2026
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-lightblue pt-8 text-center text-base text-gray-600">
        <p>
          © 2025 Ennea Financial Services. All rights reserved. |
          <a href="#" className="hover:text-blue-700 mx-1">
            Privacy Policy
          </a>
          |
          <a href="#" className="hover:text-blue-700 mx-1">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
