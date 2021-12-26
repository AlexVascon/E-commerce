import express from 'express'
const router = express.Router()
import {
  fetchProducts,
  createProduct,
  deleteProduct,
  fetchProductDetails,
  fetchSimilarProducts,
  fetchAllProducts,
  editProduct,
  createProductReview,
  fetchAllReviews,
  fetchTopProducts
} from '../controllers/productController.js'
import {authenticateToken, admin} from '../middleware/authMiddleware.js'

router.get('/category', fetchProducts)
router.get('/delete', authenticateToken, admin, deleteProduct)
router.post('/create', authenticateToken, admin, createProduct)
router.post('/edit', authenticateToken, admin, editProduct)
router.post('/create/review', authenticateToken, createProductReview)
router.get('/reviews', fetchAllReviews)
router.get('/top', fetchTopProducts)
router.get('/information/:productId', fetchProductDetails)
router.get('/suggestions/:productId', fetchSimilarProducts)
router.get('/all', authenticateToken, admin, fetchAllProducts)

export default router
