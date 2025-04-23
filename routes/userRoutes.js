// routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

// Public routes
userRoutes.post("/register", authMiddleware, registerUser);
userRoutes.post("/login", loginUser);

// Protected routes
userRoutes.get("/getAllUsers", authMiddleware, getAllUsers);
userRoutes.get("/getOneUser/:id", authMiddleware, getUser);
userRoutes.delete("/deleteOneUser/:id", authMiddleware, deleteUser);

export default userRoutes;
