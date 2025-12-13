import React, { useState } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo2.png";
import { scroller } from "react-scroll";

const Footer = () => {
  const navigate = useNavigate();
  const [openServices, setOpenServices] = useState(false);


  const scrollOrNavigateTo = (targetName) => {
    const offsetValue = -80; // adjust navbar height

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
      <div className="max-w-7xl mx-auto flex justify-between pb-12">

        {/* ================= COL 1 : LOGO + DETAILS ================= */}
        <div className="min-w-xl flex flex-col">
          <div>
            <img src={logo} alt="Logo" className="w-64 h-28 mb-6" />
          </div>
          <div className="text-gray-800 text-lg">
            <div>
              <p className="">
                16 Nanak, 3rd Floor, Manmala Tank Road
              </p>
              <p className="">
                Near Star City Theatre, Mahim, Mumbai
              </p>
              <p className="">
                Maharashtra India 400016
              </p>
            </div>

            <div className="mt-6">
              <p className="flex items-center gap-2">
                +91 83693 85312
              </p>

              <p className="flex items-center gap-2">
                info@askinvestment.com
              </p>
            </div>
          </div>

          <div className="mt-6 text-lg text-gray-600">
            <p><strong>ARN:</strong> 79003</p>
            <p><strong>Registration Date:</strong> 23/03/2015</p>
            <p><strong>Validity Till:</strong> 22/03/2027</p>
          </div>
        </div>

        {/* ================= COL 2 : SERVICES (DROPDOWN) ================= */}
        <div className="mt-6">
          <h4 className="text-deepblue text-2xl font-bold mb-4">Services</h4>

          <ul className="space-y-2 text-gray-600 text-lg">
            <li>Mutual Funds</li>
            <li>Portfolio Management Services (PMS)</li>
            <li>Alternative Investment Funds (AIF)</li>
            <li>Private Equity Fund</li>

            {/* Dropdown */}
            <li>
              <button
                onClick={() => setOpenServices(!openServices)}
                className="flex items-center gap-2 hover:text-deepblue transition font-medium"
              >
                Fixed Income Instruments
                {openServices ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </button>

              {openServices && (
                <ul className="ml-1 mt-2 space-y-1 text-lg text-gray-600">
                  <li>Corporate Bonds</li>
                  <li>Non-Convertible Debentures</li>
                  <li>Market Linked Debentures</li>
                  <li>Corporate FDs</li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* ================= COL 3 : COMPANY ================= */}
        <div className="mt-6">
          <h4 className="text-deepblue text-2xl font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-600 text-lg">
            <li onClick={() => scrollOrNavigateTo("home")} className="cursor-pointer hover:text-deepblue">Home</li>
            <li onClick={() => scrollOrNavigateTo("about")} className="cursor-pointer hover:text-deepblue">About Us</li>
            <li onClick={() => scrollOrNavigateTo("team")} className="cursor-pointer hover:text-deepblue">Our Team</li>
            <li onClick={() => navigate("/disclosure")} className="cursor-pointer hover:text-deepblue">Disclosure</li>
            <li onClick={() => scrollOrNavigateTo("contact")} className="cursor-pointer hover:text-deepblue">Contact Us</li>
          </ul>
        </div>

        {/* ================= COL 4 : FOLLOW US ================= */}
        <div className="mt-6">
          <h4 className="text-deepblue text-2xl font-bold mb-4">Follow Us</h4>

          <div className="flex gap-4 text-3xl text-black mb-6">
            <FaInstagram className="hover:scale-110 transition cursor-pointer" />
            <FaLinkedin className="hover:scale-110 transition cursor-pointer" />
            <FaFacebook className="hover:scale-110 transition cursor-pointer" />
            <FaTwitter className="hover:scale-110 transition cursor-pointer" />
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-lightblue pt-6 text-center text-base text-gray-600">
        © {new Date().getFullYear()} Ennea Financial Services. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
