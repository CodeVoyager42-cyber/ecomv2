import React, { useState } from "react";
import { registerUser } from "../services/api";
import { Link } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await registerUser({ email, password });
    setMessage(res.message || res.error);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 via-white to-yellow-50">
      {/* 🔙 Home link */}
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="text-yellow-600 font-semibold bg-white shadow-md rounded-lg px-5 py-2 hover:text-yellow-700 hover:shadow-lg transition-all duration-300"
        >
          ⬅ Home
        </Link>
      </div>

      {/* 💬 Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-5 border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create an Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-2">
          Join us and start your journey 🚀
        </p>

        {/* ✉ Email */}
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

        {/* 🔒 Password */}
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
            required
          />
        </div>

        {/* 🔘 Submit */}
        <button
          type="submit"
          className="bg-yellow-400 cursor-pointer from-blue-500 to-indigo-500 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Register
        </button>

        {/* 🔔 Message */}
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

        {/* 🧭 Login redirect */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to ="/LoginPage"
            className="text-yellow-500 hover:text-yellow-700 font-medium"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
