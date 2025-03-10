import { body } from "express-validator";

// Define validation rules of register user
export const registerValidationRules = [
  body("fullName.firstName")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),
  body("fullName.lastName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

// Define validation rules of login user
export const loginValidationRules = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

