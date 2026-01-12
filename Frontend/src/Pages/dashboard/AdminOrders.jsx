import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import {
    FaBox, FaUsers, FaChartLine, FaSignOutAlt, FaClipboardList,
    FaSearch, FaChevronDown, FaChevronUp, FaBars, FaTimes,
    FaUserCircle, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCreditCard
} from "react-icons/fa";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, [navigate]);

    useEffect(() => {
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            setFilteredOrders(orders.filter(o =>
                o._id.toLowerCase().includes(lower) ||
                o.user?.name?.toLowerCase().includes(lower) ||
                o.user?.email?.toLowerCase().includes(lower)
            ));
        } else {
            setFilteredOrders(orders);
        }
    }, [searchTerm, orders]);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/admin");
                return;
            }
            const headers = { Authorization: `Bearer ${token}` };
            const res = await api.get("/orders", { headers });
            setOrders(res.data.data || []);
            setFilteredOrders(res.data.data || []);
        } catch (error) {
            console.error("Orders Fetch Error", error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate("/admin");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status: newStatus });
            setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
            alert(`Order status updated to ${newStatus}`);
        } catch (error) {
            console.error("Update Status Error", error);
            alert("Failed to update status");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/admin");
    };

    const toggleOrderDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-orange-100 text-orange-700';
            case 'Processing': return 'bg-blue-100 text-blue-700';
            case 'Shipped': return 'bg-purple-100 text-purple-700';
            case 'Delivered': return 'bg-green-100 text-green-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen text-xl text-gray-600">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5200]"></div>
        </div>
    );

    return (
        <div className="min-h-screen flex bg-gray-50 font-sans">

            {/* Desktop Sidebar */}
            <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-2xl font-extrabold tracking-wide text-[#FF5200]">Swiggy Admin</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
                        <FaChartLine /> Dashboard
                    </Link>
                    <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg text-[#FF5200]">
                        <FaClipboardList /> Orders
                    </Link>
                    <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
                        <FaBox /> Products
                    </Link>
                    <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
                        <FaUsers /> Users
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-red-900/30 text-red-400 hover:text-red-300 rounded-lg transition-all"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMobileMenuOpen(false)}
            />
            <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 md:hidden transform transition-transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-extrabold text-[#FF5200]">Swiggy Admin</h2>
                    <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                        <FaTimes size={20} />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
                        <FaChartLine /> Dashboard
                    </Link>
                    <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg text-[#FF5200]">
                        <FaClipboardList /> Orders
                    </Link>
                    <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
                        <FaBox /> Products
                    </Link>
                    <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
                        <FaUsers /> Users
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-red-900/30 text-red-400 hover:text-red-300 rounded-lg transition-all mt-8"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </nav>
            </div>

            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between mb-6">
                    <button onClick={() => setMobileMenuOpen(true)} className="text-gray-700">
                        <FaBars size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Orders</h1>
                    <div className="w-6"></div>
                </div>

                {/* Desktop Header */}
                <div className="hidden md:flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Manage Orders</h1>
                        <p className="text-gray-500 mt-1">View and update all customer orders</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                    <div className="p-4 md:p-6">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search by ID, Name, or Email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-[#FF5200] outline-none"
                            />
                            <FaSearch className="absolute left-3 top-3 md:top-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Orders List - Desktop Table */}
                <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Items</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Action</th>
                                    <th className="px-6 py-4">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <React.Fragment key={order._id}>
                                            <tr className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-mono text-xs text-gray-500">#{order._id.slice(-6)}</td>
                                                <td className="px-6 py-4 font-medium text-gray-900">{order.user?.name || "Guest"}</td>
                                                <td className="px-6 py-4 text-gray-600">{order.orderItems.length} items</td>
                                                <td className="px-6 py-4 font-semibold text-gray-900">₹{order.itemsPrice}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#FF5200]"
                                                        disabled={order.status === 'Cancelled' || order.status === 'Delivered'}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => toggleOrderDetails(order._id)}
                                                        className="text-[#FF5200] hover:text-[#e64a00] font-semibold text-sm flex items-center gap-1"
                                                    >
                                                        {expandedOrder === order._id ? <FaChevronUp /> : <FaChevronDown />}
                                                        {expandedOrder === order._id ? 'Hide' : 'View'}
                                                    </button>
                                                </td>
                                            </tr>
                                            {expandedOrder === order._id && (
                                                <tr>
                                                    <td colSpan="8" className="px-6 py-4 bg-gray-50">
                                                        <OrderDetails order={order} />
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Orders List - Mobile Cards */}
                <div className="md:hidden space-y-4">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                            <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                {/* Card Header */}
                                <div className="p-4 bg-gray-50 border-b border-gray-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-xs text-gray-500">Order ID</p>
                                            <p className="font-mono text-sm font-semibold text-gray-800">#{order._id.slice(-6)}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                                </div>

                                {/* Card Body */}
                                <div className="p-4 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Customer</span>
                                        <span className="text-sm font-semibold text-gray-800">{order.user?.name || "Guest"}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Items</span>
                                        <span className="text-sm font-semibold text-gray-800">{order.orderItems.length} items</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Total Amount</span>
                                        <span className="text-lg font-bold text-[#FF5200]">₹{order.itemsPrice}</span>
                                    </div>

                                    {/* Status Update */}
                                    <div className="pt-3 border-t border-gray-100">
                                        <label className="block text-xs text-gray-600 mb-1">Update Status</label>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF5200]"
                                            disabled={order.status === 'Cancelled' || order.status === 'Delivered'}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>

                                    {/* View Details Button */}
                                    <button
                                        onClick={() => toggleOrderDetails(order._id)}
                                        className="w-full mt-3 bg-[#FF5200] hover:bg-[#e64a00] text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                                    >
                                        {expandedOrder === order._id ? <FaChevronUp /> : <FaChevronDown />}
                                        {expandedOrder === order._id ? 'Hide Full Details' : 'View Full Details'}
                                    </button>
                                </div>

                                {/* Expanded Details */}
                                {expandedOrder === order._id && (
                                    <div className="p-4 bg-gray-50 border-t border-gray-100">
                                        <OrderDetails order={order} />
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-xl p-8 text-center text-gray-500">
                            No orders found.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

// Order Details Component
const OrderDetails = ({ order }) => {
    return (
        <div className="space-y-4">
            {/* Customer Information */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FaUserCircle className="text-[#FF5200]" />
                    Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                        <FaUserCircle className="text-gray-400 mt-1" />
                        <div>
                            <p className="text-gray-500 text-xs">Name</p>
                            <p className="font-medium text-gray-800">{order.user?.name || "N/A"}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <FaEnvelope className="text-gray-400 mt-1" />
                        <div>
                            <p className="text-gray-500 text-xs">Email</p>
                            <p className="font-medium text-gray-800">{order.user?.email || "N/A"}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <FaPhone className="text-gray-400 mt-1" />
                        <div>
                            <p className="text-gray-500 text-xs">Phone</p>
                            <p className="font-medium text-gray-800">{order.user?.phone || "N/A"}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <FaMapMarkerAlt className="text-gray-400 mt-1" />
                        <div>
                            <p className="text-gray-500 text-xs">Address</p>
                            <p className="font-medium text-gray-800">{order.user?.address || "N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#FF5200]" />
                    Shipping Address
                </h3>
                <div className="text-sm space-y-1">
                    <p className="text-gray-800">{order.shippingAddress?.address}</p>
                    <p className="text-gray-600">{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FaCreditCard className="text-[#FF5200]" />
                    Payment Information
                </h3>
                <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method</span>
                        <span className="font-semibold text-gray-800">{order.paymentMethod || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount</span>
                        <span className="font-bold text-[#FF5200] text-lg">₹{order.itemsPrice}</span>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FaClipboardList className="text-[#FF5200]" />
                    Order Items ({order.orderItems.length})
                </h3>
                <div className="space-y-2">
                    {order.orderItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                                <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                                <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-800">₹{item.price * item.quantity}</p>
                                <p className="text-xs text-gray-500">₹{item.price} each</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
