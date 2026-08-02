import { Router } from "express";
import { verifyJWT } from "../../middlewares/authMiddleware.js";
import {
  listPlans,
  createCheckout,
  getMySubscription,
  cancelMySubscription,
} from "./subscription.controller.js";

const router = Router();

// Get all subscription plans
router.get("/plans", listPlans);

// Create Razorpay subscription
router.post("/checkout", verifyJWT, createCheckout);

// Get current user's subscription
router.get("/me", verifyJWT, getMySubscription);

// Cancel current subscription
router.post("/cancel", verifyJWT, cancelMySubscription);

// Note: The Razorpay webhook route is mounted separately in app.js
// before express.json() so it can receive the raw request body.

export default router;