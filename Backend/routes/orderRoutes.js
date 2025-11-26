const express = require('express');
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus
} = require('../controllers/orderController');

// @route   POST /api/orders - Create new order (User)
router.post('/', createOrder);

// @route   GET /api/orders - Get all orders (Admin)
router.get('/', getAllOrders);

// @route   GET /api/orders/:id - Get order by ID (User/Admin)
router.get('/:id', getOrderById);

// @route   PUT /api/orders/:id/status - Update order status (Admin)
router.put('/:id/status', updateOrderStatus);

module.exports = router;
