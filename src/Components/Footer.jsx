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
import logo from "../images/logo-dummy.png";
import { scroller } from "react-scroll";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoIosInformationCircle } from "react-icons/io";
import footerBg from "../images/footer-bg.png";

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

  const goToService = (index) => {
    const element = document.getElementById(`service-${index}`);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    window.dispatchEvent(
      new CustomEvent("highlightService", { detail: index })
    );
  };




  return (
    <footer
      className="bg-white border-t border-gray-200 pt-16 md:pt-24 pb-10 px-6 sm:px-8 md:px-16 lg:px-24 lg:pt-32 bg-cover bg-center"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      {/* MAIN GRID */}
      <div className="lg:max-w-max max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">

        {/* FOLLOW US */}
        <div className="order-4 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h4 className="text-deepblue text-xl md:text-2xl font-bold mb-6">
            Follow Us
          </h4>

          {/* Social Icons */}
          <div className="flex gap-6 mb-8">
            {[FaInstagram, FaLinkedin, FaFacebook, FaTwitter].map((Icon, idx) => (
              <Icon
                key={idx}
                className="text-3xl cursor-pointer hover:text-deepblue transition"
              />
            ))}
          </div>

          {/* Map */}
          <div className="w-full rounded-2xl overflow-hidden shadow-md">
            <iframe
              title="Ennea Financial Services Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1885.8113783504286!2d72.8474631!3d19.0363379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92b34968cbd%3A0xa443923aaf1e0f37!2sNational%20Storage%20Building%2C%20New%20Dinkar%20Co%20Operative%20Housing%20Society%2C%20Mahim%2C%20Mumbai%2C%20Maharashtra%20400016!5e0!3m2!1sen!2sin!4v1767726636571!5m2!1sen!2sin"
              className="w-full h-[200px] md:h-[230px] border-0"
              loading="lazy"
            />
          </div>
        </div>

        {/* COMPANY */}
        <div className=" order-2 lg:order-2 flex flex-col items-center lg:items-center lg:justify-start md:items-start text-center md:text-left">
          <div className="">
            <h4 className=" text-deepblue text-xl md:text-2xl font-bold mb-4">
              Company
            </h4>

            <ul className=" space-y-2 text-gray-600 text-md md:text-lg lg:text-left">
              <li onClick={() => scrollOrNavigateTo("home")} className="cursor-pointer hover:text-deepblue lg:text-left">Home</li>
              <li onClick={() => scrollOrNavigateTo("about")} className="cursor-pointer hover:text-deepblue">About Us</li>
              <li onClick={() => scrollOrNavigateTo("team")} className="cursor-pointer hover:text-deepblue">Our Team</li>
              <li onClick={() => navigate("/disclosure")} className="cursor-pointer hover:text-deepblue">Disclosure</li>
              <li onClick={() => scrollOrNavigateTo("contact")} className="cursor-pointer hover:text-deepblue">Contact Us</li>
            </ul>
          </div>
        </div>

        {/* SERVICES */}
        <div className=" order-3 lg:order-3 flex flex-col items-center lg:items-start md:items-start text-center md:text-left">
          <h4 className=" text-deepblue text-xl md:text-2xl font-bold mb-4">
            Services
          </h4>

          <ul className="space-y-2 text-gray-600 text-md md:text-lg text-center lg:text-left">
            <li onClick={() => goToService(0)} className="cursor-pointer hover:text-deepblue">
              Mutual Funds
            </li>

            <li onClick={() => goToService(1)} className="cursor-pointer hover:text-deepblue">
              Portfolio Management Services
            </li>

            <li onClick={() => goToService(2)} className="cursor-pointer hover:text-deepblue">
              Alternative Investment Funds
            </li>

            <li onClick={() => goToService(3)} className="cursor-pointer hover:text-deepblue">
              Private Equity Fund
            </li>


            <li>
              <button
                onClick={() => setOpenServices(!openServices)}
                className={`flex items-center gap-2 transition mx-auto md:mx-0 ${openServices ? "text-deepblue font-bold" : ""
                  }`}
              >
                Fixed Income Instruments
                {openServices ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </button>

              {openServices && (
                <ul className="mt-3 space-y-2 text-gray-600 text-md md:text-lg text-center lg:text-left">
                  <li onClick={() => goToService(4)} className="cursor-pointer hover:text-deepblue" >Corporate Bonds</li>
                  <li onClick={() => goToService(4)} className="cursor-pointer hover:text-deepblue">Non-Convertible Debentures</li>
                  <li onClick={() => goToService(4)} className="cursor-pointer hover:text-deepblue">Market Linked Debentures</li>
                  <li onClick={() => goToService(4)} className="cursor-pointer hover:text-deepblue">Corporate FDs</li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* LOGO + DETAILS */}
        <div className=" order-1 lg:order-4 flex flex-col items-center lg:items-start text-center lg:text-left">
          <img
            src={logo}
            alt="Logo"
            className="w-52 sm:w-52 md:w-60 mb-6 object-contain "
          />

          <div className="text-gray-800 text-base md:text-base space-y-4 max-w-md ">

            <div className="flex items-start gap-3 justify-start lg:justify-start text-left">
              <FaLocationDot className="text-deepblue text-lg mt-1 text-left" />
              <div>
                <p>312, National Storage Building</p>
                <p>Near Indian Oil Petrol Pump</p>
                <p>Senapati Bapat Marg, Mahim (W)</p>
                <p>Mumbai, Maharashtra 400016</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-start lg:justify-start text-left">
              <FaPhoneAlt className="text-deepblue text-lg" />
              <p>022 6507 5829 | +91 85915 25189</p>
            </div>

            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <MdEmail className="text-deepblue text-lg" />
              <p>service@enneafinancialservices.com</p>
            </div>

            <div className="flex items-start gap-3 justify-start lg:justify-start text-left">
              <IoIosInformationCircle className="text-deepblue text-lg mt-1" />
              <div>
                <p>AMFI Registration Number: 311501</p>
                <p>Registration Date: 17th October 2024</p>
                <p>Validity Till: 16th October 2027</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-black/10 pt-6 text-center text-xs md:text-sm text-gray-600 space-y-2">
        <p>
          © {new Date().getFullYear()} Ennea Financial Services. All rights reserved.
        </p>

        <p className="flex items-center justify-center gap-1 flex-wrap">
          Design with ❤️ by
          <a
            href="https://www.linkedin.com/in/vishal-borse-971241212/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-deepblue font-medium"
          >
            Vishal Borse & Team
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;