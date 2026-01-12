const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

/**
 * Get user's cart with populated product details
 * @route GET /api/cart
 * @access Protected
 */
const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id }).populate(
            'items.product',
            'name price imageUrl description category'
        );

        // If no cart exists, create an empty one
        if (!cart) {
            cart = await Cart.create({
                user: req.user.id,
                items: [],
            });
        }

        res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching cart',
            error: error.message,
        });
    }
};

/**
 * Add item to cart or update quantity if already exists
 * @route POST /api/cart
 * @access Protected
 */
const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        // Validate input
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required',
            });
        }

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be at least 1',
            });
        }

        // Verify product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        // Find or create cart
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            // Create new cart with item
            cart = await Cart.create({
                user: req.user.id,
                items: [
                    {
                        product: productId,
                        quantity: quantity,
                        price: product.price,
                    },
                ],
            });
        } else {
            // Check if item already exists in cart
            const itemIndex = cart.items.findIndex(
                (item) => item.product.toString() === productId
            );

            if (itemIndex > -1) {
                // Update quantity of existing item
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Add new item to cart
                cart.items.push({
                    product: productId,
                    quantity: quantity,
                    price: product.price,
                });
            }

            await cart.save();
        }

        // Populate and return updated cart
        await cart.populate('items.product', 'name price imageUrl description category');

        res.status(200).json({
            success: true,
            message: 'Item added to cart',
            data: cart,
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding item to cart',
            error: error.message,
        });
    }
};

/**
 * Update cart item quantity
 * @route PUT /api/cart/:itemId
 * @access Protected
 */
const updateCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        // Validate quantity
        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be at least 1',
            });
        }

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
        }

        // Find and update item
        const item = cart.items.id(itemId);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart',
            });
        }

        item.quantity = quantity;
        await cart.save();

        // Populate and return updated cart
        await cart.populate('items.product', 'name price imageUrl description category');

        res.status(200).json({
            success: true,
            message: 'Cart item updated',
            data: cart,
        });
    } catch (error) {
        console.error('Update cart item error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating cart item',
            error: error.message,
        });
    }
};

/**
 * Remove item from cart
 * @route DELETE /api/cart/:itemId
 * @access Protected
 */
const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
        }

        // Remove item using pull (Mongoose method)
        cart.items.pull(itemId);
        await cart.save();

        // Populate and return updated cart
        await cart.populate('items.product', 'name price imageUrl description category');

        res.status(200).json({
            success: true,
            message: 'Item removed from cart',
            data: cart,
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Error removing item from cart',
            error: error.message,
        });
    }
};

/**
 * Clear entire cart
 * @route DELETE /api/cart
 * @access Protected
 */
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Cart cleared successfully',
            data: cart,
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Error clearing cart',
            error: error.message,
        });
    }
};

/**
 * Sync local cart (from localStorage) to backend after login
 * @route POST /api/cart/sync
 * @access Protected
 */
const syncCart = async (req, res) => {
    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid cart items',
            });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user.id,
                items: [],
            });
        }

        // Merge local items with backend cart
        for (const localItem of items) {
            const product = await Product.findById(localItem._id);

            if (!product) continue; // Skip invalid products

            const existingItemIndex = cart.items.findIndex(
                (item) => item.product.toString() === localItem._id
            );

            if (existingItemIndex > -1) {
                // Increase quantity if item already exists
                cart.items[existingItemIndex].quantity += localItem.quantity;
            } else {
                // Add new item
                cart.items.push({
                    product: localItem._id,
                    quantity: localItem.quantity,
                    price: product.price,
                });
            }
        }

        await cart.save();
        await cart.populate('items.product', 'name price imageUrl description category');

        res.status(200).json({
            success: true,
            message: 'Cart synced successfully',
            data: cart,
        });
    } catch (error) {
        console.error('Sync cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Error syncing cart',
            error: error.message,
        });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    syncCart,
};
