import React, { useEffect } from "react";
import { Element, scroller } from "react-scroll";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Hero from "../Components/HeroSlider";
import AboutSection from "../Components/AboutSection";
import ServicesSection from "../Components/ServicesSection";
import ContactSection from "../Components/ContactSection";
import Footer from "../Components/Footer";
import OurPhilosophySection from "../Components/OurPhilosophySection";
import AppAccessSection from "../Components/AppAccessSection";

import pattern from "../images/icons-bg.png";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const target = location?.state?.scrollTo;
    if (target) {
      setTimeout(() => {
        scroller.scrollTo(target, {
          duration: 600,
          smooth: true,
          offset: -80,
        });
      }, 80);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location]);

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* HERO — full screen, navbar overlays */}
      <Element name="home">
        <Hero />
      </Element>

      {/* REST OF CONTENT — offset for fixed navbar */}
      <div
        className="pt-24"
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "center top",
          backgroundSize: "auto",
        }}
      >
        <Element name="about">
          <AboutSection />
        </Element>

        <OurPhilosophySection />

        <Element name="services">
          <ServicesSection />
        </Element>

        <AppAccessSection />

        <Element name="contact">
          <ContactSection />
        </Element>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
