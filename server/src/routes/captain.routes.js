import express from "express";
const router = express.Router();
import { validate } from "../middlewares/expressValidator.middleware.js";
import {
  loginValidationRulesCaptain,
  registerValidationRulesCaptain,
} from "../validators/captain.validator.js";
import {
  getCaptainProfile,
  login,
  logout,
  register,
} from "../controllers/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";

// Captain Register
router.post("/register", registerValidationRulesCaptain, validate, register);

// Captain Login
router.post("/login", loginValidationRulesCaptain, validate, login);

// Captain Profile
router.get("/profile", authCaptain, getCaptainProfile);

// Captain Logout
router.get("/logout", authCaptain, logout);

export default router;
