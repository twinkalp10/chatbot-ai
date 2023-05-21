import * as yup from "yup";

export const signUpSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email"),
    password: yup
      .string().required("Password is required")
      .max(15, "Password is too long")
      .min(8, "Password is too small"),
  })
  .required();
export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email"),
    password: yup
      .string().required("Password is required")
      .max(15, "Password is too long")
      .min(8, "Password is too small"),
  })
  .required();

