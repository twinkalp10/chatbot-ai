
import { Router } from 'express'
import { getPaymentLink } from '../controllers/payment/payment'


const router = Router()

router.get('/generate-link/', getPaymentLink)


export default router
