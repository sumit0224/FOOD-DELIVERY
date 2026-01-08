import React from 'react'
import Home from './Pages/Home'
import SignUp from './Pages/signup/SignUp'
import Loging from './Pages/Login/Loging'
import Dashboard from './Pages/dashboard/Dashboard'
import AdminLogin from "./Pages/Login/AdminLogin"
import AdminSignup from "./Pages/signup/adminSignup"
import AdminDashboard from "./Pages/dashboard/AdminDash"
import CreateProduct from "./Pages/dashboard/CreateProduct"
import AdminProducts from "./Pages/dashboard/AdminProducts"
import EditProduct from "./Pages/dashboard/EditProduct"
import Cart from "./Pages/Cart"
import Checkout from "./Pages/Checkout"
import ForgotPassword from "./Pages/Login/ForgotPassword"
import ResetPassword from "./Pages/Login/ResetPassword"
import AdminUsers from "./Pages/dashboard/AdminUsers"

import { CartProvider } from "./context/CartContext"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Loging />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/create-product" element={<CreateProduct />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App