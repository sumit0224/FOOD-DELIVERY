import React, { useState } from 'react';
import Modal from '../UI/Modal';
import api from '../../api/api';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const endpoint = isLogin ? 'users/login' : 'users/register';
            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : formData;

            const res = await api.post(endpoint, payload);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.data.role || "user");

            onLoginSuccess(res.data.data);
            onClose();

            setFormData({ name: '', email: '', password: '', phone: '', address: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isLogin ? "Welcome Back" : "Create Account"}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                {!isLogin && (
                    <div className="relative">
                        <FaUser className="absolute top-3.5 left-3 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required={!isLogin}
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF5200] outline-none"
                        />
                    </div>
                )}

                <div className="relative">
                    <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF5200] outline-none"
                    />
                </div>

                {!isLogin && (
                    <>
                        <div className="relative">
                            <FaPhone className="absolute top-3.5 left-3 text-gray-400" />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required={!isLogin}
                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF5200] outline-none"
                            />
                        </div>
                        <div className="relative">
                            <FaMapMarkerAlt className="absolute top-3.5 left-3 text-gray-400" />
                            <input
                                type="text"
                                name="address"
                                placeholder="Delivery Address"
                                value={formData.address}
                                onChange={handleChange}
                                required={!isLogin}
                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF5200] outline-none"
                            />
                        </div>
                    </>
                )}

                <div className="relative">
                    <FaLock className="absolute top-3.5 left-3 text-gray-400" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF5200] outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FF5200] hover:bg-[#e64a00] text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
                >
                    {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                </button>

                <div className="text-center text-sm text-gray-600 mt-4">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        className="text-[#FF5200] font-bold hover:underline"
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AuthModal;
