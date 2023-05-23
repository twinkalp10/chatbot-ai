import { z } from "zod";

export const validateChatbot = z.object({
 body: z.object({
  welcomeMessage: z.string({
   required_error: "WelcomeMessage is required",
  }),
  chatBackgroundColor: z.string({
   required_error: "ChatBackgroundColor is required",
  }),
  suggestionMessage: z.string({
   required_error: "SuggestionMessage is required",
  }),
  displayName: z.string({
   required_error: "DisplayName is required",
  }),
  displayPicture: z.string({
   required_error: "DisplayPicture is required",
  }),
  userColorMessage: z.string({
   required_error: "UserColorMessage is required",
  }),
  chatBotColorMessage: z.string({
   required_error: "ChatBotColorMessage is required",
  }),
  chatBubbleAlignment: z.string({
   required_error: "ChatBubbleAlignment is required",
  }),
  chatBubbleColor: z.string({
   required_error: "ChatBubbleColor is required",
  })
 })
});
