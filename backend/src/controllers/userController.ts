import { Request, Response } from "express";
import User from "../models/Users";
import { transporter } from "../utils/nodemailer";
import { generateToken } from "../utils/jwt";

// ---------------- Register User ----------------
export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    if (existingUser.isVerified) return res.status(400).json({ error: "User already exists" });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await User.create({ email, password, verificationCode: code });

  const verifyLink = `http://localhost:5173/verify?email=${encodeURIComponent(email)}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your account",
      html: `<h2>Welcome!</h2>
             <p>Your verification code is: <strong>${code}</strong></p>
             <a href="${verifyLink}" target="_blank">Verify Account</a>`,
    });

    res.status(200).json({ message: "Verification email sent", email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send verification email" });
  }
};

// ---------------- Verify Code ----------------
export const verifyCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "No pending registration found" });
  if (user.isVerified) return res.status(400).json({ error: "User already verified" });
  if (user.verificationCode !== code) return res.status(400).json({ error: "Invalid verification code" });

  user.isVerified = true;
  user.verificationCode = undefined;
  await user.save();

  res.json({ message: "✅ Account verified successfully!" });
};

// ---------------- Resend Code ----------------
export const resendCode = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "No pending verification found" });
  if (user.isVerified) return res.status(400).json({ error: "User already verified" });

  const newCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.verificationCode = newCode;
  await user.save();

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Resend Verification Code",
      html: `<p>Your new verification code is: <strong>${newCode}</strong></p>`,
    });
    res.json({ message: "Verification code resent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to resend verification code" });
  }
};

// ---------------- Login ----------------
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });
  if (!user.isVerified) return res.status(400).json({ error: "User not verified" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ error: "Invalid password" });

  const token = generateToken(user._id.toString());

  res.json({ success: true, message: "Login successful", token, user: { email: user.email, id: user._id } });
};
