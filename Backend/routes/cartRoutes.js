const express = require('express');
const router = express.Router();
const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    syncCart,
} = require('../controllers/cartController');
const { protect, customerOnly } = require('../middleware/authMiddleware');
const { cartRateLimit } = require('../middleware/rateLimitMiddleware');

// All cart routes require authentication (customer only)

/**
 * @route   GET /api/cart
 * @desc    Get user's cart
 * @access  Protected (Customer)
 */
router.get('/', protect, customerOnly, getCart);

/**
 * @route   POST /api/cart
 * @desc    Add item to cart
 * @access  Protected (Customer)
 */
router.post('/', protect, customerOnly, cartRateLimit, addToCart);

/**
 * @route   POST /api/cart/sync
 * @desc    Sync local cart to backend after login
 * @access  Protected (Customer)
 */
router.post('/sync', protect, customerOnly, syncCart);

/**
 * @route   PUT /api/cart/:itemId
 * @desc    Update cart item quantity
 * @access  Protected (Customer)
 */
router.put('/:itemId', protect, customerOnly, updateCartItem);

/**
 * @route   DELETE /api/cart/:itemId
 * @desc    Remove item from cart
 * @access  Protected (Customer)
 */
router.delete('/:itemId', protect, customerOnly, removeFromCart);

/**
 * @route   DELETE /api/cart
 * @desc    Clear entire cart
 * @access  Protected (Customer)
 */
router.delete('/', protect, customerOnly, clearCart);

module.exports = router;
