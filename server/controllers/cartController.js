import Cart from '../models/cartModel.js'
import Product from '../models/productModel.js'

export const addItemToCart = async (req, res, next) => {
  try {
    const { productId } = req.body
    const cart = await Cart.findOne({ userId: req.user._id })
    const product = await Product.findOne({ _id: productId }).lean()
    const itemInCart = cart.items.filter((item) => item.itemId === productId) // check is item already in cart
    if (itemInCart.length) {
      const updatedItemQuantity = cart.items.map((item) => {
        if (item.itemId === productId) item.quantity += 1
        return item
      })
      cart.items = updatedItemQuantity
      cart.totalCost += product.price
    } else {
      await cart.items.push({
        itemId: product._id,
        name: product.title,
        image: product.image,
        quantity: 1,
        price: product.price,
      })
      cart.totalCost += product.price
    }
    await cart.save()
    res.status(200).send(cart)
  } catch (err) {
    next(err)
  }
}
