
import { Router } from 'express'
import { addWebsite, deleteWebsite, getAllWebsite, updateWebsite, } from '../controllers/website/website'
import { validate } from '../middleware/middleware'
import { validateWebsite } from '../controllers/website/website.validator'

const router = Router()

router.get('/', getAllWebsite)
router.post('/', validate(validateWebsite), addWebsite)
router.put('/:id', validate(validateWebsite), updateWebsite)
router.delete('/:id', deleteWebsite)


export default router
