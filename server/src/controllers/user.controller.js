import blacklistToken from "../models/blacklistToken.model.js";
import userModel from "../models/user.model.js";
import { createUser } from "../services/user.services.js";

export const register = async (req, res, next) => {
  try {
    const {
      fullName: { firstName, lastName },
      email,
      password,
    } = req.body;

    isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    
    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = await user.generateAuthToken();

    const registeredUser = await userModel.findById(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { registeredUser, token },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = await user.generateAuthToken();
    const loggedInUser = await userModel.findById(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    return res.json({
      success: true,
      message: "User logged in successfully",
      data: { loggedInUser, token },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.json({
      success: true,
      message: "User profile",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await blacklistToken.create({ token });

    return res.json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
