import { Router } from 'express'
import { createNewUser, loginUser } from '../controllers/user/user'
import { validate } from '../middleware/middleware'
import { validateCreateNewUser, validateLoginUser } from '../controllers/user/user.validator'

const router = Router()

router.post('/login', validate(validateLoginUser), loginUser)
router.post('/signup', validate(validateCreateNewUser), createNewUser)
router.get('/logout', () => { })


export default router
