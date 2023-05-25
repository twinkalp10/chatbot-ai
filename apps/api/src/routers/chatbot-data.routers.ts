
import { Router } from 'express'
import { deleteChatbot, getAllTextData, addTextData, updateTextData } from '../controllers/chatbot-data/chatbot-data'
import { validate } from '../middleware/middleware'
import { validateChatbotTextData, validateChatbotTextDataChatBotId } from '../controllers/chatbot-data/chatbot-data.validator'

const router = Router()

router.get('/text/', getAllTextData)
router.post('/text/', validate(validateChatbotTextData), addTextData)
router.put('/text/:id', validate(validateChatbotTextData), updateTextData)
router.delete('/text/:id', validate(validateChatbotTextDataChatBotId), deleteChatbot)


export default router
