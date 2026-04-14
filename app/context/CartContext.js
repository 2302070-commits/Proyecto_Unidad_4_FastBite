import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error loading cart data', error);
      } finally {
        setIsCartLoaded(true);
      }
    };
    loadCartData();
  }, []);

  const updateCartAndStorage = async (newCart) => {
    setCart(newCart);
    try {
        await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    } catch (e) {
        console.error('Error saving cart', e);
    }
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.idMeal === product.idMeal);
    let newCart;
    if (existing) {
      newCart = cart.map((item) =>
        item.idMeal === product.idMeal ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1, price: product.rescuePrice || product.recipeCost || (Math.floor(Math.random() * 80) + 120) }];
    }
    updateCartAndStorage(newCart);
  };

  const removeFromCart = (idMeal) => {
    const newCart = cart.filter((item) => item.idMeal !== idMeal);
    updateCartAndStorage(newCart);
  };

  const clearCart = () => {
    updateCartAndStorage([]);
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total, isCartLoaded }}>
      {children}
    </CartContext.Provider>
  );
};
