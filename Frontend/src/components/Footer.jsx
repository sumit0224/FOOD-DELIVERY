import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#1a1a1a] text-white pt-20 pb-10 font-sans">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-[#FF5200] to-[#ff8c42] bg-clip-text text-transparent inline-block hover:opacity-90 transition-opacity">
                            Swiggy
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Discover the best food from over 1,000 restaurants and get it delivered fast. From high-quality dining to quick bites, we've got you covered.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#FF5200] hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">Company</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            {['About Us', 'Team', 'Careers', 'Swiggy Blog', 'Bug Bounty', 'Swiggy One'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="hover:text-[#FF5200] transition-colors duration-200 block transform hover:translate-x-1">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Legal */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">Contact</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li>
                                <Link to="/contact" className="hover:text-[#FF5200] transition-colors duration-200 block transform hover:translate-x-1">
                                    Help & Support
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#FF5200] transition-colors duration-200 block transform hover:translate-x-1">
                                    Partner with us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#FF5200] transition-colors duration-200 block transform hover:translate-x-1">
                                    Ride with us
                                </a>
                            </li>
                        </ul>

                        <h3 className="text-lg font-bold text-white mt-10 mb-6">Legal</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            {['Terms & Conditions', 'Cookie Policy', 'Privacy Policy'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-[#FF5200] transition-colors duration-200 block transform hover:translate-x-1">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Deliver to */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">We deliver to</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            {['Bangalore', 'Gurgaon', 'Hyderabad', 'Delhi', 'Mumbai', 'Pune'].map((city) => (
                                <li key={city}>
                                    <a href="#" className="hover:text-[#FF5200] transition-colors duration-200">
                                        {city}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                            <h4 className="font-bold text-[#FF5200] mb-2">Expanding Everyday</h4>
                            <p className="text-xs text-gray-400">
                                We are currently present in 500+ cities across India.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        © 2024 Bundl Technologies Pvt. Ltd. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Made with</span>
                        <FaHeart className="text-red-500 animate-pulse" />
                        <span>in India</span>
                    </div>
                    <div className="flex gap-8">
                        <img
                            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/play_store_xidjq4"
                            alt="Play Store"
                            className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
                        />
                        <img
                            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/app_store_xidjq4"
                            alt="App Store"
                            className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
