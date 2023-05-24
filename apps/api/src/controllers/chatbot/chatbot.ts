import db from "../../configs/db.config"
import { chatBotDefaultSettings } from "../../default/chatbotSettings.default"
import { Req, Res } from "../../type"

export const getAllChatbot = async (req: Req, res: Res) => {
 const chatBots = await db.chatBot.findMany({
  where: {
   userId: req?.user?.id
  }
 })
 res.send({ data: chatBots, success: true })
}

export const addChatbot = async (req: Req, res: Res) => {
 const { name, url } = req.body
 const userId = req?.user?.id
 if (userId) {
  try {
   const chatBot = await db.chatBot.create({
    data: {
     name,
     url,
     userId
    }
   })
   const { welcomeMessage,
    chatBackgroundColor,
    suggestionMessage,
    displayName,
    displayPicture,
    userColorMessage,
    chatBotColorMessage,
    chatBubbleColor } = chatBotDefaultSettings
   await db.chatBotSettings.create({
    data: {
     userId,
     chatBotId: chatBot.id,
     welcomeMessage,
     chatBackgroundColor,
     suggestionMessage,
     displayName,
     displayPicture,
     userColorMessage,
     chatBotColorMessage,
     chatBubbleColor,
     chatBubbleAlignment: 'RIGHT',
    }
   })
   res.send({ data: chatBot, success: true })
  } catch (e) {
   console.log(e)
   res.send({ message: "Unable to added the chatBot", success: false, error: e })
  }
 } else {
  return res.status(401).send({ message: "Unauthorized" })
 }
}

export const updateChatbot = async (req: Req, res: Res) => {
 const { name, url } = req.body
 const { id } = req.params
 const userId = req?.user?.id
 if (!id) {
  return res.status(401).send({ message: "Please send chatBot Id", success: false })
 }
 if (userId) {
  const chatBot = await db.chatBot.update({
   where: {
    id_userId: {
     userId,
     id
    }
   },
   data: {
    name,
    url
   }
  })
  res.send({ data: chatBot, success: true })
 } else {
  return res.status(401).send({ message: "Unauthorized" })
 }
}

export const deleteChatbot = async (req: Req, res: Res) => {
 const { id } = req.params
 const userId = req?.user?.id
 if (userId) {
  const chatBot = await db.chatBot.delete({
   where: {
    id_userId: {
     userId,
     id
    }
   }
  })
  res.send({ data: chatBot, success: true })
 } else {
  return res.status(401).send({ message: "Unauthorized" })
 }
}
