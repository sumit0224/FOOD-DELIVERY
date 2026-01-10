import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");
      setMessage("✅ Login successful");
      navigate("/admin-dashboard");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "❌ Invalid email or password"
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
          Login to Swiggy
        </h2>

        {/* Message */}
        {message && (
          <p className="text-center text-sm mb-4 text-gray-700">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF5200] hover:bg-[#e64a00] text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between text-sm text-gray-500 mt-5">
          <span className="cursor-pointer hover:underline">
            Forgot password?
          </span>

          <Link to="/signup">
            <span className="text-[#FF5200] font-semibold cursor-pointer hover:underline">
              Create account
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
