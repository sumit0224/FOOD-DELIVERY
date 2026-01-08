import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api"; // Ensure this path is correct based on your folder structure

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const res = await api.post("users/forgot-password", { email });
            setMessage(res.data.message);
            // Navigate to Reset Password page, passing email as state
            setTimeout(() => {
                navigate("/reset-password", { state: { email } });
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Forgot Password
                </h2>

                {message && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm text-center">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5200]"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FF5200] text-white font-bold py-2 rounded-lg hover:bg-[#e64a00] transition disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send OTP"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <Link to="/login" className="text-sm text-gray-600 hover:text-[#FF5200]">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
