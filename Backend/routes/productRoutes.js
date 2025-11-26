const express = require('express');
const router = express.Router();
const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// @route   POST /api/products - Add new product (Admin)
router.post('/', addProduct);

// @route   GET /api/products - Get all products (Public)
router.get('/', getAllProducts);

// @route   GET /api/products/:id - Get product by ID (Public)
router.get('/:id', getProductById);

// @route   PUT /api/products/:id - Update product (Admin)
router.put('/:id', updateProduct);

// @route   DELETE /api/products/:id - Delete product (Admin)
router.delete('/:id', deleteProduct);

module.exports = router;
