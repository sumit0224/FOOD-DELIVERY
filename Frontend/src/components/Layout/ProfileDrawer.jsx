import React, { useState, useEffect } from 'react';
import { IoClose, IoSave } from 'react-icons/io5';
import api from '../../api/api';

const ProfileDrawer = ({ isOpen, onClose, user, onUpdateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                address: user.address || '',
                password: ''
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                name: formData.name,
                phone: formData.phone,
                address: formData.address
            };
            if (formData.password) payload.password = formData.password;

            const res = await api.put('users/profile', payload);
            onUpdateUser(res.data.data);
            setIsEditing(false);
        } catch (error) {
            console.error("Update failed", error);
            alert("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}


            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">

                    <div className="flex items-center justify-between p-6 border-b">
                        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                            <IoClose size={24} />
                        </button>
                    </div>


                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-24 h-24 bg-[#FF5200]/10 rounded-full flex items-center justify-center text-[#FF5200] text-3xl font-bold mb-4">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <h3 className="text-xl font-bold">{user?.name}</h3>
                            <p className="text-gray-500">{user?.email}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    disabled={!isEditing}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5200] outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    disabled={!isEditing}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5200] outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                                <textarea
                                    rows="3"
                                    disabled={!isEditing}
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5200] outline-none disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                                />
                            </div>

                            {isEditing && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password (Optional)</label>
                                    <input
                                        type="password"
                                        placeholder="Leave blank to keep current"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5200] outline-none"
                                    />
                                </div>
                            )}

                            <div className="pt-4">
                                {!isEditing ? (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="w-full py-3 border-2 border-[#FF5200] text-[#FF5200] font-bold rounded-lg hover:bg-[#FF5200]/5 transition"
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="py-3 bg-[#FF5200] text-white font-bold rounded-lg hover:bg-[#e64a00] transition flex items-center justify-center gap-2"
                                        >
                                            {loading ? 'Saving...' : <><IoSave /> Save Changes</>}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileDrawer;
