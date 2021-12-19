import express from 'express'
const router = express.Router()
import {
  fetchProducts,
  createProduct,
  deleteProduct,
  fetchProductDetails,
  fetchProductSuggestions,
  fetchAllProducts,
  editProduct,
  createProductReview
} from '../controllers/productController.js'
import {authenticateToken, admin} from '../middleware/authMiddleware.js'

router.get('/category', fetchProducts)
router.get('/delete', authenticateToken, admin, deleteProduct)
router.post('/create', authenticateToken, admin, createProduct)
router.post('/edit', authenticateToken, admin, editProduct)
router.post('/review', authenticateToken, createProductReview)
router.get('/:productId', fetchProductDetails)
router.get('/suggestions/:productId', fetchProductSuggestions)
router.get('/all', authenticateToken, admin, fetchAllProducts)

export default router
