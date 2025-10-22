import express from "express";
import { registerUser, verifyCode, resendCode } from "../controllers/userController";
import { loginUser } from "../services/api";

const router = express.Router();

// 👇 this MUST match the frontend endpoint: /api/register
router.post("/register", registerUser);
router.post("/verify-code", verifyCode);
router.post("/resend-code", resendCode);
router.post("/login", loginUser);

export default router;
