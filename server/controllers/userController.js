import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import {generateAccessToken} from '../utils/generateToken.js'
import Cart from '../models/cartModel.js'
import Shipping from '../models/shippingModel.js'
import Product from '../models/productModel.js'

// register
export const createUser = async (req,res,next) => {
  try {
    const {username, email, password, confirmPassword, cartItems} = req.body
    if(password !== confirmPassword) return res.status(400).send({messages: 'passwords dont match.'})
    const user = await new User({
      username: username,
      email: email,
      password: password
    })
    await user.save()
    const cart = await new Cart({userId: user._id})
    await cart.save()
    if(cartItems) { // if user added cart items without account
      await Promise.all(cartItems.map(async item => {
        const product = await Product.findById(item.itemId)
        cart.items.push({
          itemId: product._id,
        name: product.title,
        image: product.image,
        quantity: item.quantity, // set in local storage
        price: product.price,
        })
        cart.totalCost += product.price * item.quantity
        cart.taxPrice = parseFloat(Number((0.15 * cart.totalCost))).toFixed(2)
      }))
      await cart.save()
    }
    await cart.save()
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

// login
export const fetchUser = async (req,res,next) => {
  try {
    const {usernameOrEmail, password} = req.body
    if(!usernameOrEmail || !password) return res.status(404).send({messages: 'username or password invalid'})
    const searchCriteria = await usernameOrEmail.includes('@') ? 'email' : 'username'
    const user = await User.findOne( { [searchCriteria]: usernameOrEmail} ).lean().orFail()
    if(!bcrypt.compareSync(password, user.password)) return res.status(400).send({messages: 'Invalid username or password'})
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

export const editUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    if(req.body.password &&  (req.body.password !== req.body.confirmPassword)) {
      return res.status(404).send({messages: 'passwords dont match'})
    } else {
      user.password = req.body.password || user.password
    }
    await user.save()
    res.status(200).send({message: 'update successful'})
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  const { userId } = req.params
  if (req.user._id !== userId && !req.user.isAdmin) res.status(403).send('you are not authorised')

    try {
      const user = await User.findById(req.user._id)
      await user.remove()
      res.send({ message: 'User removed' })
    } catch (err) {
      next(err)
    }
}

// requires a query
// example request: BASE_URL/users/all?page=1&limit=8
export const fetchAllUsers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    const count = await User.find().lean()
    if (endIndex < count.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    const users = await User.find().limit(limit).skip(startIndex).exec()
    res.status(200).send(users)
  } catch (err) {
    next(err)
  }
};

export const verifyUser = async (req, res) => {
  const user = req.user
  res.status(200).send(user)
}

export const saveUserShippingInformation = async (req,res, next) => {
  try {
    let shipping = await Shipping.findOne({userId: req.user._id})
    if(shipping) {
      shipping.information = {
        fullName: req.body.fullName || shipping.information.fullName,
        phoneNumber: req.body.phoneNumber || shipping.information.phoneNumber,
        email: req.body.email || shipping.information.email,
        country: req.body.country || shipping.information.country,
        city: req.body.city || shipping.information.city,
        province: req.body.province || shipping.information.province,
        postCode: req.body.postCode || shipping.information.postCode,
        streetAddress: req.body.streetAddress || shipping.information.streetAddress
      }
      await shipping.save()
      return res.status(200).send({message: 'updated shipping information.'})
    }
    shipping = await new Shipping({
      userId: req.user._id,
      information: {
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        country: req.body.country,
        city: req.body.city,
        province: req.body.province,
        postCode: req.body.postCode,
        streetAddress: req.body.streetAddress
      } 
    })
    await shipping.save()
    res.status(200).send({message: 'saved shipping information.'})
  } catch (err) {
    next(err)
  }
}

export const fetchShippingInformation = async (req,res, next) => {
  try {
    const shipping = await Shipping.findOne({userId: req.user._id})
    res.status(200).send(shipping.information)
  } catch (err) {
    next(err)
  }
}
