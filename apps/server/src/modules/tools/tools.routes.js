import { Router } from "express";
import { toolLimiter } from "../../config/rateLimit.js";
import { optionalAuth, verifyJWT } from "../../middlewares/authMiddleware.js";
import { listTools, runToolHandler } from "./tools.controller.js";

const router = Router();

router.get("/", listTools);

// Calculators are usable logged-out (optionalAuth); AI tools require verifyJWT
// inside runTool's own check, but we still allow optionalAuth at the route
// level so the controller can produce a clean 401 rather than route-level noise.
router.post("/etsy/title-generator", toolLimiter, verifyJWT, runToolHandler("etsy-title-generator"));
router.post("/etsy/tag-generator", toolLimiter, verifyJWT, runToolHandler("etsy-tag-generator"));
router.post(
  "/etsy/description-generator",
  toolLimiter,
  verifyJWT,
  runToolHandler("etsy-description-generator")
);
router.post("/etsy/keyword-generator", toolLimiter, verifyJWT, runToolHandler("etsy-keyword-generator"));
router.post("/etsy/listing-analyzer", toolLimiter, verifyJWT, runToolHandler("etsy-listing-analyzer"));
router.post("/etsy/pricing-calculator", toolLimiter, optionalAuth, runToolHandler("etsy-pricing-calculator"));
router.post("/etsy/fee-calculator", toolLimiter, optionalAuth, runToolHandler("etsy-fee-calculator"));
router.post(
  "/etsy/shop-name-generator",
  toolLimiter,
  verifyJWT,
  runToolHandler("etsy-shop-name-generator")
);
router.post(
  "/etsy/product-idea-generator",
  toolLimiter,
  verifyJWT,
  runToolHandler("etsy-product-idea-generator")
);
router.post("/etsy/holiday-keyword-finder", toolLimiter, verifyJWT, runToolHandler("holiday-keyword-finder"));
router.post("/etsy/trend-explorer", toolLimiter, verifyJWT, runToolHandler("etsy-trend-explorer"));

export default router;
