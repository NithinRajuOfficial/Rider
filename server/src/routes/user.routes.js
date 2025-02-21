import express from "express";
const router = express.Router();
import {
  registerValidationRules,
  validate,
} from "../validators/user.validators.js";
import { register } from "../controllers/user.controller.js";

router.post("/register", registerValidationRules, validate, register);

export default router;
