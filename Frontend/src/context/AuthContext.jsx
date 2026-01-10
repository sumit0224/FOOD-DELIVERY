import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= INITIAL AUTH CHECK ================= */
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      // 🔹 Restore user instantly (prevents flicker)
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // 🔹 Single source of truth → backend decides role
        const res = await api.get("users/profile");

        const userData = res.data?.user || res.data?.data;

        if (userData) {
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (err) {
        console.error("Auth init failed:", err);

        // 🔥 Logout ONLY if token is invalid
        if (err.response?.status === 401) {
          clearAuth();
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /* ================= AUTH ACTIONS ================= */

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const logout = () => {
    clearAuth();
  };

  const updateUser = (data) => {
    setUser((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  /* ================= DERIVED STATE ================= */
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
