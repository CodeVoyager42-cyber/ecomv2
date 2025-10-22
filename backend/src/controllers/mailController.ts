import { Request, Response } from "express";
import { sendEmail } from "../utils/nodemailer";

export const subscribe = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    await sendEmail(
      email,
      "Congratulations! 🎉",
      `<h2>Thank you for subscribing!</h2><p>Hi, you're now subscribed!</p>`
    );
    res.status(200).json({ message: "Subscription email sent successfully!" });
  } catch (err) {
    console.error("Subscription email error:", err);
    res.status(500).json({ error: "Failed to send subscription email" });
  }
};

export const contactForm = async (req: Request, res: Response) => {
  const { fullName, email, message } = req.body;
  if (!fullName || !email || !message)
    return res.status(400).json({ error: "Missing fields" });

  try {
    await sendEmail(
      email,
      "Welcome to AmazonPro!",
      `<h2>Hi ${fullName},</h2><p>${message}</p>`
    );
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact form email error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
};
