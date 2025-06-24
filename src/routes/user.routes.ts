// src/routes/user.routes.ts
import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controller/user.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticateJWT, getUsers);
router.get("/:id",authenticateJWT,  getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);

export default router;
