import React from "react";
import phoneMockup from "../images/app.png"; // <-- mobile image
import app_bg from "../images/footer-bg.png";
import { BsGooglePlay } from "react-icons/bs";
import googlePlay from "../images/apple-store.png";
import appStore from "../images/google-play.png";

const AppAccessSection = () => {
  return (
    <section className="bg-black w-full pb-6 px-7 md:px-32 py-16" style={{
      backgroundImage: `url(${app_bg})`,
    }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center lg:gap-52 gap-10 ">

        {/* LEFT CONTENT */}
        <div className="max-w-2xl text-white">
          <h2 className="text-3xl md:text-6xl font-semibold leading-tight mb-6">
            Access your portfolio <br /> anytime, anywhere.
          </h2>

          <p className="text-white text-lg md:text-xl font-medium  mb-6 md:mb-10">
            Download The My Planner - Finance Solved App Today
          </p>

          <div className="flex gap-2 md:gap-4 items-center">
            {/* Google Play */}
            <a
              href="https://apps.apple.com/in/app/my-planner-finance-solved/id6446684872"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={googlePlay}
                alt="Get it on Google Play"
                className="h-12 md:h-24 cursor-pointer hover:scale-105 transition rounded-md"
              />
            </a>

            {/* Apple App Store */}
            <a
              href="https://play.google.com/store/apps/details?id=com.ifa.now.app&hl=en&gl=US"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={appStore}
                alt="Download on the App Store"
                className="h-8 md:h-16 cursor-pointer hover:scale-105 transition rounded-md"
              />
            </a>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <img
            src={phoneMockup}
            alt="App preview"
            className="w-[280px] md:w-[300px] bottom-0"
          />
        </div>

      </div>
    </section>
  );
};

export default AppAccessSection;
