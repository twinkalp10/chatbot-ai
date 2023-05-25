import db from "../../configs/db.config"
import { chatBotDefaultSettings } from "../../default/chatbotSettings.default"
import { Req, Res } from "../../type"

export const getAllTextData = async (req: Req, res: Res) => {
 const textData = await db.chatBotTextData.findMany({
  where: {
   userId: req?.user?.id
  }
 })
 res.send({ data: textData, success: true })
}

export const addTextData = async (req: Req, res: Res) => {
 const { title, text, chatBotId } = req.body
 const userId = req?.user?.id
 if (userId) {
  try {
   const data = await db.chatBotTextData.create({
    data: {
     title,
     text,
     userId,
     chatBotId
    }
   })

   res.send({ data: data, success: true })
  } catch (e) {
   console.log(e)
   res.send({ message: "Unable to added the chatBot", success: false, error: e })
  }
 } else {
  return res.status(401).send({ message: "Unauthorized" })
 }
}

export const updateTextData = async (req: Req, res: Res) => {
 const { title, text, chatBotId } = req.body
 const { id } = req.params
 const userId = req?.user?.id
 if (!id) {
  return res.status(401).send({ message: "Please send chatBot Id", success: false })
 }
 if (userId) {
  const chatBotTextData = await db.chatBotTextData.update({
   where: {
    id_chatBotId: {
     chatBotId,
     id
    },
    id_userId: {
     userId,
     id
    }
   },
   data: {
    title,
    text,
    userId,
    chatBotId
   }
  })
  res.send({ data: chatBotTextData, success: true })
 } else {
  return res.status(401).send({ message: "Unauthorized" })
 }
}

export const deleteChatbot = async (req: Req, res: Res) => {
 const { chatBotId } = req.body
 const { id } = req.params
 const userId = req?.user?.id
 if (userId) {
  const chatBot = await db.chatBotTextData.delete({
   where: {
    id_userId: {
     userId,
     id
    },
    id_chatBotId: {
     chatBotId,
     id
    }
   }
  })
  res.send({ data: chatBot, success: true })
 } else {
  return res.status(401).send({ message: "Unauthorized" })
 }
}
