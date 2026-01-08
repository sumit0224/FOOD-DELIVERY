const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    logoutUser,
    forgotPassword,
    verifyOtp,
    resetPassword,
    getAllUsers
} = require('../controllers/userController');
const { protect, customerOnly, adminOnly } = require('../middleware/authMiddleware');

// @route   POST /api/users/register - Register new user
router.post('/register', registerUser);

// @route   POST /api/users/login - Login user
router.post('/login', loginUser);

// @route   POST /api/users/logout - Logout user
router.post('/logout', logoutUser);

// @route   POST /api/users/forgot-password - Send OTP
router.post('/forgot-password', forgotPassword);

// @route   POST /api/users/verify-otp - Verify OTP
router.post('/verify-otp', verifyOtp);

// @route   POST /api/users/reset-password - Reset Password
router.post('/reset-password', resetPassword);

// @route   GET /api/users/profile - Get user profile (Protected)
router.get('/profile', protect, customerOnly, getUserProfile);

// @route   PUT /api/users/profile - Update user profile (Protected)
router.put('/profile', protect, customerOnly, updateUserProfile);

// @route   GET /api/users - Get all users (Admin only)
router.get('/', protect, adminOnly, getAllUsers);

module.exports = router;
