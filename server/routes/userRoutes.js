import express from 'express'
const router = express.Router()
import {register, login, update, remove} from '../controllers/userController.js'
import {authenticateToken} from '../middleware/authMiddleware.js'

router.post('/register', register)
router.post('/login', login)
router.put('/edit', authenticateToken, update)
router.get('/delete', authenticateToken, remove )

export default router