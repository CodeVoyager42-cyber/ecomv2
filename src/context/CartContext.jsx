import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

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
   const deleteFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.info(`Product removed from cart`, {
      position: "top-right",
      autoClose: 1000,
      theme: "colored",
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, deleteFromCart  }}>
      {children}
    </CartContext.Provider>
  );
};
 