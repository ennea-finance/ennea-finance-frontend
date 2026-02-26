import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChartPie } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
//import blog_bg from "../images/blog-bg.png";
// import philosopy_bg from "../images/philosopy-bg.png";
// import philosophyBg from "../../public/images/philosopy-bg.svg";

/* ------------------ DATA (UNCHANGED) ------------------ */
const steps = [{ id: 1, key: "Client-Centric Approach", label: "Client-Centric Approach", title: "Our clients are at the core of everything we do. We operate with complete autonomy, enabling us to deliver unbiased advice and objective recommendations that serve only one purpose — your best interest. Every strategy we design is guided by clarity and open communication, ensuring that you are fully informed and confident at every step of your financial journey. We take the time to understand your goals, risk appetite, and long-term vision, crafting solutions that are both strategic and adaptive to market dynamics. Through regular review, meticulous research, and disciplined execution, we help you navigate the complexities of wealth creation and preservation.", image: "/images/create.png", }, { id: 2, key: "Growth Through Value Creation ", label: "Growth Through Value Creation ", title: "We provide high-quality, personalized service that meets your' evolving needs. We have an open architecture platform where we collaborate with leading industry experts to give you access to best-in-class products and services. We Stay up-to-date with market trends, research, and best practices to offer innovative solutions. We do not manufacture any products to ensure that we offer unbiased investment services. We Prioritize sustainable, long-term growth over short-term gains.", image: "/images/track.png", }, { id: 3, key: "Client Empowerment ", label: "Client Empowerment ", title: "We empower clients with timely market insights and knowledge to inform their financial decisions. Through collaborative partnerships, we craft customized solutions that align with their unique goals. With a commitment to client success, we continually refine our approach to try deliver exceptional outcomes.", image: "/images/evaluate.png", }, { id: 4, key: "Confidentiality ", label: "Confidentiality ", title: "We develop a relationship with their clients based on trust, transparency and honesty that goes beyond the usual relationship and ensures a total alignment of interests.We make sure that the client information is only to those authorized to have access. A relationship of trust and confidence with our clients can only be built upon the understanding that their information will remain confidential.", image: "/images/update.png", },];
/* ------------------ RESPONSIVE HOOK ------------------ */
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
};

/* ------------------ TRANSLATE LOGIC (FIXED) ------------------ */
const getTranslateX = (active, isMobile) => {
    if (isMobile) {
        return `-${active * 100}%`; // precise mobile slide
    }

    // desktop carousel values (unchanged look)
    switch (active) {
        case 0:
            return "0vw";       // 80% card1 + 20% card2
        case 1:
            return "-56vw";     // 10% card1 + 80% card2 + 10% card3
        case 2:
            return "-118vw";    // 10% card2 + 80% card3 + 10% card4
        case 3:
            return "-174vw";    // 20% card3 + 80% card4
        default:
            return "0vw";
    }
};

/* ------------------ COMPONENT ------------------ */
const OurPhilosophySection = () => {
    const [active, setActive] = useState(0);
    const isMobile = useIsMobile();

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
            className="w-full bg-[#0E0E0E] text-white py-40 px-6 md:px-32 overflow-hidden"
            style={{
                backgroundImage: "url('/images/philosopy-bg.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >


            {/* Heading */}
            <div className="mx-auto mb-16 w-full md:w-[80vw]">
                {/* <button className="mb-10 border border-white px-5 py-1.5 rounded-full text-xl hover:shadow transition w-fit font-medium">
                    Our Philosophy
                </button> */}
                <h2 className="text-3xl lg:text-5xl md:text-6xl font-bold font-satoshi">
                    Our Philosophy
                </h2>
            </div>

            {/* Slider */}
            <div
                className={` relative mx-auto overflow-hidden ${isMobile ? "w-full" : "w-[80vw]"
                    }`}
            >
                <motion.div
                    className={`flex justify-start cursor-grab active:cursor-grabbing ${isMobile ? "gap-0" : "gap-[2vw]"
                        }`}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={isMobile ? 0.05 : 0.2}
                    onDragEnd={handleDragEnd}
                    animate={{ x: getTranslateX(active, isMobile) }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                >
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="shrink-0"
                            style={{ width: isMobile ? "100%" : "62vw" }}
                        >
                            <div className="rounded-3xl lg:p-14 p-9 md:p-14 h-full flex flex-col gap-6 border border-white">
                                <div className="bg-white w-fit p-3 border rounded-xl border-deepblue">
                                    <FaChartPie className="text-deepblue lg:text-4xl text-2xl" />
                                </div>

                                <h3 className="font-satoshi font-bold lg:text-3xl text-xl md:text-3xl text-white">
                                    {step.label}
                                </h3>

                                <p className="font-satoshi font-normal text-white lg:text-2xl text-xl md:text-2xl leading-relaxed text-justify">
                                    {step.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Controls */}
            <div className="mx-auto flex justify-start gap-4 mt-10 w-full md:w-[80vw]">
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
