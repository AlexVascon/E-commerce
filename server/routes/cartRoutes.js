import express from 'express'
const router = express.Router()
import {
  addItemToCart,
  removeCartItem,
  fetchCartItems,
} from '../controllers/cartController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

router.post('/add', authenticateToken, addItemToCart)
router.get('/remove/:itemId', authenticateToken, removeCartItem)
router.get('/all', authenticateToken, fetchCartItems)

export default router
