import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Thank you for your message! We'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Get in Touch</h1>
                        <p className="mt-4 text-xl text-gray-500">
                            We'd love to hear from you. Our team is always here to chat.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-[#FF5200]/10 p-3 rounded-lg text-[#FF5200]">
                                            <FaPhone size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Phone</p>
                                            <p className="text-gray-600">+1 (555) 123-4567</p>
                                            <p className="text-gray-500 text-sm mt-1">Mon-Fri 9am to 6pm</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-[#FF5200]/10 p-3 rounded-lg text-[#FF5200]">
                                            <FaEnvelope size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Email</p>
                                            <p className="text-gray-600">support@fooddelivery.com</p>
                                            <p className="text-gray-500 text-sm mt-1">Online support 24/7</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-[#FF5200]/10 p-3 rounded-lg text-[#FF5200]">
                                            <FaMapMarkerAlt size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Office</p>
                                            <p className="text-gray-600">123 Food Street, Tasty City</p>
                                            <p className="text-gray-600">FC 90001</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="h-64 bg-gray-200 rounded-xl overflow-hidden relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.91411937501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1716383424107!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0 w-full h-full"
                                ></iframe>
                            </div>
                        </div>


                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5200] focus:border-transparent outline-none transition"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5200] focus:border-transparent outline-none transition"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5200] focus:border-transparent outline-none transition resize-none"
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#FF5200] text-white font-bold py-4 rounded-lg hover:bg-[#e64a00] transition transform hover:-translate-y-1 shadow-md"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
