import express from 'express'
const router = express.Router()
import {pay,createOrder, fetchOrder, fetchMyOrders, fetchAllOrders, markOrderDelivered} from '../controllers/orderController.js'
import {authenticateToken, admin} from '../middleware/authMiddleware.js'

router.put('/delivered', authenticateToken, admin, markOrderDelivered)
router.get('/all', authenticateToken, admin, fetchAllOrders)
router.get('/my-orders', authenticateToken, fetchMyOrders)
router.post('/create', authenticateToken, createOrder)
router.get('/:orderId', authenticateToken, fetchOrder)
router.post('/pay', authenticateToken, pay)


export default router