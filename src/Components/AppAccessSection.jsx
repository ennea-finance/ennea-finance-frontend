import React from "react";
import phoneMockup from "../images/phone-ui.png"; // <-- mobile image
import googlePlay from "../images/google-store.png"; // <-- Google Play badge
import appStore from "../images/apple-store.png"; // <-- App Store badge
import app_bg from "../images/footer-bg.png";

const AppAccessSection = () => {
  return (
    <section className="bg-black w-full py-20 px-6 md:px-32" style={{
        backgroundImage: `url(${app_bg})`,
      }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-52">

        {/* LEFT CONTENT */}
        <div className="max-w-2xl text-white">
          <h2 className="text-5xl md:text-6xl font-semibold leading-tight mb-6">
            Access your portfolio <br /> anytime, anywhere.
          </h2>

          <p className="text-lightblue tracking-widest text-lg font-semibold mb-14">
            DOWNLOAD THE ASK IM PMS APP TODAY
          </p>

          <div className="flex gap-4">
            <img
              src={googlePlay}
              alt="Google Play"
              className="h-14 cursor-pointer hover:scale-105 transition rounded-md"
            />
            <img
              src={appStore}
              alt="App Store"
              className="h-14 cursor-pointer hover:scale-105 transition rounded-md"
            />
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative ">
          <img
            src={phoneMockup}
            alt="App preview"
            className="w-[280px] md:w-[340px] bottom-0"
          />
        </div>

      </div>
    </section>
  );
};

export default AppAccessSection;
