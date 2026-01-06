import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../api/api";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post(
        "users/register",
        formData
      );

      setMessage("✅ Account created successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });
      navigate("/dashboard");
    } catch (error) { 
      setMessage(
        error.response?.data?.message || "❌ Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FF5200] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
        >
          <FaArrowLeft />
          Back
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {/* Message */}
        {message && (
          <p className="text-center text-sm mb-4 text-gray-700">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#FF5200]"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#FF5200]"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#FF5200]"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#FF5200]"
          />

          {/* Address */}
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            rows="3"
            required
            className="w-full px-4 py-3 border rounded-lg outline-none resize-none focus:ring-2 focus:ring-[#FF5200]"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF5200] hover:bg-[#e64a00] text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-[#FF5200] font-semibold cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
