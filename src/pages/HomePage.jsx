import React, { useState } from "react";
import ProductLists from "../components/ProductLists";
import { Link } from "react-router-dom";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-gray-100 shadow-md">
        {/* Left: Logo */}
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-600 cursor-pointer">
          Amazon
        </h1>

        {/* Center: Search input (no form submit) */}
        <div className="flex w-full sm:w-1/2 max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a product..."
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base"
          />
        </div>

        {/* Right: Navigation */}
        <nav className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-3 sm:mt-0">
          <Link to="/">
            <h1 className="text-lg font-semibold text-yellow-600 cursor-pointer hover:text-yellow-700 transition-colors">
              Home
            </h1>
          </Link>
          <Link to="/products">
            <h1 className="text-lg font-semibold text-yellow-600 cursor-pointer hover:text-yellow-700 transition-colors">
              Products
            </h1>
          </Link>
          <Link to="/contact">
            <h1 className="text-lg font-semibold text-yellow-600 cursor-pointer hover:text-yellow-700 transition-colors">
              Contact
            </h1>
          </Link>
        </nav>
      </header>

      {/* Product list updates automatically */}
      <ProductLists searchTerm={searchTerm} />
    </div>
  );
}

export default HomePage;
