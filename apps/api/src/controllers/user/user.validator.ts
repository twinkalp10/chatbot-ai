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
  }).length(8, "Password must be at least 8 characters"),
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
  }).length(8, "Password must be at least 8 characters"),
 }),
});
