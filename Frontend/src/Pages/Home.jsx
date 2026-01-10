import React, { useEffect, useState } from 'react';
import Header from '../components/sections/Header';
import api from '../api/api';
import Navbar from '../components/Navbar'; // Assuming we want navbar here too? Actually Header has it? No, Header is just the hero part. 
// Wait, the previous Home had Header component which might contain Navbar logic or just the top part.
// Let's check Header later. For now, following the pattern of Menu/About/Contact, I should probably put Navbar if Header doesn't have it.
// Looking at previous Home.jsx, it imported Header.
import { useCart } from '../context/CartContext';
import { FaPlus, FaMinus, FaArrowRight, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems, updateQuantity } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('products');
      setProducts(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  };

  const getQuantityInCart = (productId) => {
    const item = cartItems.find((item) => item._id === productId);
    return item ? item.quantity : 0;
  };

  // Hardcoded categories for display
  const categories = [
    { name: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { name: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { name: "Healthy", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { name: "Dessert", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { name: "Main Course", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
  ];

  // Get random "Popular" items (just taking first 4 for now)
  const popularItems = products.slice(0, 8);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header /> {/* Header component typically handles the top hero section */}

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">What's on your mind?</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((cat, index) => (
            <Link to={`/menu?category=${cat.name}`} key={index} className="flex flex-col items-center group cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-md mb-3 border-4 border-transparent group-hover:border-[#FF5200] transition-all">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="font-bold text-gray-700 group-hover:text-[#FF5200] transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Items Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 mb-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Popular Restaurants Near You</h2>
            <p className="text-gray-500">The most ordered food in your city</p>
          </div>
          <Link to="/menu" className="hidden md:flex items-center gap-2 text-[#FF5200] font-bold hover:text-[#d14300] transition-colors">
            See All Products <FaArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5200]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {popularItems.map((product) => {
              const quantity = getQuantityInCart(product._id);
              return (
                <div key={product._id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                      <div>
                        <span className="font-bold text-xl block">₹{product.price}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-green-600 px-2 py-0.5 rounded text-xs font-bold">
                        4.2 <FaStar size={10} />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">{product.name}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-500 text-sm">{product.category}</span>
                      <span className="text-gray-400 text-xs">• 25-30 mins</span>
                    </div>

                    {quantity === 0 ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full py-2.5 rounded-lg bg-gray-50 text-[#60b246] font-extrabold border border-gray-200 hover:shadow-md transition-all uppercase text-sm"
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm h-[42px]">
                        <button
                          onClick={() => updateQuantity(product._id, quantity - 1)}
                          className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-[#60b246] font-bold transition-colors"
                        >
                          <FaMinus size={10} />
                        </button>
                        <span className="font-extrabold text-[#60b246] text-sm">{quantity}</span>
                        <button
                          onClick={() => addToCart(product)}
                          className="w-10 h-full flex items-center justify-center text-[#60b246] hover:text-[#60b246] font-bold transition-colors"
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