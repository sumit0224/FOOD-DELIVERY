const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const { emitNewOrderToAdmin, emitOrderUpdateToUser, emitOrderCancellation } = require('../socket/socketManager');
const { sendOrderNotificationToAdmin, sendOrderCancelledEmail } = require('../services/emailService');


const createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice
        } = req.body;


        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No order items provided'
            });
        }

        if (!shippingAddress || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: 'Please provide shipping address and payment method'
            });
        }


        const order = await Order.create({
            user: req.user.id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice: itemsPrice || 0,
            status: 'Pending'
        });

        // Populate for email
        await order.populate('user', 'name email phone address');

        // Send email notification to admin
        try {
            await sendOrderNotificationToAdmin(order);
        } catch (emailError) {
            console.error('Failed to send admin email:', emailError);
            // Continue even if email fails
        }

        // Emit socket event to admin
        try {
            emitNewOrderToAdmin(order);
        } catch (socketError) {
            console.error('Failed to emit socket event:', socketError);
        }

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            data: order
        });
    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'name email')
            .populate('orderItems.product', 'name price');

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
};


const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('orderItems.product', 'name price imageUrl');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        });
    }
};


const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;


        const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        order.status = status;
        const updatedOrder = await order.save();

        // Emit socket event to user
        try {
            emitOrderUpdateToUser(order.user.toString(), {
                orderId: order._id,
                status: status,
                message: `Your order status has been updated to ${status}`
            });
        } catch (socketError) {
            console.error('Failed to emit socket event:', socketError);
        }

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            data: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating order status',
            error: error.message
        });
    }
};


const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching my orders',
            error: error.message
        });
    }
};


const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }


        if (order.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to cancel this order'
            });
        }


        if (order.status === 'Cancelled' || order.status === 'Delivered') {
            return res.status(400).json({
                success: false,
                message: `Order is already ${order.status}`
            });
        }


        const orderTime = new Date(order.createdAt).getTime();
        const currentTime = Date.now();
        const timeDiff = (currentTime - orderTime) / 1000; // in seconds

        if (timeDiff > 60) {
            return res.status(400).json({
                success: false,
                message: 'Cancellation time exceeded (1 minute limit)'
            });
        }

        order.status = 'Cancelled';
        const updatedOrder = await order.save();

        res.status(200).json({
            success: true,
            message: 'Order cancelled successfully',
            data: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error cancelling order',
            error: error.message
        });
    }
};

/**
 * Admin Cancel Order
 * Allows admin to cancel any order with reason
 */
const cancelOrderByAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { cancelReason } = req.body;

        const order = await Order.findById(id).populate('user', 'name email');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Prevent cancelling already cancelled or delivered orders
        if (order.status === 'Cancelled') {
            return res.status(400).json({
                success: false,
                message: 'Order is already cancelled'
            });
        }

        if (order.status === 'Delivered') {
            return res.status(400).json({
                success: false,
                message: 'Cannot cancel delivered orders'
            });
        }

        // Update order status
        order.status = 'Cancelled';
        order.cancelledBy = 'Admin';
        order.cancelledAt = new Date();
        order.cancelReason = cancelReason || 'Cancelled by admin';

        const cancelledOrder = await order.save();

        // Send email to user
        try {
            await sendOrderCancelledEmail(order.user.email, {
                orderId: order._id,
                cancelledBy: 'Admin',
                cancelReason: cancelReason,
                userName: order.user.name
            });
        } catch (emailError) {
            console.error('Failed to send cancellation email:', emailError);
        }

        // Emit socket event to user
        try {
            emitOrderCancellation(order.user._id.toString(), {
                orderId: order._id,
                cancelledBy: 'Admin',
                cancelReason: cancelReason,
                message: 'Your order has been cancelled by admin'
            });
        } catch (socketError) {
            console.error('Failed to emit socket event:', socketError);
        }

        res.status(200).json({
            success: true,
            message: 'Order cancelled successfully',
            data: cancelledOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error cancelling order',
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    getMyOrders,
    cancelOrder,
    cancelOrderByAdmin,
};
