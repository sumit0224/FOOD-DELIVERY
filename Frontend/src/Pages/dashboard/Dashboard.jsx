import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { FaUser, FaEnvelope } from "react-icons/fa";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data && res.data.user) {
          setUser(res.data.user);
        } else {
          throw new Error("User data not found");
        }
      } catch (err) {
        console.error("Dashboard Error:", err);
        setError(err.response?.data?.message || "Failed to load user data");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        User not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-[#FF5200] text-white rounded-2xl p-6 mb-6">
          <h1 className="text-2xl font-bold">
            Welcome, {user.name} 👋
          </h1>
          <p className="text-sm mt-1 text-black">
            Manage your account & orders
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold mb-4">
              Profile Information
            </h2>

            <div className="flex items-center gap-3 mb-3">
              <FaUser className="text-[#FF5200]" />
              <span className="font-medium text-gray-600">{user.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#FF5200]" />
              <span className="font-medium text-gray-600">{user.email}</span>
            </div>
          </div>

          {/* Orders Card (Placeholder) */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold mb-4">
              Your Orders
            </h2>
            <p className="text-gray-500 text-sm">
              You have no recent orders 🍔
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-[#FF5200] text-white px-4 py-2 rounded-lg hover:bg-[#e64a00] transition"
            >
              Browse Restaurants
            </button>
          </div>


        </div>
      </div>
    </div>
  );
}
