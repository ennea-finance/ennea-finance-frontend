import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiBriefcase,
  FiMessageSquare,
  FiFileText,
  FiHelpCircle,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";
import { jwtDecode } from "jwt-decode";
import logo2 from "../../images/logo2.png";

const features = [
  {
    title: "Team Management",
    description:
      "Add, edit, or remove team member profiles to keep your team section updated.",
    icon: <FiUsers className="text-deepblue text-3xl" />,
    url: "/admin/team",
  },
  {
    title: "Services Management",
    description:
      "Easily manage and update your offered services as your business evolves.",
    icon: <FiBriefcase className="text-deepblue text-3xl" />,
    url: "/admin/services",
  },
  // {
  //   title: "Feedback Management",
  //   description:
  //     "Edit or reorder client testimonials to showcase your best success stories.",
  //   icon: <FiMessageSquare className="text-deepblue text-3xl" />,
  //   url: "/admin/feedback",
  // },
  // {
  //   title: "Articles & News Management",
  //   description:
  //     "Post blogs or updates anytime to keep your content fresh and boost SEO.",
  //   icon: <FiFileText className="text-deepblue text-3xl" />,
  //   url: "/admin/articles",
  // },
  // {
  //   title: "FAQ Management",
  //   description:
  //     "Add or edit FAQs so users always see the most up-to-date answers.",
  //   icon: <FiHelpCircle className="text-deepblue text-3xl" />,
  //   url: "/admin/faqs",
  // },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin");

  // ✅ Extract Name from JWT Token
  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token");
      console.log("Token:", token);
      if (token) {
        const decoded = jwtDecode(token);
        if (decoded?.name) setAdminName(decoded.name);
      }
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }, []);

  // ✅ Greeting Based on Time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#F8F7FF] via-white to-[#F8F7FF] overflow-hidden">
      {/* 🔹 Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white shadow-lg flex flex-col justify-between items-center py-10 transition-transform duration-300 z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center space-y-2">
          <img src={logo2} alt="Logo" className="w-48 h-auto" />
        </div>

        {/* Divider line */}
        <div className="w-3/4 h-px bg-gray-200 my-6"></div>

        {/* Logout Button */}
        <div className="mt-auto w-full flex justify-center pb-6">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-deepblue text-white font-medium text-sm px-6 py-3 rounded-full hover:shadow-[0_5px_20px_rgba(21,0,158,0.3)] transition w-3/4 text-center"
          >
            <FiLogOut className="text-base" />
            Logout
          </Link>
        </div>
      </aside>

      {/* 🟦 Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex justify-between items-center px-6 md:px-10 py-5 bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiMenu size={22} />
            </button>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 px-6 pt-10">
              {getGreeting()}, <span className="text-deepblue">{adminName} 👋</span>
            </h2>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 px-6 md:px-12 py-10 overflow-y-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariant}
                initial="hidden"
                animate="visible"
                className="border border-deepblue bg-white hover:bg-lightblue hover:border-lightblue rounded-2xl p-8 text-center md:text-left hover:shadow-[0_0_20px_4px_rgba(29,78,216,0.15)] transition-all duration-300 ease-out"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-deepblue/10 rounded-xl">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-6">{item.description}</p>
                <Link
                  to={item.url}
                  className="w-fit mt-auto bg-gradient-to-r from-deepblue to-blue-900 text-white text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 hover:shadow-[0_5px_20px_rgba(21,0,158,0.3)] transition"
                >
                  Manage
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
