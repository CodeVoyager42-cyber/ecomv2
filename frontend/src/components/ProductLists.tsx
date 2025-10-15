import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants, Easing } from "framer-motion";
import { CartContext } from "../context/CartContext.tsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Define Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  size: number;
  availableSizes: string[];
}

// ✅ Props for the component
interface ProductListsProps {
  searchTerm: string;
}

const ProductLists: React.FC<ProductListsProps> = ({ searchTerm }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // ✅ Cart context
  const cartContext = useContext(CartContext);
  if (!cartContext) throw new Error("CartContext must be used within a CartProvider");
  const { cart, addToCart } = cartContext;

  // ✅ Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  // ✅ Add product to cart
  const handleAddToCart = (product: Product) => {
    if (cart.some((item) => item.id === product.id)) {
      toast.error(`${product.name} is already in your cart!`, {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
      });
      return;
    }

    setLoadingId(product.id);
    setTimeout(() => {
      addToCart(product);
      setLoadingId(null);
    }, 1000);
  };

  // ✅ Animation variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1] as Easing,
      },
    }),
  };

  // ✅ Render UI
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
            <p className="text-yellow-600 font-bold mt-2">${product.price.toFixed(2)}</p>

            <button
              onClick={() => handleAddToCart(product)}
              disabled={loadingId === product.id}
              className={`flex m-auto mt-2 p-2 border-2 rounded-lg text-white ${
                loadingId === product.id
                  ? "bg-gray-400"
                  : "bg-amber-600 hover:bg-yellow-600 hover:scale-105"
              }`}
            >
              {loadingId === product.id ? "Adding..." : "Add to cart"}
            </button>
          </motion.div>
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">No products found</p>
      )}
    </div>
  );
};

export default ProductLists;
