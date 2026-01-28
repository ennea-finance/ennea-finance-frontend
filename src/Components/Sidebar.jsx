// src/Components/Admin/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiUsers,
  FiBriefcase,
  FiLogOut,
} from "react-icons/fi";
import logo2 from "../images/logo2.png";
import { RxDashboard } from "react-icons/rx";


const Sidebar = () => {
  const navLinks = [
    { name: "Home", icon: <RxDashboard  />, path: "/admin/dashboard" },
    { name: "Team Management", icon: <FiUsers />, path: "/admin/team" },
    { name: "Services", icon: <FiBriefcase />, path: "/admin/services" },
    // { name: "Feedback", icon: <FiMessageSquare />, path: "/admin/feedback" },
    // { name: "Articles", icon: <FiFileText />, path: "/admin/articles" },
    // { name: "FAQs", icon: <FiHelpCircle />, path: "/admin/faqs" },
  ];

  return (
    <aside className="w-72 bg-white/90 backdrop-blur-md shadow-[0_4px_40px_rgba(21,0,158,0.1)] flex flex-col justify-between items-center py-10 fixed left-0 top-0 h-screen z-40">
      {/* Logo */}
      <img src={logo2} alt="Logo" className="w-44 mb-10" />

      {/* Navigation */}
      <nav className="flex flex-col gap-3 text-gray-700 w-full px-8">
        {navLinks.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-300
              ${isActive
                ? "bg-deepblue text-white shadow-[0_4px_20px_rgba(21,0,158,0.3)]"
                : "text-gray-700 hover:bg-deepblue/10 hover:text-deepblue"}`
            }
          >
            <span
              className={`text-lg ${
                window.location.pathname === item.path
                  ? "text-white"
                  : "text-deepblue"
              }`}
            >
              {item.icon}
            </span>
            <span className="font-medium text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto w-full flex justify-center pb-6">
        <a
          href="/"
          className="flex items-center justify-center gap-2 bg-deepblue text-white font-medium text-sm px-6 py-3 rounded-full hover:shadow-[0_5px_20px_rgba(21,0,158,0.3)] transition w-3/4 text-center"
        >
          <FiLogOut className="text-base" /> Logout
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
