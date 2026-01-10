import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { FaBox, FaUsers, FaChartLine, FaSignOutAlt, FaClipboardList } from "react-icons/fa";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        usersCount: 0,
        revenue: 0,
        pendingOrders: 0,
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/admin");
                    return;
                }

                const headers = { Authorization: `Bearer ${token}` };

                // Fetch Users
                const usersRes = await api.get("/users", { headers });
                const usersCount = usersRes.data.count || 0;

                // Fetch Orders
                const ordersRes = await api.get("/orders", { headers });
                const orders = ordersRes.data.data || [];

                // Calculate Revenue (Sum of all itemsPrice)
                const revenue = orders.reduce((acc, order) => acc + (order.itemsPrice || 0), 0);

                // Calculate Pending Orders
                const pendingCount = orders.filter(o => o.status === 'Pending').length;

                setStats({
                    usersCount,
                    revenue,
                    pendingOrders: pendingCount
                });

                // Set Recent Orders (Top 5)
                setRecentOrders(orders.slice(0, 5));

            } catch (error) {
                console.error("Dashboard Fetch Error", error);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    navigate("/admin");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/admin");
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen text-xl text-gray-600">
            Loading Dashboard...
        </div>
    );

    return (
        <div className="min-h-screen flex bg-gray-50 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-2xl font-extrabold tracking-wide text-[#FF5200]">Swiggy Admin</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/admin-dashboard" className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg text-[#FF5200]">
                        <FaChartLine /> Dashboard
                    </Link>
                    <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors">
                        <FaBox /> Products
                    </Link>
                    <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer text-gray-300 hover:text-white">
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

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
                        <p className="text-gray-500 mt-1">Welcome back, Admin</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="font-bold text-gray-800">Admin User</p>
                            <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Online</span>
                        </div>
                        <img
                            src="https://ui-avatars.com/api/?name=Admin&background=FF5200&color=fff"
                            alt="admin"
                            className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                        />
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Users */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Users</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.usersCount}</h3>
                        </div>
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
                            <FaUsers size={24} />
                        </div>
                    </div>

                    {/* Revenue */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Revenue</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">₹{stats.revenue.toLocaleString()}</h3>
                        </div>
                        <div className="p-4 bg-green-50 text-green-600 rounded-full">
                            <FaChartLine size={24} />
                        </div>
                    </div>

                    {/* Pending Orders */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Orders</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.pendingOrders}</h3>
                        </div>
                        <div className="p-4 bg-orange-50 text-orange-600 rounded-full">
                            <FaClipboardList size={24} />
                        </div>
                    </div>
                </div>

                {/* Recent Orders Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                        {/* <button className="text-[#FF5200] hover:text-[#e64a00] text-sm font-semibold">View All</button> */}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Items</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentOrders.length > 0 ? (
                                    recentOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-gray-500">#{order._id.slice(-6)}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{order.user?.name || "Guest"}</td>
                                            <td className="px-6 py-4 text-gray-600">{order.orderItems.length} items</td>
                                            <td className="px-6 py-4 font-semibold text-gray-900">₹{order.itemsPrice}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                                    ${order.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                            No orders found yet.
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
