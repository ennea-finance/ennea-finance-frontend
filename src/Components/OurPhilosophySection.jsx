import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChartPie } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import blog_bg from "../images/blog-bg.png";
import philosopy_bg from "../images/philosopy-bg.png";

const steps = [{ id: 1, key: "Client-Centric Approach", label: "Client-Centric Approach", title: "Our clients are at the core of everything we do. We operate with complete autonomy, enabling us to deliver unbiased advice and objective recommendations that serve only one purpose — your best interest. Every strategy we design is guided by clarity and open communication, ensuring that you are fully informed and confident at every step of your financial journey. We take the time to understand your goals, risk appetite, and long-term vision, crafting solutions that are both strategic and adaptive to market dynamics. Through regular review, meticulous research, and disciplined execution, we help you navigate the complexities of wealth creation and preservation.", image: "/images/create.png", }, { id: 2, key: "Growth Through Value Creation ", label: "Growth Through Value Creation ", title: "We provide high-quality, personalized service that meets your' evolving needs. We have an open architecture platform where we collaborate with leading industry experts to give you access to best-in-class products and services. We Stay up-to-date with market trends, research, and best practices to offer innovative solutions. We do not manufacture any products to ensure that we offer unbiased investment services. We Prioritize sustainable, long-term growth over short-term gains.", image: "/images/track.png", }, { id: 3, key: "Client Empowerment ", label: "Client Empowerment ", title: "We empower clients with timely market insights and knowledge to inform their financial decisions. Through collaborative partnerships, we craft customized solutions that align with their unique goals. With a commitment to client success, we continually refine our approach to try deliver exceptional outcomes.", image: "/images/evaluate.png", }, { id: 4, key: "Confidentiality ", label: "Confidentiality ", title: "We develop a relationship with their clients based on trust, transparency and honesty that goes beyond the usual relationship and ensures a total alignment of interests.We make sure that the client information is only to those authorized to have access. A relationship of trust and confidence with our clients can only be built upon the understanding that their information will remain confidential.", image: "/images/update.png", },];

/**
 * SLIDER MATH (70vw viewport)
 * Card width = 56vw (80%)
 * Gap        = 2vw
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

    const next = () => {
        if (active < steps.length - 1) setActive((p) => p + 1);
    };

    const prev = () => {
        if (active > 0) setActive((p) => p - 1);
    };

    const handleDragEnd = (_, info) => {
        const threshold = 80;
        if (info.offset.x < -threshold) next();
        if (info.offset.x > threshold) prev();
    };

    return (
        <section
            className="w-full bg-[#0E0E0E] text-white py-28 px-6 md:px-32 overflow-hidden"
            style={{ backgroundImage: `url(${philosopy_bg})` }}
        >
            {/* Heading */}
            <div className="w-[70vw] mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-16">
                    Our <span className="italic font-playfair">Philosophy</span>
                </h2>
            </div>

            {/* ================= SLIDER ================= */}
            <div className="relative w-[70vw] mx-auto overflow-hidden">
                <motion.div
                    className="flex gap-[2vw] justify-start cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    animate={{ x: `${getTranslateX(active)}vw` }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                >
                    {steps.map((step) => (
                        <div key={step.id} className="shrink-0" style={{ width: "56vw" }}>
                            <div className=" rounded-3xl p-14 h-full flex flex-col gap-6 border border-white">
                                <div className="bg-white w-fit p-3 border rounded-xl border-deepblue">
                                    <FaChartPie className="text-deepblue text-4xl" />
                                </div>

                                <h3 className="font-bold text-3xl text-white">
                                    {step.label}
                                </h3>

                                <p className="text-white text-xl leading-relaxed">
                                    {step.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* ================= BOTTOM CONTROLS ================= */}
            <div className="w-[70vw] mx-auto flex justify-start gap-4 mt-10">
                <button
                    onClick={prev}
                    disabled={active === 0}
                    className={`p-3 rounded-full border transition ${active === 0
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-white hover:text-black"
                        }`}
                >
                    <ChevronLeft />
                </button>

                <button
                    onClick={next}
                    disabled={active === steps.length - 1}
                    className={`p-3 rounded-full border transition ${active === steps.length - 1
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-white hover:text-black"
                        }`}
                >
                    <ChevronRight />
                </button>
            </div>
        </section>
    );
};

export default OurPhilosophySection;
