import db from "../../configs/db.config"
import { Req, Res } from "../../type"

export const getChatBotSettings = async (req: Req, res: Res) => {
 const { id } = req.params
 const chatBotSettings = await db.chatBotSettings.findMany({
  where: {
   userId: req?.user?.id,
   chatBotId: id
  }
 })
 res.send({ data: chatBotSettings, success: true })
}

export const updateChatBotSettings = async (req: Req, res: Res) => {
 const { welcomeMessage, chatBackgroundColor, suggestionMessage, displayName, displayPicture, userColorMessage, chatBotColorMessage, chatBubbleAlignment, chatBubbleColor } = req.body
 const { id } = req.params
 const userId = req?.user?.id
 if (!id) {
  return res.status(401).send({ message: "Please send chatBot Id", success: false })
 }
 if (userId) {
  const chatBot = await db.chatBotSettings.update({
   where: {
    chatBotId_userId: {
     userId,
     chatBotId: id
    }
   },
   data: {
    welcomeMessage,
    chatBackgroundColor,
    suggestionMessage,
    displayName,
    displayPicture,
    userColorMessage,
    chatBotColorMessage,
    chatBubbleColor,
    chatBubbleAlignment
   }
  })
  res.send({ data: chatBot, success: true })
 } else {
  return res.status(401).send({ message: "Unauthorized" })
 }
}
