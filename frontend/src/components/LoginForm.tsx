import React, { useState } from "react";
import { loginUser } from "../services/api"; // You need to create this API call
import { Link, useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      if (res.success) {
        setMessage("Login successful! Redirecting...");
        // Redirect to products page after a short delay
        setTimeout(() => {
          navigate("/products");
        }, 1000);
      } else {
        setMessage(res.error || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 via-white to-yellow-50">
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="text-yellow-600 font-semibold bg-white shadow-md rounded-lg px-5 py-2 hover:text-yellow-700 hover:shadow-lg transition-all duration-300"
        >
          ⬅ Home
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-5 border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mb-2">
          Login to your account 🚀
        </p>

        <div className="flex flex-col">
          <label className="text-gray-600 text-sm mb-1 font-medium">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 text-sm mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-400 cursor-pointer from-blue-500 to-indigo-500 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Login
        </button>

        {message && (
          <p
            className={`text-center mt-2 font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          You don't have an account?{" "}
          <Link
            to="/RegisterFormPage"
            className="text-yellow-500 hover:text-yellow-700 font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
