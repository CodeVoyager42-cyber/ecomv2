import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create reusable transporter object
export const transporter = nodemailer.createTransport({
  service: "gmail", // you can change to another email service
  auth: {
    user: process.env.EMAIL_USER,       // your email from .env
    pass: process.env.EMAIL_PASS,       // your app password from .env
  },
  tls: {
    rejectUnauthorized: false,          // for development only
  },
});

/**
 * Send an email
 * @param to Recipient email address
 * @param subject Email subject
 * @param html HTML content of the email
 */
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log("Email sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};
