// src/pages/Home.jsx
import React, { useEffect } from "react";
import { Element, scroller } from "react-scroll";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import HeroSlider from "../Components/HeroSlider";
import CoreValuesSection from "../Components/CoreValuesSection";
import AboutSection from "../Components/AboutSection";
import ServicesSection from "../Components/ServicesSection";
import TeamSection from "../Components/TeamSection";
import ContactSection from "../Components/ContactSection";
import Footer from "../Components/Footer";
import FloatingContactButtons from "../Components/FloatingContactButtons";

// Pattern/background image for white areas
import pattern from "../images/icons-bg.png"; // <-- add your image here
import OurPhilosophySection from "../Components/OurPhilosophySection";
import AppAccessSection from "../Components/AppAccessSection";

const Home = () => {
  const location = useLocation();

  // If navigated here with state.scrollTo, scroll to that element after mount
  useEffect(() => {
    const target = location?.state?.scrollTo;
    if (target) {
      // small timeout to ensure DOM is ready (hero, sections mounted)
      setTimeout(() => {
        scroller.scrollTo(target, {
          duration: 600,
          smooth: true,
          offset: -80, // match Navbar height
        });
      }, 80);
      // remove the state from history so back doesn't re-trigger (optional)
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location]);

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen w-full"
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "center top",
          backgroundSize: "auto",
        }}
      >
        {/* Give each section an Element with matching name */}
        <Element name="home">
          <HeroSlider />
        </Element>

        <OurPhilosophySection/>

        {/* <CoreValuesSection /> */}
        <Element name="about">
          <AboutSection />
        </Element>

        <Element name="services">
          <ServicesSection />
        </Element>

        <Element name="team">
          <TeamSection />
        </Element>

<AppAccessSection/>
        <Element name="contact">
          <ContactSection />
        </Element>

        <Footer />
      </div>

      <FloatingContactButtons />
    </>
  );
};

export default Home;
