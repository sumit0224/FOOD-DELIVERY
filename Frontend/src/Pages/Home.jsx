import React, { useEffect, useState } from 'react';
import Header from '../components/sections/Header';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();

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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header setSearchTerm={setSearchTerm} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          {searchTerm ? `Search Results for "${searchTerm}"` : "Restaurants with online food delivery in your city"}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5200]"></div>
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => {
                  const quantity = getQuantityInCart(product._id);

                  return (
                    <div key={product._id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
                      <div className="relative h-48 w-full">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <span className="absolute bottom-3 left-3 text-white font-bold text-lg drop-shadow-md">
                          ₹{product.price}
                        </span>
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">{product.name}</h3>
                        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                        <p className="text-gray-600 text-xs line-clamp-2 mb-4 h-8">{product.description}</p>

                        {quantity === 0 ? (
                          <button
                            onClick={() => addToCart(product)}
                            className="w-full py-2 rounded-lg bg-white border border-gray-300 text-green-600 font-bold hover:bg-gray-50 shadow-sm transition-all uppercase text-sm"
                          >
                            Add
                          </button>
                        ) : (
                          <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg shadow-sm">
                            <button
                              onClick={() => updateQuantity(product._id, quantity - 1)}
                              className="px-4 py-2 text-gray-500 hover:text-green-600 font-bold transition-colors"
                            >
                              <FaMinus size={12} />
                            </button>
                            <span className="font-bold text-green-600">{quantity}</span>
                            <button
                              onClick={() => addToCart(product)}
                              className="px-4 py-2 text-green-600 hover:text-green-700 font-bold transition-colors"
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p className="text-xl">No items found matching "{searchTerm}"</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;