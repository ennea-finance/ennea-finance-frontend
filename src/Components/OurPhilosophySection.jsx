import React, { useState } from "react";
import { motion } from "framer-motion";
import image from "../images/test.jpg";
import { FaChartPie } from "react-icons/fa";
import blog_bg from "../images/blog-bg.png";

const steps = [{ id: 1, key: "Client-Centric Approach", label: "Client-Centric Approach", title: "Our clients are at the core of everything we do. We operate with complete autonomy, enabling us to deliver unbiased advice and objective recommendations that serve only one purpose — your best interest. Every strategy we design is guided by clarity and open communication, ensuring that you are fully informed and confident at every step of your financial journey. We take the time to understand your goals, risk appetite, and long-term vision, crafting solutions that are both strategic and adaptive to market dynamics. Through regular review, meticulous research, and disciplined execution, we help you navigate the complexities of wealth creation and preservation.", image: "/images/create.png", }, { id: 2, key: "Growth Through Value Creation ", label: "Growth Through Value Creation ", title: "We provide high-quality, personalized service that meets your' evolving needs. We have an open architecture platform where we collaborate with leading industry experts to give you access to best-in-class products and services. We Stay up-to-date with market trends, research, and best practices to offer innovative solutions. We do not manufacture any products to ensure that we offer unbiased investment services. We Prioritize sustainable, long-term growth over short-term gains.", image: "/images/track.png", }, { id: 3, key: "Client Empowerment ", label: "Client Empowerment ", title: "We empower clients with timely market insights and knowledge to inform their financial decisions. Through collaborative partnerships, we craft customized solutions that align with their unique goals. With a commitment to client success, we continually refine our approach to try deliver exceptional outcomes.", image: "/images/evaluate.png", }, { id: 4, key: "Confidentiality ", label: "Confidentiality ", title: "We develop a relationship with their clients based on trust, transparency and honesty that goes beyond the usual relationship and ensures a total alignment of interests.We make sure that the client information is only to those authorized to have access. A relationship of trust and confidence with our clients can only be built upon the understanding that their information will remain confidential.", image: "/images/update.png", },];

/**
 * SLIDER MATH (70vw viewport)
 * Card width = 56vw (80%)
 * Gap        = 2vw
 * Peek 20%   = 14vw
 * Peek 10%   = 7vw
 */
const getTranslateX = (active) => {
    switch (active) {
        case 0:
            return 0;
        case 1:
            return -51;
        case 2:
            return -109;
        case 3:
            return -160;
        default:
            return 0;
    }
};

const OurPhilosophySection = () => {
    const [active, setActive] = useState(0);

    const handleDragEnd = (_, info) => {
        const swipeDistance = info.offset.x;
        const threshold = 80;

        if (swipeDistance < -threshold && active < steps.length - 1) {
            setActive((prev) => prev + 1);
        } else if (swipeDistance > threshold && active > 0) {
            setActive((prev) => prev - 1);
        }
    };

    return (
        <section
            className="w-full bg-[#0E0E0E] text-white py-28 px-6 md:px-32 overflow-hidden"
            style={{ backgroundImage: `url(${blog_bg})` }}
        >
            {/* Heading */}
            <div className="w-[70vw] mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-16">
                    Our <span className="italic font-playfair">Philosophy</span>
                </h2>
            </div>

            {/* ================= TAB BAR ================= */}
            <div className="relative w-[70vw] mx-auto flex items-center gap-8 mb-14">
                {steps.map((step, index) => {
                    const isActive = active === index;
                    return (
                        <button
                            key={step.key}
                            onClick={() => setActive(index)}
                            className={`
                px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all
                ${isActive
                                    ? "bg-white text-black shadow-[0_0_0_2px_white]"
                                    : "bg-[#1B1B1B] text-white border border-[#2D2D2D]"
                                }
              `}
                        >
                            {step.label}
                        </button>
                    );
                })}
            </div>

            {/* ================= SLIDER ================= */}
            <div className="relative w-[70vw] mx-auto overflow-hidden cursor-grab active:cursor-grabbing">
                <motion.div
                    className="flex gap-[2vw]"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    animate={{ x: `${getTranslateX(active)}vw` }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                >
                    {steps.map((step) => (
                        <div
                            key={step.key}
                            className="shrink-0"
                            style={{ width: "56vw" }}
                        >
                            <div className="bg-white text-black rounded-3xl shadow-xl p-12 h-full flex gap-8 select-none">
                                {/* Left Content */}
                                <div className="max-w-lg">
                                    <div className="bg-lightblue w-fit p-3 border rounded-xl border-deepblue mb-3">
                                        <FaChartPie className="text-deepblue text-3xl" />
                                    </div>
                                    <h3 className="font-semibold text-xl text-gray-900 mb-2">
                                        {step.label}
                                    </h3>
                                    <p className="text-gray-500 text-md leading-relaxed">
                                        {step.title}
                                    </p>
                                </div>

                                {/* Right Image */}
                                <div className="flex justify-end flex-1">
                                    <img
                                        src={image}
                                        alt={step.label}
                                        className="pointer-events-none"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default OurPhilosophySection;
