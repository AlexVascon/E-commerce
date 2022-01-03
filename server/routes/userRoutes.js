import express from 'express'
const router = express.Router()
import {createUser, fetchUser, editUser, deleteUser, verifyUser, fetchAllUsers, saveUserShippingInformation, fetchShippingInformation} from '../controllers/userController.js'
import {authenticateToken, admin} from '../middleware/authMiddleware.js'

router.get('/all', authenticateToken, admin, fetchAllUsers)
router.post('/register', createUser)
router.post('/login', fetchUser)
router.put('/edit', authenticateToken, editUser)
router.delete('/delete', authenticateToken, deleteUser )
router.get('/verify', authenticateToken, verifyUser)
router.post('/shipping/save',authenticateToken, saveUserShippingInformation)
router.get('/shipping-information', authenticateToken, fetchShippingInformation)

export default router