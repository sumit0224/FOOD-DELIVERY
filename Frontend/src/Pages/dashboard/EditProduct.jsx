import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCloudUploadAlt, FaSave } from "react-icons/fa";
import api from "../../api/api";

export default function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        imageUrl: "",
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await api.get(`products/${id}`);
            setFormData(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch product details.");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage("");
        setError("");

        try {
            await api.put(`products/${id}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setMessage("Product updated successfully!");
            // setTimeout(() => navigate("/admin/products"), 1500);
        } catch (err) {
            console.error(err);
            setError("Failed to update product.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center mt-20 text-lg">Loading product data...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 relative">
                <button
                    onClick={() => navigate("/admin/products")}
                    className="absolute top-5 left-5 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition-colors"
                >
                    <FaArrowLeft />
                    Back
                </button>

                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
                    Edit Product
                </h2>

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
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#FF5200] transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#FF5200] transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#FF5200] transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#FF5200] transition-all"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                        <div className="relative">
                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#FF5200] transition-all pr-10"
                            />
                            <FaCloudUploadAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                        </div>
                        {formData.imageUrl && (
                            <div className="mt-4 w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        )}
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#FF5200] transition-all"
                        />
                    </div>

                    <div className="col-span-2 mt-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-[#FF5200] hover:bg-[#e64a00] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50"
                        >
                            {submitting ? "Updating..." : (
                                <span className="flex items-center justify-center gap-2">
                                    <FaSave /> Save Changes
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
