import express from 'express'
const router = express.Router()
import { addItemToCart } from '../controllers/cartController.js'
import {authenticateToken} from '../middleware/authMiddleware.js'

router.post('/add', authenticateToken, addItemToCart)

export default router