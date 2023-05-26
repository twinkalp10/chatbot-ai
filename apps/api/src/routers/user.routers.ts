
import { Router } from 'express'
import { getUser, updateUserName, updateUserPassword } from '../controllers/user/user'
import { validate } from '../middleware/middleware'
import { validateName, validatePassword } from '../controllers/user/user.validator'

const router = Router()

router.get('/me', getUser)
router.put('/password', validate(validatePassword), updateUserPassword)
router.put('/name', validate(validateName), updateUserName)

export default router
