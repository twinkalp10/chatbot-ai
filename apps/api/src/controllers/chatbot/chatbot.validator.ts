import { z } from "zod";

export const validateChatbot = z.object({
 body: z.object({
  name: z.string({
   required_error: "Name is required",
  }),
  website: z.string({
   required_error: "Password is required",
  }).url("Not a valid url"),
 }),
});
