import React, { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import AuthModal from "./Auth/AuthModal";
import ProfileDrawer from "./Layout/ProfileDrawer";
import api from "../api/api";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const { cartCount } = useCart();


  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [location, setLocation] = useState("Detecting...");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [manualLocation, setManualLocation] = useState("");

  const locationHook = useLocation();

  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth);

    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(savedLocation);
    } else {
      getUserLocation();
    }


    if (locationHook.state?.openLogin) {
      setShowAuthModal(true);

    }

    return () => window.removeEventListener("storage", checkAuth);
  }, [locationHook]);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");


    if (token) {
      if (!isLoggedIn) setIsLoggedIn(true);

      fetchUserProfile();
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  const fetchUserProfile = async () => {
    try {

      const res = await api.get("users/profile");
      setCurrentUser(res.data.user);
    } catch (error) {
      console.error("Failed to fetch profile", error);

      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userLocation");
    setIsLoggedIn(false);
    setCurrentUser(null);
    window.location.href = "/";
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    if (!userData) fetchUserProfile();
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
            );
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village || "Unknown Location";
            setLocation(city);
            localStorage.setItem("userLocation", city);
          } catch (error) {
            console.error("Error fetching location:", error);
            setLocation("Set Location");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation("Set Location");
        }
      );
    } else {
      setLocation("Set Location");
    }
  };

  const handleManualLocationSubmit = (e) => {
    e.preventDefault();
    if (manualLocation.trim()) {
      setLocation(manualLocation);
      localStorage.setItem("userLocation", manualLocation);
      setShowLocationModal(false);
      setManualLocation("");
    }
  };

  return (
    <>
      <nav className="w-full h-[80px] text-white flex items-center justify-between px-4 sm:px-8 lg:px-20 sticky top-0 z-50 bg-[#FF5200] shadow-md">
        <div className="flex items-center gap-8">
          <div className="logo cursor-pointer">
            <Link to="/">
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png"
                alt="logo"
                className="w-[120px] sm:w-[140px]"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2 text-white cursor-pointer hover:bg-white/10 p-2 rounded-lg transition" onClick={() => setShowLocationModal(true)}>
            <span className="font-bold border-b-2 border-white pb-0.5" title="Change Location">
              {location}
            </span>
            <span className="text-sm opacity-90">
              <MdArrowOutward className="rotate-90" />
            </span>
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-[16px] font-semibold">
          <li className="cursor-pointer hover:text-gray-100 transition">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-100 transition">
            <Link to="/menu">Menu</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-100 transition">
            <Link to="/about">About</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-100 transition">
            <Link to="/contact">Contact</Link>
          </li>

          <Link to="/cart">
            <li className="flex items-center gap-2 cursor-pointer hover:text-gray-100 relative">
              <FaShoppingCart className="text-xl" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-white text-[#FF5200] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </li>
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">

              <li
                className="flex items-center gap-2 cursor-pointer hover:text-gray-100"
                onClick={() => setShowProfileDrawer(true)}
              >
                <FaUserCircle className="text-2xl" />
                <span>{currentUser?.name || "User"}</span>
              </li>


              <Link to="/dashboard">
                <li className="cursor-pointer hover:text-gray-100">Orders</li>
              </Link>

              <li
                className="cursor-pointer hover:text-red-100 text-sm font-normal bg-white/20 px-3 py-1 rounded-md transition"
                onClick={handleLogout}
              >
                Logout
              </li>
            </div>
          ) : (
            <li
              className="px-6 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition shadow-lg"
              onClick={() => setShowAuthModal(true)}
            >
              Sign In
            </li>
          )}
        </ul>


        <button
          className="md:hidden text-3xl text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>

        {open && (
          <div className="absolute top-[80px] left-0 w-full bg-[#FF5200] z-50 md:hidden shadow-xl border-t border-white/20">
            <ul className="flex flex-col gap-6 px-6 py-8 text-[16px] font-bold text-white">
              <li className="flex flex-col gap-1 border-b border-white/20 pb-4" onClick={() => { setShowLocationModal(true); setOpen(false); }}>
                <span className="text-sm opacity-80 uppercase tracking-wider">Delivering to</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{location}</span>
                  <MdArrowOutward className="rotate-90" />
                </div>
              </li>

              <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
              <li><Link to="/menu" onClick={() => setOpen(false)}>Menu</Link></li>
              <li><Link to="/about" onClick={() => setOpen(false)}>About Us</Link></li>
              <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>

              <Link to="/cart" onClick={() => setOpen(false)}>
                <li className="flex items-center gap-2 w-fit">
                  <FaShoppingCart className="text-2xl" />
                  <span>Cart</span>
                </li>
              </Link>

              {isLoggedIn ? (
                <>
                  <li
                    className="flex items-center gap-2 w-fit"
                    onClick={() => { setShowProfileDrawer(true); setOpen(false); }}
                  >
                    <FaUserCircle className="text-2xl" />
                    <span>Profile</span>
                  </li>
                  <Link to="/dashboard" onClick={() => setOpen(false)}>
                    <li>My Orders</li>
                  </Link>
                  <li
                    className="flex items-center gap-2 w-fit cursor-pointer text-red-100 hover:text-white"
                    onClick={() => { handleLogout(); setOpen(false); }}
                  >
                    <span>Logout</span>
                  </li>
                </>
              ) : (
                <li
                  className="px-4 py-2 bg-black rounded-lg w-fit text-center"
                  onClick={() => { setShowAuthModal(true); setOpen(false); }}
                >
                  Sign In
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>


      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <ProfileDrawer
        isOpen={showProfileDrawer}
        onClose={() => setShowProfileDrawer(false)}
        user={currentUser}
        onUpdateUser={setCurrentUser}
      />


      {showLocationModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl transform transition-all scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Change Location</h3>
              <button onClick={() => setShowLocationModal(false)} className="text-gray-400 hover:text-gray-600 transition">
                <HiX size={24} />
              </button>
            </div>

            <div className="mb-6">
              <button
                onClick={() => { getUserLocation(); setShowLocationModal(false); }}
                className="w-full flex items-center justify-center gap-2 py-3 border border-[#FF5200] text-[#FF5200] font-bold rounded-lg hover:bg-[#FF5200]/5 transition mb-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Detect using GPS
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-gray-400 text-sm">OR</span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              <form onSubmit={handleManualLocationSubmit}>
                <input
                  type="text"
                  placeholder="Enter city, area or pincode"
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5200] focus:border-transparent text-gray-700"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!manualLocation.trim()}
                  className="w-full mt-4 bg-[#FF5200] hover:bg-[#e64a00] text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
                >
                  Update Location
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
