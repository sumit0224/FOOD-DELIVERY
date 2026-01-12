/**
 * Socket.IO Manager
 * Handles real-time communication for order updates
 */

let io;
const userSockets = new Map(); // userId -> socketId
const adminSockets = new Set(); // Set of admin socketIds

/**
 * Initialize Socket.IO server
 * @param {Server} server - HTTP server instance
 * @returns {SocketIO} io instance
 */
const initializeSocket = (server) => {
    const socketIO = require('socket.io');

    io = socketIO(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log(`✅ Socket connected: ${socket.id}`);

        // User joins their personal room
        socket.on('joinUserRoom', (userId) => {
            if (userId) {
                socket.join(`user_${userId}`);
                userSockets.set(userId, socket.id);
                console.log(`👤 User ${userId} joined their room`);
            }
        });

        // Admin joins admin room
        socket.on('joinAdminRoom', () => {
            socket.join('admin_room');
            adminSockets.add(socket.id);
            console.log(`👨‍💼 Admin joined admin room`);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`❌ Socket disconnected: ${socket.id}`);

            // Remove from user sockets
            for (const [userId, socketId] of userSockets.entries()) {
                if (socketId === socket.id) {
                    userSockets.delete(userId);
                    console.log(`User ${userId} disconnected`);
                    break;
                }
            }

            // Remove from admin sockets
            adminSockets.delete(socket.id);
        });
    });

    return io;
};

/**
 * Get Socket.IO instance
 * @returns {SocketIO} io instance
 */
const getIO = () => {
    if (!io) {
        throw new Error('Socket.IO not initialized!');
    }
    return io;
};

/**
 * Emit new order event to admin
 * @param {Object} order - Order object
 */
const emitNewOrderToAdmin = (order) => {
    if (io) {
        io.to('admin_room').emit('orderCreated', {
            order,
            message: 'New order received!',
            timestamp: new Date(),
        });
        console.log(`🔔 New order ${order._id} emitted to admin`);
    }
};

/**
 * Emit order status update to user
 * @param {String} userId - User ID
 * @param {Object} data - Update data {orderId, status, message}
 */
const emitOrderUpdateToUser = (userId, data) => {
    if (io) {
        io.to(`user_${userId}`).emit('orderUpdated', {
            ...data,
            timestamp: new Date(),
        });
        console.log(`🔔 Order ${data.orderId} update emitted to user ${userId}`);
    }
};

/**
 * Emit order cancellation to user
 * @param {String} userId - User ID
 * @param {Object} data - Cancellation data {orderId, cancelledBy, reason}
 */
const emitOrderCancellation = (userId, data) => {
    if (io) {
        io.to(`user_${userId}`).emit('orderCancelled', {
            ...data,
            timestamp: new Date(),
        });
        console.log(`🔔 Order ${data.orderId} cancellation emitted to user ${userId}`);
    }
};

/**
 * Emit order status update to admin (for their dashboard)
 * @param {Object} data - Update data
 */
const emitOrderUpdateToAdmin = (data) => {
    if (io) {
        io.to('admin_room').emit('orderStatusChanged', {
            ...data,
            timestamp: new Date(),
        });
        console.log(`🔔 Order ${data.orderId} status update emitted to admin`);
    }
};

module.exports = {
    initializeSocket,
    getIO,
    emitNewOrderToAdmin,
    emitOrderUpdateToUser,
    emitOrderCancellation,
    emitOrderUpdateToAdmin,
};
