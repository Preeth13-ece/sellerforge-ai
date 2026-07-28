import { Router } from "express";
import { verifyJWT } from "../../middlewares/authMiddleware.js";
import { listDownloads, createDownload, getDownloadFile } from "./download.controller.js";

const router = Router();
router.use(verifyJWT);

router.get("/", listDownloads);
router.post("/", createDownload);
router.get("/:id/file", getDownloadFile);

export default router;
