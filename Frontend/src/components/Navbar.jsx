import React, { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for token on mount and when window storage updates (for multi-tab support)
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    // Listen for storage events (optional, but good for multi-tab)
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <nav className="w-full h-[60px] text-white flex items-center justify-between px-4 sm:px-8 lg:px-32">

      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png"
            alt="logo"
            className="w-[140px] sm:w-[180px]"
          />
        </Link>
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-6 text-[16px] font-bold">
        <li className="cursor-pointer">Swiggy Corporate</li>
        <li className="cursor-pointer">Partner with us</li>

        <li className="px-6 py-2 border border-white rounded-lg flex items-center gap-2 cursor-pointer">
          Get the app <MdArrowOutward className="text-xl" />
        </li>

        {isLoggedIn ? (
          <Link to="/dashboard">
            <li className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
              <FaUserCircle className="text-3xl" />
              <span>Profile</span>
            </li>
          </Link>
        ) : (
          <Link to="/login">
            <li className="px-6 py-2 bg-black rounded-lg cursor-pointer hover:bg-gray-900 transition">
              Sign In
            </li>
          </Link>
        )}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-3xl"
        onClick={() => setOpen(!open)}
      >
        {open ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-[#FF5200] z-50 md:hidden">
          <ul className="flex flex-col gap-4 px-6 py-6 text-[16px] font-bold">
            <li>Swiggy Corporate</li>
            <li>Partner with us</li>

            <li className="px-4 py-2 border border-white rounded-lg flex items-center gap-2 w-fit">
              Get the app <MdArrowOutward className="text-xl" />
            </li>

            {isLoggedIn ? (
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                <li className="flex items-center gap-2 w-fit px-4 py-2">
                  <FaUserCircle className="text-2xl" />
                  <span>Profile</span>
                </li>
              </Link>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)}>
                <li className="px-4 py-2 bg-black rounded-lg w-fit">
                  Sign In
                </li>
              </Link>
            )}

          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
