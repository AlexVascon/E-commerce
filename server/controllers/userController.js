import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import {generateAccessToken} from '../utils/generateToken.js'

export const register = async (req,res,next) => {
  try {
    const {username, email, password, confirmPassword} = req.body
    if(password !== confirmPassword) return res.status(400).send({message: 'passwords dont match.'})
    const user = await new User({
      username: username,
      email: email,
      password: password
    })
    await user.save()
    res.status(200).send(user)
  } catch (err) {
    next(err)
  }
}

export const login = async (req,res,next) => {
  try {
    const {usernameOrEmail, password} = req.body
    const searchCriteria = await usernameOrEmail.includes('@') ? 'email' : 'username'
    const user = await User.findOne( { [searchCriteria]: usernameOrEmail} ).lean().orFail()
    if(!bcrypt.compareSync(password, user.password)) return res.status(400).send({message: 'Invalid username or password'})
    const payload = {
      username: user.username,
      _id: user._id,
    }
    const accessToken = generateAccessToken(payload)
    res.status(200).send(accessToken)
  } catch (err) {
    next(err)
  }
}

export const update = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.password = req.body.password || user.password

    await user.save()
    res.status(200).send({message: 'update successful'})
  } catch (err) {
    next(err)
  }
}

export const remove = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id)
      await user.remove()
      res.send({ message: 'User removed' })
    } catch (err) {
      next(err)
    }
}

export const verify = async (req, res) => {
  const user = req.user
  res.status(200).send(user)
};