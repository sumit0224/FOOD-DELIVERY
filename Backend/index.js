const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');

// Import routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

//connect database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Test route
app.get('/', (req, res) => {
    res.json({
        message: "Food Delivery API is running",
        version: "2.0.0",
        endpoints: {
            products: "/api/products",
            orders: "/api/orders",
            users: "/api/users",
            admin: "/api/admin"
        }
    })
})

// API Routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/orders', orderRoutes); // Order routes
app.use('/api/users', userRoutes); // User authentication routes
app.use('/api/admin', adminRoutes); // Admin authentication routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
})
