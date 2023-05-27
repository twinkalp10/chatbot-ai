import * as yup from "yup";

export const chatbotTextDataSchema = yup.
  object({
    title: yup
      .string()
      .required("Chatbot name is required"),
    text: yup
      .string()
      .required("Chatbot data is required")
  })
