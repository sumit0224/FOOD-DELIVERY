import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { FaBox, FaUsers, FaChartLine, FaSignOutAlt, FaClipboardList, FaCheck, FaTimes, FaSearch } from "react-icons/fa";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, [navigate]);

    useEffect(() => {
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            setFilteredOrders(orders.filter(o =>
                o._id.toLowerCase().includes(lower) ||
                o.user?.name?.toLowerCase().includes(lower)
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

    if (loading) return (
        <div className="flex justify-center items-center h-screen text-xl text-gray-600">
            Loading Orders...
        </div>
    );

    return (
        <div className="min-h-screen flex bg-gray-50 font-sans">

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


            <main className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Manage Orders</h1>
                        <p className="text-gray-500 mt-1">View and update all customer orders</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-800">All Orders</h2>
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Search ID or Name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5200] outline-none"
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>

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
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-gray-500">#{order._id.slice(-6)}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{order.user?.name || "Guest"}</td>
                                            <td className="px-6 py-4 text-gray-600">{order.orderItems.length} items</td>
                                            <td className="px-6 py-4 font-semibold text-gray-900">₹{order.itemsPrice}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                                    ${order.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
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
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
