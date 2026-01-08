import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCreditCard, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import api from "../api/api";

export default function Checkout() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        street: "",
        city: "",
        postalCode: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (cartItems.length === 0) {
        navigate("/"); // Redirect if cart is empty
        return null;
    }

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Construct payload strictly matching the backend model if needed.
        // Order Model expects:
        // orderItems: [{ name, quantity, price, product }]
        // shippingAddress: { address, city, postalCode }
        // paymentMethod: string
        // itemsPrice: number

        // We need to map cartItems to orderItems.
        // product field in orderItem is the ID.

        const orderItems = cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            product: item._id
        }));

        const shippingAddress = {
            address: address.street, // Mapping 'street' to 'address' as per model common convention or verifying usage
            city: address.city,
            postalCode: address.postalCode
        };

        try {
            await api.post("orders", {
                orderItems,
                shippingAddress,
                paymentMethod: "COD", // Hardcoded for simplified flow or add radio buttons
                itemsPrice: cartTotal,
                // taxPrice, shippingPrice, totalPrice might be calculated by backend or defaults? 
                // Backend default is 0.0 for itemsPrice, checking model... 
                // Model only requires: user, orderItems, shippingAddress, paymentMethod, itemsPrice. 
                // User is likely from token in backend middleware.
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            clearCart();
            alert("Order placed successfully!");
            navigate("/"); // Or to an /orders page if it existed
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to place order.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 mb-6 hover:text-black">
                    <FaArrowLeft /> Back to Cart
                </button>

                <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
                )}

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-[#FF5200]" /> Delivery Address
                        </h2>
                    </div>

                    <form onSubmit={handlePlaceOrder} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                            <input
                                type="text"
                                name="street"
                                value={address.street}
                                onChange={handleChange}
                                required
                                placeholder="123 Main St, Apartment 4B"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#FF5200]"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={address.city}
                                    onChange={handleChange}
                                    required
                                    placeholder="New York"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#FF5200]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={address.postalCode}
                                    onChange={handleChange}
                                    required
                                    placeholder="10001"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#FF5200]"
                                />
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                                <FaCreditCard className="text-[#FF5200]" /> Payment Method
                            </h2>
                            <div className="p-4 border border-[#FF5200] bg-orange-50 rounded-lg text-[#FF5200] font-semibold flex items-center justify-between">
                                <span>Cash on Delivery</span>
                                <div className="w-4 h-4 rounded-full bg-[#FF5200] ring-2 ring-offset-2 ring-[#FF5200]"></div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flex justify-between items-center text-xl font-bold text-gray-900 mb-4">
                                <span>Total Amount</span>
                                <span>₹{cartTotal + 5}</span>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                            >
                                {loading ? "Placing Order..." : "Confirm Price & Order"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
