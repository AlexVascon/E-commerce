import Order from '../models/orderModel.js'
import Cart from '../models/cartModel.js'
import Product from '../models/productModel.js'
import Shipping from '../models/shippingModel.js'
import Stripe from 'stripe'
const stripe = new Stripe('sk_test_51K0lRmC2ZHbTWgUUFfWMf3LrQq8LcWM0YUmf41Eqba9s9K1JAs83j55n9hwYjRrscVGntiPyLSs1TJETKutl4Tj900qn8bBxKZ')


export const createOrder = async (req,res,next) => {
  try {
    const cart = await Cart.findOne({userId: req.user._id})
    const shipping = await Shipping.findOne({userId: req.user._id}).lean()
    const order = await new Order({
      userId: req.user._id,
      contact: {
        email: shipping.information.email,
        phoneNumber: shipping.information.phoneNumber
      },
      items: cart.items, 
      shippingAddress: {
        address: shipping.information.streetAddress,
        city: shipping.information.city,
        postCode: shipping.information.postCode,
        country: shipping.information.country,
        province: shipping.information.province
      },
      paymentMethod: 'card', // default for now
      taxPrice: cart.taxPrice,
      isPaid: false,
      totalPrice: cart.totalCost,
    })
    await order.save()
    cart.items = []
    cart.totalCost = 0
    cart.taxPrice = 0.0
    await cart.save()
    const productIds = order.items.map(item => item.itemId)
    const products = await Product.find({_id: {$in: productIds}})
    await Promise.all(products.map(async product => {
      const orderItem = order.items.filter(item => item.itemId === product.id)[0] // there can be only one!
      product.quantity -= orderItem.quantity
      await product.save()
    }))
    res.status(200).send(order)
  } catch (err) {
    next(err)
  }
}

export const fetchOrder = async (req,res,next) => {
  try {
    const order = await Order.findById(req.params.orderId).lean()
    res.status(200).send(order)
  } catch (err) {
    next(err)
  }
}

export const pay = async (req,res,next) => {
  try {
    const {orderId, id} = req.body
    const order = await Order.findById(orderId)
    await stripe.paymentIntents.create({
      amount: (order.totalPrice + order.taxPrice) * 10,
      currency: 'USD',
      description: 'pay order',
      payment_method: id,
      confirm: true,
    })
    order.isPaid = true
    order.paidAt = Date.now()
    await order.save()
    res.status(200).send({message: 'order payed'})
  } catch (err) {
    next(err)
  }
}

export const fetchMyOrders = async (req,res,next) => {
  try {
    const myOrders = await Order.find({userId: req.user._id}).lean()
    res.status(200).send(myOrders)
  } catch (err) {
    next(err)
  }
}




