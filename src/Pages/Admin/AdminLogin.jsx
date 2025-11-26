import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight, FiArrowLeft, FiLoader } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { toast } from "react-toastify";
import axios from "axios";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !validateEmail(email)) {
            toast.error("Password or Email is Invalid!");
            return;
        }
        if (!password) {
            toast.error("Password or Email is Invalid!");
            return;
        }

        setLoading(true); // start loading

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_ADMIN_BACKEND_URL}/auth/admin/login`,
                { email, password },
                { withCredentials: true }
            );

            if (response.data.status === "success") {
                console.log(response);
                toast.success("Login successful!");
                sessionStorage.setItem("token", response.data.data.token);
                setTimeout(() => {
                    navigate("/admin/dashboard");
                }, 100); // give browser 100ms to write sessionStorage
            } else {
                toast.error(response.data.message || "Login failed.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Please try again later!");
        } finally {
            setLoading(false); // stop loading
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-[#F8F7FF] via-white to-[#F8F7FF] flex flex-col">
            {/* 🔹 Top Navbar */}
            <nav className="flex items-center justify-between px-24 py-8 shadow-sm bg-white/80 backdrop-blur z-20">
                <div className="flex flex-col items-center space-x-2">
                    <img src={logo} alt="logo" className="h-16 w-auto" />
                </div>

                {/* Back to Home */}
                <Link
                    to="/"
                    className="flex items-center gap-2 text-white bg-deepblue px-6 py-3 rounded-full font-medium text-sm hover:opacity-90 transition"
                >
                    <FiArrowLeft className="text-base" />
                    Back to Home
                </Link>
            </nav>

            {/* 🔐 Login Section */}
            <div className="flex-1 flex items-center justify-center px-4 py-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="bg-white rounded-3xl shadow-[0_10px_50px_rgba(21,0,158,0.15)] p-14 w-full max-w-lg relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-56 h-56 bg-deepblue/10 blur-3xl rounded-full -z-10"></div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Admin <span className="text-deepblue">Login</span>
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Access your admin dashboard securely
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                        {/* Email */}
                        <div className="relative">
                            <FiMail className="absolute left-4 top-3.5 text-deepblue text-lg" />
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-deepblue/40 focus:border-deepblue outline-none text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <FiLock className="absolute left-4 top-3.5 text-deepblue text-lg" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-deepblue/40 focus:border-deepblue outline-none text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end text-sm">
                            <a href="#" className="text-deepblue hover:underline font-medium">
                                Forgot Password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full mt-2 bg-gradient-to-r from-deepblue to-blue-900 text-white font-medium py-3 rounded-full flex items-center justify-center gap-2 transition-all ${loading ? "opacity-80 cursor-not-allowed" : "hover:opacity-90"
                                }`}
                        >
                            {loading ? (
                                <>
                                    <FiLoader className="animate-spin text-lg" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Login <FiArrowRight className="text-lg" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-xs text-center text-gray-500 mt-6">
                        © {new Date().getFullYear()} Ennea Financial Services. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default AdminLogin;
