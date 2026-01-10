import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function AdminRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/admin/register", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");

      setMessage("✅ Admin registered successfully");
      navigate("/admin-dashboard");
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FF5200] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative">


        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 flex items-center gap-2 text-sm font-semibold text-gray-600"
        >
          <FaArrowLeft /> Back
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          Admin Registration
        </h2>

        {message && (
          <p className="text-center text-sm mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Admin Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF5200]"
          />

          <input
            name="email"
            type="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF5200]"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF5200]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF5200] hover:bg-[#e64a00] text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Creating..." : "Create Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
