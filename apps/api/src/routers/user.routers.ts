
import { Router } from 'express'
import { getUser } from '../controllers/user/user'

const router = Router()

router.get('/me', getUser)

export default router
