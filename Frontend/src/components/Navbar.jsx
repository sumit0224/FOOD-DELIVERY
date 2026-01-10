import React, { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./Auth/AuthModal";
import ProfileDrawer from "./Layout/ProfileDrawer";

const Navbar = () => {
  const { user, logout, updateUser } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const locationHook = useLocation();

  const isLoggedIn = !!user;

  const [open, setOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);

  useEffect(() => {


    if (locationHook.state?.openLogin) {
      setShowAuthModal(true);
    }
  }, [locationHook.state]);

  const onLogout = () => {
    logout();
    setOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <nav className="w-full h-[80px] bg-[#FF5200] px-4 lg:px-20 flex justify-between items-center text-white sticky top-0 z-50">
        <Link to="/">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png"
            alt="logo"
            className="w-[140px]"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8 font-semibold">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          <Link to="/cart" className="relative flex gap-2">
            <FaShoppingCart />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-white text-[#FF5200] w-5 h-5 rounded-full text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <>
              <li
                className="flex gap-2 cursor-pointer"
                onClick={() => setShowProfileDrawer(true)}
              >
                <FaUserCircle /> {user?.name}
              </li>
              <Link to="/dashboard">Orders</Link>
              <button onClick={onLogout}>Logout</button>
            </>
          ) : (
            <button onClick={() => setShowAuthModal(true)}>Sign In</button>
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

      <ProfileDrawer
        isOpen={showProfileDrawer}
        onClose={() => setShowProfileDrawer(false)}
        user={user}
        onUpdateUser={updateUser}
      />
    </>
  );
};

export default Navbar;
