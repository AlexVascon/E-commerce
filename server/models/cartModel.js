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
    image: {
      type: String
    },
    quantity: {
        type: Number,
        deafult: 1
    },
    stock: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
}],
totalCost: {
  type: Number,
  default: 0
},
taxPrice: {
  type: Number,
  required: true,
  default: 0.0
}
})

const Cart = mongoose.model('Cart',cartSchema)

export default Cart