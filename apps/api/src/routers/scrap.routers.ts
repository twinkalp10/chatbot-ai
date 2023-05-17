import { Router } from 'express'
import { createNewUser, loginUser } from '../controllers/user/user'
import { validate } from '../middleware/middleware'
import { validateCreateNewUser, validateLoginUser } from '../controllers/user/user.validator'
import { validateUrl } from '../controllers/scrap/scrap.validator'
import { scrapeUrl } from '../controllers/scrap/scrap'

const router = Router()

router.post('/', validate(validateUrl), scrapeUrl)


export default router
