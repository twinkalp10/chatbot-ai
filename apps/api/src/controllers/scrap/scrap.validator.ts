import { z } from "zod";

export const validateUrl = z.object({
 body: z.object({
  url: z.string({
   required_error: "url is required",
  }).url("Not a valid url"),
 }),
});
