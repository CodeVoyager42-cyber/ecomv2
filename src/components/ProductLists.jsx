import React, { useContext, useState } from "react";
import { motion } from "framer-motion"; // 👈 Import Framer Motion
import bootsData from "../data/data";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

function ProductLists({ searchTerm }) {
  const [loadingId, setLoadingId] = useState(null); // Track which product is loading
  const { cart, addToCart } = useContext(CartContext);

  // Filter boots based on search input
  const filteredBoots = bootsData.filter((boot) =>
    boot.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  // Add-to-cart handler with loading animation + toast
    const handleAddToCart = (product) => {
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

  // Animation variants for smoother entrance
        const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index) => ({
        opacity: 1,
        y: 0,
        transition: {
        duration: 0.6,
        delay: index * 0.1, // staggered delay for each card
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {filteredBoots.length > 0 ? (
        filteredBoots.map((boot, index) => (
          <motion.div
            key={boot.id}
            className="bg-white p-4 rounded-lg shadow will-change-transform hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
          >
            <img
              src={boot.image + "?auto=compress&cs=tinysrgb&w=300&h=200"}
              alt={boot.name}
              loading="lazy"
              className="w-full h-64 object-cover rounded-md"
              decoding="async"
            />

            <h2 className="text-lg font-semibold mt-2">{boot.name}</h2>
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
              {boot.description}
            </p>
            <p className="text-yellow-600 font-bold mt-2">
              ${boot.price.toFixed(2)}
            </p>

            <button
              onClick={() => handleAddToCart(boot)}
              disabled={loadingId === boot.id}
              className={`flex m-auto mt-2 p-2 border-2 rounded-lg transition-transform text-white will-change-transform ${
                loadingId === boot.id
                  ? "bg-gray-400"
                  : "bg-amber-600 hover:bg-yellow-600 hover:scale-105"
              }`}
            >
              {loadingId === boot.id ? "Adding..." : "Add to cart"}
            </button>
          </motion.div>
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
