import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate  } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { GoArrowUpRight } from "react-icons/go";
import logo from "../images/logo.png";
import logo2 from "../images/logo2.png";
import { scroller } from "react-scroll";

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [submenu, setSubmenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLoginOpen, setMobileLoginOpen] = useState(false);
  const [investorOpen, setInvestorOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef(null);

  const navigate = useNavigate ();

  // ⭐ SCROLL OR NAVIGATE TO HOME THEN SCROLL
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

    setMobileOpen(false);
  };

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLoginOpen(false);
        setSubmenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoginClick = () => {
    if (!loginOpen) {
      setLoginOpen(true);
      setSubmenu(null);
    } else if (submenu) {
      setSubmenu(null);
    } else {
      setLoginOpen(false);
    }
  };
  const handleKnowledgeCenterClick = () => {
    navigate("/blogs");
  };

  return (
    <nav
      className={`bg-white px-4 md:px-24 py-4 md:py-5 flex justify-between items-center fixed w-full z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-deep" : "shadow-deep"
      }`}
    >
      {/* ---------- Logo ---------- */}
      <div className="flex flex-col items-center space-x-2">
        <img src={logo2} alt="logo" className="h-20 w-56" />
        {/* <span className="font-medium text-xs md:text-sm text-gray-700 mt-1">
          AMF Registered Mutual Fund Distributor
        </span> */}
      </div>

      {/* ---------- Desktop Navigation ---------- */}
      <ul className="hidden md:flex space-x-9 font-medium">
        {/* Use scroll targets for Home sections */}
        <li>
          <button
            onClick={() => scrollOrNavigateTo("home")}
            className="transition duration-200 text-deepblue"
          >
            Home
          </button>
        </li>

        <li>
          <button
            onClick={() => scrollOrNavigateTo("about")}
            className="transition duration-200 text-gray-700 hover:text-deepblue"
          >
            About
          </button>
        </li>

        <li>
          <button
            onClick={() => scrollOrNavigateTo("services")}
            className="transition duration-200 text-gray-700 hover:text-deepblue"
          >
            Services
          </button>
        </li>

        <li>
          <button
            onClick={() => scrollOrNavigateTo("team")}
            className="transition duration-200 text-gray-700 hover:text-deepblue"
          >
            Team
          </button>
        </li>

        <li>
          <button
            onClick={() => scrollOrNavigateTo("contact")}
            className="transition duration-200 text-gray-700 hover:text-deepblue"
          >
            Contact
          </button>
        </li>

        {/* Non-home pages: use route navigation */}
        <li>
          <NavLink
            to="/disclosure"
            className={({ isActive }) =>
              `transition duration-200 ${isActive ? "text-deepblue font-semibold" : "text-gray-700 hover:text-deepblue"}`
            }
          >
            Disclosure
          </NavLink>
        </li>
      </ul>

      {/* ---------- Desktop Login Dropdown ---------- */}
      <div className="hidden md:block relative" ref={dropdownRef}>
        <div className="flex gap-4">
            {/* <button
          onClick={handleKnowledgeCenterClick}
          className="border border-deepblue px-8 py-2 rounded-full hover:text-deepblue transition"
        >
          Knowledge Center
        </button> */}
        <button
          onClick={handleLoginClick}
          className="bg-deepblue text-white px-8 py-2 rounded-full hover:bg-deepblue transition"
        >
          Login
        </button>
        </div>

        {/* Level 1 Dropdown */}
        {loginOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-lg p-6 z-50 animate-fadeIn">
            <div
              className="px-3 py-2 hover:text-deepblue rounded cursor-pointer flex items-center justify-between font-semibold"
              onClick={() => setSubmenu("investor")}
            >
              Investor Login <GoArrowUpRight />
            </div>
            <hr className="my-2 border-gray-300" />
            <div
              className="px-3 py-2 hover:text-deepblue rounded cursor-pointer flex items-center justify-between font-semibold"
              onClick={() => setSubmenu("employee")}
            >
              Employee Login <GoArrowUpRight />
            </div>
            <hr className="my-2 border-gray-300" />
            <Link
              to="/admin/login"
              className="px-3 py-2 hover:text-deepblue rounded cursor-pointer flex items-center justify-between font-semibold"
            >
              Admin Login <GoArrowUpRight />
            </Link>
          </div>
        )}

        {/* Level 2 Dropdown */}
        {submenu && (
          <div className="absolute right-64 mx-4 top-12 w-64 bg-white shadow-xl rounded-lg p-6 z-50 animate-slideLeft">
            {submenu === "investor" && (
              <>
                <div className="px-3 py-2 hover:text-deepblue flex items-center justify-between font-semibold cursor-pointer">
                  Investor Dashboard <GoArrowUpRight />
                </div>
                <hr className="my-2 border-gray-300" />
                <div className="px-3 py-2 hover:text-deepblue flex items-center justify-between font-semibold cursor-pointer">
                  Portfolio <GoArrowUpRight />
                </div>
                <hr className="my-2 border-gray-300" />
                <div className="px-3 py-2 hover:text-deepblue flex items-center justify-between font-semibold cursor-pointer">
                  Reports <GoArrowUpRight />
                </div>
              </>
            )}
            {submenu === "employee" && (
              <>
                <div className="px-3 py-2 hover:text-deepblue flex items-center justify-between font-semibold cursor-pointer">
                  Employee Dashboard <GoArrowUpRight />
                </div>
                <hr className="my-2 border-gray-300" />
                <div className="px-3 py-2 hover:text-deepblue flex items-center justify-between font-semibold cursor-pointer">
                  Tasks <GoArrowUpRight />
                </div>
                <hr className="my-2 border-gray-300" />
                <div className="px-3 py-2 hover:text-deepblue flex items-center justify-between font-semibold cursor-pointer">
                  Attendance <GoArrowUpRight />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* ---------- Mobile Menu Toggle ---------- */}
      <div className="md:hidden">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ---------- Mobile Sidebar ---------- */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-b-lg p-4 md:hidden z-50 max-h-[90vh] overflow-y-auto">
          <ul className="flex flex-col space-y-4 text-gray-800 font-medium">
            {[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "About", path: "/about" },
              { name: "Team", path: "/team" },
              { name: "Contact", path: "/contact" },
              { name: "Blogs", path: "/blogs" },
            ].map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block transition duration-200 ${
                      isActive
                        ? "text-deepblue font-semibold border-l-4 border-deepblue pl-2"
                        : "hover:text-deepblue"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}

            {/* ---------- Login Accordion ---------- */}
            <li>
              <button
                onClick={() => {
                  setMobileLoginOpen(!mobileLoginOpen);
                  setInvestorOpen(false);
                  setEmployeeOpen(false);
                }}
                className="flex justify-between items-center w-full font-semibold"
              >
                Login
                {mobileLoginOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {/* Login submenu */}
              {mobileLoginOpen && (
                <ul className="mt-2 pl-4 border-l border-gray-300 space-y-2 text-gray-700">
                  {/* Investor */}
                  <li>
                    <button
                      onClick={() => setInvestorOpen(!investorOpen)}
                      className="flex justify-between items-center w-full hover:text-blue-700"
                    >
                      Investor Login
                      {investorOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {investorOpen && (
                      <ul className="mt-2 pl-4 space-y-1 text-sm">
                        <li className="hover:text-blue-700 cursor-pointer">MF Portfolio</li>
                        <li className="hover:text-blue-700 cursor-pointer">IFA Now</li>
                        <li className="hover:text-blue-700 cursor-pointer">My Portfolio</li>
                        <li className="hover:text-blue-700 cursor-pointer">Mister Bond</li>
                      </ul>
                    )}
                  </li>

                  {/* Employee */}
                  <li>
                    <button
                      onClick={() => setEmployeeOpen(!employeeOpen)}
                      className="flex justify-between items-center w-full hover:text-blue-700"
                    >
                      Employee Login
                      {employeeOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {employeeOpen && (
                      <ul className="mt-2 pl-4 space-y-1 text-sm">
                        <li className="hover:text-blue-700 cursor-pointer">NSE NMF</li>
                        <li className="hover:text-blue-700 cursor-pointer">MF Utility</li>
                        <li className="hover:text-blue-700 cursor-pointer">Liquiloans</li>
                        <li className="hover:text-blue-700 cursor-pointer">Ngen Market</li>
                        <li className="hover:text-blue-700 cursor-pointer">Masterstroke Online</li>
                      </ul>
                    )}
                  </li>

                  <li className="hover:text-blue-700 cursor-pointer">Admin Login</li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
