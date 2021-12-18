import express from 'express'
const router = express.Router()
import {register, login, update, remove, verify, allUsers} from '../controllers/userController.js'
import {authenticateToken, admin} from '../middleware/authMiddleware.js'

router.post('/register', register)
router.post('/login', login)
router.put('/edit', authenticateToken, update)
router.get('/delete', authenticateToken, remove )
router.get('/verify', authenticateToken, verify)
router.get('/all', authenticateToken, admin, allUsers)

export default router