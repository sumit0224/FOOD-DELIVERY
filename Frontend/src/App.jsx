
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Layout */
import Layout from "./components/Layout/Layout";

/* Public Pages */
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";

/* Auth Pages */
import ForgotPassword from "./Pages/Login/ForgotPassword";
import ResetPassword from "./Pages/Login/ResetPassword";
import AdminLogin from "./Pages/Login/AdminLogin";
import AdminSignup from "./Pages/signup/adminSignup";

/* User Pages */
import Dashboard from "./Pages/dashboard/Dashboard";
import Checkout from "./Pages/Checkout";

/* Admin Pages */
import AdminDashboard from "./Pages/dashboard/AdminDash";
import AdminProducts from "./Pages/dashboard/AdminProducts";
import CreateProduct from "./Pages/dashboard/CreateProduct";
import EditProduct from "./Pages/dashboard/EditProduct";
import AdminUsers from "./Pages/dashboard/AdminUsers";
import AdminOrders from "./Pages/dashboard/AdminOrders";

/* Protection */
import ProtectedRoute from "./components/ProtectedRoute";

/* Context */
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>

            {/* ================= PUBLIC ROUTES ================= */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* ================= USER PROTECTED ROUTES ================= */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>

            {/* ================= ADMIN AUTH ================= */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-signup" element={<AdminSignup />} />

            {/* ================= ADMIN PROTECTED ROUTES ================= */}
            <Route element={<ProtectedRoute adminOnly />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/create-product" element={<CreateProduct />} />
              <Route path="/admin/edit-product/:id" element={<EditProduct />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
            </Route>

          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
