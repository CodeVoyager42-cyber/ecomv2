import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { toast, type ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../utils/storage.ts";

// ✅ Define the product interface
export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

// ✅ Define the context type
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  deleteFromCart: (productId: number) => void;
}

// ✅ Create the context (export it so other components can import it)
export const CartContext = createContext<CartContextType | undefined>(undefined);

// ✅ Props type for provider
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>(() => storage.get("cart") || []);

  useEffect(() => {
    storage.set("cart", cart);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);

    const toastOptions: ToastOptions = {
      position: "top-right",
      autoClose: 1000,
      theme: "colored",
      style: {
        backgroundColor: "#af7640",
        color: "#fff",
        borderLeft: "5px solid #ef4444",
        fontWeight: "500",
      },
    };

    toast.success(`${product.name} added to cart!`, toastOptions);
  };

  const deleteFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));

    const toastOptions: ToastOptions = {
      position: "top-right",
      autoClose: 1000,
      theme: "colored",
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      style: {
        backgroundColor: "#1f2937",
        color: "#fff",
        borderLeft: "5px solid #ef4444",
        fontWeight: "500",
      },
    };

    toast.info("Product removed from cart", toastOptions);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
