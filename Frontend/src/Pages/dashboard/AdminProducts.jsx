import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";
import api from "../../api/api";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get("products");
            setProducts(res.data.data || []);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch products.");
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await api.delete(`products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setProducts(products.filter((product) => product._id !== id));
            } catch (err) {
                console.error(err);
                alert("Failed to delete product.");
            }
        }
    };

    if (loading) return <div className="text-center mt-20 text-lg">Loading products...</div>;
    if (error) return <div className="text-center mt-20 text-red-500 font-bold">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/admin/dashboard")}
                            className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
                        >
                            <FaArrowLeft className="text-gray-600" />
                        </button>
                        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
                    </div>

                    <Link
                        to="/admin/create-product"
                        className="flex items-center gap-2 bg-[#FF5200] hover:bg-[#e64a00] text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all transform hover:-translate-y-0.5"
                    >
                        <FaPlus /> Add New Product
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 uppercase text-sm font-semibold tracking-wider border-b border-gray-200">
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Stock</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                                                />
                                            </td>
                                            <td className="p-4 font-medium text-gray-800">{product.name}</td>
                                            <td className="p-4 text-gray-600">
                                                <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="p-4 font-semibold text-gray-900">₹{product.price}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 text-xs font-bold rounded ${product.stock > 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-center gap-3">
                                                    <Link
                                                        to={`/admin/edit-product/${product._id}`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <FaEdit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteProduct(product._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <FaTrash size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-gray-500">
                                            No products found. Start by adding one!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
