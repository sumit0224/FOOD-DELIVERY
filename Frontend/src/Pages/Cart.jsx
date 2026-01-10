import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link
                    to="/"
                    className="bg-[#FF5200] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-[#e64a00] transition-all"
                >
                    Browse Food
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-black">
                        <FaArrowLeft size={20} />
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center transition-all hover:shadow-md"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                                    <p className="text-[#FF5200] font-semibold">₹{item.price * item.quantity}</p>
                                    <p className="text-gray-500 text-sm">₹{item.price} / item</p>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="px-3 py-1 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 text-gray-600 font-bold"
                                        >
                                            -
                                        </button>
                                        <span className="px-3 py-1 font-semibold text-gray-800 bg-white">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-[#FF5200] font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 transition-colors"
                                    >
                                        <FaTrash size={14} /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={clearCart}
                            className="text-red-500 hover:text-red-700 font-medium text-sm mt-2 float-right hover:underline"
                        >
                            Clear Cart
                        </button>
                    </div>


                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Bill Details</h2>

                            <div className="space-y-3 text-gray-600 mb-6 border-b border-gray-100 pb-6">
                                <div className="flex justify-between">
                                    <span>Item Total</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Platform Fee</span>
                                    <span>₹5</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-xl font-bold text-gray-900 mb-8">
                                <span>To Pay</span>
                                <span>₹{cartTotal + 5}</span>
                            </div>

                            <Link
                                to="/checkout"
                                className="w-full bg-[#FF5200] hover:bg-[#e64a00] text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex justify-between items-center px-6 group"
                            >
                                <span>Proceed to Pay</span>
                                <span className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                                    <FaArrowRight size={14} />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
