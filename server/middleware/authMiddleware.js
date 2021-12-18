import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

exports.authenticateToken = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      req.user = await User.findById(decoded._id).select('-password')
      next()
    } catch (err) {
      console.log(err)
      res.status(401)
      throw new Error('Not authorized, token fail')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
};