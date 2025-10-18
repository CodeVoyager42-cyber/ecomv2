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
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   // 📨 Send a request to the backend to subscribe a user by email
try {
  // Send a POST request to your backend API endpoint
  const response = await fetch("http://localhost:5000/api/subscribe", {
    method: "POST", // HTTP method used for creating or sending data
    headers: {
      "Content-Type": "application/json", // Tell the server you're sending JSON
    },
    body: JSON.stringify({ email }), // Convert the email object to JSON string
  });

  // Parse the JSON response from the backend
  const data = await response.json();

  // ✅ If the request was successful (status code 200–299)
  if (response.ok) {
    setMessage("✅ Subscription successful!"); // Show success message
    setEmail(""); // Clear the email input field
  } else {
    // ❌ If the backend returned an error response
    setMessage(`❌ ${data.message}`); // Display the error message from backend
  }
} catch (error) {
  // ⚠️ If there was a network error or server connection issue
  console.error("Error subscribing:", error);
  setMessage("⚠️ Error connecting to server"); // Show generic connection error
}
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-6">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 border-b border-gray-700 pb-10">
        
        {/* About Section */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white mb-4">AmazonPro</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Your go-to destination for premium shoes — blending comfort, style,
            and quality. Step into confidence with every pair.
          </p>

          {/* Social Links */}
          <div className="flex justify-center sm:justify-start flex-wrap gap-3 mt-4">
            {[
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/mouad-el-02245b194/" },
              { icon: <FaGithub />, link: "https://github.com/CodeVoyager42-cyber" },
            ].map(({ icon, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-600 text-white transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "Shop", path: "/products" },
              { name: "About Us", path: "#" },
              { name: "Contact", path: "/contact" },
            ].map(({ name, path }, i) => (
              <li key={i}>
                <a
                  href={path}
                  className="hover:text-yellow-500 transition-colors duration-200"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-400 mb-4">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center sm:items-stretch gap-3"
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

          {message && <p className="text-sm mt-3 text-yellow-400">{message}</p>}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 text-center">
        <p>© {new Date().getFullYear()} AmazonPro. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-3 sm:mt-0">
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
