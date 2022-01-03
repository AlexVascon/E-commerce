import Order from '../models/orderModel.js'
import Cart from '../models/cartModel.js'
import Product from '../models/productModel.js'
import Shipping from '../models/shippingModel.js'
import Stripe from 'stripe'
const stripe = new Stripe(
  'sk_test_51K0lRmC2ZHbTWgUUFfWMf3LrQq8LcWM0YUmf41Eqba9s9K1JAs83j55n9hwYjRrscVGntiPyLSs1TJETKutl4Tj900qn8bBxKZ'
)

export const createOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id })
    const shipping = await Shipping.findOne({ userId: req.user._id }).lean()
    const order = await new Order({
      user: req.user._id,
      items: cart.items,
      shippingAddress: {
        address: shipping.information.streetAddress,
        city: shipping.information.city,
        postCode: shipping.information.postCode,
        country: shipping.information.country,
        province: shipping.information.province,
      },
      paymentMethod: 'card', // default for now
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalCost,
    })
    await order.save()
    cart.items = []
    cart.totalCost = 0
    cart.taxPrice = 0.0
    await cart.save()
    const productIds = order.items.map((item) => item.itemId)
    const products = await Product.find({ _id: { $in: productIds } })
    await Promise.all(
      products.map(async (product) => {
        const orderItem = order.items.filter(
          (item) => item.itemId === product.id
        )[0] // there can be only one!
        product.quantity -= orderItem.quantity
        await product.save()
      })
    )
    res.status(201).send(order)
  } catch (err) {
    next(err)
  }
}

export const fetchOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      'user',
      'username email'
    )
    res.status(200).send(order)
  } catch (err) {
    next(err)
  }
}

export const pay = async (req, res, next) => {
  try {
    const { orderId, id } = req.body
    const order = await Order.findById(orderId)
    await stripe.paymentIntents.create({
      amount: (order.totalPrice + order.taxPrice) * 100,
      currency: 'USD',
      description: 'pay order',
      payment_method: id,
      confirm: true,
    })
    order.isPaid = true
    order.paidAt = Date.now()
    await order.save()
    res.status(201).send({ message: 'order payed' })
  } catch (err) {
    next(err)
  }
}

export const fetchMyOrders = async (req, res, next) => {
  try {
    const myOrders = await Order.find({ user: req.user._id }).lean()
    res.status(200).send(myOrders)
  } catch (err) {
    next(err)
  }
}

export const fetchAllOrders = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    const allOrders = await Order.find({}).lean()
    if (endIndex < allOrders.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      }
    }
    const orders = await Order.find({})
      .populate('user', 'username email')
      .limit(limit)
      .skip(startIndex)
      .exec()
    const pageCount = Math.ceil(allOrders.length / limit)
    res.status(200).send({ orders, pageCount, page })
  } catch (err) {
    next(err)
  }
}

export const markOrderDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.body.orderId)
    order.isDelivered = true
    order.deliveredAt = Date.now()
    await order.save()
    res.status(201).send(order)
  } catch (err) {
    next(err)
  }
}
