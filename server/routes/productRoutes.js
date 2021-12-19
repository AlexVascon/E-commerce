import express from 'express'
const router = express.Router()
import {fetchProducts, createProduct, deleteProduct, fetchProductDetails, fetchProductSuggestions, fetchAllProducts} from '../controllers/productController.js'
import {authenticateToken, admin} from '../middleware/authMiddleware.js'

router.get('/category', fetchProducts)
router.get('/delete', admin, deleteProduct)
router.post('/create', admin, createProduct)
router.get('/:productId', fetchProductDetails)
router.get('/suggestions/:productId', fetchProductSuggestions)
router.get('/all', authenticateToken, admin, fetchAllProducts)

export default router
