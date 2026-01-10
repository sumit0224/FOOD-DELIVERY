import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaArrowRight, FaStar } from "react-icons/fa";

import Header from "../components/sections/Header";
import api from "../api/api";
import { useCart } from "../context/CartContext";

const Home = () => {
  const { addToCart, cartItems, updateQuantity } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const res = await api.get("products");
        if (isMounted) {
          setProducts(res?.data?.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
        if (isMounted) {
          setError("Failed to load products. Please try again.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false; // prevents memory leaks
    };
  }, []);

  /* ================= CART LOOKUP (OPTIMIZED) ================= */
  const cartMap = useMemo(() => {
    const map = {};
    cartItems.forEach((item) => {
      map[item._id] = item.quantity;
    });
    return map;
  }, [cartItems]);

  const getQuantityInCart = (productId) => cartMap[productId] || 0;

  /* ================= STATIC DATA ================= */
  const categories = [
    { name: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
    { name: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
    { name: "Healthy", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" },
    { name: "Dessert", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187" },
    { name: "Main Course", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0" },
  ];

  const popularItems = products.slice(0, 8);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      {/* ================= CATEGORIES ================= */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          What's on your mind?
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/menu?category=${cat.name}`}
              className="flex flex-col items-center group"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-md mb-3 border-4 border-transparent group-hover:border-[#FF5200] transition-all">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="font-bold text-gray-700 group-hover:text-[#FF5200]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="max-w-7xl mx-auto px-4 py-8 mb-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Popular Restaurants Near You
            </h2>
            <p className="text-gray-500">The most ordered food in your city</p>
          </div>
          <Link
            to="/menu"
            className="hidden md:flex items-center gap-2 text-[#FF5200] font-bold"
          >
            See All Products <FaArrowRight />
          </Link>
        </div>

        {/* ===== STATES ===== */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5200]" />
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {popularItems.map((product) => {
              const quantity = getQuantityInCart(product._id);

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute bottom-3 left-3 right-3 flex justify-between text-white">
                      <span className="font-bold text-xl">
                        ₹{product.price}
                      </span>
                      <span className="flex items-center gap-1 bg-green-600 px-2 py-0.5 rounded text-xs font-bold">
                        {product.rating || 4.2} <FaStar size={10} />
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg truncate">
                      {product.name}
                    </h3>
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>{product.category}</span>
                      <span>25–30 mins</span>
                    </div>

                    {quantity === 0 ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full py-2.5 rounded-lg bg-gray-50 text-[#60b246] font-extrabold border hover:shadow-md"
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="flex items-center justify-between border rounded-lg h-[42px]">
                        <button
                          onClick={() =>
                            updateQuantity(product._id, quantity - 1)
                          }
                          className="w-10 text-gray-400 hover:text-[#60b246]"
                        >
                          <FaMinus size={10} />
                        </button>
                        <span className="font-bold text-[#60b246]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          className="w-10 text-[#60b246]"
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
        )}

        <div className="mt-8 md:hidden text-center">
          <Link to="/menu" className="inline-flex items-center gap-2 text-[#FF5200] font-bold">
            See All Products <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
