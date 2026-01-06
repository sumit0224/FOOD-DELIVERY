import React from "react";
import Navbar from "../Navbar";
import { FaLocationDot, FaChevronDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
  return (
    <div className="w-full bg-[#FF5200] relative overflow-hidden">
      <Navbar />

      {/* Side Images (hidden on small screens) */}
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
        alt=""
        className="hidden lg:block w-[180px] h-[450px] absolute top-24 left-0"
      />
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
        alt=""
        className="hidden lg:block w-[180px] h-[450px] absolute top-24 right-0"
      />

      {/* Heading */}
      <div className="flex justify-center px-4 mt-16 md:mt-24">
        <h1 className="text-white font-bold text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug">
          Order food & groceries. Discover <br className="hidden sm:block" />
          best restaurants. Swiggy it!
        </h1>
      </div>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 px-4 mt-8">
        {/* Location */}
        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 w-full md:w-[320px]">
          <FaLocationDot className="text-[#FF5200] text-xl" />
          <input
            type="text"
            placeholder="Enter your delivery location"
            className="w-full outline-none placeholder:text-zinc-500 font-semibold text-sm"
          />
          <FaChevronDown />
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 w-full md:w-[520px]">
          <input
            type="text"
            placeholder="Search for restaurants, items or more"
            className="w-full outline-none placeholder:text-zinc-500 font-semibold text-sm"
          />
          <IoIosSearch className="text-xl" />
        </div>
      </div>

      {/* Banners */}
      <div className="flex flex-wrap justify-center gap-4 mt-10 px-4 pb-10">
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png"
          alt=""
          className="w-[280px] sm:w-[300px] h-auto"
        />
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png"
          alt=""
          className="w-[280px] sm:w-[300px] h-auto"
        />
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png"
          alt=""
          className="w-[280px] sm:w-[300px] h-auto"
        />
      </div>
    </div>
  );
};

export default Header;
