import express, { Request, Response } from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import ProductsData, { Product } from "./Products";
 // Ensure your Products.ts exports Product type

const app = express();
app.use(cors());
app.use(express.json());

// Optional: ignore self-signed certs (dev only)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Interface for contact form request body
interface ContactFormBody {
  fullName: string;
  email: string;
  message: string;
}

app.post("/send-message", async (req: Request<{}, {}, ContactFormBody>, res: Response) => {
  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mouadm7c7@gmail.com",
      pass: "uizv euwj subj kixw", // Gmail App Password
    },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: email, // sender is the user
    to: "mouadm7c7@gmail.com",
    subject: `New message from ${fullName}`,
    html: `
      <h2>New Message from Contact Form</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  const welcomeOptions = {
    from: "mouadm7c7@gmail.com",
    to: email, // user's email
    subject: "Welcome to AmazonPro!",
    html: `
      <h2>Welcome to AmazonPro!</h2>
      <p>Hi ${fullName},</p>
      <p>Thank you for contacting us! We’ll get back to you shortly.</p>
      <p>Best regards,<br>The AmazonPro Team</p>
    `,
  };

  try {
    await transporter.sendMail(welcomeOptions);
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Fetch products endpoint
app.get("/api/products", (req, res) => {
  res.json(ProductsData);
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
