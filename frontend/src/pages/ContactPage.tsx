import { div } from "framer-motion/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface FormData {
  fullName: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
// Frontend receives the response
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setFormData({ fullName: "", email: "", message: "" });
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
   <div className="mt-4 p-6">
    <Link to="/">
      <h1 className="inline-block bg-yellow-500 text-white font-bold px-4 py-2 rounded shadow hover:bg-yellow-600 transition-colors cursor-pointer">
        Back Home
      </h1>
    </Link>

    <div className="max-w-md mx-auto mt-25 p-12 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
      {message && <p className="mb-4 text-green-600 text-center">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block font-semibold">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full h-32 p-2 border rounded resize-none"
          />

        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 p-2 text-white font-bold rounded hover:bg-yellow-600"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
);
}

export default ContactPage;
