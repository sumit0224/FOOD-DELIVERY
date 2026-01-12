# 🍕 Food Delivery Platform

A full-stack food delivery application built with **React**, **Node.js**, **Express**, and **MongoDB** featuring real-time order tracking, user authentication, admin management, and secure payment processing.

![Food Delivery Banner](https://via.placeholder.com/1200x400/FF5200/FFFFFF?text=Food+Delivery+Platform)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Demo](#-demo)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🛒 Customer Features
- **User Authentication & Authorization**
  - Secure JWT-based authentication
  - Email/password registration and login
  - Password reset with OTP via email
  - Protected routes for authenticated users

- **Product Browsing & Ordering**
  - Browse food items with images and descriptions
  - Search and filter products
  - Add items to cart (requires authentication)
  - Real-time cart synchronization
  - Seamless checkout process

- **Cart Management**
  - User-scoped shopping cart
  - Persistent cart across sessions
  - Automatic cart sync on login
  - Update quantities and remove items
  - LocalStorage fallback for guest users

- **Order Management**
  - Place orders with shipping details
  - Real-time order status updates (Socket.IO)
  - View order history on dashboard
  - Track order status (Pending → Processing → Shipped → Delivered)
  - Cancel orders within time limit

- **Real-Time Notifications**
  - Instant order status updates without page refresh
  - Live notifications for order changes
  - Email notifications for order cancellations

### 👨‍💼 Admin Features
- **Secure Admin Portal**
  - Admin-only authentication
  - Protected admin routes
  - Only existing admins can create new admins

- **Product Management**
  - Create, read, update, and delete products
  - Upload product images
  - Manage product inventory and pricing
  - Category management

- **Order Management**
  - View all customer orders
  - Update order status in real-time
  - Cancel orders with reason
  - Full order details with customer information
  - Mobile-responsive order dashboard

- **User Management**
  - View all registered users
  - User activity monitoring
  - Customer information access

- **Email Notifications**
  - Automatic email on new orders
  - Beautiful HTML email templates
  - Order cancellation notifications to users

- **Real-Time Admin Dashboard**
  - Live order notifications via Socket.IO
  - Instant updates when new orders arrive
  - Real-time status synchronization

### 🔐 Security Features
- **Authentication & Authorization**
  - JWT token-based authentication
  - Bcrypt password hashing
  - Protected API endpoints
  - Role-based access control (Customer/Admin)

- **OTP System**
  - 6-digit OTP for password reset
  - OTP hashing with bcrypt
  - 10-minute expiry
  - Rate limiting (3 requests per 15 minutes)

- **Admin Security**
  - Admin registration requires existing admin authentication
  - Audit trail for admin account creation
  - No public admin signup

- **Cart Security**
  - User-scoped cart isolation
  - Server-side cart validation
  - Secure cart operations

---

## 🛠️ Tech Stack

### Frontend
- **React** (v18+) - UI library
- **React Router** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication
- **React Icons** - Icon library
- **Tailwind CSS** - Styling (via CDN)
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Socket.IO** - WebSocket library for real-time features
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Express Rate Limit** - API rate limiting
- **Cookie Parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

---

## 🎬 Demo

### Customer Flow
1. **Browse Products** → Add to cart → Login (if not authenticated)
2. **Cart syncs** automatically after login
3. **Checkout** → Enter shipping details
4. **Place Order** → Receive confirmation
5. **Track Order** in real-time on dashboard

### Admin Flow
1. **Admin Login** (secure portal)
2. **View New Orders** → Receive email notification
3. **Update Order Status** → Customer notified in real-time
4. **Manage Products** → Add/Edit/Delete items
5. **Cancel Orders** → User receives cancellation email

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**
- **Gmail account** (for email notifications)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/food-delivery.git
cd food-delivery
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_gmail_address
EMAIL_PASSWORD=your_gmail_app_password
```

**Gmail Setup for Email Service:**
1. Enable 2-Factor Authentication on your Google Account
2. Generate an [App-Specific Password](https://myaccount.google.com/apppasswords)
3. Use the generated password in `EMAIL_PASSWORD`

Start the backend server:
```bash
npm start
```
Server runs on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```

Start the development server:
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

### 4. Create First Admin Account

**Option 1: Direct Database Insert**
```javascript
// Using MongoDB shell or Compass
db.admins.insertOne({
  name: "Super Admin",
  email: "admin@fooddelivery.com",
  password: "$2b$10$hashed_password_here",  // Use bcrypt.hash('password', 10)
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**Option 2: Using API (Bootstrap Route)**
```bash
# Create temporary bootstrap route for first admin only
# See admin_security.md for detailed instructions
```

---

## 🔧 Environment Variables

### Backend `.env`
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/food-delivery` |
| `JWT_SECRET` | Secret key for JWT | `your-secret-key-here` |
| `EMAIL_USER` | Gmail address for notifications | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app-specific password | `your-app-password` |

---

## 📁 Project Structure

```
FOOD-DELIVERY/
│
├── Backend/                    # Backend API
│   ├── config/                 # Configuration files
│   │   └── db.js              # MongoDB connection
│   ├── controllers/            # Route controllers
│   │   ├── adminController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/             # Custom middleware
│   │   ├── authMiddleware.js  # JWT authentication
│   │   └── rateLimitMiddleware.js
│   ├── models/                 # Mongoose schemas
│   │   ├── adminModel.js
│   │   ├── cartModel.js
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/                 # API routes
│   │   ├── adminRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── services/               # Business logic services
│   │   └── emailService.js    # Nodemailer email service
│   ├── socket/                 # Socket.IO configuration
│   │   └── socketManager.js   # Real-time event manager
│   ├── .env                    # Environment variables
│   ├── index.js               # Entry point
│   └── package.json
│
├── Frontend/                   # React Frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── api/               # API client
│   │   │   ├── api.js         # Axios instance
│   │   │   └── cartApi.js     # Cart API calls
│   │   ├── components/        # Reusable components
│   │   │   ├── Auth/
│   │   │   │   └── AuthModal.jsx
│   │   │   ├── Layout/
│   │   │   │   └── Layout.jsx
│   │   │   ├── LoginModal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/           # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   └── SocketContext.jsx
│   │   ├── Pages/             # Page components
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.jsx      # User dashboard
│   │   │   │   ├── AdminDash.jsx      # Admin dashboard
│   │   │   │   ├── AdminOrders.jsx    # Order management
│   │   │   │   ├── AdminProducts.jsx
│   │   │   │   └── AdminUsers.jsx
│   │   │   ├── Login/
│   │   │   │   └── AdminLogin.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Menu.jsx
│   │   ├── App.jsx            # Main app component
│   │   ├── index.css          # Global styles
│   │   └── main.jsx           # Entry point
│   ├── .env                    # Environment variables
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md                   # This file
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

#### Login User
```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Forgot Password
```http
POST /users/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Verify OTP
```http
POST /users/verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### Reset Password
```http
POST /users/reset-password
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "newpassword123"
}
```

---

### Product Endpoints

#### Get All Products
```http
GET /products
```

#### Get Product by ID
```http
GET /products/:id
```

#### Create Product (Admin Only)
```http
POST /products
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "Margherita Pizza",
  "description": "Classic pizza with tomato and mozzarella",
  "price": 299,
  "category": "Pizza",
  "imageUrl": "https://example.com/pizza.jpg"
}
```

#### Update Product (Admin Only)
```http
PUT /products/:id
Authorization: Bearer {admin_token}
```

#### Delete Product (Admin Only)
```http
DELETE /products/:id
Authorization: Bearer {admin_token}
```

---

### Cart Endpoints (Protected)

#### Get User Cart
```http
GET /cart
Authorization: Bearer {user_token}
```

#### Add to Cart
```http
POST /cart
Authorization: Bearer {user_token}
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 2,
  "price": 299
}
```

#### Update Cart Item
```http
PUT /cart/:itemId
Authorization: Bearer {user_token}
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove from Cart
```http
DELETE /cart/:itemId
Authorization: Bearer {user_token}
```

#### Clear Cart
```http
DELETE /cart
Authorization: Bearer {user_token}
```

#### Sync Cart (After Login)
```http
POST /cart/sync
Authorization: Bearer {user_token}
Content-Type: application/json

{
  "cartItems": [
    {
      "product": "product_id",
      "quantity": 2,
      "price": 299
    }
  ]
}
```

---

### Order Endpoints

#### Create Order (Protected)
```http
POST /orders
Authorization: Bearer {user_token}
Content-Type: application/json

{
  "orderItems": [
    {
      "name": "Pizza",
      "quantity": 2,
      "price": 299,
      "product": "product_id"
    }
  ],
  "shippingAddress": {
    "address": "123 Main St",
    "city": "Mumbai",
    "postalCode": "400001"
  },
  "paymentMethod": "Cash on Delivery",
  "itemsPrice": 598
}
```

#### Get My Orders (Protected)
```http
GET /orders/myorders
Authorization: Bearer {user_token}
```

#### Get All Orders (Admin Only)
```http
GET /orders
Authorization: Bearer {admin_token}
```

#### Update Order Status (Admin Only)
```http
PUT /orders/:id/status
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "Processing"
}
```

#### Cancel Order (Admin Only)
```http
DELETE /orders/:id/cancel
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "cancelReason": "Out of stock"
}
```

---

### Admin Endpoints

#### Admin Login
```http
POST /admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "adminpass"
}
```

#### Create Admin (Admin Only)
```http
POST /admin/register
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "New Admin",
  "email": "newadmin@example.com",
  "password": "securepass"
}
```

#### Get All Users (Admin Only)
```http
GET /admin/users
Authorization: Bearer {admin_token}
```

---

## 🔌 Socket.IO Events

### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `joinUserRoom` | `userId` | User joins their personal room for order updates |
| `joinAdminRoom` | - | Admin joins admin room for new order notifications |

### Server → Client

| Event | Recipients | Payload | Description |
|-------|-----------|---------|-------------|
| `orderCreated` | Admins | `{order, message, timestamp}` | New order received |
| `orderUpdated` | User | `{orderId, status, message, timestamp}` | Order status changed |
| `orderCancelled` | User | `{orderId, cancelledBy, cancelReason, message, timestamp}` | Order cancelled |

---

## 📸 Screenshots

### Customer Pages

#### Home Page
*Browse featured products and categories*
![Home Page](screenshots/home_page.png)

#### Menu Page
*View all available food items*
![Menu Page](screenshots/menu_page.png)

#### Cart Page
*Review items before checkout*
![Cart](screenshots/cart_page.png)

#### Checkout Page
*Enter shipping details and payment method*
![Checkout](screenshots/checkout_page.png)

#### User Dashboard
*Track order status in real-time*
![User Dashboard](screenshots/user_dashboard.png)

#### Forgot Password Flow
*Password reset with OTP verification*
![Forgot Password](screenshots/forgot_password.png)

---

### Admin Pages

#### Admin Login
*Secure admin authentication*
![Admin Login](screenshots/admin_login.png)

#### Admin Dashboard
*Overview of orders and statistics*
![Admin Dashboard](screenshots/admin_dashboard.png)

#### Order Management
*Manage all customer orders (Desktop & Mobile)*
![Order Management Desktop](screenshots/admin_orders_desktop.png)
![Order Management Mobile](screenshots/admin_orders_mobile.png)

#### Product Management
*Add, edit, and delete products*
![Product Management](screenshots/admin_products.png)

#### User Management
*View all registered users*
![User Management](screenshots/admin_users.png)

---

### Email Notifications

#### Admin Order Notification
*Email sent to admin on new order*
![Admin Email](screenshots/admin_email.png)

#### User Cancellation Email
*Email sent to user when order is cancelled*
![Cancellation Email](screenshots/cancellation_email.png)

---

## 🎯 Key Features Highlights

### 1. Real-Time Order Tracking
- **Socket.IO** integration for instant updates
- No page refresh needed
- Live status changes visible to users and admins

### 2. Secure Authentication
- JWT tokens with 30-day expiry
- Bcrypt password hashing (10 rounds)
- Protected routes for customers and admins
- Role-based access control

### 3. Smart Cart System
- **User-scoped carts** - each user has independent cart
- **LocalStorage fallback** for unauthenticated users
- **Automatic sync** - guest cart merges with user cart on login
- **Persistent storage** - cart survives page refresh and logout/login

### 4. Email Notifications
- **Beautiful HTML templates** with inline CSS
- **Admin notifications** on every new order
- **User notifications** for order cancellations
- **Nodemailer** with Gmail SMTP

### 5. Admin Security
- Only existing admins can create new admins
- No public admin registration
- Audit trail logging
- Protected admin routes

### 6. Mobile Responsive
- Fully responsive design
- Mobile-friendly admin panel
- Touch-optimized UI elements
- Hamburger menu for mobile navigation

---

## 🧪 Testing

### Manual Testing Checklist

**Customer Flow:**
- [ ] Register new account
- [ ] Login with credentials
- [ ] Browse products
- [ ] Add items to cart (triggers login if not authenticated)
- [ ] Update cart quantities
- [ ] Remove items from cart
- [ ] Proceed to checkout
- [ ] Place order
- [ ] View order in dashboard
- [ ] Receive real-time order updates
- [ ] Test password reset flow

**Admin Flow:**
- [ ] Admin login
- [ ] Create new product
- [ ] Edit existing product
- [ ] Delete product
- [ ] View all orders
- [ ] Update order status
- [ ] Cancel order (user receives email)
- [ ] Create new admin account
- [ ] View all users

**Real-Time Features:**
- [ ] Place order → Admin receives notification
- [ ] Admin updates status → User sees update instantly
- [ ] Admin cancels order → User receives email & live update

---

## 🐛 Known Issues & Limitations

- Email service requires Gmail SMTP (can be configured for other providers)
- Rate limiting is in-memory (resets on server restart)
- OTP is logged to console in development mode
- Admin registration requires manual first admin creation

---

## 🚀 Future Enhancements

- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Order tracking map with delivery person location
- [ ] Customer reviews and ratings
- [ ] Discount codes and promotions
- [ ] Restaurant/vendor multi-tenant system
- [ ] Push notifications for mobile apps
- [ ] Advanced analytics dashboard
- [ ] SMS OTP as alternative to email
- [ ] Wishlist functionality
- [ ] Order scheduling (pre-order for later)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style
- Use ESLint configuration provided
- Follow React best practices
- Write clean, commented code
- Test your changes thoroughly

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- React.js team for amazing framework
- Swiggy for UI inspiration
- Socket.IO for real-time features
- MongoDB team for excellent database
- All contributors and testers

---

## 📧 Contact & Support

- **Email**: your-email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Issues**: [GitHub Issues](https://github.com/yourusername/food-delivery/issues)

---

## ⭐ Show Your Support

If you like this project, please give it a ⭐️ on GitHub!

---

<div align="center">
  
### Made with ❤️ and 🍕

**Happy Coding!** 🚀

</div>
