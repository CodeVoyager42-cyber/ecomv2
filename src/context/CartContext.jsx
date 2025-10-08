<<<<<<< HEAD
import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../utils/storage"; // make sure this import is correct
=======
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
<<<<<<< HEAD
  // Load cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    return storage.get("cart") || [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    storage.set("cart", cart);
  }, [cart]);
=======
  const [cart, setCart] = useState([]);
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);

    // ✅ Show toast notification
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 1000,
      theme: "colored",
    });
  };
<<<<<<< HEAD

  // Delete product from cart
  const deleteFromCart = (productId) => {
=======
   const deleteFromCart = (productId) => {
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.info(`Product removed from cart`, {
      position: "top-right",
      autoClose: 1000,
      theme: "colored",
    });
  };

  return (
<<<<<<< HEAD
    <CartContext.Provider value={{ cart, addToCart, deleteFromCart }}>
=======
    <CartContext.Provider value={{ cart, addToCart, deleteFromCart  }}>
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a
      {children}
    </CartContext.Provider>
  );
};
<<<<<<< HEAD
=======
 
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a
