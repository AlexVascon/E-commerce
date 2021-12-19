import express from 'express'
const router = express.Router()
import {category, createProduct} from '../controllers/productController.js'
import {admin} from '../middleware/authMiddleware.js'

router.get('/category', category)
router.post('/create', admin, createProduct)

export default router
