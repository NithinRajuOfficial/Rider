import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "First name must be at least 3 characters long"],
      },
      lastName: {
        type: String,
        trim: true,
        minlength: [3, "Last name must be at least 3 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [6, "Email must be at least 6 characters long"],
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    socketId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET
  );
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = model("User", userSchema);

export default userModel;
