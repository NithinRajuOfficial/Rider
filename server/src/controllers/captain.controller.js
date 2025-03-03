import blacklistToken from "../models/blacklistToken.model.js";
import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.services.js";

export const register = async (req, res, next) => {
  console.log("came here");
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      vehicleColor,
      vehiclePlate,
      vehicleCapacity,
      vehicleType,
    } = req.body;

    const isCaptainExist = await captainModel.findOne({ email });
    if (isCaptainExist) {
      return res.status(400).json({
        success: false,
        message: "Captain already exists",
      });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainModel.create({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: hashedPassword,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    });

    const token = await captain.generateAuthToken();
    const userData = await captainModel
      .findById(captain._id)
      .select("-__v -createdAt -updatedAt");

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    return res.json({
      success: true,
      message: "Signup Successful!..",
      userData,
      token,
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
    const userData = await captainModel
      .findById(captain._id)
      .select("-__v -createdAt -updatedAt");

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    return res.json({
      success: true,
      message: "Login Successful!..",
      userData,
      token,
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
