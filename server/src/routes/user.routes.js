import express from "express";
const router = express.Router();
import {
  loginValidationRules,
  registerValidationRules,
} from "../validators/user.validators.js";
import { validate } from "../middlewares/expressValidator.middleware.js";
import {
  register,
  login,
  getUserProfile,
  logout,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

// User Register
router.post("/register", registerValidationRules, validate, register);

// User Login
router.post("/login", loginValidationRules, validate, login);

// User Profile
router.get("/profile", authUser, getUserProfile);

// User Logout
router.get("/logout", authUser, logout);


export default router;
