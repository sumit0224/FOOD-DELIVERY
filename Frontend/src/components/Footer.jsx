import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-zinc-100 text-black pt-16 pb-8 px-4 md:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                {/* Brand Column */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-100 mb-6 flex items-center gap-2">
                        Swiggy
                    </h2>
                    <p className="text-gray-400 mb-6">
                        © 2024 Bundl Technologies Pvt. Ltd
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                            <FaTwitter />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                            <FaInstagram />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                {/* Company Links */}
                <div>
                    <h3 className="text-lg font-bold text-gray-200 mb-6 uppercase tracking-wider">Company</h3>
                    <ul className="space-y-4 text-gray-400">
                        <li><a href="#" className="hover:text-white transition">About</a></li>
                        <li><a href="#" className="hover:text-white transition">Careers</a></li>
                        <li><a href="#" className="hover:text-white transition">Team</a></li>
                        <li><a href="#" className="hover:text-white transition">Swiggy One</a></li>
                        <li><a href="#" className="hover:text-white transition">Swiggy Instamart</a></li>
                        <li><a href="#" className="hover:text-white transition">Swiggy Genie</a></li>
                    </ul>
                </div>

                {/* Contact Links */}
                <div>
                    <h3 className="text-lg font-bold text-gray-200 mb-6 uppercase tracking-wider">Contact us</h3>
                    <ul className="space-y-4 text-gray-400">
                        <li><a href="#" className="hover:text-white transition">Help & Support</a></li>
                        <li><a href="#" className="hover:text-white transition">Partner with us</a></li>
                        <li><a href="#" className="hover:text-white transition">Ride with us</a></li>
                    </ul>

                    <h3 className="text-lg font-bold text-gray-200 mt-8 mb-6 uppercase tracking-wider">Legal</h3>
                    <ul className="space-y-4 text-gray-400">
                        <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
                        <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Cities */}
                <div>
                    <h3 className="text-lg font-bold text-gray-200 mb-6 uppercase tracking-wider">We deliver to:</h3>
                    <ul className="space-y-4 text-gray-400">
                        <li><a href="#" className="hover:text-white transition">Bangalore</a></li>
                        <li><a href="#" className="hover:text-white transition">Gurgaon</a></li>
                        <li><a href="#" className="hover:text-white transition">Hyderabad</a></li>
                        <li><a href="#" className="hover:text-white transition">Delhi</a></li>
                        <li><a href="#" className="hover:text-white transition">Mumbai</a></li>
                        <li><a href="#" className="hover:text-white transition">Pune</a></li>
                        <li className="text-sm border border-gray-600 rounded-lg px-3 py-1 inline-block mt-2 cursor-pointer hover:border-white hover:text-white">
                            589 cities
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
