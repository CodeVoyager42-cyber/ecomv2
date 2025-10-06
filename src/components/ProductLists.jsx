import React, { useContext, useState } from "react";
import bootsData from "../data/data";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

function ProductLists({ searchTerm }) {
   
  const [loadingId, setLoadingId] = useState(null); // track which product is loading
  const { cart, addToCart } = useContext(CartContext); 
  const filteredBoots = bootsData.filter((boot) =>
    boot.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

 const handleAddToCart = (product) => {
    // Prevent adding duplicates
    const alreadyAdded = cart.some((item) => item.id === product.id);
    if (alreadyAdded) {
      toast.error(`${product.name} is already in your cart!`, {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
      });
      return;
    }

    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product); // ✅ now works because we got it from context
      setLoadingId(null);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {filteredBoots.length > 0 ? (
        filteredBoots.map((boot) => (
          <div
            key={boot.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={boot.image}
              alt={boot.name}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{boot.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{boot.description}</p>
            <p className="text-yellow-600 font-bold mt-2">${boot.price.toFixed(2)}</p>

            <button
              onClick={() => handleAddToCart(boot)}
              disabled={loadingId === boot.id}
              className={`flex m-auto mt-2 p-2 border-2 rounded-lg transition-colors text-white 
                ${loadingId === boot.id ? "bg-gray-400" : "bg-amber-600 hover:bg-yellow-600"}
              `}
            >
              {loadingId === boot.id ? "Adding..." : "Add to cart"}
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          No boots found
        </p>
      )}
    </div>
  );
}

export default ProductLists;
