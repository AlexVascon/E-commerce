import express from 'express'
const router = express.Router()
import {category} from '../controllers/productController.js'

router.get('/category', category)

export default router
