import express from "express";
const router = express.Router();
import { validate } from "../middlewares/expressValidator.middleware.js";
import { registerValidationRulesCaptain } from "../validators/captain.validator.js";
import { register } from "../controllers/captain.controller.js";

// Captain Register
router.post("/register", registerValidationRulesCaptain, validate, register);

export default router;
