import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import * as cartApi from "../api/cartApi";

const CartContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);

  /* ================= FETCH CART FROM BACKEND ================= */
  const fetchCart = async () => {
    if (!isAuthenticated) {
      // Load from localStorage for non-authenticated users
      const localData = localStorage.getItem("cartItems");
      setCartItems(localData ? JSON.parse(localData) : []);
      return;
    }

    try {
      setLoading(true);
      const response = await cartApi.getCart();
      if (response.success && response.data) {
        // Transform backend cart items to match frontend structure
        const items = response.data.items.map((item) => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          imageUrl: item.product.imageUrl,
          description: item.product.description,
          category: item.product.category,
          quantity: item.quantity,
          cartItemId: item._id, // Backend cart item ID for updates/deletes
        }));
        setCartItems(items);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOAD CART ON MOUNT AND AUTH CHANGE ================= */
  useEffect(() => {
    fetchCart();
  }, [isAuthenticated, user]);

  /* ================= SYNC LOCAL CART AFTER LOGIN ================= */
  useEffect(() => {
    const syncLocalCart = async () => {
      if (!isAuthenticated) return;

      const localData = localStorage.getItem("cartItems");
      if (!localData) return;

      const localItems = JSON.parse(localData);
      if (localItems.length === 0) return;

      try {
        await cartApi.syncCart(localItems);
        localStorage.removeItem("cartItems"); // Clear local cart after sync
        await fetchCart(); // Refresh cart from backend
      } catch (error) {
        console.error("Error syncing cart:", error);
      }
    };

    syncLocalCart();
  }, [isAuthenticated]);

  /* ================= PERSIST CART FOR NON-AUTH USERS ================= */
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  /* ================= ACTIONS ================= */
  const addToCart = async (product) => {
    // Check authentication
    if (!isAuthenticated) {
      setPendingProduct(product);
      setShowLoginModal(true);
      return;
    }

    try {
      setLoading(true);
      const response = await cartApi.addToCart(product._id, 1);
      if (response.success) {
        await fetchCart(); // Refresh cart from backend
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id) => {
    if (!isAuthenticated) {
      // Local cart removal
      setCartItems((prev) => prev.filter((item) => item._id !== id));
      return;
    }

    try {
      setLoading(true);
      const item = cartItems.find((i) => i._id === id);
      if (item && item.cartItemId) {
        await cartApi.removeFromCart(item.cartItemId);
        await fetchCart();
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      alert("Failed to remove item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    if (!isAuthenticated) {
      // Local cart update
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity } : item
        )
      );
      return;
    }

    try {
      setLoading(true);
      const item = cartItems.find((i) => i._id === id);
      if (item && item.cartItemId) {
        await cartApi.updateCartItem(item.cartItemId, quantity);
        await fetchCart();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      // Local cart clear
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);
      await cartApi.clearCart();
      await fetchCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("Failed to clear cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    setPendingProduct(null);
  };

  const handleLoginSuccess = async () => {
    setShowLoginModal(false);
    if (pendingProduct) {
      // Add the pending product after successful login
      setTimeout(async () => {
        await addToCart(pendingProduct);
        setPendingProduct(null);
      }, 500);
    }
  };

  /* ================= DERIVED VALUES ================= */
  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        loading,
        showLoginModal,
        handleLoginModalClose,
        handleLoginSuccess,
        pendingProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
