import React from 'react'
import Home from './Pages/Home'
import SignUp from './Pages/signup/SignUp'
import Loging from './Pages/Login/Loging'
import Dashboard from './Pages/dashboard/Dashboard'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Router>  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Loging />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App