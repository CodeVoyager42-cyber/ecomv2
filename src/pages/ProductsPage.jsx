<<<<<<< HEAD
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { storage } from "../utils/storage"; // ✅ lowercase here
import { useNavigate } from "react-router-dom";
 // using react-icons for the arrow icon


function ProductsPage() {
  const { cart, deleteFromCart } = useContext(CartContext);
  const [selectedSizes, setSelectedSizes] = useState({});
   const navigate = useNavigate();

  // Load selected sizes from localStorage
  useEffect(() => {
    const savedSizes = storage.get("selectedSizes");
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

=======
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductsPage() {
  const { cart, deleteFromCart } = useContext(CartContext);
  const [selectedSizes, setSelectedSizes] = useState({}); // track selected size per product

  // Update selected size
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a
  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

<<<<<<< HEAD
  const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    
=======
  // Calculate total price
  const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);

  return (
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a
    <div className="p-6">
      <Link to="/">
        <h1 className="text-lg font-semibold text-yellow-600 cursor-pointer hover:text-yellow-700 transition-colors">
          Home
        </h1>
      </Link>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="my-6 p-4 border rounded-lg bg-gray-50 shadow">
          <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
          <ul className="space-y-1">
            {cart.map((product) => (
              <li key={product.id} className="flex justify-between">
                <span>
                  {product.name}{" "}
<<<<<<< HEAD
                  {selectedSizes[product.id] &&
                    `(Size: ${selectedSizes[product.id]})`}
=======
                  {selectedSizes[product.id] && `(Size: ${selectedSizes[product.id]})`}
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a
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
<<<<<<< HEAD
=======
              {/* Product Image */}
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a
              <img
                src={boot.image}
                alt={boot.name}
                className="w-full h-64 object-cover rounded-md"
              />

<<<<<<< HEAD
              <div className="mt-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{boot.name}</h2>
                <p className="text-gray-500 text-sm">{boot.description}</p>
                <p className="text-yellow-600 font-bold">
                  ${boot.price.toFixed(2)}
                </p>
=======
              {/* Product Info */}
              <div className="mt-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{boot.name}</h2>
                <p className="text-gray-500 text-sm">{boot.description}</p>
                <p className="text-yellow-600 font-bold">${boot.price.toFixed(2)}</p>
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a
                <p className="text-gray-700 text-sm">
                  Category: <span className="font-medium">{boot.category}</span>
                </p>

                {/* Size Dropdown */}
                <div className="mt-2">
                  <label className="text-gray-700 text-sm mr-2">Size:</label>
                  <select
<<<<<<< HEAD
                    value={selectedSizes[boot.id] || boot.size || ""}
                    onChange={(e) =>
                      handleSizeChange(boot.id, e.target.value)
                    }
=======
                    value={selectedSizes[boot.id] || boot.size} // default size
                    onChange={(e) => handleSizeChange(boot.id, e.target.value)}
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a
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

<<<<<<< HEAD
=======
              {/* Delete Button */}
>>>>>>> 89d3951b4674bf40a936d5b0b50aacde21917b4a
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
  );
}

export default ProductsPage;
