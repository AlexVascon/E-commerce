import express from 'express'
const router = express.Router()
import {category, createProduct, deleteProduct, productDetails, suggestions, allProducts} from '../controllers/productController.js'
import {authenticateToken, admin} from '../middleware/authMiddleware.js'

router.get('/category', category)
router.get('/delete', admin, deleteProduct)
router.post('/create', admin, createProduct)
router.get('/:itemId', productDetails)
router.get('/suggestions/:selection/:category/:itemId', suggestions)
router.get('/all', authenticateToken, admin, allProducts)

export default router
