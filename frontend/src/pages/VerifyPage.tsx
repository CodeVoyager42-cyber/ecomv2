import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // ---------------- Verify Code ----------------
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !email) return;
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/users/verify-code", {
        email,
        code,
      });
      setMessage(res.data.message);
      setLoading(false);

      // Redirect after 2 seconds if verification successful
      if (res.data.message) {
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Verification failed");
      setLoading(false);
    }
  };

  // ---------------- Resend Code ----------------
  const handleResend = async () => {
    if (!email) return;
    setResendLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/users/resend-code", { email });
      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Failed to resend code");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 via-white to-yellow-50 p-4">
      <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800">Verify Your Account</h2>

        {email && (
          <p className="text-center text-gray-600">
            Email: <span className="font-medium">{email}</span>
          </p>
        )}

        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 text-white py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200 shadow-md hover:shadow-lg"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center font-medium ${
              message.toLowerCase().includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center text-sm text-gray-600 mt-2">
          Didn’t receive the code?{" "}
          <button
            onClick={handleResend}
            disabled={resendLoading}
            className="text-yellow-500 hover:text-yellow-700 font-medium"
          >
            {resendLoading ? "Resending..." : "Resend"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyPage;
