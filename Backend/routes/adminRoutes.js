const express = require('express');
const router = express.Router();
const {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
    getAllUsers
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// @route   POST /api/admin/register - Register new admin
router.post('/register', registerAdmin);

// @route   POST /api/admin/login - Login admin
router.post('/login', loginAdmin);

// @route   GET /api/admin/profile - Get admin profile (Protected)
router.get('/profile', protect, adminOnly, getAdminProfile);

// @route   GET /api/admin/users - Get all users (Admin only)
router.get('/users', protect, adminOnly, getAllUsers);

module.exports = router;
