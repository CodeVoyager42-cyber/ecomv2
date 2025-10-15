import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ChangeEvent } from "react";
import { storage } from "../utils/storage.ts";
import { CartContext } from "../context/CartContext.tsx"; // ✅ runtime import
import type { Product } from "../context/CartContext.tsx"; // ✅ type-only import
import Footer from "../components/Footer.tsx";
 


interface SelectedSizes {
  [productId: number]: string;
}

const ProductsPage: React.FC = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) throw new Error("CartContext must be used within a CartProvider");

  const { cart, deleteFromCart } = cartContext;
  const [selectedSizes, setSelectedSizes] = useState<SelectedSizes>({});
  const navigate = useNavigate();

  // Load selected sizes from localStorage
  useEffect(() => {
    const savedSizes = storage.get("selectedSizes") as SelectedSizes | null;
    if (savedSizes) setSelectedSizes(savedSizes);
  }, []);

  // Save selected sizes whenever they change
  useEffect(() => {
    storage.set("selectedSizes", selectedSizes);
  }, [selectedSizes]);

  // Save cart whenever it changes
  useEffect(() => {
    storage.set("cart", cart);
  }, [cart]);

  const handleSizeChange = (productId: number, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <> 
    <div className="container mx-auto p-4 flex flex-col min-h-screen">
      <div className="flex justify-between items-center mb-4">
      {/* Navigation Links */}
      <Link to="/">
        <h1 className="text-lg font-semibold text-yellow-600 cursor-pointer hover:text-yellow-700 transition-colors">
          Home
        </h1>
      </Link>
      <Link to="/Contact">
        <h1 className="text-lg font-semibold text-yellow-600 cursor-pointer hover:text-yellow-700 transition-colors text-right">
          Contact
        </h1>
      </Link>
 </div>
      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="my-6 p-4 border rounded-lg bg-gray-50 shadow">
          <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
          <ul className="space-y-1">
            {cart.map((product) => (
              <li key={product.id} className="flex justify-between">
                <span>
                  {product.name}{" "}
                  {selectedSizes[product.id] && `(Size: ${selectedSizes[product.id]})`}
                </span>
                <span>${product.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Product Cards */}
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {cart.map((boot) => (
            <div
              key={boot.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col"
            >
              {/* Product Image */}
              <img
                src={boot.image}
                alt={boot.name}
                className="w-full h-64 object-cover rounded-md"
              />

              {/* Product Info */}
              <div className="mt-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{boot.name}</h2>
                <p className="text-gray-500 text-sm">{boot.description}</p>
                <p className="text-yellow-600 font-bold">${boot.price.toFixed(2)}</p>
                <p className="text-gray-700 text-sm">
                  Category: <span className="font-medium">{boot.category}</span>
                </p>

                {/* Size Dropdown */}
                <div className="mt-2">
                  <label className="text-gray-700 text-sm mr-2">Size:</label>
                  <select
                    value={selectedSizes[boot.id] || boot.size}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      handleSizeChange(boot.id, e.target.value)
                    }
                    className="border rounded-md p-1 text-sm"
                  >
                    {boot.availableSizes?.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Delete Button */}
              <div className="mt-auto flex">
                <button
                  onClick={() => deleteFromCart(boot.id)}
                  className="ml-auto cursor-pointer border-2 p-2 text-white rounded-md text-lg bg-amber-600 hover:bg-yellow-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-6">Your cart is empty.</p>
      )}
       
    </div>  
    
          <Footer />
 </>
  );
  
};

export default ProductsPage;
