import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { FaPlus, FaMinus, FaSearch, FaFilter } from 'react-icons/fa';

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters & Sorting States
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState([0, 1000]); // Max price assumed
    const [sortOrder, setSortOrder] = useState("default"); // default, price-low-high, price-high-low, a-z

    const { addToCart, cartItems, updateQuantity } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [products, searchTerm, selectedCategory, priceRange, sortOrder]);

    const fetchProducts = async () => {
        try {
            const res = await api.get('products');
            setProducts(res.data.data || []);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch products', err);
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let result = [...products];

        // 1. Search
        if (searchTerm) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // 2. Category
        if (selectedCategory !== "All") {
            result = result.filter(p => p.category === selectedCategory);
        }

        // 3. Price Range
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // 4. Sorting
        if (sortOrder === "price-low-high") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "price-high-low") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortOrder === "a-z") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredProducts(result);
    };

    const getQuantityInCart = (productId) => {
        const item = cartItems.find((item) => item._id === productId);
        return item ? item.quantity : 0;
    };

    const categories = ["All", ...new Set(products.map(p => p.category))];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            {/* Header / Search Bar */}
            <div className="bg-white shadow-sm sticky top-[80px] z-40">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search for food..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF5200]"
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none bg-white w-full md:w-auto"
                        >
                            <option value="default">Sort By: Default</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                            <option value="a-z">Name: A to Z</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <FaFilter className="text-[#FF5200]" /> Filters
                        </h3>

                        {/* Categories */}
                        <div className="mb-6">
                            <h4 className="font-semibold mb-3 text-gray-700">Categories</h4>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-[#FF5200] transition">
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={selectedCategory === cat}
                                            onChange={() => setSelectedCategory(cat)}
                                            className="text-[#FF5200] focus:ring-[#FF5200]"
                                        />
                                        <span className={selectedCategory === cat ? "text-[#FF5200] font-medium" : "text-gray-600"}>
                                            {cat}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h4 className="font-semibold mb-3 text-gray-700">Price Range</h4>
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                step="50"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                className="w-full accent-[#FF5200]"
                            />
                            <div className="flex justify-between text-sm text-gray-500 mt-2">
                                <span>₹0</span>
                                <span>₹{priceRange[1]}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5200]"></div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4 text-gray-500">
                                Showing {filteredProducts.length} results
                            </div>

                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => {
                                        const quantity = getQuantityInCart(product._id);
                                        return (
                                            <div key={product._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                                                <div className="relative h-48 overflow-hidden">
                                                    <img
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-bold shadow-sm">
                                                        ₹{product.price}
                                                    </div>
                                                </div>

                                                <div className="p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                                                            <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">{product.description}</p>

                                                    {quantity === 0 ? (
                                                        <button
                                                            onClick={() => addToCart(product)}
                                                            className="w-full py-2.5 rounded-lg bg-gray-50 text-gray-900 font-bold hover:bg-[#FF5200] hover:text-white transition-colors border border-gray-200"
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center justify-between bg-white border border-[#FF5200] rounded-lg p-1">
                                                            <button
                                                                onClick={() => updateQuantity(product._id, quantity - 1)}
                                                                className="w-8 h-8 flex items-center justify-center text-[#FF5200] hover:bg-[#FF5200]/10 rounded transition"
                                                            >
                                                                <FaMinus size={10} />
                                                            </button>
                                                            <span className="font-bold text-[#FF5200]">{quantity}</span>
                                                            <button
                                                                onClick={() => addToCart(product)}
                                                                className="w-8 h-8 flex items-center justify-center text-[#FF5200] hover:bg-[#FF5200]/10 rounded transition"
                                                            >
                                                                <FaPlus size={10} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                                    <p className="text-xl text-gray-500 mb-2">No items found</p>
                                    <p className="text-gray-400">Try adjusting your filters or search term</p>
                                    <button
                                        onClick={() => { setSearchTerm(""); setSelectedCategory("All"); setPriceRange([0, 2000]) }}
                                        className="mt-4 text-[#FF5200] font-medium hover:underline"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;
