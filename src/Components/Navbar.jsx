import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { GoArrowUpRight } from "react-icons/go";
import logo2 from "../images/logo-dummy.png";
import { scroller } from "react-scroll";

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [submenu, setSubmenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [mobileLoginOpen, setMobileLoginOpen] = useState(false);
  const [investorOpen, setInvestorOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);

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
    <>
      <nav
        className={`font-satoshi fixed z-50 md:mx-12
        bg-white/10 backdrop-blur-md px-4 md:px-24 py-2 md:py-3
        flex justify-between items-center
        transition-all duration-500 ease-in-out
        ${showNavbar
            ? "top-4 inset-x-4 rounded-lg translate-y-0"
            : "top-0 inset-x-0 rounded-none -translate-y-full"
          }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo2} alt="logo" className="h-16 md:h-20 w-auto" />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-9 font-bold text-lg text-white">
          <li>
            <button
              onClick={() => scrollOrNavigateTo("home")}
              className="text-deepblue"
            >
              Home
            </button>
          </li>

          <li>
            <button
              onClick={() => scrollOrNavigateTo("about")}
              className="text-deepblue"
            >
              About
            </button>
          </li>

          <li>
            <button
              onClick={() => scrollOrNavigateTo("services")}
              className="text-deepblue"
            >
              Services
            </button>
          </li>

          <li>
            <button
              onClick={() => scrollOrNavigateTo("contact")}
              className="text-deepblue"
            >
              Contact
            </button>
          </li>

          <li>
            <NavLink
              to="/disclosure"
              className={({ isActive }) =>
                isActive
                  ? "text-deepblue font-semibold"
                  : "text-deepblue"
              }
            >
              Disclosure
            </NavLink>
          </li>
        </ul>

        {/* Desktop Login */}
        <div className="hidden md:block relative" ref={dropdownRef}>
          <button
            onClick={handleLoginClick}
            className="font-bold text-lg bg-deepblue text-white px-8 py-2 rounded-lg"
          >
            Login
          </button>

          {loginOpen && (
            <div className="bg-white/10 backdrop-blur-xl absolute right-0 mt-11 w-64 rounded-lg p-6 text-white font-bold text-lg">
              <div
                onClick={() => setSubmenu("investor")}
                className="px-3 py-2 hover:text-deepblue flex justify-between cursor-pointer"
              >
                Investor Login <GoArrowUpRight />
              </div>

              <hr className="my-2 border-gray-300" />

              <div
                onClick={() => setSubmenu("employee")}
                className="px-3 py-2 hover:text-deepblue flex justify-between cursor-pointer"
              >
                Employee Login <GoArrowUpRight />
              </div>
            </div>
          )}

          {submenu && (
            <div className="bg-white/20 backdrop-blur-xl absolute right-0 mt-52 w-64 rounded-lg p-6 text-white font-bold text-lg">
              {submenu === "investor" && (
                <><Link
                  to="https://invest.enneafinancialservices.com/"
                  className="flex justify-between"
                >
                  Portfolio <GoArrowUpRight />
                </Link><hr className="my-2 border-gray-300" /></>

              )}

              {/* {submenu === "employee" && (
                <div className="flex flex-col justify-center space-y-2 font-bold text-lg">
                  <Link to="#">IFA Now <GoArrowUpRight /></Link>
                  <Link to="#">KFintech <GoArrowUpRight /></Link>
                  <Link to="#">MF Utilities <GoArrowUpRight /></Link>
                  <Link to="#">Cams <GoArrowUpRight /></Link>
                  <Link to="#">Nuvama Wealth <GoArrowUpRight /></Link>
                </div>
              )} */}
              {submenu === "employee" && (
                <>
                  <Link
                    to="https://invest.enneafinancialservices.com/"
                    className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold"> IFA Now <GoArrowUpRight />
                  </Link>
                  <hr className="my-2 border-gray-300" />
                  <Link
                    to="https://www.nseinvest.com/nsemfdesk/login.htm](https://www.nseinvest.com/nsemfdesk/login.htm"
                    className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold"> NSE  <GoArrowUpRight />
                  </Link> <hr className="my-2 border-gray-300" />
                  <Link
                    to="https://masterstrokeonline.com/login"
                    className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold"> Masterstroke  <GoArrowUpRight />
                  </Link>
                  <hr className="my-2 border-gray-300" />
                  <Link
                    to="https://edge360.camsonline.com/signin"
                    className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold"> Cams <GoArrowUpRight />
                  </Link>
                  <hr className="my-2 border-gray-300" />
                  <Link
                    to="https://mfs.kfintech.com/mfs/distributor/distributor_Login.aspx"
                    className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold"> KFintech <GoArrowUpRight />
                  </Link>
                  <hr className="my-2 border-gray-300" />
                  <Link
                    to="https://www.mfuonline.com/"
                    className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold"> MF Utilities <GoArrowUpRight />
                  </Link>
                  <hr className="my-2 border-gray-300" />
                  <Link
                    to="https://partners.nuvamawealth.com/FPD/Login.aspx"
                    className="px-3 py-2 hover:text-deepblue flex justify-between font-semibold"> Nuvama Wealth <GoArrowUpRight />
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <div className="md:hidden text-deepblue">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex justify-center items-start pt-28">
          <div
            className="absolute inset-0 "
            onClick={() => setMobileOpen(false)}
          />

          <div className="relative w-full mx-4 max-h-[80vh] bg-white/10 backdrop-blur-xl rounded-lg px-6 py-6 overflow-y-auto scrollbar-hide">
            <div className="space-y-3 text-base font-semibold text-deepblue">

              <button
                onClick={() => scrollOrNavigateTo("home")}
                className="flex justify-between w-full"
              >
                Home <GoArrowUpRight />
              </button>

              <hr />

              <button
                onClick={() => scrollOrNavigateTo("about")}
                className="flex justify-between w-full"
              >
                About <GoArrowUpRight />
              </button>

              <hr />

              <button
                onClick={() => scrollOrNavigateTo("services")}
                className="flex justify-between w-full"
              >
                Services <GoArrowUpRight />
              </button>

              <hr />

              <button
                onClick={() => scrollOrNavigateTo("contact")}
                className="flex justify-between w-full"
              >
                Contact <GoArrowUpRight />
              </button>

              <hr />

              <NavLink
                to="/disclosure"
                onClick={() => setMobileOpen(false)}
                className="flex justify-between w-full"
              >
                Disclosure <GoArrowUpRight />
              </NavLink>

              <hr />

              {/* Login */}
              <button
                onClick={() => setMobileLoginOpen(!mobileLoginOpen)}
                className={`flex justify-between items-center w-full transition-all duration-200 ${mobileLoginOpen ? "text-white font-extrabold" : ""
                  }`}
              >
                Login
                {mobileLoginOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {mobileLoginOpen && (
                <div className="space-y-3">

                  <button
                    onClick={() => {
                      setInvestorOpen(!investorOpen);
                      setEmployeeOpen(false);
                    }}
                    className={`mt-5 mb-5 flex justify-between items-center w-full transition-all duration-200 ${investorOpen ? "text-white font-extrabold" : ""
                      }`}
                  >
                    Investor Login
                    {investorOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {investorOpen && (
                    <>
                      <hr className=" border-gray-300" />
                      <Link
                        to="https://invest.enneafinancialservices.com/"
                        className=" hover:text-deepblue flex justify-between font-semibold"> Portfolio  <GoArrowUpRight />
                      </Link>
                      <hr className=" border-gray-300" /></>
                  )}

                  <button
                    onClick={() => {
                      setEmployeeOpen(!employeeOpen);
                      setInvestorOpen(false);
                    }}
                    className={` flex justify-between items-center w-full transition-all duration-200 ${employeeOpen ? "text-white font-bold" : ""
                      }`}
                  >
                    Employee Login

                    {employeeOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>


                  {employeeOpen && (
                    <div className="space-y-3">
                      <hr className=" border-gray-300" />
                      <Link
                        to="https://invest.enneafinancialservices.com/"
                        className=" hover:text-deepblue flex justify-between font-semibold"> IFA Now <GoArrowUpRight />
                      </Link>
                      <hr className=" border-gray-300" />
                      <Link
                        to="https://www.nseinvest.com/nsemfdesk/login.htm](https://www.nseinvest.com/nsemfdesk/login.htm"
                        className=" hover:text-deepblue flex justify-between font-semibold"> NSE  <GoArrowUpRight />
                      </Link> <hr className="my-2 border-gray-300" />
                      <Link
                        to="https://masterstrokeonline.com/login"
                        className=" hover:text-deepblue flex justify-between font-semibold"> Masterstroke  <GoArrowUpRight />
                      </Link>
                      <hr className=" border-gray-300" />
                      <Link
                        to="https://edge360.camsonline.com/signin"
                        className=" hover:text-deepblue flex justify-between font-semibold"> Cams <GoArrowUpRight />
                      </Link>
                      <hr className=" border-gray-300" />
                      <Link
                        to="https://mfs.kfintech.com/mfs/distributor/distributor_Login.aspx"
                        className=" hover:text-deepblue flex justify-between font-semibold"> KFintech <GoArrowUpRight />
                      </Link>
                      <hr className=" border-gray-300" />
                      <Link
                        to="https://www.mfuonline.com/"
                        className=" hover:text-deepblue flex justify-between font-semibold"> MF Utilities <GoArrowUpRight />
                      </Link>
                      <hr className=" border-gray-300" />
                      <Link
                        to="https://partners.nuvamawealth.com/FPD/Login.aspx"
                        className=" hover:text-deepblue flex justify-between font-semibold"> Nuvama Wealth <GoArrowUpRight />
                      </Link>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;