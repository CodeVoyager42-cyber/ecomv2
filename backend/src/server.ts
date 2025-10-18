import express, { Request, Response } from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import ProductsData from "./Products";
import bodyParser from "body-parser";
import { users, createUser } from "./users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Optional: ignore self-signed certs (dev only)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// function to generate random verification code
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit number
}

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' http://localhost:5000");
  next();
});

// ---------------- Nodemailer transporter ----------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your_email@gmail.com",
    pass: process.env.EMAIL_PASS || "your_gmail_app_password",
  },
  tls: { rejectUnauthorized: false },
});

// ----------------- Subscribe endpoint ----------------
interface SubscribeBody {
  email: string;
}
app.post("/api/subscribe", async (req: Request<{}, {}, SubscribeBody>, res: Response) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Congratulations! 🎉",
    html: `
      <h2>Thank you for subscribing!</h2>
      <p>Hi,</p>
      <p>You're now subscribed to AmazonPro notifications.</p>
      <p>Best regards,<br/>AmazonPro Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Subscription email sent successfully!" });
  } catch (error) {
    console.error("Subscription email error:", error);
    res.status(500).json({ error: "Failed to send subscription email" });
  }
});

// ----------------- Contact form ----------------
interface ContactFormBody {
  fullName: string;
  email: string;
  message: string;
}
app.post("/send-message", async (req: Request<{}, {}, ContactFormBody>, res: Response) => {
  const { fullName, email, message } = req.body;
  if (!fullName || !email || !message)
    return res.status(400).json({ error: "Missing fields" });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to AmazonPro!",
    html: `
      <h2>Welcome to AmazonPro!</h2>
      <p>Hi ${fullName},</p>
      <p>Thank you for contacting us! We’ll get back to you shortly.</p>
      <p>Best regards,<br>The AmazonPro Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// ----------------- Products endpoint ----------------
app.get("/api/products", (req, res) => {
  res.json(ProductsData);
});

// ----------------- User registration ----------------
app.post("/api/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const newUser = await createUser(email, password);

  // Generate a 6-digit verification code
  const code = generateVerificationCode();
  newUser.verificationCode = code;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: newUser.email,
    subject: "Your AmazonPro Verification Code",
    html: `
      <h2>Welcome to AmazonPro!</h2>
      <p>Your verification code is:</p>
      <h1>${code}</h1>
      <p>Enter this code to verify your account.</p>
      <p>This code expires in 24 hours.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Verification code sent! Check your email." });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ error: "Failed to send verification code" });
  }
});

// ----------------- Account verification ----------------
app.get("/api/verify/:token", (req: Request, res: Response) => {
  const token = req.params.token;
  if (!token) return res.status(400).send("Invalid verification link");

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    const user = users.find(u => u.email === decoded.email);
    if (!user) return res.status(404).send("User not found");

    user.verified = true; // Mark user as verified
    res.send("✅ Account verified successfully!");
  } catch (err) {
    console.error(err);
    res.status(400).send("❌ Invalid or expired token");
  }
});

// ----------------- Start server ----------------
app.listen(5000, () => console.log("✅ Server running on port 5000"));
