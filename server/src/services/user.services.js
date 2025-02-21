import userModel from "../models/user.model.js";

export const createUser = async ({ firstName, lastName, email, password }) => {
  try {
    const user = await userModel.create({
      fullName: { firstName, lastName },
      email,
      password,
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error("Creating user ERROR: " + error.message);
  }
};
