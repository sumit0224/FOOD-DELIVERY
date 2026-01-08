import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { FaUser, FaEnvelope } from "react-icons/fa";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch User Profile
        const userRes = await api.get("/users/profile", { headers });
        if (userRes.data && userRes.data.user) {
          setUser(userRes.data.user);
        } else {
          throw new Error("User data not found");
        }

        // Fetch User Orders
        const orderRes = await api.get("/orders/myorders", { headers });
        if (orderRes.data && orderRes.data.data) {
          setOrders(orderRes.data.data);
        }

      } catch (err) {
        console.error("Dashboard Error:", err);
        setError(err.response?.data?.message || "Failed to load dashboard data");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          <div className="bg-white rounded-xl shadow p-6 h-fit">
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

          {/* Orders Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold mb-4">
              Your Orders
            </h2>

            {orders.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500 text-sm mb-4">
                  You have no recent orders 🍔
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="bg-[#FF5200] text-white px-4 py-2 rounded-lg hover:bg-[#e64a00] transition text-sm font-bold"
                >
                  Browse Restaurants
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {orders.map((order) => (
                  <div key={order._id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs text-gray-400 block mb-1">ID: {order._id.slice(-6).toUpperCase()}</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                              'bg-yellow-100 text-yellow-600'
                          }`}>
                          {order.status}
                        </span>
                      </div>
                      <span className="text-[#FF5200] font-bold">₹{order.itemsPrice}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>{order.orderItems.length} items</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
