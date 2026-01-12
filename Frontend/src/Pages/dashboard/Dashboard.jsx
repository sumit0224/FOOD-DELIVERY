import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import {
  FaUser, FaEnvelope, FaShoppingBag, FaClock, FaCheckCircle,
  FaTruck, FaBoxOpen, FaTimesCircle, FaChevronDown, FaChevronUp,
  FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaCreditCard
} from "react-icons/fa";

export default function UserDashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderRes = await api.get("/orders/myorders");
        if (orderRes.data && orderRes.data.data) {
          setOrders(orderRes.data.data);
        }
      } catch (err) {
        console.error("Dashboard Error:", err);
        setError(err.response?.data?.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && isAuthenticated) {
      fetchData();
    }
  }, [authLoading, isAuthenticated, navigate]);

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

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <FaClock className="text-orange-500" />;
      case 'Processing': return <FaBoxOpen className="text-blue-500" />;
      case 'Shipped': return <FaTruck className="text-purple-500" />;
      case 'Delivered': return <FaCheckCircle className="text-green-500" />;
      case 'Cancelled': return <FaTimesCircle className="text-red-500" />;
      default: return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'from-orange-400 to-orange-600';
      case 'Processing': return 'from-blue-400 to-blue-600';
      case 'Shipped': return 'from-purple-400 to-purple-600';
      case 'Delivered': return 'from-green-400 to-green-600';
      case 'Cancelled': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getStatsData = () => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
    const completed = orders.filter(o => o.status === 'Delivered').length;
    const cancelled = orders.filter(o => o.status === 'Cancelled').length;

    return { total, pending, completed, cancelled };
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#FF5200] mx-auto"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <p className="text-red-600 font-semibold">User not found.</p>
        </div>
      </div>
    );
  }

  const stats = getStatsData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Welcome Header with Gradient */}
        <div className="bg-gradient-to-r from-[#FF5200] to-[#e64a00] text-white rounded-3xl p-8 mb-8 shadow-2xl transform hover:scale-[1.01] transition-transform">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-orange-100 text-sm md:text-base">
                Track your orders and manage your profile
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-xs text-orange-100">Total Orders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-orange-100 p-3 rounded-xl">
                <FaClock className="text-orange-500 text-xl" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
            <p className="text-xs text-gray-500">Pending</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-xl">
                <FaCheckCircle className="text-green-500 text-xl" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
            <p className="text-xs text-gray-500">Delivered</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-red-100 p-3 rounded-xl">
                <FaTimesCircle className="text-red-500 text-xl" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.cancelled}</p>
            <p className="text-xs text-gray-500">Cancelled</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-xl">
                <FaShoppingBag className="text-purple-500 text-xl" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            <p className="text-xs text-gray-500">All Orders</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-[#FF5200] to-[#e64a00] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500">Customer</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="bg-[#FF5200] p-2 rounded-lg">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-800 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="bg-[#FF5200] p-2 rounded-lg">
                    <FaPhone className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-800">{user.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="bg-[#FF5200] p-2 rounded-lg">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm font-medium text-gray-800">{user.address || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/')}
                className="w-full mt-6 bg-gradient-to-r from-[#FF5200] to-[#e64a00] text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                🍕 Order Food
              </button>
            </div>
          </div>

          {/* Orders Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
                <span className="bg-[#FF5200] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {orders.length} Orders
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🍽️</div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No Orders Yet</h3>
                  <p className="text-gray-500 mb-6">
                    Start exploring delicious food and place your first order!
                  </p>
                  <button
                    onClick={() => navigate("/")}
                    className="bg-gradient-to-r from-[#FF5200] to-[#e64a00] text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                  {orders.map((order) => {
                    const orderTime = new Date(order.createdAt).getTime();
                    const timeDiff = (currentTime - orderTime) / 1000;
                    const canCancel = timeDiff < 60 && order.status !== 'Cancelled' && order.status !== 'Delivered';
                    const remainingTime = Math.max(0, 60 - timeDiff).toFixed(0);
                    const isExpanded = expandedOrder === order._id;

                    return (
                      <div key={order._id} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-[#FF5200] transition-all">
                        {/* Order Header */}
                        <div className="p-5 bg-gradient-to-r from-gray-50 to-white">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-mono bg-gray-200 px-3 py-1 rounded-full text-gray-600">
                                  #{order._id.slice(-6).toUpperCase()}
                                </span>
                                <div className={`flex items-center gap-2 bg-gradient-to-r ${getStatusColor(order.status)} text-white px-3 py-1 rounded-full`}>
                                  {getStatusIcon(order.status)}
                                  <span className="text-xs font-bold">{order.status}</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <FaCalendarAlt className="text-gray-400" />
                                {new Date(order.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                              <p className="text-2xl font-bold text-[#FF5200]">₹{order.itemsPrice}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaShoppingBag className="text-[#FF5200]" />
                                <span className="font-semibold">{order.orderItems.length} Items</span>
                              </div>
                              {order.paymentMethod && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <FaCreditCard className="text-[#FF5200]" />
                                  <span>{order.paymentMethod}</span>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => toggleOrderDetails(order._id)}
                              className="flex items-center gap-2 text-[#FF5200] hover:text-[#e64a00] font-semibold text-sm transition-colors"
                            >
                              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                              {isExpanded ? 'Hide' : 'Details'}
                            </button>
                          </div>
                        </div>

                        {/* Expandable Order Details */}
                        {isExpanded && (
                          <div className="p-5 border-t border-gray-100 bg-white">
                            <h4 className="font-bold text-gray-800 mb-3">Order Items</h4>
                            <div className="space-y-2 mb-4">
                              {order.orderItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                  <div>
                                    <p className="font-medium text-gray-800">{item.name}</p>
                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="font-semibold text-gray-800">₹{item.price * item.quantity}</p>
                                </div>
                              ))}
                            </div>

                            {order.shippingAddress && (
                              <div className="bg-blue-50 p-4 rounded-xl">
                                <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                  <FaMapMarkerAlt className="text-blue-500" />
                                  Delivery Address
                                </p>
                                <p className="text-sm text-gray-700">
                                  {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Cancel Order Section */}
                        {canCancel && (
                          <div className="p-4 bg-red-50 border-t border-red-100">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FaClock className="text-red-500 animate-pulse" />
                                <span className="text-sm text-red-600 font-semibold">
                                  Cancel within {remainingTime}s
                                </span>
                              </div>
                              <button
                                onClick={() => handleCancelOrder(order._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                              >
                                Cancel Order
                              </button>
                            </div>
                          </div>
                        )}

                        {timeDiff > 60 && order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                          <div className="p-3 bg-gray-100 border-t border-gray-200 text-center">
                            <p className="text-xs text-gray-500 italic">Cancellation period expired</p>
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
    </div>
  );
}
