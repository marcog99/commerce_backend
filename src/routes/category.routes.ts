import { Router } from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controller/category.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticateJWT, getCategories);
router.get("/:id", authenticateJWT, getCategoryById);
router.post("/", authenticateJWT, createCategory);
router.put("/:id", authenticateJWT, updateCategory);
router.delete("/:id", authenticateJWT, deleteCategory);

export default router;
