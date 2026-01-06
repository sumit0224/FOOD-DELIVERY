import { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope } from "react-icons/fa";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data.user);

        setUser(res.data.user);
        
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-[#FF5200] text-white rounded-2xl p-6 mb-6">
          <h1 className="text-2xl font-bold">
            Welcome, {user.email} 👋
          </h1>
          <p className="text-sm mt-1">
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

            <button className="mt-4 bg-[#FF5200] text-white px-4 py-2 rounded-lg">
              Browse Restaurants
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
