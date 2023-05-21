
import { Router } from 'express'
import { deleteChatbot, addChatbot, getAllChatbot, updateChatbot } from '../controllers/chatbot/chatbot'
import { validate } from '../middleware/middleware'
import { validateChatbot } from '../controllers/chatbot/chatbot.validator'

const router = Router()

router.get('/', getAllChatbot)
router.post('/', validate(validateChatbot), addChatbot)
router.put('/:id', validate(validateChatbot), updateChatbot)
router.delete('/:id', deleteChatbot)


export default router
