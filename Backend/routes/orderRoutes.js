const express = require('express');
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    getMyOrders
} = require('../controllers/orderController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// @route   POST /api/orders - Create new order (User)
router.post('/', protect, createOrder);

// @route   GET /api/orders/myorders - Get logged in user orders
router.get('/myorders', protect, getMyOrders);

// @route   GET /api/orders - Get all orders (Admin)
router.get('/', protect, adminOnly, getAllOrders);

// @route   GET /api/orders/:id - Get order by ID (User/Admin)
router.get('/:id', protect, getOrderById);

// @route   PUT /api/orders/:id/status - Update order status (Admin)
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;
