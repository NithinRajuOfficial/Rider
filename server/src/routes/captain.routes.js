import express from "express";
const router = express.Router();
import { validate } from "../middlewares/expressValidator.middleware.js";
import {
  loginValidationRulesCaptain,
  registerValidationRulesCaptain,
} from "../validators/captain.validator.js";
import { login, register } from "../controllers/captain.controller.js";

// Captain Register
router.post("/register", registerValidationRulesCaptain, validate, register);

// Captain Login
router.post("/login", loginValidationRulesCaptain, validate, login);

export default router;
