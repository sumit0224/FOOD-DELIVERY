import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const token = localStorage.getItem('token');
    // In a real app, you'd decode the token to check for "role: admin"
    // For this simple implementation, we'll just check if a token exists.
    // Ideally, you should have a separate 'adminToken' or check user role from profile.

    // Checking if it's an admin route, we might want to check a specific admin requirement
    // But for now, we'll assume any valid token is enough or just check existence.

    /*
   * Added role-based check.
   */
    const role = localStorage.getItem('role');

    if (!token) {
        return <Navigate to={adminOnly ? "/admin" : "/login"} replace />;
    }

    if (adminOnly && role !== 'admin') {
        return <Navigate to="/dashboard" replace />; // Redirect non-admins to user dashboard
    } // If checking for user-only routes, you could add: else if (!adminOnly && role === 'admin') ...  }

    return children;
};

export default ProtectedRoute;
