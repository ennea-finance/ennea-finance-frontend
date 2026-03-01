import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { GoArrowUpRight } from "react-icons/go";
//import logo from "../images/logo.png";
import logo2 from "../images/logo-dummy.png";
import { scroller } from "react-scroll";

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [submenu, setSubmenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [mobileLoginOpen, setMobileLoginOpen] = useState(false);
  // const [investorOpen, setInvestorOpen] = useState(false);
  // const [employeeOpen, setEmployeeOpen] = useState(false);

  // 🔹 EXISTING scroll visibility logic
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

    setMobileOpen(false);
  };

  // 🔹 EXISTING hide / show logic (UNCHANGED)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click (UNCHANGED)
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

  return (
    <nav
      className={`font-satoshi fixed z-50 mx-12
      bg-white/10 backdrop-blur-md px-4 md:px-24 py-2 md:py-3
      flex justify-between items-center
      transition-all duration-500 ease-in-out
      ${
        showNavbar
          ? "top-4 inset-x-4 rounded-full translate-y-0"
          : "top-0 inset-x-0 rounded-none -translate-y-full"
      }`}
    >
      {/* ---------- Logo (UNCHANGED) ---------- */}
      <div className="flex flex-col items-center space-x-2">
        <img src={logo2} alt="logo" className="h-20 w-56" />
      </div>

      {/* ---------- Desktop Navigation (UNCHANGED) ---------- */}
      <ul className="hidden md:flex space-x-9 font-bold text-lg">
        <li>
          <button onClick={() => scrollOrNavigateTo("home")} className="text-deepblue">
            Home
          </button>
        </li>
        <li>
          <button onClick={() => scrollOrNavigateTo("about")} className="text-white hover:text-deepblue">
            About
          </button>
        </li>
        <li>
          <button onClick={() => scrollOrNavigateTo("services")} className="text-white hover:text-deepblue">
            Services
          </button>
        </li>
        {/* <li>
          <button onClick={() => scrollOrNavigateTo("team")} className="text-gray-700 hover:text-deepblue">
            Team
          </button>
        </li> */}
        <li>
          <button onClick={() => scrollOrNavigateTo("contact")} className="text-white hover:text-deepblue">
            Contact
          </button>
        </li>
        <li>
          <NavLink
            to="/disclosure"
            className={({ isActive }) =>
              `transition duration-200 ${
                isActive
                  ? "text-deepblue font-semibold"
                  : "text-white hover:text-deepblue"
              }`
            }
          >
            Disclosure
          </NavLink>
        </li>
      </ul>

      {/* ---------- Desktop Login Dropdown (UNCHANGED) ---------- */}
      <div className="hidden md:block relative" ref={dropdownRef}>
        <button
          onClick={handleLoginClick}
          className="font-satoshi font-bold text-lg bg-deepblue text-white px-8 py-2 rounded-full hover:bg-deepblue transition"
        >
          Login
        </button>

        {loginOpen && (
          <div className="font-satoshi absolute right-0 mt-11 w-64 bg-white shadow-xl rounded-lg p-6 z-50">
            <div
              onClick={() => setSubmenu("investor")}
              className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold cursor-pointer"
            >
              Investor Login <GoArrowUpRight />
            </div>
            <hr className="my-2 border-gray-300" />
            <div
              onClick={() => setSubmenu("employee")}
              className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold cursor-pointer"
            >
              Employee Login <GoArrowUpRight />
            </div>
            {/* <Link
              to="/admin/login"
              className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold"
            >
              Admin Login <GoArrowUpRight />
            </Link> */}
          </div>
        )}

        {submenu && (
          <div className="absolute right-64 mx-4 mt-11 w-64 bg-white shadow-xl rounded-lg p-6 z-50">
            {submenu === "investor" && (
              <Link
                to="https://invest.enneafinancialservices.com/"
                className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold"
              >
                Portfolio <GoArrowUpRight />
              </Link>
            )}
            {submenu === "employee" && (
              <>
                <Link to="https://invest.enneafinancialservices.com/" className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold">
                  IFA Now <GoArrowUpRight />
                </Link>
                <hr className="my-2 border-gray-300" />
                <Link to="https://mfs.kfintech.com/mfs/distributor/distributor_Login.aspx" className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold">
                  KFintech <GoArrowUpRight />
                </Link>
                <hr className="my-2 border-gray-300" />
                <Link to="https://www.mfuonline.com/" className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold">
                  MF Utilities <GoArrowUpRight />
                </Link>
                <hr className="my-2 border-gray-300" />
                <Link to="https://edge360.camsonline.com/signin" className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold">
                  Cams  <GoArrowUpRight />
                </Link>
                <hr className="my-2 border-gray-300" />
                <Link to="https://partners.nuvamawealth.com/FPD/Login.aspx" className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold">
                  Nuvama Wealth <GoArrowUpRight />
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* ---------- Mobile Menu (UNCHANGED) ---------- */}
      <div className="md:hidden">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
