import { Router } from "express";
import { subscribe, contactForm } from "../controllers/mailController";

const router = Router();

// Subscribe to newsletter
router.post("/subscribe", subscribe);

// Send contact form message
router.post("/send-message", contactForm);

export default router;
