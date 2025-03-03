import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import blacklistToken from "../models/blacklistToken.model.js";
import userModel from "../models/user.model.js";
import captainModel from "../models/captain.model.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  const blacklistedTokens = await blacklistToken.find();
  const isBlacklisted = blacklistedTokens.some(
    async (blacklisted) => await bcrypt.compare(token, blacklisted.token)
  );

  if (isBlacklisted) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access: " + error.message,
    });
  }
};

export const authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  const blacklistedTokens = await blacklistToken.find();
  const isBlacklisted = blacklistedTokens.some(
    async (blacklisted) => await bcrypt.compare(token, blacklisted.token)
  );
  if (isBlacklisted) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access: " + error.message,
    });
  }
};
