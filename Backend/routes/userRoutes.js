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
const { otpRateLimit } = require('../middleware/rateLimitMiddleware');


router.post('/register', registerUser);


router.post('/login', loginUser);


router.post('/logout', logoutUser);


// Forgot password (rate limited)
router.post('/forgot-password', otpRateLimit, forgotPassword);

// Verify OTP (rate limited)
router.post('/verify-otp', otpRateLimit, verifyOtp);

// Reset password
router.post('/reset-password', resetPassword);


router.get('/profile', protect, customerOnly, getUserProfile);


router.put('/profile', protect, customerOnly, updateUserProfile);


router.get('/', protect, adminOnly, getAllUsers);

module.exports = router;
