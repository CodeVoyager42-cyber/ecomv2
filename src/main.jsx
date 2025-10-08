import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
 

ReactDOM.createRoot(document.getElementById("root")).render(
<<<<<<< HEAD
 
=======
  <React.StrictMode>
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a
    <CartProvider>
      <App />
      {/* Toast notifications container */}
      <ToastContainer />
    </CartProvider>
<<<<<<< HEAD
 
=======
  </React.StrictMode>
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a
);
