import React, { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import ProductsData from "../data/data.ts"; // Your products data

const SupportChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState<string>("");

  // Load chat state and messages from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("chatbotOpen");
    if (savedState) setIsOpen(JSON.parse(savedState));

    const savedMessages = localStorage.getItem("chatbotMessages");
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  // Save chat state
  useEffect(() => {
    localStorage.setItem("chatbotOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  // Save messages
  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(messages));
  }, [messages]);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSend = () => {
  if (!input.trim()) return;

  const userMessage = { sender: "user", text: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");

  // Bot response after a short delay
  setTimeout(() => {
    const messageLower = input.toLowerCase();

    let botReply = "";

    // ✅ Greetings
    const greetings = ["hi", "hello", "hey", "good morning", "good afternoon"];
    if (greetings.some((g) => messageLower.includes(g))) {
      botReply = "👋 Hello! Welcome to AmazonPro. How can I assist you with our products today?";
    } 
    // ✅ Product lookup (keyword-based)
    else {
      // Filter products whose names include any of the words in the user's input
      const words = messageLower.split(" ").filter((w) => w.length > 2); // ignore small words
      const matchedProduct = ProductsData.find((p) =>
        words.some((word) => p.name.toLowerCase().includes(word))
      );

      if (matchedProduct) {
        botReply = `The product "${matchedProduct.name}" costs $${matchedProduct.price.toFixed(
          2
        )}. Available sizes: ${matchedProduct.availableSizes.join(", ")}.`;
      } else {
        botReply =
          "Sorry, I couldn't find that product. Can you try typing the product name or a keyword?";
      }
    }

    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
  }, 600);
};

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={handleToggle}
        className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-full shadow-lg transition-all"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-yellow-500 text-white px-4 py-2 flex justify-between items-center">
            <span className="font-semibold">AmazonPro Support</span>
            <button onClick={handleToggle}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 h-64 space-y-2 bg-gray-50">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-sm text-center mt-4">
                👋 Hi there! How can we help you today?
              </p>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-md max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-yellow-200 ml-auto text-right"
                      : "bg-gray-200 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChatbot;
