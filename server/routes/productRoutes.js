import express from 'express'
const router = express.Router()
import {category, createProduct, deleteProduct} from '../controllers/productController.js'
import {admin} from '../middleware/authMiddleware.js'

router.get('/category', category)
router.get('/delete', admin, deleteProduct)
router.post('/create', admin, createProduct)

export default router
