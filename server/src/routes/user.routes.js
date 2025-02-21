import express from "express";
const router = express.Router();
import {
  loginValidationRules,
  registerValidationRules,
  validate,
} from "../validators/user.validators.js";
import { login, register } from "../controllers/user.controller.js";

// Register user
router.post("/register", registerValidationRules, validate, register);

// Login user
router.post("/login", loginValidationRules, validate, login);
export default router;
