import db from "../../configs/db.config"
import { chatBotDefaultSettings } from "../../default/chatbotSettings.default"
import { Req, Res } from "../../type"

export const getPaymentLink = async (req: Req, res: Res) => {
 try {
  const { chatBotId } = req.body
  const chatBot = await db.chatBot.findUnique({
   where: {
    id: chatBotId
   }
  })
  if (chatBot) {
   const { id, name, url } = chatBot
   const paymentLink = `${process.env.FRONTEND_URL}/payment/${id}/${name}/${url}`
   res.send({ data: paymentLink, success: true })
  } else {
   res.send({ message: "Unable to find chatBot", success: false })
  }
 } catch (e) {
  console.log(e)
  res.send({ message: "Unable to fetch chatBots", success: false, error: e })
 }
}
