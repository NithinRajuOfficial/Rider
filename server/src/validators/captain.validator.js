import { body } from "express-validator";

export const registerValidationRulesCaptain = [
  // Full Name Validation
  body("fullName.firstName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),
  body("fullName.lastName")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long"),

  // Email Validation
  body("email").isEmail().withMessage("Invalid email format"),

  // Password Validation
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  // Status Validation (Optional)
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage('Status must be "active" or "inactive"'),

  // Vehicle Validation
  body("vehicle.color")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Color must be at least 3 characters long"),
  body("vehicle.plate")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Plate must be at least 3 characters long"),
  body("vehicle.capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1"),
  body("vehicle.vehicleType")
    .isIn(["car", "motorcycle", "auto"])
    .withMessage('Vehicle type must be "car", "motorcycle", or "auto"'),

  // Location Validation (Optional)
  body("location.lat")
    .optional()
    .isNumeric()
    .withMessage("Latitude must be a number"),
  body("location.lng")
    .optional()
    .isNumeric()
    .withMessage("Longitude must be a number"),
];


// Define validation rules of login captain
export const loginValidationRulesCaptain = [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ];
  