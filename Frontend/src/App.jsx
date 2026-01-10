import React from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout/Layout'
import Home from './Pages/Home'
import Menu from './Pages/Menu'
import About from './Pages/About'
import Contact from './Pages/Contact'
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
import AdminOrders from "./Pages/dashboard/AdminOrders"
import Footer from "./components/Footer"

import { CartProvider } from "./context/CartContext"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-signup" element={<AdminSignup />} />


          <Route path="/admin-dashboard" element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute adminOnly={true}>
              <AdminProducts />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute adminOnly={true}>
              <AdminUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/create-product" element={
            <ProtectedRoute adminOnly={true}>
              <CreateProduct />
            </ProtectedRoute>
          } />
          <Route path="/admin/edit-product/:id" element={
            <ProtectedRoute adminOnly={true}>
              <EditProduct />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute adminOnly={true}>
              <AdminOrders />
            </ProtectedRoute>
          } />
        </Routes>

      </Router>
    </CartProvider>
  )
}

export default App