import { Router } from "express";
import { verifyJWT } from "../../middlewares/authMiddleware.js";
import { listFavorites, createFavorite, deleteFavorite } from "./favorite.controller.js";

const router = Router();
router.use(verifyJWT);

router.get("/", listFavorites);
router.post("/", createFavorite);
router.delete("/:id", deleteFavorite);

export default router;
