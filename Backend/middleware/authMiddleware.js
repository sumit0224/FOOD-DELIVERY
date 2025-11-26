const jwt = require('jsonwebtoken');

// @desc    Verify JWT token and authenticate user
// @access  Middleware for protected routes
const protect = async (req, res, next) => {
    let token;

    // Check if token exists in Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header (format: "Bearer TOKEN")
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || 'your-secret-key'
            );

            // Add user info to request object
            req.user = {
                id: decoded.id,
                role: decoded.role
            };

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, token failed'
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token provided'
        });
    }
};

// @desc    Check if user is admin
// @access  Middleware for admin-only routes
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Access denied. Admin only.'
        });
    }
};

// @desc    Check if user is customer
// @access  Middleware for customer routes
const customerOnly = (req, res, next) => {
    if (req.user && req.user.role === 'customer') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Access denied. Customer only.'
        });
    }
};

module.exports = { protect, adminOnly, customerOnly };
