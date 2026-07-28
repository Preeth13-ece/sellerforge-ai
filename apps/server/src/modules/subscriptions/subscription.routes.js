import { Router } from "express";
import { verifyJWT } from "../../middlewares/authMiddleware.js";
import {
  listPlans,
  createCheckout,
  getMySubscription,
  cancelMySubscription,
} from "./subscription.controller.js";

const router = Router();

router.get("/plans", listPlans);
router.post("/checkout", verifyJWT, createCheckout);
router.get("/me", verifyJWT, getMySubscription);
router.post("/cancel", verifyJWT, cancelMySubscription);

// Note: the raw webhook route (needs raw body, not JSON-parsed) is mounted
// separately in app.js BEFORE the global json() body parser.

export default router;
