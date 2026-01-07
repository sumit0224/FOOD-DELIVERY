import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([
        { title: "Total Users", value: "0" },
        { title: "Revenue", value: "₹0" },
        { title: "Pending Requests", value: "0" },
    ]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/admin"); // Redirect to admin login if no token
                    return;
                }

                const res = await api.get("/admin/users", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.success) {
                    setUsers(res.data.data);
                    setStats([
                        { title: "Total Users", value: res.data.count },
                        { title: "Revenue", value: "₹2,45,000" }, // Mocked for now
                        { title: "Pending Requests", value: "0" },
                    ]);
                }

            } catch (error) {
                console.error("Failed to fetch users", error);
                if (error.response?.status === 401) {
                    navigate("/admin");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

    if (loading) return <div className="p-10">Loading Admin Dashboard...</div>;

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-5 hidden md:block">
                <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
                <nav className="space-y-4">
                    <button className="block w-full text-left hover:text-[#FF5200]">
                        Dashboard
                    </button>
                    <button className="block w-full text-left hover:text-[#FF5200]">
                        Users
                    </button>
                    <button className="block w-full text-left hover:text-[#FF5200]">
                        Reports
                    </button>
                    <button className="block w-full text-left hover:text-[#FF5200]">
                        Settings
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 font-medium">Admin</span>
                        <img
                            src="https://ui-avatars.com/api/?name=Admin&background=random"
                            alt="admin"
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                        >
                            <h3 className="text-gray-500">{item.title}</h3>
                            <p className="text-2xl font-bold mt-2">{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 text-gray-500">Name</th>
                                <th className="text-gray-500">Email</th>
                                <th className="text-gray-500">Role</th>
                                <th className="text-gray-500">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                                        <td className="py-3 font-medium">{user.name}</td>
                                        <td className="text-gray-600">{user.email}</td>
                                        <td className="text-gray-600 capitalize">{user.role}</td>
                                        <td>
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                                Active
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-4 text-center text-gray-500">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
