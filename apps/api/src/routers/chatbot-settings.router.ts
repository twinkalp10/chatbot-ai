
import { Router } from 'express'
import { validate } from '../middleware/middleware'
import { validateChatbot } from '../controllers/chatbot-settings/chatbot-settings.validator'
import { getChatBotSettings, updateChatBotSettings } from '../controllers/chatbot-settings/chatbot-settings'

const router = Router()

router.get('/interface/:id', getChatBotSettings)
router.put('/interface/:id', validate(validateChatbot), updateChatBotSettings)

export default router
