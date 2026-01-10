import React, { useCallback, useEffect, useState } from "react";
import { FaLocationDot, FaChevronDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";

const Header = ({ setSearchTerm }) => {
  const [location, setLocation] = useState("");
  const [detecting, setDetecting] = useState(false);

  /* ================= RESTORE LOCATION ================= */
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  /* ================= DETECT LOCATION ================= */
  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocation("Geolocation not supported");
      return;
    }

    setDetecting(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { latitude, longitude } = coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
          );
          const data = await response.json();

          const city =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            "Unknown Location";

          setLocation(city);
          localStorage.setItem("userLocation", city);
        } catch (error) {
          console.error("Location fetch failed:", error);
          setLocation("Unable to detect location");
        } finally {
          setDetecting(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocation("Permission denied");
        setDetecting(false);
      }
    );
  }, []);

  return (
    <div className="w-full bg-[#FF5200] relative overflow-hidden">

      {/* SIDE IMAGES */}
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

      {/* TITLE */}
      <div className="flex justify-center px-4 mt-16 md:mt-24">
        <h1 className="text-white font-bold text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug">
          Order food & groceries. Discover <br className="hidden sm:block" />
          best restaurants. Swiggy it!
        </h1>
      </div>

      {/* SEARCH + LOCATION */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 px-4 mt-8">

        {/* LOCATION INPUT */}
        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 w-full md:w-[320px]">
          <FaLocationDot
            className={`text-[#FF5200] text-xl cursor-pointer transition-transform ${
              detecting ? "animate-pulse" : "hover:scale-110"
            }`}
            onClick={getUserLocation}
            title="Detect my location"
          />
          <input
            type="text"
            placeholder="Enter your delivery location"
            className="w-full outline-none placeholder:text-zinc-500 font-semibold text-sm"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              localStorage.setItem("userLocation", e.target.value);
            }}
          />
          <FaChevronDown className="text-gray-400" />
        </div>

        {/* SEARCH INPUT */}
        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 w-full md:w-[520px]">
          <input
            type="text"
            placeholder="Search for restaurants, items or more"
            className="w-full outline-none placeholder:text-zinc-500 font-semibold text-sm"
            onChange={(e) => setSearchTerm?.(e.target.value)}
          />
          <IoIosSearch className="text-xl" />
        </div>
      </div>

      {/* BANNERS */}
      <div className="flex flex-wrap justify-center gap-4 mt-10 px-4 pb-10">
        {[
          "ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png",
          "b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png",
          "b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png",
        ].map((img) => (
          <img
            key={img}
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/${img}`}
            alt=""
            className="w-[280px] sm:w-[300px] h-auto"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
