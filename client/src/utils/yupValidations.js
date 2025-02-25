import * as yup from "yup";

const userLoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const userSignupValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "First Name must be at least 3 characters long")
    .required("First Name is required"),
  lastName: yup
    .string()
    .min(3, "Last Name must be at least 3 characters long")
    .required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const captainLoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export {
  userLoginValidationSchema,
  userSignupValidationSchema,
  captainLoginValidationSchema,
};
