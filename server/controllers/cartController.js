import Cart from '../models/cartModel.js'
import Product from '../models/productModel.js'

export const addItemToCart = async (req, res, next) => {
  try {
    const { productId } = req.body
    const cart = await Cart.findOne({ userId: req.user._id })
    const product = await Product.findOne({ _id: productId }).lean()
    const itemInCart = cart.items.filter((item) => item.itemId === productId)
    if (itemInCart.length) {
      if (itemInCart.quantity === product.quantity)
        return res.status(406).send({ message: 'cannot exceed stock limit' })
      const updatedItemQuantity = cart.items.map((item) => {
        if (item.itemId === productId) item.quantity += 1
        return item
      })
      cart.items = updatedItemQuantity
      cart.totalCost += product.price
      cart.taxPrice = parseFloat(Number(0.15 * cart.totalCost)).toFixed(2)
    } else {
      await cart.items.push({
        itemId: product._id,
        name: product.title,
        image: product.image,
        quantity: 1,
        stock: product.quantity,
        price: product.price,
      })
      cart.totalCost += product.price
      cart.taxPrice = parseFloat(Number(0.15 * cart.totalCost)).toFixed(2)
    }
    await cart.save()
    res.status(200).send({ message: 'added cart item' })
  } catch (err) {
    next(err)
  }
}

export const removeCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params
    const cart = await Cart.findOne({ userId: req.user._id })
    const removeIndex = cart.items.findIndex((item) => item.itemId === itemId)
    const itemAtIndex = cart.items[removeIndex]
    if (itemAtIndex.quantity > 1) {
      const updatedItemQuantity = cart.items.map((item) => {
        if (item.itemId === itemId) item.quantity -= 1
        return item
      })
      cart.items = updatedItemQuantity
      cart.totalCost -= itemAtIndex.price
    } else {
      const removedItem = cart.items.splice(removeIndex, 1)[0]
      cart.totalCost -= removedItem.price
    }
    await cart.save()
    res.status(200).send(cart)
  } catch (err) {
    next(err)
  }
}

export const fetchCartItems = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).lean()
    res.status(200).send(cart)
  } catch (err) {
    next(err)
  }
}
