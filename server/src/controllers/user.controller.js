import userModel from "../models/user.model.js";
import { createUser } from "../services/user.services.js";

export const register = async (req, res, next) => {
  try {
    const {
      fullName: { firstName, lastName },
      email,
      password,
    } = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = await user.generateAuthToken();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};
