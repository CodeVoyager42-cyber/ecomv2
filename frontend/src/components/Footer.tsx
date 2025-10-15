import React, { useState } from "react";
import type { FormEvent } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer: React.FC = () => {
  // ✅ State for email input and message
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Make it async to use await
  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Subscription successful!");
        setEmail("");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setMessage("⚠️ Error connecting to server");
    }
  };

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
              target="_blank"
              href="https://www.linkedin.com/in/mouad-el-02245b194/"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-600 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>

            {/* GitHub icon */}
            <a
              href="https://github.com/CodeVoyager42-cyber"
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
              <a href="/" className="hover:text-yellow-500 transition-colors">
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
              <a href="#" className="hover:text-yellow-500 transition-colors">
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

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 px-4 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white font-semibold transition-all"
            >
              Subscribe
            </button>
          </form>

          {/*  Show feedback message */}
          {message && (
            <p className="text-sm mt-3 text-yellow-400">{message}</p>
          )}
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
};

export default Footer;
