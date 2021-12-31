import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const authenticateToken = async (req, res, next) => {
  try {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await User.findById(decoded._id).select('-password')
        next()
  } else {
    return res.status(401)
    throw new Error("Not authorized, no token")
  }
  } catch (err) {
    res.status(401)
      throw new Error('Not authorized, token failed')
  }
}

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error("Not authorized as an admin")
  }
}