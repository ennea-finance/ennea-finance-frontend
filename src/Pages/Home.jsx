import React from "react";
import { Element } from "react-scroll";
import Navbar from "../Components/Navbar";
import HeroSlider from "../Components/HeroSlider";
import CoreValuesSection from "../Components/CoreValuesSection";
import AboutSection from "../Components/AboutSection";
import ServicesSection from "../Components/ServicesSection";
import TeamSection from "../Components/TeamSection";
import ReviewsSection from "../Components/ReviewsSection";
import BlogSection from "../Components/BlogSection";
import FAQSection from "../Components/FAQSection";
import ContactSection from "../Components/ContactSection";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <CoreValuesSection />
      <AboutSection />

      {/* ✅ Give each section a unique name */}
      <Element name="services">
        <ServicesSection />
      </Element>

      <Element name="team">
        <TeamSection />
      </Element>

      <ReviewsSection />
      <BlogSection />
      <FAQSection />

      <Element name="contact">
        <ContactSection />
      </Element>

      <Footer />
    </>
  );
};

export default Home;
