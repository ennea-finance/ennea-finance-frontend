import React, { useState } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaChevronDown,
  FaChevronUp,
  FaPhoneAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo2.png";
import { scroller } from "react-scroll";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const navigate = useNavigate();
  const [openServices, setOpenServices] = useState(false);

  const scrollOrNavigateTo = (targetName) => {
    const offsetValue = -80;

    if (window.location.pathname === "/") {
      scroller.scrollTo(targetName, {
        duration: 600,
        smooth: true,
        offset: offsetValue,
      });
    } else {
      navigate("/", { state: { scrollTo: targetName } });
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-6 px-6 md:px-16 lg:px-24">
      {/* ================= MAIN GRID ================= */}
      <div
        className="
          max-w-7xl mx-auto
          grid grid-cols-1
          md:grid-cols-2
          lg:grid-cols-[2.5fr_1.5fr_2.5fr_3.5fr]
          gap-12 pb-12
        "
      >
        {/* ================= COL 1 : FOLLOW US ================= */}
        <div className="flex flex-col w-full items-center lg:items-start text-center lg:text-left">
          <h4 className="text-deepblue text-2xl font-bold mb-6">
            Follow Us
          </h4>

          {/* Social Icons */}
          <div className="flex gap-2 mb-6 justify-center lg:justify-start">
            {[FaInstagram, FaLinkedin, FaFacebook, FaTwitter].map(
              (Icon, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-full bg-gray-100 hover:bg-deepblue hover:text-white transition cursor-pointer shadow-sm hover:shadow-md"
                >
                  <Icon className="text-3xl" />
                </div>
              )
            )}
          </div>

          {/* Map */}
          <div className="w-full max-w-md lg:max-w-full rounded-2xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1885.8113783504286!2d72.8474631!3d19.0363379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92b34968cbd%3A0xa443923aaf1e0f37!2sNational%20Storage%20Building%2C%20New%20Dinkar%20Co%20Operative%20Housing%20Society%2C%20Mahim%2C%20Mumbai%2C%20Maharashtra%20400016!5e0!3m2!1sen!2sin!4v1767726636571!5m2!1sen!2sin"
              className="w-full h-[200px] md:h-[220px] lg:h-[250px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* ================= COL 2 : COMPANY ================= */}
        <div className="flex flex-col w-full items-center md:items-start text-center md:text-left">
          <h4 className="text-deepblue text-2xl font-bold mb-4">Company</h4>

          <ul className="space-y-2 text-gray-600 text-lg">
            <li onClick={() => scrollOrNavigateTo("home")} className="cursor-pointer hover:text-deepblue">Home</li>
            <li onClick={() => scrollOrNavigateTo("about")} className="cursor-pointer hover:text-deepblue">About Us</li>
            <li onClick={() => scrollOrNavigateTo("team")} className="cursor-pointer hover:text-deepblue">Our Team</li>
            <li onClick={() => navigate("/disclosure")} className="cursor-pointer hover:text-deepblue">Disclosure</li>
            <li onClick={() => scrollOrNavigateTo("contact")} className="cursor-pointer hover:text-deepblue">Contact Us</li>
          </ul>
        </div>

        {/* ================= COL 3 : SERVICES ================= */}
        <div className="flex flex-col w-full items-center md:items-start text-center md:text-left">
          <h4 className="text-deepblue text-2xl font-bold mb-4">Services</h4>

          <ul className="space-y-2 text-gray-600 text-lg">
            <li>Mutual Funds</li>
            <li>Portfolio Management Services (PMS)</li>
            <li>Alternative Investment Funds (AIF)</li>
            <li>Private Equity Fund</li>

            <li>
              <button
                onClick={() => setOpenServices(!openServices)}
                className="flex items-center gap-2 hover:text-deepblue transition font-medium justify-center md:justify-start"
              >
                Fixed Income Instruments
                {openServices ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </button>

              {openServices && (
                <ul className="ml-0 md:ml-1 mt-2 space-y-1 text-lg text-gray-600">
                  <li>Corporate Bonds</li>
                  <li>Non-Convertible Debentures</li>
                  <li>Market Linked Debentures</li>
                  <li>Corporate FDs</li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* ================= COL 4 : LOGO + DETAILS ================= */}
        <div className="flex flex-col w-full items-center lg:items-start text-center lg:text-left lg:pl-8">
          <img
            src={logo}
            alt="Logo"
            className="w-52 md:w-60 lg:w-64 h-auto mb-6 object-contain"
          />

          <div className="text-gray-800 text-lg space-y-4 max-w-md">
            {/* Address */}
            <div className="flex items-start gap-3 justify-center lg:justify-start">
              <FaLocationDot className="mt-1 text-deepblue text-xl flex-shrink-0" />
              <div>
                <p>12, National Storage Building,</p>
                <p>Senapati Bapat Marg, Mahim (W)</p>
                <p>Mumbai, Maharashtra 400016</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <FaPhoneAlt className="text-deepblue text-lg flex-shrink-0" />
              <p>022 6507 5829 | +91 85915 25189</p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <MdEmail className="text-deepblue text-xl flex-shrink-0" />
              <p>service@enneafinancialservices.com</p>
            </div>
          </div>

          {/* Registration Info */}
          <div className="mt-6 text-lg text-gray-600 space-y-1 text-center lg:text-left">
            <p><strong>AMFI Registration Number:</strong> 311501</p>
            <p><strong>Registration Date:</strong> 17th October 2024</p>
            <p><strong>Validity Till:</strong> 16th October 2027</p>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-lightblue pt-6 text-center text-sm md:text-base text-gray-600">
        © {new Date().getFullYear()} Ennea Financial Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
