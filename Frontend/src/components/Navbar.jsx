import React, { useEffect, useState, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle, FaShoppingCart, FaUser, FaBox, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./Auth/AuthModal";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const locationHook = useLocation();

  const isLoggedIn = !!user;

  const [open, setOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  useEffect(() => {
    if (locationHook.state?.openLogin) {
      setShowAuthModal(true);
    }
  }, [locationHook.state]);

  const onLogout = () => {
    logout();
    setOpen(false);
    setShowProfileDropdown(false);
    navigate("/", { replace: true });
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <>
      <nav className="w-full h-[80px] bg-[#FF5200] px-4 lg:px-20 flex justify-between items-center text-white sticky top-0 z-50 shadow-lg">
        <Link to="/">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png"
            alt="logo"
            className="w-[140px]"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8 font-semibold">
          <Link to="/" className="hover:opacity-80 transition-opacity">Home</Link>
          <Link to="/menu" className="hover:opacity-80 transition-opacity">Menu</Link>
          <Link to="/about" className="hover:opacity-80 transition-opacity">About</Link>
          <Link to="/contact" className="hover:opacity-80 transition-opacity">Contact</Link>

          <Link to="/cart" className="relative flex gap-2 hover:opacity-80 transition-opacity">
            <FaShoppingCart className="text-xl" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-white text-[#FF5200] w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
              >
                <FaUserCircle className="text-2xl" />
                <span>{user?.name}</span>
                <FaChevronDown className={`text-sm transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl overflow-hidden z-50 animate-slideDown">
                  {/* User Info Header */}
                  <div className="bg-gradient-to-r from-[#FF5200] to-[#e64a00] p-4 text-white">
                    <div className="flex items-center gap-3">
                      <FaUserCircle className="text-3xl" />
                      <div>
                        <p className="font-bold text-sm">{user?.name}</p>
                        <p className="text-xs opacity-90">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#FF5200] transition-colors"
                    >
                      <FaUser className="text-lg" />
                      <span className="font-medium">Profile</span>
                    </Link>

                    <Link
                      to="/dashboard"
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#FF5200] transition-colors"
                    >
                      <FaBox className="text-lg" />
                      <span className="font-medium">Orders</span>
                    </Link>

                    <div className="border-t border-gray-200 my-2"></div>

                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FaSignOutAlt className="text-lg" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-white text-[#FF5200] px-6 py-2 rounded-full font-bold hover:shadow-lg transition-all"
            >
              Sign In
            </button>
          )}
        </ul>

        <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {/* Mobile Menu (optional enhancement for mobile dropdown) */}
      {open && (
        <div className="md:hidden bg-[#FF5200] text-white px-4 py-6 space-y-4">
          <Link to="/" className="block" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/menu" className="block" onClick={() => setOpen(false)}>Menu</Link>
          <Link to="/about" className="block" onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" className="block" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/cart" className="block flex items-center gap-2" onClick={() => setOpen(false)}>
            <FaShoppingCart />
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="block" onClick={() => setOpen(false)}>Profile</Link>
              <Link to="/dashboard" className="block" onClick={() => setOpen(false)}>Orders</Link>
              <button onClick={onLogout} className="w-full text-left">Logout</button>
            </>
          ) : (
            <button onClick={() => { setShowAuthModal(true); setOpen(false); }} className="w-full text-left">
              Sign In
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
