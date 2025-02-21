import blacklistToken from "../models/blacklistToken.model.js";
import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.services.js";

export const register = async (req, res, next) => {
  try {
    const {
      fullName: { firstName, lastName },
      email,
      password,
      vehicle: { color, plate, capacity, vehicleType },
    } = req.body;

    const isCaptainExist = await captainModel.findOne({ email });
    if (isCaptainExist) {
      return res.status(400).json({
        success: false,
        message: "Captain already exists",
      });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      color,
      plate,
      capacity,
      vehicleType,
    });

    const token = await captain.generateAuthToken();
    const registeredCaptain = await captainModel.findById(captain._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    return res.json({
      success: true,
      message: "Captain created successfully",
      data: { registeredCaptain, token },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = await captain.generateAuthToken();
    const loggedInCaptain = await captainModel.findById(captain._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    return res.json({
      success: true,
      message: "Captain logged in successfully",
      data: { loggedInCaptain, token },
    });
  } catch (error) {
    next(error);
  }
};

export const getCaptainProfile = async (req, res, next) => {
  try {
    const captain = await captainModel.findById(req.captain._id);
    if (!captain) {
      return res.status(404).json({
        success: false,
        message: "Captain not found",
      });
    }

    return res.json({
      success: true,
      message: "Captain profile retrieved successfully",
      data: captain,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    const token =
      req.cookies.token || req.headers?.authorization?.split(" ")[1];
    const blacklistedToken = await blacklistToken.create({ token });
    return res.json({
      success: true,
      message: "Captain logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
