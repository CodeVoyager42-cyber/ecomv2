import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../utils/storage"; // make sure this import is correct

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    return storage.get("cart") || [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    storage.set("cart", cart);
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);

    // Show toast notification
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 1000,
      theme: "colored",
       style: {
        backgroundColor: "#af7640ff",
        color: "#fff",
        borderLeft: "5px solid #ef4444",
        fontWeight: "500",
      },
    });
  };

  // Delete product from cart
  const deleteFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.info(`Product removed from cart`, {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: {
        backgroundColor: "#1f2937",
        color: "#fff",
        borderLeft: "5px solid #ef4444",
        fontWeight: "500",
      },
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
