import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Fetch cart whenever user logs in or mounts
  const fetchCart = async () => {
    if (!user) {
      setCart({ items: [] });
      return;
    }
    try {
      setLoading(true);
      const data = await api.get('/cart');
      setCart(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      showToast('Please log in to add items to your cart', 'error');
      return false;
    }
    try {
      setLoading(true);
      const updatedCart = await api.post('/cart', { productId, quantity });
      setCart(updatedCart);
      showToast('Item added to cart successfully!');
      return true;
    } catch (err) {
      showToast(err.message, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) return;
    try {
      setLoading(true);
      const updatedCart = await api.put(`/cart/${productId}`, { quantity });
      setCart(updatedCart);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    try {
      setLoading(true);
      const updatedCart = await api.delete(`/cart/${productId}`);
      setCart(updatedCart);
      showToast('Item removed from cart', 'info');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      setLoading(true);
      await api.delete('/cart');
      setCart({ items: [] });
      showToast('Cart cleared', 'info');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Calculations
  const itemsCount = cart.items ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const subtotal = cart.items
    ? cart.items.reduce((sum, item) => sum + (item.product ? item.product.price * item.quantity : 0), 0)
    : 0;
  const shipping = itemsCount > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        itemsCount,
        subtotal,
        shipping,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
