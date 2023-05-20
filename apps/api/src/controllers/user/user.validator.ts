import { z } from "zod";

export const validateCreateNewUser = z.object({
 body: z.object({
  email: z
   .string({
    required_error: "Email is required",
   })
   .email("Not a valid email"),
  password: z.string({
   required_error: "Password is required",
  }).max(15, "Invalid credentials").min(8, "Invalid credentials"),
 }),
});
export const validateLoginUser = z.object({
 body: z.object({
  email: z
   .string({
    required_error: "Email is required",
   })
   .email("Not a valid email"),
  password: z.string({
   required_error: "Password is required",
  }).max(15, "Password must be at least 8 characters").min(8, "Password must be at least 8 characters"),
 }),
});
