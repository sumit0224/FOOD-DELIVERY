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


router.post('/register', registerUser);


router.post('/login', loginUser);


router.post('/logout', logoutUser);


router.post('/forgot-password', forgotPassword);


router.post('/verify-otp', verifyOtp);


router.post('/reset-password', resetPassword);


router.get('/profile', protect, customerOnly, getUserProfile);


router.put('/profile', protect, customerOnly, updateUserProfile);


router.get('/', protect, adminOnly, getAllUsers);

module.exports = router;
