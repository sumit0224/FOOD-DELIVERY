const express = require('express');
const router = express.Router();
const {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
    getAllUsers
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Admin registration - Protected: Only existing admins can create new admins
router.post('/register', protect, adminOnly, registerAdmin);


router.post('/login', loginAdmin);


router.get('/profile', protect, adminOnly, getAdminProfile);


router.get('/users', protect, adminOnly, getAllUsers);

module.exports = router;
