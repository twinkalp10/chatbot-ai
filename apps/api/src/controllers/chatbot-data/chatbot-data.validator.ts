import { z } from "zod";

export const validateChatbotTextData = z.object({
 body: z.object({
  title: z.string({
   required_error: "Title is required",
  }),
  text: z.string({
   required_error: "Text is required",
  }),
  chatBotId: z.string({
   required_error: "Chatbot Id is required",
  }),
 }),
});

export const validateChatbotTextDataChatBotId = z.object({
 body: z.object({
  chatBotId: z.string({
   required_error: "Chatbot Id is required",
  }),
 }),
});
