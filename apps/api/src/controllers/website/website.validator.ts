import { z } from "zod";

export const validateWebsite = z.object({
 body: z.object({
  name: z.string({
   required_error: "Name is required",
  }).email("Not a valid email"),
  website: z.string({
   required_error: "Password is required",
  }).url("Not a valid url"),
 }),
});
