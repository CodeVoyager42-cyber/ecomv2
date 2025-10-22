import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Routes
import userRoutes from "./routes/userRoutes";
import { subscribe, contactForm } from "./controllers/mailController";
import ProductsData from "./models/Products";
import { registerUser, loginUser } from "./controllers/userController";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ----------------- Mail endpoints -----------------
app.post("/api/subscribe", subscribe);
app.post("/send-message", contactForm);

// ----------------- Products endpoint -----------------
app.get("/api/products", (req, res) => {
  res.json(ProductsData);
});

// ----------------- Users endpoints -----------------
app.use("/api/users", userRoutes); // Mount user routes
app.post("/api/register", registerUser);
app.post("/api/login", loginUser);

// ----------------- Connect to MongoDB and start server -----------------
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // stop the server if DB connection fails
  }
};

startServer();
