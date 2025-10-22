import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-yellow-50 to-orange-50 overflow-hidden rounded-lg max-w-7xl mx-auto my-6 shadow-lg">
      <div className="px-6 py-16 sm:py-24 flex flex-col md:flex-row items-center justify-between">
        {/* Text */}
        <div className="max-w-xl text-center md:text-left">
          <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-yellow-800 bg-yellow-200 rounded-full">
            ✨ AmazonPro 2025
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Discover Your
            <span className="block text-yellow-600">Perfect Shoes</span>
          </h1>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Explore our premium collection of boots, sneakers, and more. 
            <span className="block mt-1">Comfort and style guaranteed with every step.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl shadow-lg hover:shadow-xl will-change-transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Shop Now
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <button
              onClick={scrollToProducts}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl shadow-md hover:shadow-lg will-change-transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Collection
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-6 text-sm">
            <div className="text-center">
              <div className="font-bold text-gray-900">500+</div>
              <div className="text-gray-600">Styles</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900">50k+</div>
              <div className="text-gray-600">Customers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900">4.9★</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="mt-8 md:mt-0 md:ml-8 flex justify-center">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
              alt="Hero Shoes"
              className="w-72 sm:w-96 rounded-xl shadow-xl will-change-transform hover:scale-[1.02] transition-transform duration-300"
              loading="eager"
              fetchPriority="high"
            />

            {/* Floating badge */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
              <span className="text-sm font-medium text-gray-800">Free Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
