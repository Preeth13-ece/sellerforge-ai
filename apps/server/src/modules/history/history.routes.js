import { Router } from "express";
import { verifyJWT } from "../../middlewares/authMiddleware.js";
import { getHistory, getHistoryItem, deleteHistoryItem, clearHistory } from "./history.controller.js";

const router = Router();
router.use(verifyJWT);

router.get("/", getHistory);
router.get("/:id", getHistoryItem);
router.delete("/:id", deleteHistoryItem);
router.delete("/", clearHistory);

export default router;
