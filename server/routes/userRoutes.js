import express from 'express'
const router = express.Router()
import {createUser, loginUser, editUser, deleteUser, verifyUser, fetchAllUsers} from '../controllers/userController.js'
import {authenticateToken, admin} from '../middleware/authMiddleware.js'

router.post('/register', createUser)
router.post('/login', loginUser)
router.put('/edit', authenticateToken, editUser)
router.get('/delete', authenticateToken, deleteUser )
router.get('/verify', authenticateToken, verifyUser)
router.get('/all', authenticateToken, admin, fetchAllUsers)

export default router