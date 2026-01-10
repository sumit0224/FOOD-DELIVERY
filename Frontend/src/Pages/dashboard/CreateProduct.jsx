import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";
import api from "../../api/api";

export default function CreateProduct() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        imageUrl: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            // Assuming the endpoint is "products" based on standard REST conventions and existing structure references
            // The implementation plan research showed existing routes at /api/products
            // The api instance likely has the base url set, so we just need "products"
            await api.post("products", formData, {
                headers: {
                    "Content-Type": "application/json",
                    // Auth token handles by interceptor or we might need it if not automatic
                    // Logic.jsx sets token in localStorage. Assuming api instance handles it or backend requires it.
                    // For now, let's rely on global config or add it if needed.
                    // Usually api instances have interceptors.
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });

            setMessage("Product created successfully!");
            setFormData({
                name: "",
                description: "",
                price: "",
                category: "",
                stock: "",
                imageUrl: "",
            });
            // Optional: Navigate back to dashboard after short delay
            // setTimeout(() => navigate("/admin-dashboard"), 2000);
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message || "Failed to create product. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 relative">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-5 left-5 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition-colors"
                >
                    <FaArrowLeft />
                    Back
                </button>

                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
                    Create New Product
                </h2>

                {/* Feedback Messages */}
                {message && (
                    <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg shadow-sm">
                        <p className="font-medium">{message}</p>
                    </div>
                )}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm">
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Spicy Chicken Burger"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#FF5200] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="e.g. 199"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#FF5200] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g. Burgers"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#FF5200] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="e.g. 50"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#FF5200] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Image URL */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                        <div className="relative">
                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#FF5200] focus:border-transparent transition-all pr-10"
                            />
                            <FaCloudUploadAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                        </div>
                        {formData.imageUrl && (
                            <div className="mt-4 w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the product..."
                            rows="4"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#FF5200] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 mt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FF5200] hover:bg-[#e64a00] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating..." : "Create Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
