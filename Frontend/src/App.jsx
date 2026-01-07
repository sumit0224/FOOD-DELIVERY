import React from 'react'
import Home from './Pages/Home'
import SignUp from './Pages/signup/SignUp'
import Loging from './Pages/Login/Loging'
import Dashboard from './Pages/dashboard/Dashboard'
import AdminLogin from "./Pages/Login/AdminLogin"
import AdminSignup from "./Pages/signup/adminSignup"
import AdminDashboard from "./Pages/dashboard/AdminDash"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Loging />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App