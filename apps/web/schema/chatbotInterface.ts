import * as yup from "yup";

export const chatbotInterfaceSchema = yup
  .object({
    welcomeMessage: yup
      .string()
      .required("Initial message is required"),
    chatBotColorMessage: yup
      .string()
      .required("Chatbot message color is required"),
    chatBackgroundColor: yup
      .string()
      .required("Chatbot theme is required"),
    userColorMessage: yup
      .string()
      .required("User message color is required"),
    suggestionMessage: yup
      .string()
      .required("Suggestion message is required"),
    displayName: yup
      .string()
      .required("Display name is required"),
    chatBubbleColor: yup
      .string()
      .required("Chatbot bubble color is required"),
    chatBubbleAlignment: yup
      .string()
      .required("ChatBubble Alignment is required"),

  })
  .required();
