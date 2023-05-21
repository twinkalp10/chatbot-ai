import * as yup from "yup";

export const chatbotSchema = yup
  .object({
    name: yup
      .string()
      .required("website name is required"),
    url: yup
      .string().required("url is required")
      .url("Please enter valid URL")
  })
  .required();
