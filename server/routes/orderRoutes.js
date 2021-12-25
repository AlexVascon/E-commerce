import express from 'express'
const router = express.Router()
import {pay,createOrder, fetchOrder, fetchMyOrders} from '../controllers/orderController.js'
import {authenticateToken, admin} from '../middleware/authMiddleware.js'

router.get('/my-orders', authenticateToken, fetchMyOrders)
router.post('/create', authenticateToken, createOrder)
router.get('/:orderId', authenticateToken, fetchOrder)
router.post('/pay', authenticateToken, pay)


export default router