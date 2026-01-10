import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { FaUser, FaEnvelope } from "react-icons/fa";

export default function UserDashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth(); // usage of context
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // No need to fetch user, context has it.
        // Also headers are handled by api interceptor.

        // Only fetch orders
        const orderRes = await api.get("/orders/myorders");
        if (orderRes.data && orderRes.data.data) {
          setOrders(orderRes.data.data);
        }

      } catch (err) {
        console.error("Dashboard Error:", err);
        setError(err.response?.data?.message || "Failed to load dashboard data");
        // Don't auto-logout here, let simple error show
      } finally {
        setLoading(false);
      }
    };

    // If auth is still loading, wait.
    if (!authLoading && isAuthenticated) {
      fetchData();
    }
  }, [authLoading, isAuthenticated, navigate]); // Dependencies updated


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await api.put(`/orders/${orderId}/cancel`);

      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status: 'Cancelled' } : order
      ));
      alert("Order cancelled successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel order");
    }
  };

  if (loading || authLoading) {
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


        <div className="bg-[#FF5200] text-white rounded-2xl p-6 mb-6">
          <h1 className="text-2xl font-bold">
            Welcome, {user.name} 👋
          </h1>
          <p className="text-sm mt-1 text-black">
            Manage your account & orders
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


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
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {orders.map((order) => {
                  const orderTime = new Date(order.createdAt).getTime();
                  const timeDiff = (currentTime - orderTime) / 1000;
                  const canCancel = timeDiff < 60 && order.status !== 'Cancelled' && order.status !== 'Delivered';
                  const remainingTime = Math.max(0, 60 - timeDiff).toFixed(0);

                  return (
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
                      <div className="text-sm text-gray-600 mb-2">
                        <p>{order.orderItems.length} items</p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>


                      {canCancel && (
                        <div className="flex items-center justify-between mt-3 bg-red-50 p-2 rounded">
                          <span className="text-xs text-red-600 font-semibold">Cancel in {remainingTime}s</span>
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            className="text-white bg-red-500 hover:bg-red-600 text-xs px-3 py-1 rounded font-bold transition"
                          >
                            Cancel Order
                          </button>
                        </div>
                      )}

                      {timeDiff > 60 && order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                        <div className="mt-2 text-xs text-gray-400 italic">
                          Cancellation period expired
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
