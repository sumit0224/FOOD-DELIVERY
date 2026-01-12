import api from './api';

/**
 * Cart API client functions
 * All functions require authentication
 */

/**
 * Get user's cart from backend
 * @returns {Promise} Cart data
 */
export const getCart = async () => {
    const response = await api.get('/cart');
    return response.data;
};

/**
 * Add item to cart
 * @param {string} productId - Product ID to add
 * @param {number} quantity - Quantity to add (default: 1)
 * @returns {Promise} Updated cart data
 */
export const addToCart = async (productId, quantity = 1) => {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
};

/**
 * Update cart item quantity
 * @param {string} itemId - Cart item ID
 * @param {number} quantity - New quantity
 * @returns {Promise} Updated cart data
 */
export const updateCartItem = async (itemId, quantity) => {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data;
};

/**
 * Remove item from cart
 * @param {string} itemId - Cart item ID to remove
 * @returns {Promise} Updated cart data
 */
export const removeFromCart = async (itemId) => {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
};

/**
 * Clear entire cart
 * @returns {Promise} Empty cart data
 */
export const clearCart = async () => {
    const response = await api.delete('/cart');
    return response.data;
};

/**
 * Sync local cart to backend after login
 * @param {Array} items - Local cart items from localStorage
 * @returns {Promise} Synced cart data
 */
export const syncCart = async (items) => {
    const response = await api.post('/cart/sync', { items });
    return response.data;
};
