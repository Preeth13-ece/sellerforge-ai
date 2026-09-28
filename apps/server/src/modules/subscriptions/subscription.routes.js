import { Router } from "express";
import { verifyJWT } from "../../middlewares/authMiddleware.js";

import {
  listPlans,
  createCheckout,
  getMySubscription,
  cancelMySubscription,
} from "./subscription.controller.js";


const router = Router();



// Public plans
router.get(
  "/plans",
  listPlans
);



// Create Razorpay subscription
router.post(
  "/checkout",
  verifyJWT,
  createCheckout
);



// User subscription
router.get(
  "/me",
  verifyJWT,
  getMySubscription
);



// Cancel subscription
router.post(
  "/cancel",
  verifyJWT,
  cancelMySubscription
);



export default router;
