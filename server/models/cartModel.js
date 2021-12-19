import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  items: [{
    itemId: {
        type: String,
        required: true
    },
    name: {
      type: String,
      required: true
    },
    image: String,
    quantity: {
        type: Number,
        deafult: 1
    },
    price: {
      type: Number,
      required: true
    }
}],
totalCost: {
  type: Number,
  default: 0
}
})

const Cart = mongoose.model('Cart',cartSchema)

export default Cart