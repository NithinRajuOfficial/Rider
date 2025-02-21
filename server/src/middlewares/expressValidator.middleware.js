import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);

    return res.status(400).json({
      success: false,
      errors: errorMessages.length === 1 ? errorMessages[0] : errorMessages,
    });
  }
  next();
};
