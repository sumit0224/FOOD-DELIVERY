import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Our Story
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Delivering happiness, one meal at a time.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                  alt="Chefs cooking"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF5200]/20 to-transparent mix-blend-multiply"></div>
              </div>
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Passionate About Food</h3>
                <p className="text-gray-600 mb-6">
                  Founded in 2024, Food Delivery started with a simple mission: to connect food lovers with the best local restaurants. We believe that good food has the power to bring people together, and we're committed to making that happen, rain or shine.
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#FF5200] rounded-full"></span>
                    Customer Obsession
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#FF5200] rounded-full"></span>
                    Quality First
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#FF5200] rounded-full"></span>
                    Sustainability
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-white p-8 rounded-2xl shadow-sm">
            <div>
              <div className="text-3xl font-bold text-[#FF5200] mb-2">500+</div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">Restaurant Partners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FF5200] mb-2">10k+</div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FF5200] mb-2">30min</div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">Avg. Delivery Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FF5200] mb-2">24/7</div>
              <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
