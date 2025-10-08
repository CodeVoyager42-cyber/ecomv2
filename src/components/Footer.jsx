import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,            // <-- Import GitHub icon here
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-700 pb-10">
        
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">AmazonPro</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Your go-to destination for premium shoes — blending comfort, style,
            and quality. Step into confidence with every pair.
          </p>

          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-600 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-600 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-600 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-600 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>

            {/* GitHub icon */}
            <a
              href="https://github.com/CodeVoyager42-cyber"  // <-- Replace with your GitHub URL
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-600 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-yellow-500 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="hover:text-yellow-500 transition-colors"
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-yellow-500 transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-yellow-500 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-400 mb-4">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-4 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white font-semibold transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} AmazonPro. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-yellow-500 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-yellow-500 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
