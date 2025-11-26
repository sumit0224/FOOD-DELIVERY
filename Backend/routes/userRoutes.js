const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
} = require('../controllers/userController');
const { protect, customerOnly } = require('../middleware/authMiddleware');

// @route   POST /api/users/register - Register new user
router.post('/register', registerUser);

// @route   POST /api/users/login - Login user
router.post('/login', loginUser);

// @route   GET /api/users/profile - Get user profile (Protected)
router.get('/profile', protect, customerOnly, getUserProfile);

// @route   PUT /api/users/profile - Update user profile (Protected)
router.put('/profile', protect, customerOnly, updateUserProfile);

module.exports = router;
